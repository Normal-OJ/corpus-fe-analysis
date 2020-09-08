<template>
  <v-container>
    <h1>直接上傳單個檔案</h1>
    <v-container class="d-flex align-center">
      <v-file-input v-model="file" class="flex-grow-1 pr-4" accept=".cha" label="請選擇你的 Chat 檔"></v-file-input>
      <v-btn class="flex-shrink-1" color="primary" @click="$emit('upload-file', file)">上傳檔案</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "ChaFileInput",
  data: () => ({ file: null }),
};
</script>

<style></style>
