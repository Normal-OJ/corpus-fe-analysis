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
      <v-col>
        <InfoPanel :file="file">
          <div v-if="!content.provider">
            <div class="subtitle-1" style="white-space: pre;" v-for="(c, i) in content" :key="i">{{ c }}</div>
          </div>
          <div v-else>
            <Description :desc="content"></Description>
          </div>
        </InfoPanel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar'
import InfoPanel from '@/components/InfoPanel'
import Description from '@/components/Description'
import File from '@/util/file'

const ROOT_FILE_NAME = '_I_ROOT_FILE__'

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
    Description,
  },
  data() {
    return {
      items: [],
      content: '',
      fileName: '',
      opend: [],
      active: [],
      file: new File(''),
    }
  },
  async created() {
    let root = new File(ROOT_FILE_NAME)
    await this.getItems(root);
    this.items = root.children
  },
  methods: {
    analysisFile(fileName) {

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
      this.content = f.data
      this.file = f
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
          file.data = data.content.split('\n')
        }
        if (file.children !== null) {
          // parse tree view
          if (data.folders?.length) {
            data.folders.forEach(f => file.pushDir(f))
          }
          if (data.files?.length) {
            data.files.forEach(f => file.pushFile(f))
          }
          // get children
          for (let c of file.children)
            this.getItems(c)
        }
      }
      catch (err) {
        console.log(data)
        console.log(err)
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
