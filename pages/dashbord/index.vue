<template>
  <v-app>
    <Navigation />

    <v-container fluid>
      <div class="ml-15">
        <h2>ระบบปัญญาประดิษฐ์สำหรับจำแนกโรคใบข้าวโพดผ่านไลน์แชทบอท</h2>
        <h4>
          Artificial Intelligence for Corn Leaf Disease Classification on Line
          Chatbot
        </h4>
      </div>

      <v-row class="ml-14">
        <v-col cols="6" class="mt-5">
          <v-card rounded="lg" color="#6879aa" height="150">
            <v-card-title> จำนวนการใช้งาน (ครั้ง) </v-card-title>
            <v-card-text class="text-card">
              {{ data.predict }}
            </v-card-text>
          </v-card>
        </v-col>

        <div class="chart">
          <DoughnutChart :height="300" />
        </div>

        <v-col cols="2">
          <v-btn color="#FF9F40" class="mt-15">โรคราสนิม {{ perRust }} %</v-btn>
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
          <br />
          <v-btn color="#ff0000" class="mt-1"
            >ไม่สามารถวินิจฉัยได้ {{ perNotCornLeaf }} %</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="mt-5 ml-15">
        <v-col cols="3">
          <v-card rounded="lg" min-height="140" color="rgb(255, 159, 64)">
            <v-card-title> โรคราสนิม (ครั้ง)</v-card-title>
            <v-card-text class="text-card">
              {{ data.cornRust }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card rounded="lg" min-height="140" color="rgb(255, 99, 132)">
            <v-card-title> โรคใบไหม้แผลใหญ่ (ครั้ง)</v-card-title>
            <v-card-text class="text-card">
              {{ data.blight }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card rounded="lg" min-height="140" color="rgb(201, 203, 207)">
            <v-card-title> โรคใบจุดสีเทา (ครั้ง)</v-card-title>
            <v-card-text class="text-card">
              {{ data.graySpot }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card rounded="lg" min-height="140" color="success">
            <v-card-title> ปกติ (ครั้ง)</v-card-title>
            <v-card-text class="text-card"> {{ data.healty }} </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card rounded="lg" color="#ff0000" height="140">
            <v-card-title> ไม่สามารถวินิจฉัยได้ (ครั้ง)</v-card-title>
            <v-card-text class="text-card">
              {{ data.notCornLeaf }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row> </v-row>
    </v-container>
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
      perSpot: 0,
      perNotCornLeaf: 0,
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
        this.perRust = (this.data.cornRust / this.data.predict) * 100
        this.perBilght = (this.data.blight / this.data.predict) * 100
        this.perSpot = (this.data.graySpot / this.data.predict) * 100
        this.perNormal = (this.data.healty / this.data.predict) * 100
        this.perNotCornLeaf = (this.data.notCornLeaf / this.data.predict) * 100
        this.perRust = this.perRust.toFixed(2)
        this.perBilght = this.perBilght.toFixed(2)
        this.perSpot = this.perSpot.toFixed(2)
        this.perNormal = this.perNormal.toFixed(2)
        this.perNotCornLeaf = this.perNotCornLeaf.toFixed(2)
      })
    } else {
      this.$router.replace('/dashbord/login')
    }
  },
  methods: {},
}
</script>

<style lang="postcss" scoped>
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
.v-card__subtitle,
.v-card__text {
  font-size: 50px;
  color: #ffffff;
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
  width: 400px;
  text-align: left;
}
a {
  text-decoration: none;
}
</style>
