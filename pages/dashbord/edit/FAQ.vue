<template>
  <v-app>
    <Navigation />
    <v-main class="mt-10 mb-10">
      <v-row justify="center">
        <v-col cols="12" class="ml-10">
          <nuxt-link to="/dashbord/edit/">
            <v-icon color="white">mdi-keyboard-backspace</v-icon>
          </nuxt-link>
        </v-col>
        <v-col cols="6">
          <v-card light>
            <v-col><h3>แก้ไขคำถามที่พบบ่อย</h3></v-col>
            <v-col class="mr"
              ><v-btn color="success" small @click="add">เพิ่ม</v-btn></v-col
            >

            <v-col v-for="list in lists" :key="list.key">
              <v-divider></v-divider>
              <v-text-field v-model="list.Q" label="คำถาม"></v-text-field>
              <v-text-field v-model="list.A" label="คำตอบ"></v-text-field>

              <v-btn x-small color="error" class="mb-5" @click="del(list.id)">
                ลบ
              </v-btn>
              <v-divider></v-divider>
            </v-col>
            <v-col>
              <v-btn @click="save" color="success">บันทึก</v-btn>
              <v-btn @click="cancel" color="">ยกเลิก</v-btn>
            </v-col>
          </v-card>
        </v-col>
        <v-col cols="4"> </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import firebase from '~/plugins/firebaseConfig'
export default {
  components: { Navigation },
  data() {
    return {
      lists: [],
      i: 1,
    }
  },
  methods: {
    add() {
      const i = `${this.lists.length}`
      this.lists.push({ Q: '', A: '', id: i })
      console.log(this.lists)
    },
    del(key) {
      console.log(key)
      this.lists.splice(key, 1)
    },
    async save() {
      console.log(this.lists)
      const k = this.lists.length
      const l = []
      for (let i = 0; i < k; i++) {
        const obj = { Q: this.lists[i].Q, A: this.lists[i].A }
        l.push(obj)
      }
      const db = firebase.database()
      const ref = db.ref('data/FAQ/')
      await ref.set(l).then(() => {
        alert('บันทึกข้อมูลสำเร็จ')
        this.$router.replace('/dashbord/edit')
      })
    },
    cancel() {
      this.$router.replace('/dashbord/edit')
    },
  },

  async mounted() {
    const db = firebase.database()
    const ref = db.ref('data/FAQ')
    await ref.on('value', (snap) => {
      const res = snap.val()
      for (const key in res) {
        this.lists.push({ ...res[key], id: key })
      }
      console.log(this.list)
    })
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
