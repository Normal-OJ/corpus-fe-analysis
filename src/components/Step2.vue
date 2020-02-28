<template>
  <v-container fluid style="height: 100vh;">

    <v-btn
      color="warning"
    >重新分析</v-btn>

    <v-btn
      text
      @click="$emit('back')"
    >返回</v-btn>

  </v-container>
</template>

<script>
export default {

  name: 'Step2',

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