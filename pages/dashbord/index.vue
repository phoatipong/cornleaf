<template>
  <v-app>
    <Navigation></Navigation>
    <v-main>
      <v-container fluid>
        <h2>ระบบปัญญาประดิษฐ์สำหรับจำแนกโรคใบข้าวโพดผ่านไลน์แชทบอท</h2>
        <h4>
          Artificial Intelligence for Corn Leaf Disease Classification on Line
          Chatbot
        </h4>
        <v-row>
          <v-col cols="6" class="mt-5">
            <v-card rounded="lg" color="#6879aa" height="150">
              <v-card-title> จำนวนการใช้งาน (ครั้ง) </v-card-title>
              <v-card-text class="text-card">
                {{ data.predict }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(255, 159, 64)">
              <v-card-title> โรคราสนิม (ครั้ง)</v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคราสนิม }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(255, 99, 132)">
              <v-card-title> โรคใบไหม้แผลใหญ่ (ครั้ง)</v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคใบไหม้แผลใหญ่ }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(201, 203, 207)">
              <v-card-title> รคใบจุดสีเทา (ครั้ง)</v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคใบจุดสีเทา }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="success">
              <v-card-title> ปกติ (ครั้ง)</v-card-title>
              <v-card-text class="text-card"> {{ data.ปกติ }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1"></v-col>
          <div class="chart">
            <DoughnutChart :height="220" />
          </div>
          <v-col cols="4">
            <v-btn color="#FF9F40" class="mt-15"
              >โรคราสนิม {{ perRust }} %</v-btn
            >
            <br />
            <v-btn color="#FF6384" class="mt-1"
              >โรคใบไหม้แผลใหญ่ {{ perBilght }} %</v-btn
            >
            <br />
            <v-btn color="#C9CBCF" class="mt-1"
              >โรคใบจุดสีเทา {{ perSpot }} %</v-btn
            >
            <br />
            <v-btn color="#4CAF50" class="mt-1">ปกติ {{ perNormal }} %</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '~/components/navigation'
import DoughnutChart from '~/components/Chart.js'
import firebase from '~/plugins/firebaseConfig.js'

export default {
  components: { DoughnutChart, Navigation },
  data() {
    return {
      drawer: false,
      data: {},
      reportNotify: 0,
      perRust: 0,
      perBilght: 0,
      perNormal: 0,
      perSpot: 0
    }
  },
  async mounted() {
    const logined = this.$store.state.logined
    if (logined) {
      const db = firebase.database()
      const ref = db.ref('prediction/stat')
      await ref.on('value', (snap) => {
        const res = snap.val()
        this.data = res
        // for (const key in res) {
        //   this.fetchData.push({ ...res[key], id: key })
        // }
        this.perRust = (this.data.โรคราสนิม / this.data.predict) * 100
        this.perBilght = (this.data.โรคใบไหม้แผลใหญ่ / this.data.predict) * 100
        this.perSpot = (this.data.โรคใบจุดสีเทา / this.data.predict) * 100
        this.perNormal = (this.data.ปกติ / this.data.predict) * 100
        this.perRust = this.perRust.toFixed(2)
        this.perBilght = this.perBilght.toFixed(2)
        this.perSpot = this.perSpot.toFixed(2)
        this.perNormal = this.perNormal.toFixed(2)
      })
    } else {
      this.$router.replace('/dashbord/login')
    }
  },
  methods: {}
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
.v-navigation-drawer__content {
  background: #050127;
  color: #ffffff;
}

.text-card {
  text-align: center;
  font-size: 50px;
}
.v-card__text text-card {
  text-align: center;
  font-size: 50px;
}
.theme--light.v-card > .v-card__text,
.theme--light.v-card > .v-card__title {
  color: #ffffff;
}
.chart {
  width: 40%;
  text-align: center;
}
a {
  text-decoration: none;
}
</style>
