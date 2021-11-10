<template>
  <div>
    <v-row>
      <v-col cols="12" class="ml-3 mt-3">
        <nuxt-link to="/knowledge">
          <v-icon color="">mdi-keyboard-backspace</v-icon>
        </nuxt-link>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="">
        <v-col>
          <h3>
            {{ data.title }}
          </h3>
        </v-col>
      </v-row>

      <v-img
        contain
        lazy-src="https://ps.w.org/lazy-load-for-images/assets/icon-256x256.png?rev=2004501"
        max-height="155"
        max-width="233"
        :src="data.img"
        class="mt-3 rounded-lg"
      />
      <v-row class="mt-2">
        <v-col cols="12">
          <p class="title-content">สาเหตุ</p>
          <p class="content">{{ data.pathogenesis }}</p>
          <p class="title-content">อาการ</p>
          <p class="content">{{ data.symtoms }}</p>
          <p class="title-content">การป้องกันและกำจัด</p>
          <p v-html="data.management" class="content"></p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import firebase from '~/plugins/firebaseConfig'
export default {
  data() {
    return {
      data: [],
    }
  },
  async mounted() {
    const query = this.$route.query.index
    const db = firebase.database()
    const ref = db.ref(`data/diseases`).orderByChild('title').equalTo(query)
    await ref.on('value', (snap) => {
      const res = snap.val()
      for (const key in res) {
        this.data.push({ ...res[key], id: key })
      }
      this.data = this.data[0]
    })
  },
}
</script>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.v-application {
  font-family: 'Prompt', sans-serif;
}
.title-content {
  font-size: 18px;
}
.content {
  font-size: 14px;
}
</style>
