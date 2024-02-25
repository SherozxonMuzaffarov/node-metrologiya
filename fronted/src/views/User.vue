<template>
  <div>
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0"><i class="bi bi-house-door-fill"></i>Foydalanuvchilar</p>
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
      <BFormInput v-model="FormData.name" placeholder="FIO" class="mb-3" />
      <BFormInput
        v-model="FormData.phone_number"
        placeholder="telefon raqami"
        class="mb-3"
      />
      <BFormInput v-model="FormData.password" placeholder="parol" class="mb-3" />

      <BFormSelect v-model="FormData.depo_id" :options="depos" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
        </template>
      </BFormSelect>

      <BFormSelect v-model="FormData.role" :options="roles" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Role --</BFormSelectOption>
        </template>
      </BFormSelect>
    </BModal>
    <!-- Modal create -->

    <!-- Modal update -->
    <BModal
      v-model="modalUpdate"
      @ok.prevent="handleUpdate(id)"
      @keyup.enter="handleUpdate(id)"
      @cancel="modalUpdate = !modalUpdate"
      cancelTitle="Chiqish"
      okTitle="Saqlash"
    >
      <BFormInput v-model="FormData.name" placeholder="FIO" class="mb-3" />
      <BFormInput
        v-model="FormData.phone_number"
        placeholder="telefon raqami"
        class="mb-3"
      />
      <BFormInput v-model="FormData.password" placeholder="paroli" class="mb-3" />

      <BFormSelect v-model="FormData.depo_id" :options="depos" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Depo --</BFormSelectOption>
        </template>
      </BFormSelect>

      <BFormSelect v-model="FormData.role" :options="roles" class="mb-3">
        <!-- This slot appears above the options from 'options' prop -->
        <template #first>
          <BFormSelectOption :value="null" disabled>-- Role --</BFormSelectOption>
        </template>
      </BFormSelect>
    </BModal>
    <!-- Modal update -->

    <!-- Table -->
    <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
      <BThead>
        <BTh class="id-tr">ID</BTh>
        <BTh>Nomi</BTh>
        <BTh>Telefon raqami</BTh>
        <BTh>Depo</BTh>
        <BTh>Roli</BTh>
        <BTh class="btns"></BTh>
        <BTh class="btns"></BTh>
      </BThead>
      <BTbody>
        <BTr v-for="(item, index) in Data" :key="item._id">
          <BTh class="id-tr">{{ index + 1 }}</BTh>
          <BTd>{{ item.name }}</BTd>
          <BTd>{{ item.phone_number }}</BTd>
          <BTd>{{ item?.depo_id?.name }}</BTd>
          <BTd>{{ item.role }}</BTd>
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
const modalDelete = ref(false);
const Data = ref([]);

const FormData = ref({
  _id: null,
  name: null,
  phone_number: null,
  password: null,
  depo_id: null,
  role: null,
});

let depos = ref();

const roles = ref([
  { value: "Admin", text: "Admin" },
  { value: "User", text: "User" },
]);

//create
const handleOk = async () => {
  try {
    console.log("FormData.value:   " + FormData.value);
    let res = await axios.post("/user/create", FormData.value);
    if (res) {
      getAll();
      modalCreate.value = !modalCreate.value;
      FormData.value._id = null;
      FormData.value.name = null;
      (FormData.value.phone_number = null),
        (FormData.value.password = null),
        (FormData.value.depo_id = null),
        (FormData.value.role = null);
    }
  } catch (error) {
    console.error(error);
  }
};

// update
const handleUpdate = async () => {
  let id = FormData.value._id;
  try {
    let res = await axios.patch("/user/update/" + id, FormData.value);
    if (res) {
      getAll();
      modalUpdate.value = !modalUpdate.value;
      FormData.value.id = null;
      FormData.value.name = null;
      (FormData.value.phone_number = null),
        (FormData.value.password = null),
        (FormData.value.depo_id = null),
        (FormData.value.role = null);
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
        let res = await axios.delete("/user/delete/" + id);
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
    let res = await axios.get("/user/all");
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
    let res = await axios.get("/user/one/" + id);
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
