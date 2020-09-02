<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-textarea
          v-model="text"
          placeholder="貼上文本"
          auto-grow
          outlined
          rows="10"
          @input="parseText"
          row-height="40"
        />
      </v-col>
      <v-col cols="5">
        <v-row v-for="(row, index) in splitText" :key="index" no-gutters>
          <v-col col="3">
            <v-combobox
              v-model="row.speaker"
              :items="speakers"
              placeholder="選取或輸入說話者"
              outlined
              @input="joinText"
              dense
              hide-details
            />
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="row.text"
              placeholder="輸入語句"
              outlined
              @input="joinText"
              dense
              hide-details
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-row justify="end">
          <v-btn @click="addLine" color="success">新增語句</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChaContentInput",
  data() {
    return {
      text: "",
      splitText: [{ speaker: "", text: "" }],
      hello: "",
    };
  },
  computed: {
    speakers() {
      const rows = this.text.split("\n");
      return [...new Set(rows.map((text) => text.split(":")[0]).concat(""))];
    },
  },
  methods: {
    // 把左側的文本 parse 成一行一行
    parseText() {
      const rows = this.text.split("\n");
      this.splitText = rows.map((text) => {
        if (!text) {
          return {
            speaker: "",
            text: "",
          };
        } else {
          const cuts = text.split(":");
          return {
            speaker: cuts[0],
            text: cuts.slice(1).join("").trim(),
          };
        }
      });
    },
    // 把右側的文本組成一行
    joinText() {
      this.text = this.splitText
        .map((text) => text.speaker + ":\t" + text.text)
        .join("\n");
    },
    // 按按鈕
    addLine() {
      this.text += "\n";
      this.splitText.push({
        speaker: "",
        text: "",
      });
    },
  },
};
</script>

<style>
</style>