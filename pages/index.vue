<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <indexBtn title="ความรู้ทั่วไป" />
        </v-col>
        <v-col cols="6">
          <indexBtn title="การป้องกัน" />
        </v-col>
        <v-col cols="6">
          <nuxt-link to="/report">
            <indexBtn title="ปรึกษา หรือ แจ้งปัญหาการใช้งาน" />
          </nuxt-link>
        </v-col>
        <v-col cols="6">
          <indexBtn title="ปัญหาที่พบบ่อย" />
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
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
