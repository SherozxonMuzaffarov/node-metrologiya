<template>
  <div>
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Zahira shablonlar</p>
      <button class="btn btn-success" @click="modalCreate = !modalCreate">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>

    <!-- Modal create -->
    <BModal
      v-model="modalCreate"
      @ok.prevent="handleOk"
      @keyup.enter="handleOk"
      @cancel="modalCreate = !modalCreate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <BFormInput class="mt-3" v-model="FormData.nomi" placeholder="O'V va SU nomlari" />
      <BFormInput class="mt-3" v-model="FormData.soni" placeholder="Soni" />
      <BFormInput
        class="mt-3"
        v-model="FormData.ishlabChiqarilganYili"
        placeholder="Ishlab chiqarilgan yili"
      />
      <BFormInput
        class="mt-3"
        v-model="FormData.raqami"
        placeholder="Zavodda ishlab chiqarilgan raqami"
      />
      <BFormInput class="mt-3" v-model="FormData.turi" placeholder="Turi" />
      <BFormInput class="mt-3" v-model="FormData.ishi" placeholder="Bajaradigan ishi" />
      <BFormSelect v-model="FormData.depo_id" :options="depos" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
        </template>
      </BFormSelect>
      <BFormInput class="mt-3" v-model="FormData.izoh" placeholder="Izoh" />
    </BModal>
    <!-- Modal create -->

    <!-- Modal update -->
    <BModal
      v-model="modalUpdate"
      @ok.prevent="handleUpdate"
      @keyup.enter="handleUpdate"
      @cancel="modalUpdate = !modalUpdate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <BFormInput class="mt-3" v-model="FormData.nomi" placeholder="O'V va SU nomlari" />
      <BFormInput class="mt-3" v-model="FormData.soni" placeholder="Soni" />
      <BFormInput class="mt-3"
        v-model="FormData.ishlabChiqarilganYili"
        placeholder="Ishlab chiqarilgan yili"
      />
      <BFormInput class="mt-3"
        v-model="FormData.raqami"
        placeholder="Zavodda ishlab chiqarilgan raqami"
      />
      <BFormInput class="mt-3" v-model="FormData.turi" placeholder="Turi" />
      <BFormInput class="mt-3" v-model="FormData.ishi" placeholder="Bajaradigan ishi" />
      <BFormSelect v-model="FormData.depo_id" :options="depos" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
        </template>
      </BFormSelect>
      <BFormInput class="mt-3" v-model="FormData.izoh" placeholder="Izoh" />
    </BModal>
    <!-- Modal update -->

    <!-- Table -->
    <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
      <BThead>
        <BTh>№</BTh>
        <BTh>O'V va SU nomlari</BTh>
        <BTh>Soni</BTh>
        <BTh>Ishlab chiqarilgan yili</BTh>
        <BTh>Zavodda ishlab chiqarilgan raqami</BTh>
        <BTh>Turi</BTh>
        <BTh>Bajaradigan ishi</BTh>
        <BTh>VCHD</BTh>
        <BTh>Izoh</BTh>
        <BTh>Action</BTh>
        <BTh class="btns"></BTh>
        <BTh class="btns"></BTh>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in Data" :key="item._id">
          <BTd>{{ index + 1 }}</BTd>
          <BTd>{{ item.nomi }}</BTd>
          <BTd>{{ item.soni }}</BTd>
          <BTd>{{ item.ishlabChiqarilganYili }}</BTd>
          <BTd>{{ item.raqami }}</BTd>
          <BTd>{{ item.turi }}</BTd>
          <BTd>{{ item.ishi }}</BTd>
          <BTd>{{ item.depo_id.name }}</BTd>
          <BTd>{{ item.izoh }}</BTd>
          <BTd class="btns">
            <button @click="getOne(item._id)" class="btn btn-primary m-0">
              <i class="bi bi-pen-fill"></i>
            </button>
          </BTd>
          <BTd class="btns">
            <button @click="deleteItem(item._id)" class="btn btn-danger m-0">
              <i class="bi bi-trash-fill"></i>
            </button>
          </BTd>
        </BTr>
      </BTbody>
    </BTableSimple>
    <!-- Table -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const modalCreate = ref(false);
const modalUpdate = ref(false);
const Data = ref([]);
let depos = ref([]);

const FormData = ref({
  id: null,
  nomi: null,
  soni: null,
  ishlabChiqarilganYili: null,
  raqami: null,
  turi: null,
  ishi: null,
  izoh: null,
  depo_id: null,
});

//create
const handleOk = async () => {
  try {
    let res = await axios.post("/metrologiya-sklad/create", FormData.value);
    if (res) {
      getAll();
      modalCreate.value = !modalCreate.value;
      FormData.value.id= null,
      FormData.value.nomi= null,
      FormData.value.soni= null,
      FormData.value.ishlabChiqarilganYili= null,
      FormData.value.raqami= null,
      FormData.value.turi= null,
      FormData.value.ishi= null,
      FormData.value.izoh= null,
      FormData.value.depo_id= null
    }
  } catch (error) {
    console.error(error);
  }
};

// update
const handleUpdate = async () => {
  let id = FormData.value._id;
  try {
    console.log("ID: " + id);
    let res = await axios.patch("/metrologiya-sklad/update/" + id, FormData.value);
    if (res) {
      getAll();
      modalUpdate.value = !modalUpdate.value;
      FormData.value.id= null,
      FormData.value.nomi= null,
      FormData.value.soni= null,
      FormData.value.ishlabChiqarilganYili= null,
      FormData.value.raqami= null,
      FormData.value.turi= null,
      FormData.value.ishi= null,
      FormData.value.izoh= null,
      FormData.value.depo_id= null
    }
  } catch (error) {
    console.error(error);
  }
};

//delete
const deleteItem = async (id) => {
  try {
    if (!id) return;
    let confirmDelete = confirm("Tasdiqlaysizmi?");
    if (confirmDelete) {
      try {
        let res = await axios.delete("/metrologiya-sklad/delete/" + id);
        alert("Ma'lumot o'chirildi");
        getAll();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Delete cancelled");
    }
  } catch (error) {
    console.error(error);
  }
};

//getAll
let getAll = async () => {
  try {
    let res = await axios.get("/metrologiya-sklad/all");
    if (res.data) {
      Data.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// getOne;
let getOne = async (id) => {
  try {
    let res = await axios.get("/metrologiya-sklad/one/" + id);
    if (res.data) {
      FormData.value = res.data;
      modalUpdate.value = !modalUpdate.value;
    }
  } catch (error) {
    console.error(error);
  }
};

//getAllDepos
let getAllDepos = async () => {
  try {
    let res = await axios.get("/depo/all");
    if (res.data) {
      console.log(res.data);
      depos = res.data.map(function (depo) {
        return { text: depo.name, value: depo._id };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAll();
  getAllDepos();
});
</script>

<style lang="scss" scoped>
.id-tr {
  width: 23px;
  text-align: center;
}

.btns {
  width: 70px;
  text-align: center;
}
</style>
