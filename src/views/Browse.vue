<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SideBar></SideBar>
      </v-col>
      <v-col>
        <InfoPanel></InfoPanel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar'
import InfoPanel from '@/components/InfoPanel'

export default {
  name: 'Browse',
  components: {
    SideBar,
    InfoPanel,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>