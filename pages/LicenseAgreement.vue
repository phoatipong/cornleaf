<template>
  <v-app>
    <v-main>
      <v-container class="mt-5">
        <v-row justify="center" align="center">
          <h3>ข้อตกลงในการใช้ซอฟต์แวร์</h3>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <p
                  style="
                    font-size: 18px;
                    text-align: justify;
                    text-justify: inter-word;
                  "
                >
                  &nbsp;&nbsp;&nbsp; ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย
                  พฤติพงศ์ มุสิกอง และ ณัฐภาส ผลากอง จาก มหาวิทยาลัยแม่โจ้
                  ภายใต้การดูแลของ นายภานุวัฒน์ เมฆะ ภายใต้โครงการ
                  ระบบปัญญาประดิษฐ์สำหรับจำแนกโรคใบข้าวโพดผ่านไลน์แชทบอท
                  ซึ่งสนับสนุนโดย สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                  โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์
                  ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา
                  ซึ่งผู้พัฒนาได้อนุญาตให้สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                  เผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ
                  ทั้งสิ้น
                  ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์
                  โดยไม่คิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น
                  สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                  จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน
                  หรือพัฒนาประสิทธิภาพซอฟต์แวร์
                  รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์
                  ตลอดจนไม่รับประกันความเสียหายต่างๆ
                  อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
                </p>

                <br />
                <p
                  style="
                    font-size: 18px;
                    text-align: justify;
                    text-justify: inter-word;
                  "
                >
                  &nbsp;&nbsp;&nbsp; License Agreement This software is a work
                  developed by Phoatipong Musikong and Nattapas Palakong from
                  Maejo University under the provision of Panuwat Mekha,
                  Artificial Intelligence for Corn Leaf Disease Classification
                  on Line Chatbot which has been supported by the National
                  Science and Technology Development Agency ( NSTDA) , in order
                  to encourage pupils and students to learn and practice their
                  skills in developing software. Therefore, the intellectual
                  property of this software shall belong to the developer and
                  the developer gives NSTDA a permission to distribute this
                  software as an “as is” and non- modified software for a
                  temporary and non- exclusive use without remuneration to
                  anyone for his or her own purpose or academic purpose, which
                  are not commercial purposes. In this connection, NSTDA shall
                  not be responsible to the user for taking care, maintaining,
                  training or developing the efficiency of this software.
                  Moreover, NSTDA shall not be liable for any error, software
                  efficiency and damages in connection with or arising out of
                  the use of the software.”
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
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
.v-list-item__title {
  font-size: 2rem;
}
.v-list-item__content {
  margin-bottom: 24 px;
}
a {
  text-decoration: none;
}
</style>
