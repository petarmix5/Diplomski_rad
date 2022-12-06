<template>
  <div class="statistics">
    <h3>Statistika</h3>
    <div class="row">
    <Cards>
      <template v-slot:header>
        Količina kultura
      </template>

      <template v-slot:card-title>
        <div class="row">

          <div class="col">
            <h3><i class="fa-solid fa-list-ol text-secondary"></i></h3>
          </div>
          <div class="col value text-secondary">
            <h3>{{dataWithId.length}}</h3>
        </div>
        </div>

        </template>

    </Cards>

    <Cards>
      <template v-slot:header>
        Današnji datum
      </template>
      <template v-slot:card-title>
        <div class="row">
          <div class="col">
            <h3><i class="fa fa-calendar text-secondary" aria-hidden="true"></i></h3>
          </div>
          <div class="col value text-secondary">
            <h3> {{currentDate}}</h3>
          </div>
        </div>
      </template>
    </Cards>
  </div>

<BarChart :chartData="eachCulture"/>
  </div>
</template>

<script>
import Cards from '@/components/Cards.vue'
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from "chart.js"
import { getAuth } from '@firebase/auth'
import { db } from '@/main'
import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore'

Chart.register(...registerables)
export default{
  name: 'Statistics',
  components: { Cards, BarChart},
  setup() {

    const user = getAuth().currentUser

    const dataWithId = ref([])

    onMounted(async () =>{
      //get all data for current culture(number) / listen
      const q = query(collection(db, `chooseCulture/`), where('userID', '==', user.uid));
      onSnapshot(q, (querySnapshot) => {
      const allnewdata = []
      querySnapshot.forEach((doc) => {
      const newData = {
        id:doc.id,
        sorta: doc.data().sorta,
        kilos: doc.data().kilos,
        year: doc.data().year
        }
        allnewdata.push(newData)
      })
      dataWithId.value = allnewdata
     })

  })

  //get all data from subcollection kilos
  const que = query(collection(db,`chooseCulture/`), where('userID','==',user.uid));
  onSnapshot(que, (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      let KilosCollectionRef = collection(db, `chooseCulture/${doc.id}/kilos`)
      const Kgs = await getDocs(KilosCollectionRef)
      Kgs.forEach((item) =>{
        eachCulture.labels.push(item.data().sorta)
        eachCulture.datasets[0].data.push(item.data().kilos)
        eachCulture.datasets[0].backgroundColor.push(getRandomColor())

      })
    })
  })


  //Date
  const currentDate = new Date().toLocaleDateString()

  //random color for statistics chart
  const getRandomColor = () => {
  var hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + ("000000" + hex.toString(16)).substr(-6);
}


    const eachCulture = reactive({
      labels : [],
      datasets: [
        {
          label: 'Prinosi kultura po sortama',
          data: [],
          backgroundColor: [],
        },
      ],
    })
   return{eachCulture, dataWithId, getRandomColor, currentDate}

  }
}
</script>
<style scoped>
.col.value h3{
  float:right;
}
</style>
