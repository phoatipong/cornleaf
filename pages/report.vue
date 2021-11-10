<template>
  <v-app>
    <v-container fluid>
      <v-row class="mt-5 top-img">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/line-bot-bd566.appspot.com/o/img%2FReport.jpg?alt=media&token=31d4247b-1711-46a5-bd9a-fde986002e5a"
        />
      </v-row>

      <hr class="mt-6" />

      <v-row class="mt-5">
        <v-col cols="12">
          <p class="text-content">
            สวัสดีคุณ{{ profile.displayName }} ขอบคุณที่ใช้งานกับเรา
            คุณอาจจะพบวิธีแก้ไขปัญหาในนี้ <v-btn small @click="FAQ">FAQ</v-btn>
          </p>
        </v-col>
        <v-col cols="12">
          <p class="text-content">
            หากท่านไม่พบวิธีแก้ไขปัญหากรุณากรอกแบบฟอร์มเราจะตรวจสอบแล้วส่งข้อความกลับไปยัง
            Line ของท่านเร็วที่สุด
          </p>
        </v-col>
      </v-row>
      <div class="footer">
        <v-btn color="" class="mt-5" large @click="closeliff"
          >กลับไปช่องแชท</v-btn
        >

        <v-btn color="primary" class="mt-5" large @click="next"
          >กรอกแบบฟอร์ม</v-btn
        >
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      profile: {
        userId: '',
        displayName: '',
        pictureUrl: '',
        email: ''
      },
      from: {
        email: '',
        detail: ''
      }
    }
  },
  mounted() {
    window.liff
      .init({
        liffId: '1656245076-1DO5Kv4r'
      })
      .then(() => {
        if (window.liff.isLoggedIn()) {
          window.liff.getProfile().then((profile) => {
            this.profile.userId = profile.userId
            this.profile.displayName = profile.displayName
            this.profile.pictureUrl = profile.pictureUrl
          })
          this.profile.email = window.liff.getDecodedIDToken().email
        } else {
          window.liff.login()
        }
      })
  },

  methods: {
    closeliff() {
      window.liff.closeWindow()
    },
    async next() {
      await this.$store.commit('setProfile', this.profile)
      this.$router.replace('/reportFrom')
    },
    FAQ() {
      this.$router.replace('/FAQ')
    }
  }
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
