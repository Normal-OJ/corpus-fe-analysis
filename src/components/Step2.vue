<template>
  <v-container fluid style="min-height: 100vh; padding: 0 15vw;">

    <v-row>

      <v-col cols="8">
        <v-data-table
          v-if="items"
          :headers="headers"
          :items="items"
          hide-default-footer
          disable-pagination
        ></v-data-table>
      </v-col>


      <v-col cols="4">
        <v-row justify="center" class="my-6">
          <v-btn
            width="80%"
            color="info"
            :loading="!filename"
            :href="`http://noj.tw:55688/api/download?file=${filename}`"
          ><v-icon>mdi-download</v-icon>下載分析原始資料</v-btn>
        </v-row>
        <v-row justify="center" class="my-6">
          <v-btn
            width="80%"
            color="warning"
            @click="$emit('back')"
          >返回</v-btn>
        </v-row>
        <v-row justify="center" class="my-6">
          <v-btn
            width="80%"
            @click="alert = true"
          >重新分析</v-btn>
        </v-row>
      </v-col>

    </v-row>

    <br v-for="n in 15">

    <v-dialog v-model="alert" width="35vw">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text class="text-center text--primary">
          <v-icon color="warning" size="5rem">mdi-alert-circle-outline</v-icon>
          <p class="headline mt-3">確定要回到重新分析頁面嗎？</p>
          <p class="subtitle-1">您目前的分析資料將不會被保留。</p>
        </v-card-text>
        <v-card-actions class="pb-12">
          <v-spacer></v-spacer>
          <v-btn class="mx-3 subtitle-1" color="info" @click="alert = false; $emit('restart')">是</v-btn>
          <v-btn class="mx-3 subtitle-1" color="error" @click="alert = false">否</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import json from './step1.json'

export default {

  name: 'Step2',

  props: {
    data: {
      type: Object,
    },
    filename: {
      type: String,
      required: true,
    }
  },

  computed: {
    items() {
      if ( this.data ) {
        var temp = [];
        for ( const[key, value] of Object.entries(this.data) ) {
          temp.push({
            'name': this.indicator[key],
            'avg': value[0],
            'sd': value[1],
          });
        }
        return temp;
      }
      return null;
    }
  },

  data () {
    return {
      alert: false,
      headers: [
        {
          text: '語言指標',
          align: 'start',
          value: 'name', 
          class: 'text--primary subtitle-1 font-weight-bold',
        },
        { text: '平均', value: 'avg', class: 'text--primary subtitle-1 font-weight-bold' },
        { text: '標準差', value: 'sd', class: 'text--primary subtitle-1 font-weight-bold' },
      ],
      indicator: json.reindicator,
    }
  },

}
</script>

<style lang="css" scoped>
</style>
