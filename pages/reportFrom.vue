<template>
  <v-app>
    <v-container
      ><v-card class="mt-6">
        <v-card-title>แบบฟอร์มแจ้งปัญหาการใช้งานหรือข้อสงสัย</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <form>
            <v-select
              solo
              :items="items"
              label="โปรดเลือกประเภทการแจ้ง"
              v-model="payload.genre"
            ></v-select>
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
import axios from 'axios'
import firebase from '~/plugins/firebaseConfig.js'

export default {
  data() {
    return {
      items: [
        'การส่งรูปภาพ',
        'การใช้แอพพลิเคชัน Line',
        'ผลการวินิจฉัย',
        'คำแนะนำ',
        'อื่นๆ',
      ],
      payload: {
        event: 'sendbackFormReport',
        detail: '',
        userId: this.$store.state.userId,
        displayName: this.$store.state.displayName,
        email: this.$store.state.email,
        read: false,
        date: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' }),
        reply: '',
        dateReply: '',
        genre: '',
      },
    }
  },
  methods: {
    async next() {
      if (this.payload.detail === '') {
        alert('กรุณากรอกรายละเอียด')
      } else {
        const payload = {
          event: 'sendback',
          userId: this.$store.state.userId,
          date: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' }),
          detail: this.payload.detail,
          genre: this.payload.genre,
        }
        const db = firebase.database()
        const ref = db.ref('report')
        await axios({
          method: 'post',
          url: 'https://us-central1-line-bot-bd566.cloudfunctions.net/hello',
          data: payload,
        })
        await ref.push(this.payload).then(() => {
          alert('แจ้งปัญหาสำเร็จ เราจะตอบกลับไปเร็วๆนี้')
          window.liff
            .init({
              liffId: '1656245076-1DO5Kv4r',
            })
            .then(() => {
              window.liff.closeWindow()
            })
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
