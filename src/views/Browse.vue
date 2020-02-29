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
        <InfoPanel :fileName="fileName">
          <div v-for="(c, i) in parsedContent" :key="i">{{ c }}</div>
        </InfoPanel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar'
import InfoPanel from '@/components/InfoPanel'
import File from '@/util/file'

const ROOT_FILE_NAME = '_I_ROOT_FILE__'

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
  },
  data() {
    return {
      items: [],
      content: '',
      fileName: '',
      opend: [],
      active: [],
    }
  },
  async created() {
    let temp = new File({ name: ROOT_FILE_NAME })
    await this.getItems(temp);
    this.items = temp.children
  },
  computed: {
    parsedContent() {
      let info = this.content
      // pretty format json
      try {
        info = JSON.parse(info)
        info = JSON.stringify(info)
      } catch (err) {
        // console.log(err)
      }
      info = info.split('\n')
      return info
    },
  },
  methods: {
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
      this.fileName = it.name
    },
    clickFile(files) {
      if (!files.length) return;
      let f = files[0]
      this.content = f.data
      this.fileName = f.name
    },
    async getItems(file) {
      try {
        let resp = await this.$http.get('/api/view', { params: { file: file.fullName || '/' } })
        let data = resp.data;
        // parse info panel
        if (data.description) { // colletion
          file.data = data.description
        }
        else if (data.content) { // file
          file.data = data.content
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
        console.log(err)
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>