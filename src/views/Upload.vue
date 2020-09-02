<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 1" step="1">輸入 Chat 檔內容</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="step > 2" step="2">查看分析結果</v-stepper-step>
      <v-divider></v-divider>
    </v-stepper-header>
    <v-stepper-items style="padding: 0 15vw">
      <v-stepper-content step="1">
        <v-container>
          <ChaHeaderInput ref="chaHeader" :ids="ids"></ChaHeaderInput>
          <ChaContentInput ref="chaContent"></ChaContentInput>
          <v-row justify="end">
            <v-btn color="primary" @click="upload">繼續</v-btn>
          </v-row>
        </v-container>
      </v-stepper-content>
      <v-stepper-content step="2">
        <AnalysisResult @restart="restart" @back="step = step-1" :filename="analysis.filename">
          <v-data-table
            v-if="tableItems"
            :headers="headers"
            :items="tableItems"
            hide-default-footer
            disable-pagination
          ></v-data-table>
        </AnalysisResult>
      </v-stepper-content>
    </v-stepper-items>
    <v-snackbar v-model="snackbar" color="error">{{snackbarText}}</v-snackbar>
  </v-stepper>
</template>

<script>
import ChaContentInput from "@/components/ChaContentInput";
import ChaHeaderInput from "@/components/ChaHeaderInput";
import AnalysisResult from "@/components/AnalysisResult";
import chatArgs from "@/util/step1.json";

export default {
  name: "Upload",
  components: {
    ChaContentInput,
    ChaHeaderInput,
    AnalysisResult,
  },
  data: () => ({
    step: 1,
    snackbar: false,
    snackbarText: "",
    analysis: {
      results: [],
      filename: "",
    },
    ids: [],
    headers: [
      {
        text: "語言指標",
        align: "start",
        value: "name",
        class: "text--primary subtitle-1 font-weight-bold",
        width: "60%",
      },
      {
        text: "數值",
        value: "value",
        class: "text--primary subtitle-1 font-weight-bold",
        width: "40%",
      },
    ],
  }),
  computed: {
    tableItems() {
      if (!this.analysis.results) return null;
      let items = [];
      // get english and chinese name for each indicator
      for (const [en, ch] in Object.entries(chatArgs.reindicator)) {
        if (en in this.analysis.results) {
          items.push({
            name: ch,
            value: this.analysis.results[en],
          });
        }
      }
      return items;
    },
  },
  methods: {
    async upload() {
      // create file
      let content =
        this.$refs.chaHeader.header + this.$refs.chaContent.text + "\n@End";
      let file = new Blob([content], { type: "text/plain;charset=utf-8" });
      try {
        // get analysis result
        let resp = (
          await this.$http.post("/api/upload_detailed_kideval", {
            file: file,
            speakers: this.ids.map((id) => id.nameCode),
          })
        ).data;
        this.analysis.results = resp;
        this.analysis.filename = resp["filename"];
        this.step = 2;
        // scroll to top
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } catch (err) {
        // prompt snack bar
        this.snackbar = true;
        this.snackbarText = "分析失敗";
        console.log(err);
      }
    },
    restart() {
      this.ids = [];
      this.analysis = {
        results: [],
        filename: "",
      };
    },
  },
};
</script>

<style lang="css" scoped>
</style>