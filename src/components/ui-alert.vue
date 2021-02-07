<template>
  <v-dialog v-model="value" width="50%">
    <v-card data-test="card">
      <v-card-title></v-card-title>
      <v-card-text class="text-center text--primary">
        <v-icon color="warning" size="5rem">mdi-alert-circle-outline</v-icon>
        <p class="headline mt-3" data-test="title">{{ title }}</p>
        <p class="subtitle-1" data-test="subtitle">{{ subtitle }}</p>
      </v-card-text>
      <v-card-actions class="pb-12">
        <v-spacer />
        <v-btn class="mx-3 subtitle-1" color="info" @click="clickYes" data-test="yesBtn">是</v-btn>
        <v-btn class="mx-3 subtitle-1" color="error" @click="clickNo" data-test="noBtn">否</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ui-alert',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '您是否確定執行此動作？',
    },
    subtitle: {
      type: String,
      default: '確認後將離開此畫面。',
    },
  },
  methods: {
    clickYes() {
      this.$emit('input', false);
      this.$emit('ok');
    },
    clickNo() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="css" scoped></style>
