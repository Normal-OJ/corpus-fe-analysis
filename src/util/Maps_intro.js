const introduction = `
  <style>
  .name {
    color: black;
    text-align: center;
  }
  </style>
  <h3 class="name">兒童語法複雜度分析工具 (MAPS-R)</h3>
  <br />
  <p>
    　　兒童語法複雜度分析工具 (Mandrin Assessment of Productive Syntax-Revised, MAPS-R) 由張顯達教授參考IPSyn (Scarborough, 1990) 之架構所開發，旨在了解華語兒童語法能力之發展。所分析之語法面向包括名詞短語、動詞短語、介詞短語及句子四個類別，名詞短語包含5個指標，動詞短語包含6個指標，介詞短語有2個指標，句子有7個指標，合計共有20個指標。參見以下表格說明。
    <br />
    　　採用人工計分之研究結果顯示MAPS-R具有良好之信效度，MAPS-R得分與兒童平均語句長度 (MLU) 具有高度相關，且可有效區辨2-4歲幼兒之語法複雜度。該結果發表於Clinical Linguistics & Phonetics ><a href="https://www.tandfonline.com/doi/full/10.1080/02699206.2024.2302549">(Cheung, Lin, & Chang, 2024) </a>
  </p>
`;

const metrics_table = `
  <style type="text/css">
  .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
  .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;
    font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg th{background-color:#f0f0f0;border-color:#ccc;border-style:solid;border-width:1px;color:#333;
    font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
  .tg .tg-b6io{border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;text-align:center;vertical-align:middle}
  .tg .tg-7ybg{background-color:#16b841;border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;font-weight:bold;
    text-align:center;vertical-align:middle}
  .tg .tg-j5n6{border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;text-align:left;vertical-align:top}
  </style>
  <table class="tg">
  <caption>表：MAPS-R兒童語法複雜度分析指標</caption>
  <thead>
    <tr>
      <th class="tg-7ybg">類別</th>
      <th class="tg-7ybg">指標</th>
      <th class="tg-7ybg">名稱</th>
      <th class="tg-7ybg">範例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="tg-b6io" rowspan="5">名詞<br>短語</td>
      <td class="tg-b6io"><span style="color:black">NP1</span></td>
      <td class="tg-b6io"><span style="color:black">量詞</span> -<span style="color:black">個</span></td>
      <td class="tg-j5n6">一個/一個球</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">NP2</span></td>
      <td class="tg-b6io"><span style="color:black">量詞</span> - <span style="color:black">特定</span></td>
      <td class="tg-j5n6">一隻/條/顆…/、一些</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">NP3</span></td>
      <td class="tg-b6io"><span style="color:black">X 的</span></td>
      <td class="tg-j5n6">壞的/大的/綠的/他的/小狗的/會飛的</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">NP4</span></td>
      <td class="tg-b6io"><span style="color:black">X 的</span> Y</td>
      <td class="tg-j5n6">小狗的嘴巴/小小的桌子/戴帽子的小孩</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">NP5</span></td>
      <td class="tg-b6io"><span style="color:black">方位</span></td>
      <td class="tg-j5n6">N+方位詞: 杯子裡/桌面上；裡外上下/面/邊</td>
    </tr>
    <tr>
      <td class="tg-b6io" rowspan="6">動詞<br>短語</td>
      <td class="tg-b6io"><span style="color:black">VP1</span></td>
      <td class="tg-b6io"><span style="color:black">體貌標記</span></td>
      <td class="tg-j5n6">了、在、過、著；   V 一 V/ VV (看一看/看看)</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">VP2</span></td>
      <td class="tg-b6io"><span style="color:black">結果補語</span></td>
      <td class="tg-j5n6">摔倒了/打開/洗乾淨</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">VP3</span></td>
      <td class="tg-b6io"><span style="color:black">趨向補語</span></td>
      <td class="tg-j5n6">拿出來；拿出一本書來/拿一本書出來；走進去；走進山洞去</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">VP4</span></td>
      <td class="tg-b6io"><span style="color:black">情態補語</span></td>
      <td class="tg-j5n6">睡得很晚；擦得很乾淨</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">VP5</span></td>
      <td class="tg-b6io"><span style="color:black">可能補語</span></td>
      <td class="tg-j5n6">我看不懂；我看得懂、拿不出來、拿得出來；<br>去不了公園；進不去；(動 + 不 + 結果補語/趨向補語)</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">VP6</span></td>
      <td class="tg-b6io"><span style="color:black">數量補語</span></td>
      <td class="tg-j5n6">拿一下；看了兩遍</td>
    </tr>
    <tr>
      <td class="tg-b6io" rowspan="2">介詞<br>短語</td>
      <td class="tg-b6io"><span style="color:black">PP1</span></td>
      <td class="tg-b6io"><span style="color:black">動前介詞</span></td>
      <td class="tg-j5n6">在桌子上寫字/他對貓咪說再見/他用腳踢門；(處所/時間/方向/工具)</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">PP2</span></td>
      <td class="tg-b6io"><span style="color:black">動後介詞</span>(<span style="color:black">補語</span>)</td>
      <td class="tg-j5n6">蘋果放在桌子上. 小狗跑到山洞裡面</td>
    </tr>
    <tr>
      <td class="tg-b6io" rowspan="7">句子</td>
      <td class="tg-b6io"><span style="color:black">S1</span></td>
      <td class="tg-b6io"><span style="color:black">把字句</span></td>
      <td class="tg-j5n6">他把蘋果放在桌子上</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S2</span></td>
      <td class="tg-b6io"><span style="color:black">被字句</span></td>
      <td class="tg-j5n6">小狗被罵了/小狗被爸爸罵了</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S3</span></td>
      <td class="tg-b6io"><span style="color:black">存現句</span></td>
      <td class="tg-j5n6">桌子上有兩個蘋果/地上躺著一條狗</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S4</span></td>
      <td class="tg-b6io"><span style="color:black">複謂</span>(<span style="color:black">連動</span>/<span style="color:black">兼語</span>)</td>
      <td class="tg-j5n6">兼語: 媽媽讓他牽小狗/老師請/叫/他擦桌子<br>連動: 他去公園溜滑梯/小朋友拿著氣球去公園</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S5</span></td>
      <td class="tg-b6io"><span style="color:black">帶連詞複句</span></td>
      <td class="tg-j5n6">因為下雨, 他打開了雨傘；   因果: 因為…所以/<br>   轉折: 雖然/但是/否則/不過; <br>   條件: 只要/如果/除非;</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S6</span></td>
      <td class="tg-b6io"><span style="color:black">緊縮複句</span></td>
      <td class="tg-j5n6">Ex.你早點來就看到她/小狗看到爸爸才離開/; 這個洞越挖越大;</td>
    </tr>
    <tr>
      <td class="tg-b6io"><span style="color:black">S7</span></td>
      <td class="tg-b6io"><span style="color:black">感知</span>/<span style="color:black">心理狀態動詞</span>-<br><span style="color:black">主謂短語賓語句</span></td>
      <td class="tg-j5n6">知道/以為/覺得/想/發現/；Ex. 他想媽媽一定很生氣；<br>小狗以為沒有人在家；看到/聽到：他聽到外面有人在打球</td>
    </tr>
  </tbody>
  </table>
  `;

  export default {
    introduction,
    metrics_table,
  };