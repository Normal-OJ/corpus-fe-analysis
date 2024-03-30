<template>
  <v-container>
    <h2>檔案上傳</h2>
    
    <v-form ref="form">
      <div v-if="byUpload">
        <div>
          <p>
            請以txt檔上傳做MAPS-R分析，每一行存放一句語句，不須添加索引、欄位名...等等標籤。
            選擇檔案後並點選上傳檔案，確認檔案已上傳後，請勾選同意聲明並點擊開始分析。
            每 100 句語句約需要一至兩分鐘的分析時間，請耐心等候！
          </p>
        </div>
        <v-file-input
          v-model="file"
          class="my-2"
          accept=".txt"
          label="請選擇你的 txt檔"
          clearable
          :rules="[v => !!v || '請上傳檔案']"
        ></v-file-input>
        <div>
          <h4>同意聲明</h4>
          <p>
            您所上傳之語料檔案僅進行語言樣本線上分析，本系統不做其他使用。
            <br />
            上傳之語料檔案在線上分析結束後將會移除，本系統不具儲存與保管責任。倘若您的語料內含重要個資或資訊，
            建議您保留原始檔案或或改採其他語言樣本分析，以減少不必要之困擾。
          </p>
        </div>
        <v-checkbox
          v-model="isAgreed"
          :rules="[v => v || '您需要同意上述說明以進行線上分析。']"
          label="本人已詳細閱讀上述內容，同意上述說明並願意進行線上分析。"
        />
      </div>
      <div v-else>
        <v-select
          v-model="selectedFile"
          :items="selectedFileList"
          label="選擇系統預設檔案試用MAPS-R"
        ></v-select>
        <div>
          <h4>檔案預覽:</h4>
          <v-data-table
            dense
            :headers="previewHeader"
            :items="previewItem[selectedFile]"
            fixed-header
            hide-default-footer
            disable-pagination	
            class="elevation-1"
            height = 25vh
            style= "width: 50%;"
          ></v-data-table>
        </div>
      </div>
      <v-btn 
        class="mt-4"
        color="primary"
        @click="submit"
      >上傳檔案</v-btn>&nbsp;
      <p>已上傳檔案: {{ lastSubmittedFile }}</p>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'MapsFileInput',

  props: {
    byUpload:{
      type: Boolean,
      required: true,
    }
  },

  data: () => ({
    file: null,
    selectedFile: "",
    selectedFileList: [ 'SampleInputFile1','SampleInputFile2','SampleInputFile3'],
    isAgreed: false,
    lastSubmittedFile: "尚未上傳檔案",

    previewHeader:[{text: "語句編號",align: 'center',value: 'index',width: '100px'}, {text: "語句內容",value: 'content',}	],
    previewItem:{
      "SampleInputFile1":[{index:'1',content:'這 個 欸 !'} , {index:'2',content:'我 要 變成 一 個 城堡 .'} , {index:'3',content:'兩 塊 城堡 .'} , {index:'4',content:'有 城堡 .'} , {index:'5',content:'這 是 他 的 .'} , {index:'6',content:'很 高 .'} , {index:'7',content:'大 的 喔 !'} , {index:'8',content:'沒關係 .'} , {index:'9',content:'我 蓋 的 城堡 也 不 小心 就 用 倒 .'} , {index:'10',content:'我 只 要 跟 你 說 個 規矩 .'} , {index:'11',content:'就 跟 你 玩 個 遊戲 .'} , {index:'12',content:'然後 還 可以 這樣 一起 蓋 上去 .'} , {index:'13',content:'蓋 在 城堡 的 上面 .'} , {index:'14',content:'可以 蓋 這樣子 .'} , {index:'15',content:'然後 還 可以 這樣 .'} , {index:'16',content:'還 有 這 個 要 蓋 .'} , {index:'17',content:'越 疊 越 高 .'} , {index:'18',content:'還 要 一 個 長長 的 .'} , {index:'19',content:'長 的 在 上 .'} , {index:'20',content:'都 很 下面 .'} , {index:'21',content:'這 個 我 看 一下 .'} , {index:'22',content:'就 可以 蓋 上去 .'} , {index:'23',content:'他 就 是 這麼 高 .'} , {index:'24',content:'耶 過關 !'} , {index:'25',content:'我 要 把 他 一起 蓋 上去 .'} , {index:'26',content:'我 只是 以為 蓋好 了 但 還 沒 好 .'} , {index:'27',content:'你 要 照 著 我 的 方法 出來 用 .'} , {index:'28',content:'蓋好 了 .'} , {index:'29',content:'可以 蓋 剩 的 屋子 了 .'} , {index:'30',content:'這 是 東西 .'} , {index:'31',content:'這 也 是 一 個 裡面 的 東西 .'} , {index:'32',content:'我 要 蓋 另外 一 個 城堡 .'} , {index:'33',content:'另外 一 個 城堡 比較 困難 .'} , {index:'34',content:'我 來 蓋 就 好 了 .'} , {index:'35',content:'我 來 比較 簡單 .'} , {index:'36',content:'這 是 小 城堡 .'} , {index:'37',content:'這 是 電梯 .'} , {index:'38',content:'可以 移動 .'} , {index:'39',content:'這 綠色 .'} , {index:'40',content:'這 兩 個 都 可以 爬 上去 走 一 走.'} , {index:'41',content:'這 才 是 真正 .'} , {index:'42',content:'有 一 樓 一直 走 .'} , {index:'43',content:'二 樓 可以 走 .'} , {index:'44',content:'三 樓 可以 走 .'} , {index:'45',content:'四 樓 也 可以 走 .'} , {index:'46',content:'五 樓 也 可以 走 .'} , {index:'47',content:'六 樓 也 可以 走 .'} , {index:'48',content:'七 樓 也 可以 走 .'} , {index:'49',content:'八 樓 也 可以 走 .'} , {index:'50',content:'九 樓 也 可以 走 .'} , {index:'51',content:'十 樓 也 可以 走 .'} , {index:'52',content:'十一 樓 也 可以 走 .'} , {index:'53',content:'十二 樓 也 可以 走 .'} , {index:'54',content:'十三 樓 也 可以 走 .'} , {index:'55',content:'這 個 是 一 樓 電梯 .'} , {index:'56',content:'那 種 不 是 屋頂 .'} , {index:'57',content:'這 只 是 逛街 的 地方 .'} , {index:'58',content:'有 一 樓 二 樓 三 樓 四 樓 五 樓 六 樓 七 樓 .'} , {index:'59',content:'很 早 就 這樣 .'} , {index:'60',content:'不如 再 蓋 更 高 更 高 更 高 的 .'} , {index:'61',content:'會 太 小 .'} , {index:'62',content:'要 超 高 的 .'} , {index:'63',content:'超 高 的 .'} , {index:'64',content:'還有 一 個 屋頂 .'} , {index:'65',content:'屋頂 是 最後 蓋 的 .'} , {index:'66',content:'這 也 是 個 .'} , {index:'67',content:'我 可以 保證 他 不 會 倒 .'} , {index:'68',content:'會 倒 啊 .'} , {index:'69',content:'會 倒 .'} , {index:'70',content:'所以 不要 .'} , {index:'71',content:'放 的 下 .'} , {index:'72',content:'沒事 .'} , {index:'73',content:'這 只 是 一 個 公車 .'} , {index:'74',content:'沒關係 那 個 不 放 .'} , {index:'75',content:'這 個 只 有 三 樓 而已 .'} , {index:'76',content:'這 也 是 可以 逛街 的 地方 !'} , {index:'77',content:'超 高 的 對 不 對 ?'} , {index:'78',content:'下面 有 玩具 .'} , {index:'79',content:'上面 也 有 你 的 衣服 .'} , {index:'80',content:'這裡 .'} , {index:'81',content:'那 個 嗎 ?'} , {index:'82',content:'遊戲 娃娃 .'} , {index:'83',content:'打球 來 了 .'} , {index:'84',content:'維尼 .'} , {index:'85',content:'忘 了 .'} , {index:'86',content:'小 豬 .'} , {index:'87',content:'不 可以 .'} , {index:'88',content:'我 手 伸 不 進去 .'} , {index:'89',content:'因為 你 的 手 比較 大 .'} , {index:'90',content:'森林 醫院 .'} , {index:'91',content:'兩 個 .'} , {index:'92',content:'手 牽 手 一起 去 醫院 .'} , {index:'93',content:'你 肚子 有 脹氣 .'} , {index:'94',content:'我 可以 把 你 帶 去 醫院 的'} , {index:'95',content:'隔壁 .'} , {index:'96',content:'我 要 帶 你 去 別 的 地方 .'} , {index:'97',content:'你 有 流血 嗎 ?'} , {index:'98',content:'那 你 有 哪裡 不 舒服 ?'} , {index:'99',content:'我 幫 你 打針 .'} , {index:'100',content:'我 給 你 吃 藥 .'}],
      "SampleInputFile2":[{index:'1',content:'這 個 .'} , {index:'2',content:'這 是 什麼 啊 ?'} , {index:'3',content:'啊 這 個 可以 打開 耶 .'} , {index:'4',content:'這 是 打針 !'} , {index:'5',content:'這 是 剪'} , {index:'6',content:'這 是 切 .'} , {index:'7',content:'那 這 個 是 什麼 ?'} , {index:'8',content:'溫度計 .'} , {index:'9',content:'嘴巴 放 進去 會 髒髒 .'} , {index:'10',content:'這 可以 打開 嗎 ?'} , {index:'11',content:'幫 我 打開 .'} , {index:'12',content:'打開 .'} , {index:'13',content:'這 裡面 沒有 ad 的 擦 藥 欸 .'} , {index:'14',content:'這 只是 可以 這樣 抹 一 抹 .'} , {index:'15',content:'抹 在 手上 .'} , {index:'16',content:'貼紙 .'} , {index:'17',content:'貼貼 啊 .'} , {index:'18',content:'這 是 小熊維尼 .'} , {index:'19',content:'你好 .'} , {index:'20',content:'換 你 .'} , {index:'21',content:'你 當 小熊維尼 .'} , {index:'22',content:'我 今天 頭痛 了 .'} , {index:'23',content:'是 他 嗎 ?'} , {index:'24',content:'這 是 什麼 ?'} , {index:'25',content:'我 是 福 醫生 .'} , {index:'26',content:'打針 .'} , {index:'27',content:'是 他 .'} , {index:'28',content:'還 沒 先 看 這個 .'} , {index:'29',content:'媽媽 先 幫 我 把 這 個 轉 轉 轉 .'} , {index:'30',content:'關 起來 .'} , {index:'31',content:'那 個 擦 藥 的 呢 ?'} , {index:'32',content:'我 不 喜歡 玩 這 個 .'} , {index:'33',content:'啊 換 我 當 福 醫師 .'} , {index:'34',content:'擦 藥 .'} , {index:'35',content:'你 說 誰 要 回家 了 ?'} , {index:'36',content:'媽媽 這 給 你 .'} , {index:'37',content:'我 是 不小心 用 打針 的 .'} , {index:'38',content:'我 是 不小心 用 大聲 的 .'} , {index:'39',content:'不要 等 一下 再 收 .'} , {index:'40',content:'等 一下 .'} , {index:'41',content:'不 行 不 行 !'} , {index:'42',content:'不 想 玩 了 .'} , {index:'43',content:'我 不 想 玩 啦 .'} , {index:'44',content:'我 不 想 玩 這 個 了 .'} , {index:'45',content:'我 要 玩 別 的 了 .'} , {index:'46',content:'這 個 要 怎麼 做 啊 ?'} , {index:'47',content:'這 太 小 了 公主 進 不 去 .'} , {index:'48',content:'太 小 了 .'} , {index:'49',content:'媽媽 你 快 試試 看 .'} , {index:'50',content:'跟 我 一起 做 一 個 .'} , {index:'51',content:'你 看 !'} , {index:'52',content:'我 需要 一 個 這 個 拜託 .'} , {index:'53',content:'他 就 不小心 撞 到 他 就 這樣 了 啊 .'} , {index:'54',content:'然後 他 這 要 慢慢'} , {index:'55',content:'換 你 .'} , {index:'56',content:'你 用 這 個 就 好 了 .'} , {index:'57',content:'好 可以 你 用 這 個 !'} , {index:'58',content:'用 啊 快點 啊 .'} , {index:'59',content:'這樣 還 沒有 夠 高 .'} , {index:'60',content:'要 用 別 的 .'} , {index:'61',content:'用 這 個 還有 這 個 .'} , {index:'62',content:'這 個 城堡 大 .'} , {index:'63',content:'再來 !'} , {index:'64',content:'這 像 機器人 .'} , {index:'65',content:'還 沒 .'} , {index:'66',content:'我 先 把 這 拿 下來 .'} , {index:'67',content:'我 是 不小心 用 掉 的 你 知道 嗎 ?'} , {index:'68',content:'我 是 不小心 弄 掉 的 .'} , {index:'69',content:'我 要 個 紅紅 的 .'} , {index:'70',content:'我 要 做 我 自己 的 城堡 .'} , {index:'71',content:'你 做 你 自己 的 城堡 .'} , {index:'72',content:'你 也 可以 做 你 的 城堡 啊 .'} , {index:'73',content:'你 是 公主 .'} , {index:'74',content:'我 也 是 公主 .'} , {index:'75',content:'掉 下來 了 掉 下來 了 .'} , {index:'76',content:'我 想 要 借 你 的 .'} , {index:'77',content:'這 給 你 玩 .'} , {index:'78',content:'這些 給 我 .'} , {index:'79',content:'給 你 玩 .'} , {index:'80',content:'一 個 再 給 我 拜託 一 個 再 給 我 .'} , {index:'81',content:'看 誰 做完 就 贏 了 .'} , {index:'82',content:'快點 我 快 贏 了 .'} , {index:'83',content:'我 贏 了 .'} , {index:'84',content:'城堡 啊 .'} , {index:'85',content:'這 是 城堡 .'} , {index:'86',content:'這 太 小 了公主 進 不 去 .'} , {index:'87',content:'進 得 去 .'} , {index:'88',content:'有 一 隻 小小 人 .'} , {index:'89',content:'我 先 來 救救 我 的 .'} , {index:'90',content:'雖然 小小 人 進 不 去 但是 這 個 關 起來 了 .'} , {index:'91',content:'沒辦法 .'} , {index:'92',content:'他 只能 關 起來 .'} , {index:'93',content:'我 正在 做 啊 .'} , {index:'94',content:'你 先 做 你 自己 的 啊 .'} , {index:'95',content:'我 跟 你 比較 高 欸 .'} , {index:'96',content:'我 跟 你 的 城堡 比較 高 .'} , {index:'97',content:'他 是 自己 會 掉 下來 .'} , {index:'98',content:'欸 要 做成 城堡 啊 .'} , {index:'99',content:'不 行 要 做成 城堡 .'} , {index:'100',content:'你 做 城堡 !'} ],
      "SampleInputFile3":[{index:'1',content:'然後 裝 這 個 .'} , {index:'2',content:'之後 再 一 個 人 .'} , {index:'3',content:'再 一 個 人 .'} , {index:'4',content:'只 能 再 兩 個 人 .'} , {index:'5',content:'再 兩 個 人 很 多 人 喔 .'} , {index:'6',content:'歡迎 .'} , {index:'7',content:'這 兩 個 是 這 樣 不 一樣 .'} , {index:'8',content:'合 起來 .'} , {index:'9',content:'再 兩 個 人 .'} , {index:'10',content:'再 兩 個 人 喔 .'} , {index:'11',content:'這邊 再 兩 個 人 .'} , {index:'12',content:'這邊 再 做 .'} , {index:'13',content:'芒果青 芒果青 車子 .'} , {index:'14',content:'我 們 在 玩 玩具 欸 .'} , {index:'15',content:'媽媽 脫 鞋子 .'} , {index:'16',content:'要 放 裡面 而且 用 裡面 .'} , {index:'17',content:'嗯 玩 積木 我 在 跟 爸爸 玩 積木 .'} , {index:'18',content:'我 們 積木 很 好 玩 欸 .'} , {index:'19',content:'好 好 玩 喔 .'} , {index:'20',content:'感冒 .'} , {index:'21',content:'好 好 了 裝 好 了 .'} , {index:'22',content:'換 遊戲 .'} , {index:'23',content:'這 一 台 .'} , {index:'24',content:'這 應該 是 打 電話 .'} , {index:'25',content:'這 是 盤子 喔 .'} , {index:'26',content:'蛋蛋 .'} , {index:'27',content:'要 收拾 了 .'} , {index:'28',content:'要 收拾 了 .'} , {index:'29',content:'要 收拾 囉 .'} , {index:'30',content:'草莓 吐司 .'} , {index:'31',content:'對 草 這 叫  一樣 的 .'} , {index:'32',content:'要 收  番茄醬 .'} , {index:'33',content:'花 .'} , {index:'34',content:'玉米 .'} , {index:'35',content:'這 是 玉米 的 .'} , {index:'36',content:'我 剛剛 弄 得 .'} , {index:'37',content:'就 這樣 裝 裝 .'} , {index:'38',content:'對 這樣子 裝 就 這樣子 裝 .'} , {index:'39',content:'這樣子 裝 .'} , {index:'40',content:'然後 就 這樣子 裝 .'} , {index:'41',content:'就 這樣 就 這樣 裝 .'} , {index:'42',content:'玉米 .'} , {index:'43',content:'刀子 .'} , {index:'44',content:'要 小心 .'} , {index:'45',content:'收銀機 .'} , {index:'46',content:'對 收銀機 .'} , {index:'47',content:'嗯 白 嗯 白白 的 .'} , {index:'48',content:'起司 .'} , {index:'49',content:'給 你 吃 .'} , {index:'50',content:'兩百 塊 .'} , {index:'51',content:'用 叉子 吃 .'} , {index:'52',content:'這 個 叉子 吃 .'} , {index:'53',content:'不用 .'} , {index:'54',content:'不用 啦 .'} , {index:'55',content:'不用 .'} , {index:'56',content:'不用 .'} , {index:'57',content:'老闆 .'} , {index:'58',content:'兩百 塊 .'} , {index:'59',content:'兩百 塊 .'} , {index:'60',content:'這 這邊 可以 按 .'} , {index:'61',content:'沒有 裝 電池 .'} , {index:'62',content:'打 不 開 被 膠帶 黏 起來 了 .'} , {index:'63',content:'膠帶 黏 起來 啊 .'} , {index:'64',content:'裡面 這邊 就 是 膠帶 黏 起來 .'} , {index:'65',content:'人家 綁 起來 .'} , {index:'66',content:'用 螺絲 鎖 .'} , {index:'67',content:'這邊 要 螺絲 .'} , {index:'68',content:'螺絲 奶奶 家 是 有 這 個 螺絲 可是 不 見 了 .'} , {index:'69',content:'兩 個 螺絲 .'} , {index:'70',content:'對 兩 個 螺絲 啊 .'} , {index:'71',content:'一 二 三 兩 個 啊 .'} , {index:'72',content:'三 三 是 兩 個 跑 得 快 .'} , {index:'73',content:'紅蘿蔔 .'} , {index:'74',content:'狗狗 .'} , {index:'75',content:'嗯 狗狗 最 喜歡 吃 紅蘿蔔 .'} , {index:'76',content:'喜歡 .'} , {index:'77',content:'喜歡 吃 .'} , {index:'78',content:'嗯 貓 喜歡 吃 .'} , {index:'79',content:'貓 喜歡 吃  玉米 .'} , {index:'80',content:'兩 個 玉米 都 給 巧虎 吃 .'} , {index:'81',content:'給 巧虎 吃 .'} , {index:'82',content:'吃 吃 嗯 紅蘿蔔 .'} , {index:'83',content:'嗯 龍蘿蔔 超 大 的 紅蘿蔔 .'} , {index:'84',content:'喜歡 吃 花椰菜 .'} , {index:'85',content:'老虎 喜歡 吃 蛋糕 .'} , {index:'86',content:'河馬 喜歡 吃  這 個 .'} , {index:'87',content:'蚊子 喜歡 吃 柳丁 .'} , {index:'88',content:'喜歡 吃 柳丁 .'} , {index:'89',content:'剪刀 .'} , {index:'90',content:'刀子 要 切 這 個 .'} , {index:'91',content:'啊 切 切 切 切 一 半 .'} , {index:'92',content:'給 你 吃 .'} , {index:'93',content:'你 要 吃 哪 一 個 ?'} , {index:'94',content:'蛋糕 .'} , {index:'95',content:'給 你 .'} , {index:'96',content:'切 .'} , {index:'97',content:'用 盤子 裝 喔 .'} , {index:'98',content:'先 用 這 個 叉子 吃 .'} , {index:'99',content:'這樣子 吃 .'} , {index:'100',content:'嗯 這 個 是 一 個 人 .'}  ]
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if(this.byUpload){
          this.$emit('upload-file', this.file);
          this.lastSubmittedFile = this.file.name;
        }
        else{
          this.$emit('upload-file', this.selectedFile);
          this.lastSubmittedFile = this.selectedFile;
        }
      }
    },
    reset() {
      this.file= null,
      this.lastSubmittedFile = "尚未上傳檔案"
    }
  },
};
</script>
