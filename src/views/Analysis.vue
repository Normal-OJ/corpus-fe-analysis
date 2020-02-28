<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">選擇年齡、性別、情境</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2">選擇分析對象、語言指標</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">查看分析結果</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">

        <Step1 @next="step1"></Step1>

      </v-stepper-content>

      <v-stepper-content step="2">
        <Step2></Step2>

        <v-btn
          color="primary"
          @click="step = 3"
        >
          繼續
        </v-btn>

        <v-btn
          text
          @click="step = step-1"
        >
          返回
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <Step3></Step3>

        <v-btn
          color="warning"
        >
          重新分析
        </v-btn>

        <v-btn
          text
          @click="step = step-1"
        >
          返回
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Step1 from '@/components/Step1';
import Step2 from '@/components/Step2';
import Step3 from '@/components/Step3';

export default {

  name: 'Analysis',

  components: {
    Step1, Step2, Step3,
  },

  data () {
    return {
      step: 1,
    }
  },

  methods: {
    step1(data) {
      this.step = 2;
    }
  }
}
</script>

<style lang="css" scoped>
</style>