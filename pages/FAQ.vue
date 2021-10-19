<template>
  <v-app>
    <v-container class="mt-10">
      <v-row align="center" justify="center">
        <h3>คำถามที่พบบ่อย</h3>
      </v-row>
      <v-row align="center" justify="center">
        <v-card>
          <v-col>
            <v-list>
              <v-list-group
                :value="false"
                v-for="list in lists"
                :key="list.key"
                prepend-icon="mdi-help-circle"
              >
                <template v-slot:activator>
                  <v-list-item>{{ list.Q }}</v-list-item>
                </template>
                <v-list-item
                  ><v-icon color="primary" class="mr-10">mdi-chat</v-icon>
                  <p v-html="list.A"></p
                ></v-list-item>
              </v-list-group>
            </v-list>
          </v-col>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebaseConfig'
export default {
  data() {
    return {
      lists: [],
    }
  },
  async mounted() {
    const db = firebase.database()
    const ref = db.ref('data/FAQ')
    await ref.on('value', (snap) => {
      this.lists = snap.val()
    })
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.v-application {
  font-family: 'Prompt', sans-serif;
}
</style>
