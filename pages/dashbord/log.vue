<template>
  <v-app>
    <Navigation />

    <v-container>
      <v-row class="mt-5">
        <nuxt-link to="/dashbord">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </nuxt-link>
      </v-row>
      <br><br>
      <v-data-table :headers="headers" :items="fetchData">
        <template #[`item.actions`]="{ item }">
          <v-btn small class="mr-2" color="primary" @click="select(item)">
            อ่าน
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-app>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import firebase from '~/plugins/firebaseConfig'
export default {
  components: {
    Navigation
  },
  data() {
    return {
      i: 1,
      fetchData: [],
      headers: [
        {
          text: 'ลำดับ',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        {
          text: 'เวลา',
          value: 'date'
        },
        {
          text: 'ผลลัพธ์',
          value: 'predict'
        },
        {
          text: 'ความเป็นไปได้ (%)',
          sortable: false,
          value: 'probability'
        }
      ]
    }
  },
  async mounted() {
    const logined = this.$store.state.logined
    if (logined) {
      const db = firebase.database()
      const ref = db.ref('prediction/log')
      await ref.on('value', (snap) => {
        const res = snap.val()

        for (const key in res) {
          this.fetchData.push({ ...res[key], id: this.i })
          this.i++
        }
      })
    } else {
      this.$router.replace('/dashbord/login')
    }
  }
}
</script>

<style>
.theme--light.v-application {
  background: #001040;
  color: #ffffff;
}
a {
  text-decoration: none;
}
</style>
