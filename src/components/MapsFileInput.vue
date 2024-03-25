<template>
  <v-container>
    <h1>檔案上傳</h1>
    <v-form ref="form">
      <div v-if="byUpload">
        <v-file-input
          v-model="file"
          class="my-2"
          accept=".txt"
          label="請選擇你的 txt檔"
          clearable
          :rules="[v => !!v || '請上傳檔案']"
        ></v-file-input>
        <div>
          <h4>同意聲明</h4>
          <p>
            您所上傳之語料檔案僅進行語言樣本線上分析，本系統不做其他使用。
            <br />
            上傳之語料檔案在線上分析結束後將會移除，本系統不具儲存與保管責任。倘若您的語料內含重要個資或資訊，
            建議您保留原始檔案或改採下載CLAN 軟體至個人電腦進行語言樣本分析，以減少不必要之困擾。
          </p>
        </div>
        <v-checkbox
          v-model="isAgreed"
          :rules="[v => v || '您需要同意上述說明以進行線上分析。']"
          label="本人已詳細閱讀上述內容，同意上述說明並願意進行線上分析。"
        />
      </div>
      <div v-else>
        <v-select
          v-model="selectedFile"
          :items="selectedFileList"
          label="選擇試用分析之檔案 (以預設檔案上傳)"
        ></v-select>
        <div>
          <h4>檔案預覽:</h4>
          <v-data-table
            dense
            :headers="previewHeader"
            :items="previewItem[selectedFile]"
            fixed-header
            hide-default-footer
            disable-pagination	
            class="elevation-1"
            height = 25vh
            style= "width: 50%;"
          ></v-data-table>
        </div>
      </div>
      
      <v-btn class="mt-4" color="primary" @click="submit">上傳檔案</v-btn>&nbsp;           
      <p>已上傳檔案: {{ lastSubmittedFile }}</p>  
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'MapsFileInput',

  props: {
    byUpload:{
      type: Boolean,
      required: true,
    }
  },

  data: () => ({
    file: null,
    selectedFile: "",
    selectedFileList: [ 'Testfile1','Testfile2'],
    isAgreed: false,
    lastSubmittedFile: "尚未上傳檔案",

    previewHeader:[{text: "語句編號",align: 'center',value: 'index',width: '100px'}, {text: "語句內容",value: 'content',}	],
    previewItem:{
      'Testfile1':[{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'1',content:'c1'},{index:'2',content:'c2'},{index:'3',content:'c3'}],
      'Testfile2':[{index:'1',content:'c2'},{index:'2',content:'c4'},{index:'3',content:'c6'},{index:'2',content:'c4'},{index:'3',content:'c6'},{index:'2',content:'c4'},{index:'3',content:'c6'},{index:'2',content:'c4'},{index:'3',content:'c6'},{index:'2',content:'c4'},{index:'3',content:'c6'},{index:'2',content:'c4'},{index:'3',content:'c6'}]
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if(this.byUpload){
          this.$emit('upload-file', this.file);
          this.lastSubmittedFile = this.file.name;
        }
        else{
          this.$emit('upload-file', this.selectedFile);
          this.lastSubmittedFile = this.selectedFile;
        }
      }
    },
    reset() {
      this.file= null,
      this.lastSubmittedFile = "尚未上傳檔案"
    }
  },
};
</script>
