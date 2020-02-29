<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SideBar @nodeClick="nodeClick" :get-items="getItems" :items="items"></SideBar>
      </v-col>
      <v-col>
        <InfoPanel>
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

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
  },
  data() {
    return {
      items: [],
      content: ''
    }
  },
  async created() {
    let temp = new File({ name: 'temp', fullName: '', children: [] })
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
    nodeClick(ele) {
      this.content = ele[0]?.data || 'no data'
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