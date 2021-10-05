<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col cols="12" class="ml-3 mt-3">
          <nuxt-link to="/">
            <v-icon color="">mdi-keyboard-backspace</v-icon>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-container>
        <v-row align="center" justify="center" class="">
          <v-col v-for="item in fetchData" :key="item" cols="12">
            <nuxt-link :to="`/diseases/?index=${item.title}`">
              <indexBtn :title="item.title"></indexBtn>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import firebase from '~/plugins/firebaseConfig'
import indexBtn from '~/components/indexBtn'
export default {
  components: {
    indexBtn,
  },

  data() {
    return {
      fetchData: [],
    }
  },
  async mounted() {
    const db = firebase.database()
    const ref = db.ref('data/diseases')
    await ref.on('value', (snap) => {
      const res = snap.val()
      for (const key in res) {
        this.fetchData.push({ ...res[key], id: key })
      }
    })
  },
}
</script>

<style></style>
