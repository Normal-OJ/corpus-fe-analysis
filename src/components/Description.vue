<template>
  <div>
    <v-card elevation="0">
      <v-card-title>
        <v-icon class="mr-2">mdi-account-circle-outline</v-icon>
        <span>提供者：{{ desc.provider}}</span>
      </v-card-title>

      <v-card-title>
        <v-icon class="mr-2">mdi-file-document-outline</v-icon>
        <span>簡介</span>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(v, i) in desc.introduction" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{ v }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-title>
        <v-icon class="mr-2">mdi-information-outline</v-icon>
        <span>引用資訊</span>
      </v-card-title>
      <v-card-text>{{ desc.quoteInfo }}</v-card-text>
    </v-card>
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