<template>
  <v-app>
    <v-container
      ><v-card class="mt-6">
        <v-card-title>แบบฟอร์มแจ้งปัญหาการใช้งาน</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form>
            <v-textarea
              v-model="payload.detail"
              label="รายละเอียด"
              required
            ></v-textarea>
          </form>
        </v-card-text>
      </v-card>
      <div class="footer">
        <nuxt-link to="/report">
          <v-btn color="" class="mt-5" large @click="closeliff">ย้อนกลับ</v-btn>
        </nuxt-link>

        <v-btn color="primary" class="mt-5" large @click="next">
          แจ้งปัญหา
        </v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebaseConfig.js'

export default {
  data() {
    return {
      payload: {
        detail: '',
        userId: this.$store.state.userId,
        displayName: this.$store.state.displayName,
        email: this.$store.state.email,
        read: false,
        date: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' }),
        reply: '',
        dateReply: '',
      },
    }
  },
  methods: {
    async next() {
      if (this.payload.detail === '') {
        alert('กรุณากรอกรายละเอียด')
      } else {
        const db = firebase.database()
        const ref = db.ref('report')
        await ref.push(this.payload).then(() => {
          alert('แจ้งปัญหาสำเร็จ เราจะตอบกลับไปเร็วๆนี้')
          window.liff.closeWidow()
        })
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.v-application {
  font-family: 'Prompt', sans-serif;
}
.v-toolbar__title {
  width: 100%;
  text-align: center;
}
img {
  height: auto;
  max-width: 320px;
}
.top-img {
  width: 100%;
  justify-content: center;
}
.text-content {
  text-align: center;
  text-justify: auto;
  font-size: large;
}
.footer {
  position: fixed;
  left: 0;
  height: 100px;
  bottom: 0;
  width: 100%;
  background-color: rgb(235, 235, 235);
  color: white;
  text-align: center;
}
</style>
