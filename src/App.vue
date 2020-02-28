<template>
  <v-app>
    <v-app-bar app color="success" dark>
      <div class="d-flex align-center">
        兒童語料庫
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/view" text>
        <v-icon>mdi-file-find</v-icon>
        <span class="mr-2">語料查看</span>
      </v-btn>

      <v-btn to="/analysis" text>
        <v-icon>mdi-desktop-classic</v-icon>
        <span class="mr-2">語料分析</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn href="http://noj.tw:8000/" target="_blank" text>
        <span class="mr-2">回到華語兒童語言發展評估系統</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
