<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-divider></v-divider>

      <v-stepper-step :complete="step > 1" step="1">選擇分析條件</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">查看分析結果</v-stepper-step>

      <v-divider></v-divider>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <FileFilter @next="step1" :data="data" :loading="loading" :fileMode="file"></FileFilter>
      </v-stepper-content>

      <v-stepper-content step="2">
        <AnalysisResult
          @restart="restart"
          @back="step = step-1"
          :filename="filename"
          :indicator="data.indicator"
          :data="items"
        ></AnalysisResult>
      </v-stepper-content>
    </v-stepper-items>

    <v-snackbar v-model="snackbar" color="error">{{snackbarText}}</v-snackbar>
  </v-stepper>
</template>

<script>
import FileFilter from "@/components/FileFilter";
import AnalysisResult from "@/components/AnalysisResult";

export default {
  name: "Analysis",

  components: {
    FileFilter,
    AnalysisResult,
  },

  data() {
    return {
      step: 1,
      loading: false,
      items: null,
      filename: "",
      data: {
        ages: [],
        sex: [],
        speaker: [],
        context: [],
        indicator: [],
      },
      snackbar: false,
      snackbarText: "",
    };
  },

  computed: {
    file() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      const myParam = this.$route.params.file;
      if (myParam !== "none") {
        this.data["file"] = [myParam];
        return true;
      }
      this.restart();
      return false;
    },
  },

  methods: {
    step1(data) {
      this.loading = true;
      this.$http
        .post(`/api/${this.file ? "path" : "option"}_kideval`, data)
        .then((res) => {
          this.items = res.data;
          this.filename = this.items["filename"][0];
          delete this.items["filename"];
          this.loading = false;
          this.step = 2;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            // not file filtered
            this.snackbarText = "語料庫無符合搜尋條件之語料";
          } else {
            // unhandled errors
            this.snackbarText = "分析失敗";
          }
          this.snackbar = true;
          this.loading = false;
        });
    },
    restart() {
      this.data = {
        ages: [],
        sex: [],
        speaker: [],
        context: [],
        indicator: [],
      };
      this.step = 1;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="css" scoped>
</style>