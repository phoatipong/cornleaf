import { Doughnut } from 'vue-chartjs'
import firebase from '~/plugins/firebaseConfig'

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: '#4caf50',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}

export default {
  extends: Doughnut,
  data() {
    return {
      res: {},
      data: {
        labels: ['โรคราสนิม', 'โรคใบไหม้แผลใหญ่', 'โรคใบจุดสีเทา', 'ปกติ'],
        datasets: [
          {
            backgroundColor: [
              chartColors.orange,
              chartColors.red,
              chartColors.grey,
              chartColors.green,
            ],
            data: [],
          },
        ],
      },
    }
  },
  async mounted() {
    const db = firebase.database()
    const ref = db.ref('prediction/stat')
    await ref.on('value', (snap) => {
      const res = snap.val()
      this.data.datasets[0].data = [
        res.โรคราสนิม,
        res.โรคใบไหม้แผลใหญ่,
        res.โรคใบจุดสีเทา,
        res.ปกติ,
      ]

      this.renderChart(this.data, {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'สรุปยอด',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      })
    })
  },
}
