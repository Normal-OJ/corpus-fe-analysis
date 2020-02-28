<template>
  <div>
    <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="搜尋檔案"
        flat
        dark
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox v-model="caseSensitive" dark hide-details label="區分大小寫"></v-checkbox>
    </v-sheet>
    <v-treeview
      open-on-click
      transition
      hoverable
      :search="search"
      :filter="filter"
      :items="items"
      item-key="fullName"
    ></v-treeview>
  </div>
</template>

<script>
class File {
  constructor({ name, children = [], fullName = '' } = {}) {
    this.name = name
    this.children = children
    this.fullName = fullName
  }
}

export default {
  name: 'SideBar',
  data() {
    return {
      items: [],
      search: null,
      caseSensitive: false,
    }
  },
  async created() {
    let temp = new File({ name: 'temp', fullName: '/' })
    console.log(temp)
    await this.getItems(temp);
    this.items = temp.children
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  methods: {
    async getItems(file) {
      try {
        let resp = await this.$http.get('/api/view', { params: { file: file.fullName } })
        let data = resp.data;
        // parse tree view
        let files = []
        let isDir = false;
        if (data.folders) {
          files.push(...data.folders)
        }
        if (data.files) {
          files.push(...data.files)
        }
        for (let f of files) {
          let fullName = `${file.prefix}/${f}`
          file.children.push(new File({
            name: f,
            fullName: fullName,
          }))
        }
        // parse info panel
        if (data.description) { // colletion

        }
        else if (data.content) { // file

        }
      }
      catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style>
</style>