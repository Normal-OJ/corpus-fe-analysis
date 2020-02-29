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
        <Step1 @next="step1" :data="data" :loading="loading"></Step1>
      </v-stepper-content>

      <v-stepper-content step="2">
        <Step2 @next="step2" @back="step = step-1" @restart="restart"
               :filename="filename" :indicator="data.indicator" :data="items" 
        ></Step2>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';

export default {

  name: 'Analysis',

  components: {
    Step1, Step2,
  },

  data() {
    return {
      step: 1,
      loading: false,
      items: null,
      filename: '',

      data: {
        ages: [],
        sex: [],
        speaker: [],
        context: [],
        indicator: [],
      },
    }
  },

  methods: {
    step1(data) {
      this.loading = true;
      this.$http.post('/api/option_kideval', data)
        .then((res) => {
          this.items = res.data;
          this.filename = this.items['filename'][0];
          delete this.items['filename'];
          this.loading = false;
          this.step = 2;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        })
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>