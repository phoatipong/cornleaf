<template>
  <v-app>
    <Navigation />
    <v-main class="mt-10 mb-10">
      <v-row justify="center">
        <v-col cols="12" class="ml-10">
          <nuxt-link to="/dashbord/edit/diseases">
            <v-icon color="white">mdi-keyboard-backspace</v-icon>
          </nuxt-link>
        </v-col>
        <v-col cols="6">
          <v-card light>
            <v-col>
              <v-form ref="form" v-model="valid" lazy-validation>
                <label for="">ชื่อโรค</label>
                <v-text-field
                  v-model="title"
                  outlined
                  label="Name"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="img"
                  label="เพิ่มรูป"
                  filled
                  prepend-icon="mdi-camera"
                  @change="Preview_img($event)"
                ></v-file-input>
                <label>สาเหตุ</label>
                <br />
                <v-btn-toggle v-model="toggle_exclusive" multiple>
                  <v-btn small @click="newline_pathogenesis">
                    ขึ้นบรรทัดใหม่
                  </v-btn>
                </v-btn-toggle>
                <v-textarea
                  v-model="pathogenesis"
                  outlined
                  required
                ></v-textarea>
                <label for="">อาการ</label>
                <br />
                <v-btn-toggle v-model="toggle_exclusive" multiple>
                  <v-btn small @click="newline_symtoms"> ขึ้นบรรทัดใหม่ </v-btn>
                </v-btn-toggle>
                <v-textarea v-model="symtoms" outlined required></v-textarea>
                <label for="">การป้องกันและกำจัด</label>
                <br />
                <v-btn-toggle v-model="toggle_exclusive" multiple>
                  <v-btn small @click="newline_management">
                    ขึ้นบรรทัดใหม่
                  </v-btn>
                </v-btn-toggle>
                <v-textarea v-model="management" outlined required>
                </v-textarea>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="store"
                >
                  ตกลง
                </v-btn>
                <v-btn
                  :disabled="!valid"
                  color="error"
                  class="mr-4"
                  @click="overlay = !overlay"
                >
                  ลบ
                </v-btn>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
        <v-overlay :absolute="absolute" :value="overlay">
          <v-btn color="error" @click="del"> ยืนยัน </v-btn>
          <v-btn color="" @click="overlay = false"> ยกเลิก </v-btn>
        </v-overlay>
        <v-col cols="4">
          <v-card light>
            <div>
              <v-container>
                <v-row class="mt-7">
                  <v-col>
                    <h3>{{ title }}</h3>
                  </v-col>
                </v-row>
                <v-img
                  contain
                  max-height="155"
                  max-width="233"
                  class="mt-3 rounded-lg"
                  :src="imgUrl"
                />
                <v-row class="mt-2">
                  <v-col cols="12">
                    <p class="title-content">สาเหตุ</p>
                    <p class="content" v-html="pathogenesis"></p>
                    <p class="title-content">อาการ</p>
                    <p class="content" v-html="symtoms"></p>
                    <p class="title-content">การป้องกันและกำจัด</p>
                    <p class="content" v-html="management"></p>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '~/components/navigation.vue'
import firebase from '~/plugins/firebaseConfig'
export default {
  components: { Navigation },
  data() {
    return {
      overlay: false,
      valid: true,
      title: '',
      oldtitle: '',
      img: '',
      management: '',
      pathogenesis: '',
      symtoms: '',
      imgUrl: '',
      imageData: null,
      urlStoreImg: '',
      fatchData: {},
    }
  },
  async mounted() {
    if (this.$store.state.logined) {
      const db = firebase.database()
      const ref = db.ref(`data/diseases/${this.$route.query.index}`)
      await ref.on('value', (snap) => {
        const data = snap.val()
        this.title = data.title
        this.oldtitle = data.title
        this.imgUrl = data.img
        this.management = data.management
        this.symtoms = data.symtoms
        this.pathogenesis = data.pathogenesis
      })
    } else {
      this.$router.replace('/dashbord/login')
    }
  },
  methods: {
    newline_management() {
      this.management = this.management + '<br>'
    },
    newline_symtoms() {
      this.symtoms = this.symtoms + '<br>'
    },
    newline_pathogenesis() {
      this.pathogenesis = this.pathogenesis + '<br>'
    },
    Preview_img(e) {
      console.log(e)
      this.imgUrl = URL.createObjectURL(this.img)
      this.imageData = e
    },
    store() {
      if (this.imageData === null) {
        const db = firebase.database()
        const ref = db.ref(`data/diseases/${this.$route.query.index}`)
        ref
          .update({
            title: this.title,
            symtoms: this.symtoms,
            pathogenesis: this.pathogenesis,
            management: this.management,
          })
          .then(() => {
            this.$router.replace('/dashbord/edit/diseases')
          })
      } else {
        firebase.storage().ref(`img/${this.imageData.name}`).put(this.imageData)
        setTimeout(() => {
          firebase
            .storage()
            .ref(`img/${this.imageData.name}`)
            .getDownloadURL()
            .then((url) => {
              this.urlStoreImg = url
            })
            .then(() => {
              const db = firebase.database()
              const ref = db.ref(`data/diseases/${this.$route.query.index}`)
              ref.update({
                title: this.title,
                symtoms: this.symtoms,
                pathogenesis: this.pathogenesis,
                management: this.management,
                img: this.urlStoreImg,
              })
            })
            .then(() => {
              alert('สำเร็จ')
              this.$router.replace('/dashbord/edit/diseases')
            })
        }, 1000)
      }
    },
    del() {
      const db = firebase.database()
      const ref = db.ref(`data/diseases/${this.$route.query.index}`)
      ref.remove().then(() => this.$router.replace('/dashbord/edit/diseases'))
    },
    validate() {
      if (
        this.title === '' ||
        this.pathogenesis === '' ||
        this.symtoms === '' ||
        this.management === ''
      ) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      } else {
        console.log('ok')
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
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

.v-application {
  font-family: 'Prompt', sans-serif;
}
.title-content {
  font-size: 18px;
}
.content {
  font-size: 14px;
}
</style>
