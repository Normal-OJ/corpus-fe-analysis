<template>
  <div>
    <span>提供者：{{ desc.provider}}</span>
    <div v-for="(v, i) in desc.introduction" :key="i">{{ v }}</div>
    <div>引用資訊</div>
    <div>{{ desc.quoteInfo }}</div>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    desc: {
      type: Object
    }
  }
}
</script>

<style>
</style>