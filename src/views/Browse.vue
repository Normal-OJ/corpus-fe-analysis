<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SideBar
          @click-file="clickFile"
          :get-items="getItems"
          :items="items"
          :active="active"
          :show-desc="showDesc"
        ></SideBar>
      </v-col>
      <v-col cols="9">
        <InfoPanel :file="file" @analysisFile="analysisFile">
          <div v-if="!content.provider">
            <div
              class="subtitle-1"
              style="white-space: pre;"
            >{{ content }}</div>
          </div>
          <div v-else>
            <Description :desc="content"></Description>
          </div>
        </InfoPanel>
      </v-col>
    </v-row>

    <UiAlert 
      v-model="alert" 
      title="確定要分析此目錄底下所有檔案嗎？"
      subtitle="確認後將前往分析頁面。" 
      @ok="analysisFolder(file)"
    ></UiAlert>

    <v-snackbar v-model="snackbar" color="error">
      無法取得檔案
    </v-snackbar>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar'
import InfoPanel from '@/components/InfoPanel'
import Description from '@/components/Description'
import File from '@/util/file'
import UiAlert from '@/components/ui-alert'

const ROOT_FILE_NAME = '_I_ROOT_FILE__'

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
    Description,
    UiAlert,
  },
  data() {
    return {
      items: [],
      content: '',
      fileName: '',
      opend: [],
      active: [],
      file: new File(''),
      snackbar: false,
      alert: false,
    }
  },
  async created() {
    let root = new File(ROOT_FILE_NAME)
    await this.getItems(root);
    this.items = root.children
  },
  methods: {
    analysisFolder(fileName) {
      fileName.fullName = fileName.fullName.substr(1);
      this.analysisFile(fileName);
    },
    analysisFile(fileName) {
      if ( fileName ) {
        this.$router.push({name: 'analysis', params: {file: fileName.fullName}});
      } else {
        this.snackbar = true;
      }
    },
    getItemByPath(path) {
      path = path.split('/').splice(-1, 1)
      let ret = this.items
      for (let p of path) {
        for (let f of ret) {
          if (f.name === p) {
            ret = f
            break
          }
        }
      }
      return ret
    },
    showDesc(fileName) {
      let it = this.getItemByPath(fileName)
      this.active = []
      this.content = it.data
      this.file = it
    },
    clickFile(files) {
      if (!files.length) return;
      let f = files[0]
      this.file = f
      if ( f.selectAll ) {
        this.alert = true
        return;
      }
      this.content = f.data
    },
    async getItems(file) {
      try {
        let resp = await this.$http.get('/api/view', { params: { file: file.fullName || '/' } })
        var data = resp.data;
        // parse info panel
        if (!!data.description) { // colletion
          file.data = JSON.parse(data.description)
          // file.data = JSON.parse('{"provider": "Bogay Chuang", "introduction": ["i am Bogay"], "quoteInfo": ":P"}')
        }
        else if (!!data.content) { // file
          // file.data = data.content.split('\n')
          file.data = data.content
        }
        if (file.children !== null) {
          // parse tree view
          let isFolder = false;
          if (data.folders?.length) {
            data.folders.forEach(f => file.pushDir(f))
            isFolder = true;
          }
          if (data.files?.length) {
            data.files.forEach(f => file.pushFile(f))
            isFolder = true;
          }
          // get children
          for (let c of file.children)
            this.getItems(c)
          // prepend "select all" item
          if ( isFolder ) {
            file.pushNode('分析此目錄所有檔案')
          }
        }
      }
      catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
