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
        <Step1 @next="step1"></Step1>
      </v-stepper-content>

      <v-stepper-content step="2">
        <Step2 @next="step2" @back="step = step-1"></Step2>
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
    }
  },

  methods: {
    step1(data) {
      this.step = 2;
    },
    step2(data) {
    },
  }
}
</script>

<style lang="css" scoped>
</style>