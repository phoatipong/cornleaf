<template>
  <v-navigation-drawer permanent expand-on-hover app>
    <!-- <v-list-item class="px-2">
      <v-list-item-title>Corn Leaf Dashbord</v-list-item-title>
    </v-list-item> -->
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#ffffff">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <nuxt-link to="/dashbord">
            <v-list-item-title>หน้าหลัก</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#ffffff">mdi-history</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <nuxt-link to="/dashbord/log">
            <v-list-item-title>ประวัติการวินิจฉัย</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#ffffff">mdi-email-alert</v-icon>
          <v-badge v-if="reportNotify != 0" color="red" :content="reportNotify">
          </v-badge>
        </v-list-item-icon>
        <v-list-item-content>
          <nuxt-link to="/dashbord/report">
            <v-list-item-title>ปัญหาการใช้งานและข้อสงสัย</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#ffffff">mdi-note-edit-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <nuxt-link to="/dashbord/edit">
            <v-list-item-title>จัดการเนื้อหา</v-list-item-title>
          </nuxt-link>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon color="error">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ออกจากระบบ</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from '~/plugins/firebaseConfig'
export default {
  data() {
    return {
      reportNotify: 0,
    }
  },
  async mounted() {
    const db = firebase.database()
    const refReport = db.ref('report').orderByChild('read').equalTo(false)
    await refReport.on('value', (res) => {
      const data = res.val()
      this.reportNotify = Object.keys(data).length
    })
  },
  methods: {
    logout() {
      this.$store.commit('setLogined', false)
      this.$router.replace('/dashbord/login')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.theme--light.v-navigation-drawer{
    background: #050d27;
    color: #ffffff;
}
.theme--light.v-application {
  background: #001040;
  color: #ffffff;
}
.v-application {
  font-family: 'Prompt', sans-serif;
}

</style>
