<template>
  <v-container>
    <h1>直接上傳單個檔案</h1>
    <v-form ref="form">
      <v-file-input
        v-model="file"
        class="flex-grow-1 ma-2"
        accept=".cha"
        label="請選擇你的 cha 檔"
        :rules="[v => !!v || '請上傳檔案']"
      ></v-file-input>
      <v-checkbox v-model="isAgreed" :rules="[v => v || '您必須同意條款']">
        <template v-slot:label>
          <div>
            我已閱讀並同意
            <span class="info--text" @click.stop="dialog = true">
              語料上傳使用條款
            </span>
          </div>
        </template>
      </v-checkbox>
      <v-btn class="flex-shrink-1" color="primary" @click="submit">上傳檔案</v-btn>
    </v-form>
    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-toolbar color="info" dark>
          <v-toolbar-title>語料上傳使用條款</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-4 text--primary text-body-1" v-text="terms['upload']" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import terms from '@/util/terms';

export default {
  name: 'ChaFileInput',
  data: () => ({
    file: null,
    dialog: false,
    isAgreed: false,
    terms,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        $emit('upload-file', file);
      }
    },
  },
};
</script>

<style></style>
