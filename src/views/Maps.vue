<template>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 1" step="1">MAPS-R說明</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">選擇上傳檔案</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">分析結果</v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-items style="padding: 0 15vw">
        <v-stepper-content step="1">
          <v-container fluid>
            <v-row justify="center">
                <template>
                  <div v-html="intro"></div>
                </template>
            </v-row>
            
            <v-row justify="center">
              <v-spacer />
                <v-col cols="2">
                  <v-row justify="center">
                    <v-btn 
                      color="primary" 
                      @click="
                        uploadByFile = true
                        step++;
                      "      
                    >上傳檔案分析</v-btn>
                  </v-row>
                </v-col>
                <v-col cols="1" align-self="center">
                  <v-row justify="center">
                    <div>或是</div>
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-row justify="center">
                    <v-btn 
                      color="primary" 
                      @click="
                        uploadByFile = false;
                        step++;
                      "
                    >免上傳試用</v-btn>
                  </v-row>
                </v-col>
              <v-spacer />
            </v-row>
            <br>
            <v-row justify="center">
                <template>
                  <div v-html="metricsTable"></div>
                </template>
            </v-row>
          </v-container>
        </v-stepper-content>
        
        <v-stepper-content step="2">
          <v-container>
            <v-btn dense color="primary" @click="step--">返回上一步</v-btn>
            <MapsFileInput 
              ref="fileInput" 
              @upload-file="File" 
              :byUpload="uploadByFile">
            </MapsFileInput>
            <v-btn color="warning" @click="upload">開始分析</v-btn>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container>
            <v-btn dense color="primary" @click="alert = true">返回上一步</v-btn>
            <MapsResultPreview :results="resultsJson"></MapsResultPreview>
            <UiAlert
              v-model="alert"
              title="確定要重新分析嗎？"
              subtitle="您目前的分析資料將不會被保留。"
              @ok="restart"
            ></UiAlert>
            <!-- <v-btn color="primary" @click="restart">分析其他檔案</v-btn> -->
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
      <v-snackbar v-model="snackbar" color="error">{{ snackbarText }}</v-snackbar>
    </v-stepper>
  </template>
  
  <script>
  import MapsFileInput from '@/components/MapsFileInput';
  import MapsResultPreview from '@/components/MapsResultPreview';
  import Maps_intro from '@/util/Maps_intro';
  import UiAlert from '@/components/ui-alert';

  
  export default {
    name: 'Maps',
    components: {
      MapsFileInput,
      MapsResultPreview,
      UiAlert,
    },
    data: () => ({
      uploadByFile: true,
      intro: Maps_intro.introduction,
      metricsTable: Maps_intro.metrics_table,
      file: null,
      step: 1,
      snackbar: false,
      snackbarText: '',
      resultsJson: "",
      alert: false
    }),
    methods: {
      // @param {File} file  
      segError(message){
        this.snackbar = true
        this.snackbarText = message
      },

      async File( file ) {
      this.file = file;
      //console.log(this.seg);
    },

      // core upload function
      async upload() {
        // prepare payload
        if (!this.file){
          this.segError("請選擇並上傳檔案");
          return
        }
          // formData.append('Speaker', this.speaker);
        try {
          if(this.uploadByFile){
            let formData = new FormData();
            formData.append('file', this.file);
            // get analysis result
            let resp = (
              await this.$http.post('/api/maps_analysis', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Filename': this.file.name,
                },
              })
            ).data;
            this.resultsJson = JSON.stringify(resp);
          }
          else{
            let resp = (
              await this.$http.get(`/api/maps_test?file=${this.file}`)
            ).data;
            this.resultsJson = JSON.stringify(resp);
          }
        } catch (err) {
          this.segError("分析失敗");
          this.step--;
          return;
        }
        // continue to next step
        this.step++;
        // scroll to top
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      restart() {
        this.step--;
        this.file = null;
        this.resultsJson = ""
        this.$refs.fileInput.reset()
      },
    },
  };
  </script>
  
  <style lang="css" scoped></style>
  