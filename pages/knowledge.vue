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
        <v-row align="center" justify="center" class="mt-10">
          <v-card class="mx-auto" width="300" tile>
            <v-list flat>
              <v-subheader>ความรู้ทั่วไป</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="item in fetchData" :key="item">
                  <nuxt-link :to="`/diseases/?index=${item.title}`"
                    ><v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-divider></v-divider> </v-list-item-content
                  ></nuxt-link>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
/// /diseases/?index=${item.title}
import firebase from '~/plugins/firebaseConfig'
export default {
  components: {},

  data() {
    return {
      fetchData: []
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
  }
}
</script>

<style scoped>
.v-list-item__title {
  text-align: center;
  font-size: 1.4rem;
}
</style>
