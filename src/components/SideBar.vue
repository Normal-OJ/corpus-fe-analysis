<template>
  <v-treeview hoverable :items="items"></v-treeview>
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
      items: []
    }
  },
  created() {
    this.items = this.getItems();
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