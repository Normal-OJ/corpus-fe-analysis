<template>
  <v-container>
    <v-row>
      <h2>檔案預覽</h2>
      <v-btn @click="download" color="success">下載檔案</v-btn>
    </v-row>
    <v-textarea readonly>{{ fileText }} </v-textarea>
  </v-container>
</template>

<script>
export default {
  name: "FilePreview",
  props: {
    file: {
      type: File,
      required: true,
    },
  },
  computed: {
    fileText: async () => await this.file.text(),
  },
  methods: {
    download() {
      if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(this.file, "export.cha");
      } else {
        // Others
        var a = document.createElement("a");
        var url = URL.createObjectURL(this.file);
        a.href = url;
        a.download = "export.cha";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
};
</script>

<style></style>
