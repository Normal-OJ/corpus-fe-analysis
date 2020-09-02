<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column" cols="6">
        <h2>Header 預覽</h2>
        <div class="flex-grow-1 pa-1 header-text">{{header}}</div>
      </v-col>
      <v-col cols="6">
        <h2>新增 ID</h2>
        <h3>名稱代號 (Name code)</h3>
        <v-text-field v-model="nameCode" placeholder="例如： CHI, MOT..."></v-text-field>
        <h3>年齡 (Age)</h3>
        <div>月、日不足兩碼請補 0，例如： 05、07</div>
        <v-row style="max-width: 50%">
          <v-col>
            <v-text-field v-model="age.year" placeholder="年"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="age.month" placeholder="月"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field v-model="age.day" placeholder="日"></v-text-field>
          </v-col>
        </v-row>
        <h3>性別 (Sex)</h3>
        <v-radio-group v-model="sex">
          <v-radio
            v-for="(_sex, value) in sexs"
            :key="value"
            class="mb-3"
            :label="value"
            :value="_sex"
          ></v-radio>
        </v-radio-group>
        <h3>角色 (Role)</h3>
        <v-select v-model="role" :items="roleChoices"></v-select>
        <v-row justify="end">
          <v-btn color="success" @click="addId()">新增 ID</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChaHeaderInput",
  props: {
    // array of cha ids
    ids: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    nameCode: "",
    age: {
      year: "",
      month: "",
      day: "",
    },
    sex: "",
    role: "",
    sexs: {
      男: "male",
      女: "female",
      未知: "unknown",
    },
    roleChoices: [
      "Target_child",
      "Target_adult",
      "Child",
      "Mother",
      "Father",
      "Brother",
      "Sister",
      "Sibling",
      "Grandfather",
      "Grandmother",
      "Relative",
      "Participant",
      "Investigator",
      "Partner",
      "Boy",
      "Girl",
      "Adult",
      "Teenager",
      "Male",
      "Female",
      "Visitor",
      "Friend",
      "Playmate",
      "Caretaker",
      "Environment",
      "Group",
      "Unidentified",
      "Uncertain",
      "Other",
      "Text",
      "Media",
      "PlayRole",
      "LENA",
      "Justice",
      "Attorney",
      "Doctor",
      "Nurse",
      "Student",
      "Teacher",
      "Host",
      "Guest",
      "Leader",
      "Member",
      "Narrator",
      "Speaker",
      "Audience",
    ],
  }),
  computed: {
    header() {
      return this.getHeader();
    },
  },
  methods: {
    getHeader() {
      let header = "@Begin\n@Language:\tzho\n";
      // Participants
      if (this.ids.length) {
        header += "@Participants:\t";
        let participants = [];
        for (let id of this.ids) {
          participants.push(`${id.nameCode} ${id.role}`);
        }
        header += participants.join(", ") + "\n";
      }
      // ID
      // format: language|corpus|code|age|sex|group|SES|role|education|custom|
      for (let id of this.ids) {
        let infos = [
          "zho",
          "",
          id.nameCode,
          this.formatAge(id.age),
          id.sex,
          "",
          "",
          id.role,
          "",
          "",
        ];
        header += `@ID:\t${infos.join("|")}|\n`;
      }
      return header;
    },
    formatAge(age) {
      let ret = age.year + ";";
      if (age.month) {
        ret += age.month + ".";
        if (age.day) ret += age.day;
      }
      return ret;
    },
    reset() {
      // clear values
      this.nameCode = "";
      this.age = {
        year: "",
        month: "",
        day: "",
      };
      this.sex = "unknown";
      this.role = "";
    },
    addId() {
      // add a new id
      this.ids.push({
        nameCode: this.nameCode,
        age: this.age,
        sex: this.sex,
        role: this.role,
      });
      this.reset();
    },
  },
  mounted() {
    this.reset();
  },
};
</script>

<style lang="css" scoped>
.header-text {
  border: 1px solid gray;
  white-space: pre-wrap;
  overflow-y: scroll;
  border-radius: 4px;
}
</style>