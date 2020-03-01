<template>
  <v-card id="info-panel">
    <v-card dark elevation="0" color="primary">
      <v-card-title>
        <v-container>
          <v-row>
            <v-col class="font-weight-bold headline" md="8" sm="12">詳細資訊 {{ displayedName }}</v-col>
            <v-col md="2" sm="0"></v-col>
            <template id="buttons" v-if="!file.children.length && file.name">
              <v-col md="1" sm="3">
                <v-btn
                  color="accent"
                  :download="file.name"
                  :href="'data:text/plain;charset=utf-8,' + filePlainText"
                >下載檔案</v-btn>
              </v-col>
              <v-col md="1" sm="3">
                <v-btn color="accent" @click="analysisFile(file)">分析檔案</v-btn>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-card-title>
    </v-card>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
import File from '@/util/file'

export default {
  name: 'InfoPanel',
  props: {
    file: {},
    analysisFile: {
      type: Array
    },
  },
  computed: {
    displayedName() {
      return this.file?.name ? `(${this.file.name})` : ''
    },
    filePlainText() {
      return this.file.data?.join?.('%0A')
    }
  },
}
</script>

<style scoped>
#info-panel {
  height: 80vh;
  overflow-y: scroll;
}
</style>