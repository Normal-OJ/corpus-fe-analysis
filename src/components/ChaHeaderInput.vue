<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <h2>Header 預覽</h2>
        <div style="border: 1px; white-space: pre-wrap">{{header}}</div>
      </v-col>
      <v-col cols="5">
        <h2>名稱代號 (Name code)</h2>
        <v-text-field :value="nameCode" hint="例如： CHI, MOT..."></v-text-field>
        <h2>年齡 (Age)</h2>
        <v-row style="max-width: 50%">
          <v-col>
            <v-text-field :value="age.year" hint="年"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field :value="age.month" hint="月"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field :value="age.day" hint="日"></v-text-field>
          </v-col>
        </v-row>
        <h2>性別 (Sex)</h2>
        <v-radio-group v-model="sex">
          <v-radio v-for="(sex, value) in sexs" :key="sex" class="mb-3" :label="sex" :value="value"></v-radio>
        </v-radio-group>
        <h2>角色 (Role)</h2>
        <v-select v-model="role" :items="roleChoices"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChaHeaderInput",
  data: () => ({
    nameCode: "",
    age: {
      year: "",
      month: "",
      day: "",
    },
    sex: "",
    role: "",
    // array of cha ids
    ids: [],
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

<style>
</style>