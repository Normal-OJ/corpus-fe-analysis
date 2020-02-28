<template>
  <v-container fluid style="height: 100vh;">

    <v-btn
      color="warning"
      @click="$emit('back')"
    >返回</v-btn>

    <v-btn
      text
    >重新分析</v-btn>

  </v-container>
</template>

<script>
export default {

  name: 'Step2',

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      data: {

      },
    }
  }
}
</script>

<style lang="css" scoped>
</style>