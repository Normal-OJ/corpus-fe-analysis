<template>
  <v-container fluid style="height: 100vh;">
    
    <!-- Age -->
    <h2>年齡層（可複選）：</h2>
    <v-row no-gutters>
      <v-select
        v-model="data.ages"
        :items="ages"
        item-text="label"
        item-value="value"
        label="選擇年齡層"
        chips
        multiple
      ></v-select>
    </v-row>

    <!-- Sex -->
    <h2>性別：</h2>
    <v-row no-gutters>
      <v-radio-group v-model="data.sex">
        <v-radio
          v-for="sex in sexs"
          :key="sex.label"
          :label="sex.label"
          :value="sex.value"
        ></v-radio>
      </v-radio-group>
    </v-row>

    <!-- Context -->
    <h2>情境：</h2>
    <v-row no-gutters>
      <v-select
        v-model="data.context"
        :items="context"
        item-text="label"
        item-value="value"
        label="選擇情境"
      ></v-select>
    </v-row>

    {{ data.ages }}
    {{ data.sex }}
    {{ data.context }}

    <v-btn
      color="primary"
      @click="$emit('next', data)"
    >
      繼續
    </v-btn>

  </v-container>
</template>

<script>
export default {

  name: 'Step1',

  data () {
    return {
      data: {
        ages: [],
        sex: [],
        context: [],
      },

      ages: [
        {
          label: '未滿1歲',
          value: [0, 11],  
        },
        {
          label: '1歲～1歲5個月',
          value: [12, 17],
        },
        {
          label: '1歲6個月～1歲11月',
          value: [18, 23],
        },
        {
          label: '2歲～2歲5個月',
          value: [24, 29],  
        },
        {
          label: '2歲6個月～2歲11個月',
          value: [30, 35],  
        },
        {
          label: '3歲～3歲5個月',
          value: [36, 41],  
        },
        {
          label: '3歲6個月～3歲11個月',
          value: [42, 47],  
        },
        {
          label: '4歲～4歲5個月',
          value: [48, 53],  
        },
        {
          label: '4歲6個月～4歲11個月',
          value: [54, 59],  
        },
        {
          label: '5歲～5歲5個月',
          value: [60, 65],  
        },
        {
          label: '5歲6個月～5歲11個月',
          value: [66, 71],  
        },
        {
          label: '6歲～6歲11個月',
          value: [72, 83],  
        },
        {
          label: '7歲～7歲11個月',
          value: [84, 95],  
        },
        {
          label: '8歲～8歲11個月',
          value: [96, 107],  
        },
        {
          label: '9歲～9歲11個月',
          value: [108, 119],  
        },
        {
          label: '10歲～10歲11個月',
          value: [120, 131],  
        },
        {
          label: '11歲～11歲11個月',
          value: [132, 143],  
        },
        {
          label: '12歲～12歲11個月',
          value: [144, 155],  
        },
        {
          label: '不限年齡',
          value: [0, 9999],
        },
      ],

      sexs: [
        {
          label: '只選男生',
          value: [0],
        },
        {
          label: '只選女生',
          value: [1],
        },
        {
          label: '不限性別',
          value: [0, 1],
        },
      ],

      context: [
        {
          label: '限玩玩具敘說',
          value: ["toy play narrative"],
        },
        {
          label: '限親子共玩玩具',
          value: ["joint toy play"],
        },
        {
          label: '限親子軼事敘說',
          value: ["anecdote"],
        },
        {
          label: '限親子共讀',
          value: ["joint book reading"],
        },
        {
          label: '限個人生活經驗敘說',
          value: ["personal narrative"],
        },
        {
          label: '限無字圖畫書敘說',
          value: ["frog story narration"],
        },
        {
          label: '限敘說 (含玩玩具敘說、親子軼事敘說、個人生活經驗敘說和無字圖畫敘說)',
          value: ["toy play narrative", "anecdote", "personal narrative", "frog story narration"],
        },
        {
          label: '不限情境',
          value: ["toy play narrative", "joint toy play", "anecdote", "joint book reading", "personal narrative", "frog story narration"],
        },
      ]
    }
  },
}
</script>

<style lang="css" scoped>
</style>