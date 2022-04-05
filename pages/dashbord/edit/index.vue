<template>
  <v-app>
    <navigator />
    <v-container>
      <v-row>
        <v-col cols="12" class=" mt-10">
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
          <v-col cols="6">
            <nuxt-link to="/dashbord/edit/FAQ">
              <indexBtn title="แก้ไขคำถามและข้อสงสัย"></indexBtn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import navigator from '~/components/navigation.vue'
import indexBtn from '~/components/indexBtn'
export default {
  components: {
    navigator,
    indexBtn
  },
  mounted() {
    if (!this.$store.state.logined) {
      this.$router.replace('/dashbord/login')
    }
  }
}
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.theme--light.v-application {
  background: #001040;
  color: #ffffff;
}
.v-application {
  font-family: 'Prompt', sans-serif;
}
a {
  text-decoration: none;
}
</style>
