<template>
  <v-app>
    <navigator />
    <v-main>
      <v-row>
        <v-col cols="12" class="ml-10 mt-10">
          <nuxt-link to="/dashbord/edit">
            <v-icon color="white">mdi-keyboard-backspace</v-icon>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-container>
        <v-row align="center" justify="center" class="mt-10">
          <v-col v-for="item in fetchData" :key="item" cols="4">
            <nuxt-link :to="`/dashbord/edit/diseases/edit?index=${item.id}`">
              <indexBtn :title="item.title"></indexBtn>
            </nuxt-link>
          </v-col>
          <v-col cols="4">
            <nuxt-link to="/dashbord/edit/diseases/add">
              <indexBtn title="เพิ่ม"> </indexBtn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navigator from '~/components/navigation.vue'
import indexBtn from '~/components/indexBtn'
import firebase from '~/plugins/firebaseConfig'
export default {
  components: {
    navigator,
    indexBtn,
  },
  data() {
    return {
      fetchData: [],
    }
  },

  async mounted() {
    if (this.$store.state.logined) {
      const db = firebase.database()
      const ref = db.ref('data/diseases')
      await ref.on('value', (snap) => {
        const res = snap.val()
        for (const key in res) {
          this.fetchData.push({ ...res[key], id: key })
        }
      })
    } else {
      this.$router.replace('/dashbord/login')
    }
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
