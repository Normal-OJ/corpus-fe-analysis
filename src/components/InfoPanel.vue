<template>
  <v-card id="info-panel">
    <v-card-title>詳細資訊 {{ displayedName }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {
    fileName: null
  },
  computed: {
    displayedName() {
      return this.fileName ? `(${this.fileName})` : ''
    }
  }
}
</script>

<style scoped>
#info-panel {
  height: 80vh;
  overflow-y: scroll;
}
</style>