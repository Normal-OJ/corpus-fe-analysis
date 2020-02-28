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
    <v-treeview hoverable :search="search" :filter="filter" :items="items"></v-treeview>
  </div>
</template>

<script>
class Item {
  constructor(id, name, children) {
    this.id = id
    this.name = name
    this.children = children || []
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
  created() {
    this.items = this.getItems();
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  methods: {
    getItems() {
      return [
        new Item(0, 'Item #0', [new Item(1, 'item 00'), new Item(2, 'item 01'), new Item(3, 'item 02'),])
      ]
    },
  }
}
</script>

<style>
</style>