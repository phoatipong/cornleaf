<template>
  <v-app>
    <Navigation />
    <v-container>
      <v-row class="mt-5">
        <nuxt-link to="/dashbord/report">
          <v-icon color="white">mdi-arrow-left</v-icon>
        </nuxt-link>
      </v-row>
      <v-card class="mt-5">
        <v-card-title><p class="title">ปัญหาที่พบ</p></v-card-title>
        <div class="ml-10 mr-10">
          <v-row>
            <v-col cols="6"
              ><v-text-field
                label="จาก"
                :value="fecthData.displayName"
                readonly
              ></v-text-field
            ></v-col>
            <v-col cols="6">
              <v-text-field
                label="เวลา"
                :value="fecthData.date"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                label="รายละเอียด"
                :value="fecthData.detail"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-divider dark class="mt-10 mb-10"></v-divider>
      <v-card class="">
        <v-card-title><p class="title">ตอบกลับ</p></v-card-title>
        <v-card-subtitle v-if="fecthData.dateReply != ''" class="ml-5">
          เวลา {{ fecthData.dateReply }}
        </v-card-subtitle>
        <div class="ml-10 mr-10">
          <v-row>
            <v-col>
              <v-textarea
                v-if="fecthData.reply !== ''"
                v-model="fecthData.reply"
                readonly
              ></v-textarea>
              <v-textarea v-else v-model="text"></v-textarea>
            </v-col>
          </v-row>
        </div>
        <div class="btn-div">
          <v-btn
            v-if="fecthData.reply !== ''"
            color="primary"
            class="mb-3 ml-3 mr-3"
            disabled
            @click="sendMsg"
          >
            ส่งข้อความ
          </v-btn>
          <v-btn v-else color="primary" class="mb-3 ml-3 mr-3" @click="sendMsg">
            ส่งข้อความ
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import Navigation from '~/components/navigation'
import firebase from '~/plugins/firebaseConfig.js'

export default {
  components: { Navigation },
  data() {
    return {
      id: this.$route.query.id,
      fecthData: {},
      text: '',
    }
  },
  async mounted() {
    if (this.$store.state.logined) {
      const db = firebase.database()
      const ref = await db.ref('report').orderByKey().equalTo(this.id)
      await ref.on('value', (snap) => {
        this.fecthData = snap.val()
        this.fecthData = this.fecthData[`${this.id}`]
      })
    }else{
      this.$router.replace('/dashbord/login')
    }
  },

  methods: {
    async sendMsg() {
      const payload = {
        event: 'sendback',
        userId: this.fecthData.userId,
        text: 'ปัญหาผู้ใช้งาน\nวันที่ ' + this.fecthData.date +'\n=========================\n'+'ปัญหาที่แจ้ง\n' + this.fecthData.detail+"\n"+"=========================\n"+ "ตอบกลับ\n"+ this.text,
      }
      await axios({
        method: 'post',
        url: 'https://us-central1-line-bot-bd566.cloudfunctions.net/hello',
        data: payload,
      }).then(async (res) => {
        const db = firebase.database()
        const ref = db.ref(`report/${this.id}`)
        await ref.update({
          read: true,
          reply: this.text,
          dateReply: new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Jakarta',
          }),
        })
        alert('ส่งข้อความสำเร็จ')
        this.$router.replace('/dashbord/report')
      })
    },
  },
}
</script>

<style lang="postcss">
.btn-div {
  text-align: right;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card > .v-card__title {
  color: #000000;
}
a {
  text-decoration: none;
}
.title {
  color: black;
}
</style>
