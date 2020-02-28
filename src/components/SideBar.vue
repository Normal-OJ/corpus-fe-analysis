<template>
  <div id="side-bar">
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
      activatable
      return-object
      @update:active="onUpdate"
      :search="search"
      :filter="filter"
      :items="items"
      item-key="fullName"
    ></v-treeview>
  </div>
</template>

<script>
import File from '@/util/file'

export default {
  name: 'SideBar',
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      search: null,
      caseSensitive: false,
    }
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  methods: {
    onUpdate(ele) {
      this.$emit('nodeClick', ele)
    }
  }
}
</script>

<style>
#side-bar {
  overflow-y: scroll;
  height: 80vh;
}
</style>