<template>
  <div>
    <div class="d-flex align-items-center column-gap-2">
        <p class="lead m-0">
            <i class="bi bi-house-door-fill"></i>Home page
        </p>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="text-center">"O'zvagonta'mir" AJ</h3>
              <div id="chart1-container">
                <apexchart type="pie" :options="chartOptions" :series="series" />
                <div v-if="!isSectionFinished" class="overlay-message">
                  <p>This section is not finished yet</p>
                  <p>Этот раздел еще не закончен</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="text-center">VCHD-3</h3>
              <div id="chart2-container">
                <apexchart type="pie" width="100%" :options="chartOptions" :series="series" />
                <div v-if="!isSectionFinished" class="overlay-message">
                  <p>This section is not finished yet</p>
                  <p>Этот раздел еще не закончен</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-body">
              <h3 class="text-center">VCHD-6</h3>
              <div id="chart4-container">
                <apexchart type="pie" width="100%" :options="chartOptions" :series="series" />
                <div v-if="!isSectionFinished" class="overlay-message">
                  <p>This section is not finished yet</p>
                  <p>Этот раздел еще не закончен</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card mb-4">
            <div class="card-body">
              <h3 class="text-center">VCHD-5</h3>
              <div id="chart3-container">
                <apexchart type="pie" width="100%" :options="chartOptions" :series="series" />
                <div v-if="!isSectionFinished" class="overlay-message">
                  <p>This section is not finished yet</p>
                  <p>Этот раздел еще не закончен</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

const userData = ref({})
const mainRemaindingData = ref({})
const isSectionFinished = ref(false); 

const series = [44, 55, 13, 43, 22, 12];
const chartOptions = {
  chart: {
    width: '100%',
    type: 'pie',
  },
  labels: ['Kraska', 'Metalprokat', 'Elektrod', 'Pilomaterial', 'Smazka', 'Kiyim'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const getRemainding =async () => {
 let res = await axios.get('/report/main/get-remainding-by-category')
 if (res.data) {
  mainRemaindingData.value = res.data
 }
}


const getUser = async () => {
  const res = await axios.get('/user/identify-user')
  if (res.data) {
    userData.value = res.data;
    localStorage.setItem('userData', JSON.stringify(userData.value));  // Convert to JSON string before storing
  }
}

onMounted(() => {
  getUser()
  getRemainding()
})
</script>

<script>
export default {
  components: {
    apexchart: VueApexCharts,
  },
};
</script>


<style scoped>
.header-container {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
}

.card {
  border-radius: 15px;
}

.card-body {
  padding: 20px;
}

.user-data-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.overlay-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7); /* Adjust the opacity as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
</style>
