<template>
  <v-container>
    <h1>手動輸入表頭 (Header)</h1>

    <h2>表頭 (Header) 預覽</h2>
    <v-textarea
      v-model="header"
      class="flex-grow-1 pa-1 header-text"
      :style="{ fontFamily: 'monospace' }"
      outlined
      @keydown.tab.prevent="appendTabToHeader($event)"
    />

    <v-row>
      <v-col col="12" md="6">
        <h2>編輯 ID</h2>
        <v-select
          ref="speakerSelect"
          v-model="selectedName"
          label="選擇說話者"
          :items="speakerNames"
          @change="changeSpeaker"
        />
      </v-col>
      <v-col col="12" md="6">
        <v-row justify="space-around">
          <v-btn color="red" dark @click="deleteId()">刪除 ID</v-btn>
          <v-btn color="primary" @click="addId()">新增 ID</v-btn>
          <v-btn color="primary" @click="getHeader()">更新表頭</v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h3>說話者名稱 (Name code)</h3>
        <v-text-field v-model="selectedName" outlined placeholder="例如： CHI, MOT..." dense />

        <h3>完整名稱 (Optional speaker name)</h3>
        <v-text-field v-model="speaker.name" outlined dense />

        <h3>語言 (Language)</h3>
        <v-combobox
          v-model="speaker.language"
          placeholder="例如： zho"
          :items="languageChoices"
          outlined
          dense
        />

        <h3>語料名稱 (Corpus name)</h3>
        <v-text-field v-model="speaker.corpus" outlined dense />

        <h3>年齡 (Age)</h3>
        <div>月、日不足兩碼請補 0，例如： 05、07</div>
        <v-row>
          <v-col>
            <v-text-field outlined v-model="speaker.age.y" placeholder="年" dense />
          </v-col>
          <v-col>
            <v-text-field outlined v-model="speaker.age.m" placeholder="月" dense />
          </v-col>
          <v-col>
            <v-text-field outlined v-model="speaker.age.d" placeholder="日" dense />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
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
            <v-select outlined v-model="speaker.race" :items="raceChoices" dense />
          </v-col>
          <v-col>
            <h3>社經地位 (SES)</h3>
            <v-select outlined v-model="speaker.SES" :items="SESChoices" dense />
          </v-col>
        </v-row>

        <h3>組別 (Group)</h3>
        <v-text-field v-model="speaker.group" outlined dense />

        <h3>角色 (Role)</h3>
        <v-select v-model="speaker.role" :items="roleChoices" outlined dense />

        <h3>教育程度 (Education)</h3>
        <v-text-field v-model="speaker.education" outlined dense />

        <h3>其他所需資訊 (Custom field)</h3>
        <v-text-field v-model="speaker.customField" outlined dense />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SpeakerInput from "@/components/SpeakerInput";
import {
  Speaker,
  languageChoices,
  roleChoices,
  raceChoices,
  SESChoices,
  educationChoices,
  sexChoices,
} from "@/util/speaker";

export default {
  name: "ChaHeaderInput",
  computed: {
    speakerNames() {
      return this.$store.state.speakers.map((speaker) => speaker.nameCode);
    },
  },
  data: () => ({
    header: "",
    speaker: new Speaker(),
    selectedName: "",
    oldNameCode: "",
    languageChoices,
    roleChoices,
    raceChoices,
    SESChoices,
    educationChoices,
    sexChoices,
  }),
  methods: {
    changeSpeaker(nameCode) {
      for (let speaker of this.$store.state.speakers) {
        if (speaker.nameCode === nameCode) {
          this.speaker = speaker;
          break;
        }
      }
    },
    getHeader() {
      // split original header into lines
      let headerLines = this.header.split(/[\r?\n]/g);
      // keep headers except ID, Participants, empty line
      let keepLines = headerLines.filter(
        (line) => line && !line.match(/^@(ID|Participants):/g)
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
    deleteId() {
      let speakers = this.$store.state.speakers;
      let removeIndex = 0;
      // find current speaker and remove it
      for (let i in speakers) {
        if (speakers[i].nameCode === this.speaker.nameCode) {
          speakers.splice(i, 1);
          removeIndex = i;
          break;
        }
      }
      this.$store.dispatch("setSpeakers", speakers);
      this.keepSpeakers();
      // update selected speaker
      speakers = this.$store.state.speakers;
      if (removeIndex >= speakers.length) {
        removeIndex = speakers.length - 1;
      }
      this.selectedName = speakers[removeIndex].nameCode;
    },
    /**
     * add a new speaker to cha file
     */
    addId() {
      // add a new id
      let speakers = this.$store.state.speakers;
      // spawn a new speaker
      let newSpeaker = new Speaker();
      newSpeaker.nameCode = `SP${this.$store.state.speakers.length}`;
      speakers.push(newSpeaker);
      this.$store.dispatch("setSpeakers", speakers);
      // update selection and header
      this.$refs.speakerSelect.value = newSpeaker.nameCode;
      this.getHeader();
    },
    // FIXME: caret index will at the line end after insert
    appendTabToHeader(event) {
      let startText = this.header.slice(0, event.target.selectionStart);
      let endText = this.header.slice(event.target.selectionStart);
      this.header = `${startText}\t${endText}`;
    },
    /**
     *  make the spakers array at least contain one element
     */
    keepSpeakers() {
      if (this.$store.state.speakers.length === 0) {
        let newSpeaker = new Speaker();
        newSpeaker.nameCode = "SP0";
        this.$store.dispatch("setSpeakers", [newSpeaker]);
        this.selectedName = "SP0";
      }
    },
  },
  mounted() {
    this.keepSpeakers();
  },
  watch: {
    selectedName(name) {
      this.oldNameCode = name;
      this.changeSpeaker(name);
      this.speaker.nameCode = name;
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
