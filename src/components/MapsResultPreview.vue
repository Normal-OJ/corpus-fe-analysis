<template>
  <v-container>
    <v-row dense justify = "start">
      <v-col md="4">
        <v-select
        v-model="selectedDisplayMode"
        :items="displayModeOptions"
        label="選擇結果呈現"
        ></v-select>
      </v-col>
      <!-- <v-col md="4">
        <v-select
          v-model="selectedKidId"
          :items="kidIdList"
          label="選擇Kid ID"
          ></v-select>
      </v-col> -->
      <!-- buttons -->
      <v-spacer></v-spacer>
      <v-col cols="12" md="3">
        <v-btn width="80%" color="info" :loading="!filename" @click="downloadAlert = true">
          <v-icon>mdi-download</v-icon>下載分析結果
        </v-btn>
      </v-col>
      <!-- <v-col cols="12" md="4">  
        <v-btn width="80%" color="warning" @click="$emit('back')">返回</v-btn>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn width="80%" @click="alert = true">重新分析</v-btn>
      </v-col> -->
    </v-row>
    <v-row justify = "center">
      <v-data-table
        :headers="displayedHeaders"
        :items="displayedItems"
        fixed-header
        hide-default-footer
        disable-pagination	
        item-key="index"
        class="elevation-1"
        height = "calc(100vh - 180px)"
        style= "width: 100%;"
        :dense="selectedDisplayMode === '各語句評分'"
      ></v-data-table>
    </v-row>

    <!-- padding = = -->
    <UiAlert
      v-model="downloadAlert"
      title="提醒"
      :subtitle="'確定要下載嗎？'"
      @ok="download"
    ></UiAlert>
  </v-container>
</template>

<script>
import UiAlert from '@/components/ui-alert';

export default {
  name: 'MapsResultPreview',
  components: {
    UiAlert,
  },
  props: {
    results:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      filename: null,
      resultsJson : null,
      selectedDisplayMode: '語法複雜度總分',
      // selectedKidId: null,
      // selectedItems: {},
      displayedItems: [],
      displayedHeaders: [],
      tableItems: [[
        {index: '指標1', metrics_catalog: '名詞短語', metrics_id: 'NP1', metrics: '量詞-個', item_score: 0, catalog_score: 0}, {index: '指標2', metrics_catalog: '名詞短語', metrics_id: 'NP2', metrics: '量詞-特定', item_score: 0, catalog_score: 0}, {index: '指標3', metrics_catalog: '名詞短語', metrics_id: 'NP3', metrics: 'X 的', item_score: 0, catalog_score: 0}, {index: '指標4', metrics_catalog: '名詞短語', metrics_id: 'NP4', metrics: 'X 的 Y', item_score: 0, catalog_score: 0}, {index: '指標5', metrics_catalog: '名詞短語', metrics_id: 'NP5', metrics: '方位', item_score: 0, catalog_score: 0}, {index: '指標6', metrics_catalog: '動詞短語', metrics_id: 'VP1', metrics: '體貌標記', item_score: 0, catalog_score: 0}, {index: '指標7', metrics_catalog: '動詞短語', metrics_id: 'VP2', metrics: '結果補語', item_score: 0, catalog_score: 0}, {index: '指標8', metrics_catalog: '動詞短語', metrics_id: 'VP3', metrics: '趨向補語', item_score: 0, catalog_score: 0}, {index: '指標9', metrics_catalog: '動詞短語', metrics_id: 'VP4', metrics: '情態補語', item_score: 0, catalog_score: 0}, {index: '指標10', metrics_catalog: '動詞短語', metrics_id: 'VP5', metrics: '可能補語', item_score: 0, catalog_score: 0}, {index: '指標11', metrics_catalog: '動詞短語', metrics_id: 'VP6', metrics: '數量補語', item_score: 0, catalog_score: 0}, {index: '指標12', metrics_catalog: '介詞短語', metrics_id: 'PP1', metrics: '動前介詞', item_score: 0, catalog_score: 0}, {index: '指標13', metrics_catalog: '介詞短語', metrics_id: 'PP2', metrics: '動後介詞', item_score: 0, catalog_score: 0}, {index: '指標14', metrics_catalog: '句子', metrics_id: 'S1', metrics: '把字句', item_score: 0, catalog_score: 0}, {index: '指標15', metrics_catalog: '句子', metrics_id: 'S2', metrics: '被字句', item_score: 0, catalog_score: 0}, {index: '指標16', metrics_catalog: '句子', metrics_id: 'S3', metrics: '存現句', item_score: 0, catalog_score: 0}, {index: '指標17', metrics_catalog: '句子', metrics_id: 'S4', metrics: '連動/兼語', item_score: 0, catalog_score: 0}, {index: '指標18', metrics_catalog: '句子', metrics_id: 'S5', metrics: '帶連詞複句', item_score: 0, catalog_score: 0}, {index: '指標19', metrics_catalog: '句子', metrics_id: 'S6', metrics: '緊縮複句', item_score: 0, catalog_score: 0}, {index: '指標20', metrics_catalog: '句子', metrics_id: 'S7', metrics: '感知/心理狀態主謂句', item_score: 0, catalog_score: 0}, {index: '類別總分', metrics_catalog: '名詞短語類', metrics_id: 'NP1+NP2+NP3+NP4+NP5', metrics: '', item_score: 0, catalog_score: 0}, {index: '', metrics_catalog: '動詞短語類', metrics_id: 'VP1+VP2+VP3+VP4+VP5+VP6', metrics: '', item_score: 0, catalog_score: 0}, {index: '', metrics_catalog: '介詞短語類', metrics_id: 'PP1+PP2', metrics: '', item_score: 0, catalog_score: 0}, {index: '', metrics_catalog: '句子類', metrics_id: 'S1+S2+S3+S4+S5+S6+S7', metrics: '', item_score: 0, catalog_score: 0}, {index: '總分', metrics_catalog: '語法複雜度', metrics_id: '所有20個指標的加總', metrics: '', item_score: 0, catalog_score: 0}
        ],[]
      ],
      tableHeaders: [
        [
          {
            text: 'Index',
            align:'center',
            value: 'index',
          },
          {text: '語法指標類別',value: 'metrics_catalog',},{text: '指標代碼',value: 'metrics_id',},{text: '指標',value: 'metrics',},{text: '項目總分',value: 'item_score',},{text: '類型總分',value: 'catalog_score',}
        ],
        [
          {
            text: 'Index  ',
            align:'center',
            value: 'index',
            width: '90px'
          },
          {text: '語句',value: '語句',width: '200px'},{text: '量詞-個 (NP1)',value: 'NP1',width: '90px', align:'center'},{text: '量詞-特定 (NP2)',value: 'NP2',width: '90px', align:'center'},{text: ' X 的 (NP3)',value: 'NP3',width: '85px', align:'center'},{text: ' X的Y (NP4)',value: 'NP4',width: '85px', align:'center'},{text: ' 方位 (NP5)',value: 'NP5',width: '85px', align:'center'},{text: '體貌標記 (VP1)',value: 'VP1',width: '90px', align:'center'},{text: ' 結果補語 (VP2)',value: 'VP2',width: '90px', align:'center'},{text: ' 趨向補語 (VP3)',value: 'VP3',width: '90px', align:'center'},{text: ' 情態補語 (VP4)',value: 'VP4',width: '90px', align:'center'},{text: ' 可能補語 (VP5)',value: 'VP5',width: '90px', align:'center'},{text: ' 數量補語 (VP6)',value: 'VP6',width: '90px', align:'center'},{text: ' 動前介詞 (PP1)',value: 'PP1',width: '90px', align:'center'},{text: ' 動後介詞 (PP2)',value: 'PP2',width: '90px', align:'center'},{text: ' 把 字 句 (S1)',value: 'S1',width: '90px', align:'center'},{text: ' 被 字 句 (S2)',value: 'S2',width: '90px', align:'center'},{text: ' 存 現 句 (S3)',value: 'S3',width: '90px', align:'center'},{text: '連動/兼語 (S4)',value: 'S4',width: '90px', align:'center'},{text: '帶連詞複句 (S5)',value: 'S5',width: '95px', align:'center'},{text: ' 緊縮複句 (S6)',value: 'S6', width: '90px', align:'center'},{text: '感知/心理狀態主謂句 (S7)',value: 'S7',width: '120px', align:'center'},
        ]
      ],
      displayModeOptions: [ '語法複雜度總分','各類別總分','各指標總分','所有加總分數','各語句評分'],
      downloadAlert: false,
    };
  },
  // computed:{
  //   resultsJson() {
  //     return JSON.parse(this.results);
  //   }
    // kids_data() { 
    //   return JSON.parse(this.results);
    // },
    // kidIdList() { 
    //   return Object.keys(this.kids_data);
    // }
  // },
  methods: {
    setTableDisplay(){
      this.displayedHeaders = this.tableHeaders[0]
      switch(this.selectedDisplayMode){
        case '各語句評分':
          this.displayedHeaders = this.tableHeaders[1]
          this.displayedItems = this.tableItems[1]
          break
        case '各類別總分':
          this.displayedItems = this.tableItems[0].slice(20,24)
          break
        case '各指標總分':
          this.displayedItems = this.tableItems[0].slice(0,20)
          break
        case '所有加總分數':
          this.displayedItems = this.tableItems[0]
          break
        default:
          this.displayedItems = this.tableItems[0].slice(24,25)
          break
      }
    },
    setItems() {
      this.selectedItems = this.resultsJson
      // this.selectedItems = this.kids_data[this.selectedKidId]
      
      this.tableItems[0] = this.tableItems[0].map((item, index) => ({
        ...item,
        item_score: this.selectedItems.Scores[index][0],
        catalog_score: this.selectedItems.Scores[index][1]
      }));

      this.tableItems[1] = this.selectedItems.Sentences.map(subArray => {
        return subArray.reduce((item, value, index) => {
          const key = this.tableHeaders[1][index].value;
          item[key] = value;
          return item;
        }, {});
      });

      this.setTableDisplay()
    },
    async download() {
      let rawBytes = null;
      try {
        rawBytes = (await this.$http.get(`/api/download?file=${this.filename}`)).data;
      } catch (err) {
        // TODO: pop error UI
        console.log(err);
        return;
      }
      const file = new Blob([rawBytes], { type: 'text/plain;charset=utf-8' });
      if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'report.csv');
      } else {
        // Others
        var a = document.createElement('a');
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'report.csv';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
  },
  watch: {
    // kidIdList() {
    //   if (this.kidIdList.length > 0) {
    //     this.selectedKidId = this.kidIdList[0];
    //   }
    // },
    selectedDisplayMode() {
      this.setTableDisplay();
    },
    
    results: {
      handler(newVal) {
        if (( newVal !== "")) {
          this.resultsJson = JSON.parse(newVal);
          this.filename = this.resultsJson.ExportFileDir;
          this.setItems();
        } else {
          this.resultsJson = null;
          this.filename = null;
        }
      },
    }
    // selectedKidId() {
    //   this.setItems();
    // }
  }
};
</script>

<style>
</style>
