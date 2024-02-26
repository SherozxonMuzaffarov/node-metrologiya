<template>
  <div class="container">
    <div class="row">
      <div class="col-sm col-md col-lg container justify-content-center card">
        <div class="container bg-yellow d-flex justify-content-center text-black">
          <h1>Shablon yangilash</h1>
        </div>
        <hr />
        <form @submit.prevent="handleUpdate">
          <div class="row">
            <div class="form-group col">
              <label>Nomi</label>
              <input
                v-model="formData.nomi"
                class="form-control"
                placeholder="O'V va SU nomlarini kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Soni</label>
              <input
                v-model="formData.soni"
                type="number"
                min="1"
                value="0"
                class="form-control"
                placeholder="sonini kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Ishlab chiqarilgan yili</label>
              <input
                v-model="formData.ishlabChiqarilganYili"
                type="number"
                min="1950"
                max="2099"
                value="2022"
                class="form-control"
                placeholder="ishlab chiqarilgan yili kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Zavodda ishlab chiqarilgan raqami</label>
              <input
                v-model="formData.raqami"
                class="form-control"
                placeholder="zavodda ishlab chiqarilgan raqami kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Turi</label>
              <input
                v-model="formData.turi"
                class="form-control"
                placeholder="turini kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Bajaradigan ishi</label>
              <input
                v-model="formData.ishi"
                class="form-control"
                placeholder="bajaradigan ishini kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>O'V/SU ning saqlanish joyi</label>
              <input
                v-model="formData.saqlanishJoyi"
                class="form-control"
                placeholder="o'v/su ning saqlanish joyini kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Sertifikatsiyalash, qiyoslash, kalibrlash raqami va sanasi</label>
              <input
                v-model="formData.serRaqamiSanasi"
                class="form-control"
                placeholder="Sertifikatsiyalash, qiyoslash, kalibrlash raqami va sanasini kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Sertifikat kim tomonidan berilgan</label>
              <input
                v-model="formData.serBerganKorxona"
                class="form-control"
                placeholder="o'v/su ning saqlanish joyini kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Sarflangan mablag'</label>
              <input
                v-model="formData.sarflanganMablag"
                type="number"
                class="form-control"
                placeholder="sarflangan mablag'ni kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Keyingi qiyoslash va kalibrlash sanasi</label>
              <input
                v-model="formData.serKeyingiSanasi"
                type="date"
                class="form-control"
                placeholder="keyingi qiyoslash va kalibrlash sanasini kiriting"
              />
            </div>
            <div class="form-group col">
              <label>Qiyoslash va kalibrlashning davriyligi</label>
              <input
                v-model="formData.serDavriyligi"
                type="number"
                min="1"
                value="0"
                class="form-control"
                placeholder="qiyoslash va kalibrlashning davriyligini kiriting"
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Tuzilgan shartnomaning raqami va sanasi</label>
              <input
                v-model="formData.shartnomaRaqamiSanasi"
                class="form-control"
                placeholder="tuzilgan shartnomaning raqami va sanasini kiriting"
              />
            </div>
            <div class="form-group col">
              <label for="sel1">Depo nomi</label>
              <select v-model="formData.depo_id" class="form-control" id="sel1">
                <option v-for="depo in depos" :key="depo._id" :value="depo._id">
                  {{ depo.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="form-group col">
              <label>Izoh</label>
              <input
                v-model="formData.izoh"
                class="form-control"
                placeholder="izoh kiritishingiz mumkin"
              />
            </div>
          </div>

          <!-- New field: _id (hidden, to store the document ID) -->
          <input type="hidden" v-model="formData._id" />

          <div class="box-footer justify-content-center row">
            <button type="submit" class="btn btn-primary btn-block col">
              <i class="bi bi-check-circle"></i> Saqlash
            </button>
            <router-link :to="'/metrology'" class="btn btn-danger col">
              <i class="bi bi-arrow-left-circle"></i> Ortga
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

let depos = ref([]);
const formData = ref({
  _id: null, // Add this field to store the document ID
  nomi: "",
  soni: 0,
  ishlabChiqarilganYili: 2022,
  raqami: "",
  turi: "",
  ishi: "",
  saqlanishJoyi: "",
  serRaqamiSanasi: "",
  serBerganKorxona: "",
  sarflanganMablag: 0,
  serKeyingiSanasi: "",
  serDavriyligi: 0,
  shartnomaRaqamiSanasi: "",
  depo_id: null,
  izoh: "",
});

const handleUpdate = async () => {
  try {
    const response = await axios.put('/metrologiya/update/' + route.params.id,formData.value);
    if (response.data) {
      alert("Yangilandi");
      // Reset form data after successful submission if needed
      formData.value = {
        nomi: "",
        soni: 0,
        ishlabChiqarilganYili: 2022,
        raqami: "",
        turi: "",
        ishi: "",
        saqlanishJoyi: "",
        serRaqamiSanasi: "",
        serBerganKorxona: "",
        sarflanganMablag: 0,
        serKeyingiSanasi: "",
        serDavriyligi: 0,
        shartnomaRaqamiSanasi: "",
        depo_id: null,
        izoh: "",
      };
       // Redirect to the '/metrologiya' URL
      router.push('/metrology');
    }
  } catch (error) {
    console.error(error);
    // Handle error, show user-friendly message, etc.
  }
};

const getMetrologyData = async () => {
  try {
    // Fetch the metrology data by ID and populate the form
    const res = await axios.get("/metrologiya/one/" + route.params.id);
    if (res.data) {
      formData.value = res.data;
    }
  } catch (error) {
    console.error(error);
    // Handle error, show user-friendly message, etc.
  }
};

// getAllDepo
const getAllDepo = async () => {
  try {
    const res = await axios.get("/depo/all");
    if (res.data) {
      depos.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // Fetch metrology data when the component is mounted
  getMetrologyData();
  getAllDepo();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
