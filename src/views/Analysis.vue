<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">選擇年齡、性別、情境</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">選擇分析對象、語言指標</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">查看分析結果</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <Step1></Step1>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          繼續
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          繼續
        </v-btn>

        <v-btn
          text
          @click="e1 = e1-1"
        >
          返回
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="warning"
        >
          重新分析
        </v-btn>

        <v-btn
          text
          @click="e1 = e1-1"
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

  data () {
    return {
      e1: 1,
    }
  }
}
</script>

<style lang="css" scoped>
</style>