<template>
  <v-app>
    <navigator />
    <v-main>
      <v-row>
        <v-col cols="12" class="ml-10 mt-10">
          <nuxt-link to="/dashbord/">
            <v-icon color="white">mdi-keyboard-backspace</v-icon>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-container>
        <v-row align="center" justify="center" class="mt-10">
          <v-col cols="6">
            <nuxt-link to="/dashbord/edit/diseases">
              <indexBtn title="แก้ไขหน้าแนะนำโรค" />
            </nuxt-link>
          </v-col>
          <v-col cols="6"
            ><indexBtn title="แก้ไขคำถามที่พบบ่อย"></indexBtn
          ></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navigator from '~/components/navigation.vue'
import indexBtn from '~/components/indexBtn'
export default {
  components: {
    navigator,
    indexBtn,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.theme--light.v-application {
  background: #001040;
  color: #ffffff;
}
.v-application {
  font-family: 'Prompt', sans-serif;
}
</style>
