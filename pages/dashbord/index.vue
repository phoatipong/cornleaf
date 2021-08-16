<template>
  <v-app>
    <Navigation></Navigation>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="6" class="mt-5">
            <v-card rounded="lg" color="#6879aa" height="150">
              <v-card-title>
                <p>จำนวนการใช้งาน</p>
              </v-card-title>
              <v-card-text class="text-card"> {{ data.predict }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(255, 159, 64)">
              <v-card-title> <p>โรคราสนิม</p></v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคราสนิม }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(255, 99, 132)">
              <v-card-title> <p>โรคใบไหม้แผลใหญ่</p></v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคใบไหม้แผลใหญ่ }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="rgb(201, 203, 207)">
              <v-card-title> <p>โรคใบจุดสีเทา</p></v-card-title>
              <v-card-text class="text-card">
                {{ data.โรคใบจุดสีเทา }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card rounded="lg" min-height="140" color="success">
              <v-card-title> <p>สุขภาพดี</p></v-card-title>
              <v-card-text class="text-card"> {{ data.สุขภาพดี }} </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4"></v-col>
          <div class="chart">
            <DoughnutChart :height="300" />
          </div>
          <v-col cols="4"></v-col>
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
    }
  },
  async mounted() {
    const db = firebase.database()
    const ref = db.ref('prediction/stat')
    await ref.on('value', (snap) => {
      const res = snap.val()
      this.data = res
      for (const key in res) {
        this.fetchData.push({ ...res[key], id: key })
      }
    })
  },
  methods: {},
}
</script>

<style lang="postcss">
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
.v-list-item__title {
  color: #ffffff;
}
.text-card {
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
