<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <nuxt-link to="/knowledge">
            <indexBtn title="ความรู้ทั่วไป" />
          </nuxt-link>
        </v-col>
        <v-col cols="12">
          <nuxt-link to="/report">
            <indexBtn title="ปรึกษา หรือ แจ้งปัญหาการใช้งาน" />
          </nuxt-link>
        </v-col>
        <v-col cols="12">
          <nuxt-link to="/FAQ">
            <indexBtn title="ปัญหาที่พบบ่อย" />
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import indexBtn from '~/components/indexBtn'
export default {
  components: {
    indexBtn,
  },
  methods: {},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
.v-application {
  font-family: 'Prompt', sans-serif;
}
a {
  text-decoration: none;
}
</style>
