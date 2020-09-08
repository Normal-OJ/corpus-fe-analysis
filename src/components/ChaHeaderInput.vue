<template>
  <v-container>
    <h1>手動輸入標頭檔和文本</h1>
    <v-row>
      <v-col cols="6">
        <h2>新增 ID</h2>
        <!-- i can not bind the data.. -->
        <!-- <SpeakerInput v-bind.sync="speaker"></SpeakerInput> -->
        <v-container>
          <h3>名稱代號 (Name code)</h3>
          <v-text-field v-model="speaker.nameCode" outlined placeholder="例如： CHI, MOT..." dense />

          <h3>名稱 (Name)</h3>
          <v-text-field v-model="speaker.name" outlined dense />

          <h3>語言 (Language)</h3>
          <v-text-field v-model="speaker.language" outlined dense />

          <h3>語料庫名稱 (Corpus Name)</h3>
          <v-text-field v-model="speaker.corpus" outlined dense />

          <h3>年齡 (Age)</h3>
          <div>月、日不足兩碼請補 0，例如： 05、07</div>
          <v-row>
            <v-col>
              <v-text-field outlined v-model="speaker.age.year" placeholder="年" dense />
            </v-col>
            <v-col>
              <v-text-field outlined v-model="speaker.age.month" placeholder="月" dense />
            </v-col>
            <v-col>
              <v-text-field outlined v-model="speaker.age.day" placeholder="日" dense />
            </v-col>
          </v-row>

          <h3>性別 (Sex)</h3>
          <v-radio-group row v-model="speaker.sex">
            <v-radio
              v-for="(_sex, value) in sexChoices"
              :key="value"
              class="mb-3"
              :label="value"
              :value="_sex"
            ></v-radio>
          </v-radio-group>

          <v-row>
            <v-col>
              <h3>種族 (Race)</h3>
              <v-select outlined v-model="speaker.race" :items="raceChoices" dense></v-select>
            </v-col>
            <v-col>
              <h3>社經程度 (SES)</h3>
              <v-select outlined v-model="speaker.SES" :items="SESChoices" dense></v-select>
            </v-col>
          </v-row>

          <h3>團體 (Group)</h3>
          <v-text-field v-model="speaker.group" outlined dense />

          <h3>角色 (Role)</h3>
          <v-select v-model="speaker.role" :items="roleChoices" outlined dense></v-select>

          <h3>教育程度 (Education)</h3>
          <v-text-field v-model="speaker.education" outlined dense />
        </v-container>

        <v-row justify="end">
          <v-btn color="primary" @click="addId()">新增 ID</v-btn>
        </v-row>
      </v-col>
      <v-col class="d-flex flex-column" cols="6">
        <h2>Header 預覽</h2>
        <v-textarea
          v-model="header"
          class="flex-grow-1 pa-1 header-text"
          :style="{ fontFamily: 'monospace' }"
          outlined
          @keydown.tab.prevent="appendTabToHeader($event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SpeakerInput from "@/components/SpeakerInput";
import {
  Speaker,
  roleChoices,
  raceChoices,
  SESChoices,
  educationChoices,
  sexChoices,
} from "@/util/speaker";

export default {
  name: "ChaHeaderInput",
  components: {
    // SpeakerInput,
  },
  data: () => ({
    header: "",
    speaker: new Speaker(),
    roleChoices,
    raceChoices,
    SESChoices,
    educationChoices,
    sexChoices,
  }),
  methods: {
    getHeader() {
      // split original header into lines
      let headerLines = this.header.split(/[\r?\n]/g);
      // keep headers except ID and Participants
      let keepLines = headerLines.filter(
        (line) => !line.match(/^@(ID|Participants):/g)
      );
      let speakers = this.$store.state.speakers;
      // Participants
      if (speakers.length) {
        let participants = [];
        for (let speaker of speakers) {
          participants.push(
            `${speaker.nameCode || ""} ${speaker.name} ${speaker.role || ""}`
          );
        }
        let participantsHeader = `@Participants:\t${participants.join(", ")}`;
        keepLines.push(participantsHeader);
      }
      // ID
      for (let speaker of speakers) {
        keepLines.push(speaker.header);
      }
      this.header = keepLines.join("\n");
    },
    reset() {
      this.speaker = new Speaker();
    },
    /**
     * add a new speaker to cha file
     */
    addId() {
      for (let speaker of this.$store.state.speakers) {
        if (speaker.nameCode === this.speaker.nameCode) {
          throw "duplicated speaker name code";
        }
      }
      // add a new id
      let speakers = this.$store.state.speakers;
      speakers.push(this.speaker);
      this.$store.dispatch("setSpeakers", speakers);
      // reset page
      this.reset();
      this.getHeader();
    },
    // FIXME: caret index will at the line end after insert
    appendTabToHeader(event) {
      let startText = this.header.slice(0, event.target.selectionStart);
      let endText = this.header.slice(event.target.selectionStart);
      this.header = `${startText}\t${endText}`;
    },
  },
};
</script>

<style lang="css" scoped>
/* .header-text {
  border: 1px solid gray;
  white-space: pre-wrap;
  overflow-y: scroll;
  border-radius: 4px;
} */
</style>
