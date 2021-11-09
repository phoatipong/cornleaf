<template>
  <v-app>
    <Navigation />
    <v-container>
      <v-row class="mt-5">
        <nuxt-link to="/dashbord">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </nuxt-link>
      </v-row>
      <v-checkbox
        v-model="read"
        dark
        label="ข้อความที่ตอบกลับแล้ว"
        @change="readItem"
      ></v-checkbox>
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
      read: false,
      reportNotify: 0,
      headers: [
        {
          text: 'เวลา',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        {
          text: 'จาก',
          value: 'displayName',
        },
        {
          text: 'รายละเอียด',
          value: 'detail',
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
  },
}
</script>

<style>
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
</style>
