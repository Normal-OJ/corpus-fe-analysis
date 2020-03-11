<template>
  <v-container fluid style="min-height: 100vh; padding: 0 10vw;">

    <v-row>

      <v-col cols="12" md="8">
        <v-data-table
          v-if="items"
          :headers="headers"
          :items="items"
          hide-default-footer
          disable-pagination
        ></v-data-table>
      </v-col>


      <v-col cols="12" md="4">
        <v-row justify="center" class="my-6">
          <v-btn
            width="80%"
            color="info"
            :loading="!filename"
            @click="download"
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

    <UiAlert 
      v-model="alert" 
      title="確定要重新分析嗎？" 
      subtitle="您目前的分析資料將不會被保留。" 
      @ok="$emit('restart')"
    ></UiAlert>

  </v-container>
</template>

<script>
import json from './step1.json'
import UiAlert from '@/components/ui-alert'

export default {

  name: 'Step2',

  components: {
    UiAlert,
  },

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
            'avg': Math.round((value[0] + Number.EPSILON) * 100) / 100,
            'sd': Math.round((value[1] + Number.EPSILON) * 100) / 100,
            'size': value[2],
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
          width: '30%',
          sortable: false,
        },
        { text: '平均', value: 'avg', class: 'text--primary subtitle-1 font-weight-bold', width: '25%' },
        { text: '標準差', value: 'sd', class: 'text--primary subtitle-1 font-weight-bold', width: '25%' },
        { text: '有效筆數', value: 'size', class: 'text--primary subtitle-1 font-weight-bold', width: '20%' },
      ],
      indicator: json.reindicator,
      cache: null,
    }
  },

  methods: {
    download() {
      if ( this.cache ) {
        var file = new Blob([this.cache], { type: 'text/plain;charset=utf-8' });
        if (window.navigator.msSaveOrOpenBlob) { // IE10+
          window.navigator.msSaveOrOpenBlob(file, 'report.xls');
        }
        else { // Others
          var a = document.createElement("a");
          var url = URL.createObjectURL(file);
          a.href = url;
          a.download = 'report.xls';
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }
      } else {
        this.$http.get(`/api/download?file=${this.filename}`)
          .then((res) => {
            this.cache = res.data;
            this.download();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

  }
}
</script>

<style lang="css" scoped>
</style>
