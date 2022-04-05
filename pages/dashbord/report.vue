<template>
  <v-app>
    <Navigation />
    <v-container>
      <v-row class="mt-5">
        <nuxt-link to="/dashbord">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </nuxt-link>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-checkbox
            v-model="read"
            dark
            label="ข้อความที่ตอบกลับแล้ว"
            @change="readItem"
          >
          </v-checkbox>
        </v-col>

        <v-col cols="3" class="mt-4">
          <v-select
            v-model="genre"
            solo
            light
            label="ประเภท"
            :items="items"
            class="select"
            @change="selectGenre(genre)"
          ></v-select>
        </v-col>
        <v-col cols="2" class="mt-4">
          <v-btn @click="reset">รีเซ็ต</v-btn>
        </v-col>
      </v-row>

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
import Navigation from '~/components/navigation'
import firebase from '~/plugins/firebaseConfig.js'
export default {
  components: { Navigation },
  data() {
    return {
      genre: '',
      read: false,
      reportNotify: 0,
      items: [
        'การส่งรูปภาพ',
        'การใช้แอพพลิเคชัน Line',
        'ผลการวินิจฉัย',
        'คำแนะนำ',
        'อื่นๆ',
      ],
      headers: [
        {
          text: 'เวลา',
          align: 'start',
          value: 'date',
        },
        {
          text: 'เวลาตอบกลับ',
          value: 'dateReply',
        },
        {
          text: 'จาก',
          value: 'displayName',
        },
        {
          text: 'ประเภท',
          value: 'genre',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
      fetchData: [],
    }
  },
  async mounted() {
    if (this.$store.state.logined) {
      const db = firebase.database()
      const ref = db.ref('report').orderByChild('read').equalTo(false)
      await ref.on(
        'value',
        (snapshot) => {
          const res = snapshot.val()
          for (const key in res) {
            this.fetchData.push({ ...res[key], id: key })
          }
        },
        (errorObject) => {}
      )
    } else {
      this.$router.replace('/dashbord/login')
    }
  },

  methods: {
    select(item) {
      this.$router.replace(`/dashbord/reportRead?id=${item.id}`)
    },
    async readItem(read) {
      this.fetchData = []
      if (read) {
        const db = firebase.database()
        const ref = db.ref('report').orderByChild('read').equalTo(true)
        await ref.on(
          'value',
          (snapshot) => {
            const res = snapshot.val()
            for (const key in res) {
              this.fetchData.push({ ...res[key], id: key })
            }
          },
          (errorObject) => {}
        )
      } else {
        const db = firebase.database()
        const ref = db.ref('report').orderByChild('read').equalTo(false)
        await ref.on(
          'value',
          (snapshot) => {
            const res = snapshot.val()
            for (const key in res) {
              this.fetchData.push({ ...res[key], id: key })
            }
          },
          (errorObject) => {}
        )
      }
    },

    async selectGenre(genre) {
      this.fetchData = []
      const db = firebase.database()
      const ref = db.ref('report').orderByChild('genre').equalTo(genre)
      await ref.on('value', (snapshot) => {
        const res = snapshot.val()
        for (const key in res) {
          this.fetchData.push({ ...res[key], id: key })
        }
        this.fetchData = this.fetchData.filter(data => data.read === this.read)
      })
    },
    async reset() {
      this.genre = ''
      this.fetchData = []
      this.read = false
      const db = firebase.database()
      const ref = db.ref('report').orderByChild('read').equalTo(false)
      await ref.on(
        'value',
        (snapshot) => {
          const res = snapshot.val()
          for (const key in res) {
            this.fetchData.push({ ...res[key], id: key })
          }
        },
        (errorObject) => {}
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
.theme--light.v-application {
  background: #001040;
  color: #ffffff;
}
.theme--light.v-label {
  color: rgb(255 255 255 / 100%);
}
a {
  text-decoration: none;
}
.select {
  color: black;
}
</style>
