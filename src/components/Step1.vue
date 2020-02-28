<template>
  <v-container fluid style="min-height: 100vh; padding: 0 20vw;">
    
    <!-- Age -->
    <h2>年齡層（可複選）：</h2>
    <v-select
      v-model="data.ages"
      :items="ages"
      item-text="label"
      item-value="value"
      label="選擇年齡層"
      chips
      multiple
    ></v-select>

    <!-- Sex -->
    <h2>性別：</h2>
    <v-radio-group row v-model="data.sex">
      <v-radio
        v-for="sex in sexs"
        :key="sex.label"
        class="mb-3"
        :label="sex.label"
        :value="sex.value"
      ></v-radio>
    </v-radio-group>

    <!-- Speaker -->
    <h2>分析對象：</h2>
    <v-radio-group row v-model="data.speaker">
      <v-radio
        v-for="speaker in speakers"
        :key="speaker.label"
        class="mb-3"
        :label="speaker.label"
        :value="speaker.value"
      ></v-radio>
    </v-radio-group>

    <!-- Context -->
    <h2>情境：</h2>
    <v-radio-group row v-model="data.context">
      <v-radio
        v-for="context in contexts"
        :key="context.label"
        class="mb-3"
        :label="context.label"
        :value="context.value"
      ></v-radio>
    </v-radio-group>

    <!-- Indicator -->
    <h2>語言指標（可複選）：</h2>
    <v-select
      v-model="data.indicator"
      :items="indicators"
      item-text="label"
      item-value="value"
      label="選擇語言指標"
      chips
      multiple
    >
      <v-list-item
        slot="prepend-item"
        ripple
        @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="data.indicator.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>全選</v-list-item-title>
      </v-list-item>
      <v-divider slot="prepend-item" class="mt-2"/>
    </v-select>

    <!-- DEBUG MSG -->
    <!-- {{ data.ages }} -->
    <!-- {{ data.sex }} -->
    <!-- {{ data.context }} -->
    <!-- {{ data.speaker }} -->
    <!-- {{ data.indicator }} -->

    <v-btn
      color="primary"
      @click="$emit('next', data)"
    >繼續</v-btn>

    <br v-for="n in 10">

  </v-container>
</template>

<script>
import json from './step1.json'

export default {

  name: 'Step1',

  data () {
    return {
      data: {
        ages: [],
        sex: [],
        context: [],
        speaker: [],
        indicator: [],
      },

      ages: json.ages,
      sexs: json.sexs,
      speakers: json.speakers,
      contexts: json.contexts,
      indicators: json.indicator,
    }
  },

  computed: {
    selectAll () {
      return this.data.indicator.length === this.indicators.length
    },
    selectSome () {
      return this.data.indicator.length > 0 && !this.selectAll
    },
    icon () {
      if (this.selectAll) return 'mdi-close-box'
      if (this.selectSome) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if ( this.selectAll ) {
          this.data.indicator = [];
        } else {
          this.data.indicator = this.indicators.map(v => v.value);
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>