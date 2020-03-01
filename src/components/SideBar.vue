<template>
  <div id="side-bar">
    <v-sheet class="pa-4 primary">
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
      dense
      open-on-click
      transition
      hoverable
      activatable
      return-object
      @update:active="onActive"
      :search="search"
      :filter="filter"
      :items="items"
      :active="active"
      item-key="fullName"
    >
      <template v-slot:append="{ item }">
        <v-btn
          color="info"
          rounded
          small
          @click.stop="showDesc(item.fullName)"
          v-if="item.depth === 1"
        >顯示詳細資訊</v-btn>
      </template>
    </v-treeview>
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
    active: {
      type: Array,
      default: [],
    },
    showDesc: {
      type: Function,
      default: (fileName) => alert(fileName)
    }
  },
  data() {
    return {
      search: null,
      caseSensitive: false,
      oldOpend: [],
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
    onActive(eles) {
      this.$emit('click-file', eles)
    },
  }
}
</script>

<style>
#side-bar {
  overflow-y: scroll;
  height: 80vh;
}
</style>