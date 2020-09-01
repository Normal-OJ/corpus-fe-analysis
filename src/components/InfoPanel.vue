<template>
  <v-card id="info-panel">
    <v-card dark elevation="0" color="primary">
      <v-card-title>
        <v-container>
          <v-row>
            <v-col class="font-weight-bold headline" md="8" sm="12">詳細資訊 {{ displayedName }}</v-col>
            <v-spacer></v-spacer>
            <template id="buttons" v-if="!file.children.length && file.name && !file.selectAll">
              <v-btn color="green" class="mt-3 mr-3" @click="downloadFile(file.name, file.data)">
                <v-icon>mdi-download</v-icon>下載檔案
              </v-btn>
              <v-btn color="green" class="mt-3" @click="$emit('analysis-file', file)">
                <v-icon>mdi-chart-bar</v-icon>分析檔案
              </v-btn>
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
import File from "@/util/file";

export default {
  name: "InfoPanel",
  props: {
    file: {},
  },
  computed: {
    displayedName() {
      return this.file?.name ? `(${this.file.name})` : "";
    },
  },
  methods: {
    downloadFile(filename, data) {
      var file = new Blob([data], { type: "text/plain;charset=utf-8" });
      if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        // Others
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
};
</script>

<style scoped>
#info-panel {
  height: 80vh;
  overflow-y: scroll;
}
</style>