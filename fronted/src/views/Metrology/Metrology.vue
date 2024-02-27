<template>
  <div >
    <div class="d-flex align-items-center column-gap-2">
      <p class="lead m-0">
        <i class="bi bi-house-door-fill"></i>Sexdagi mavjud shablonlar
      </p>
      <button class="btn btn-success" @click="$router.push('/metrology/create')">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>

    <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
      <BThead>
        <BTr>
          <BTh rowspan="3">№</BTh>
          <BTh rowspan="3">O'V va SU nomlari</BTh>
          <BTh rowspan="3">Soni</BTh>
          <BTh rowspan="3">Ishlab chiqarilgan yili</BTh>
          <BTh rowspan="3">Zavodda ishlab chiqarilgan raqami</BTh>
          <BTh rowspan="3">Turi</BTh>
          <BTh rowspan="3">Bajaradigan ishi</BTh>
          <BTh rowspan="3">O'V/SU ning saqlanish joyi</BTh>
          <BTh colspan="4">Qiyoslash / kalibrlash yili</BTh>
          <BTh rowspan="3">Qiyoslash va kalibrlashning davriyligi</BTh>
          <BTh rowspan="3">Tuzilgan shartnomaning raqami va sanasi</BTh>
          <BTh rowspan="3">VCHD</BTh>
          <BTh rowspan="3">Izoh</BTh>
          <BTh rowspan="3"> </BTh>
        </BTr>
        <BTr>
          <BTh colspan="3">Nazoratdan o'tgan asboblar</BTh>
          <BTh colspan="1">Reja asosida</BTh>
        </BTr>
        <BTr>
          <BTh>Sertifikatsiyalash, qiyoslash, kalibrlash raqami va sanasi</BTh>
          <BTh>Sertifikat kim tomonidan berilgan</BTh>
          <BTh>Sarflangan mablag'</BTh>
          <BTh>Keyingi qiyoslash va kalibrlash sanasi</BTh>
        </BTr>
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
          <BTd>{{ item.saqlanishJoyi }}</BTd>
          <BTd>{{ item.serRaqamiSanasi }}</BTd>
          <BTd>{{ item.serBerganKorxona }}</BTd>
          <BTd>{{ item.sarflanganMablag }}</BTd>
          <BTd>{{ item.serKeyingiSanasi }}</BTd>
          <BTd>{{ item.serDavriyligi }}</BTd>
          <BTd>{{ item.shartnomaRaqamiSanasi }}</BTd>
          <BTd>{{ item.depo_id.name }}</BTd>
          <BTd>{{ item.izoh }}</BTd>
          <BTd class="btns">
            <button
              @click="$router.push('/metrology/update/' + item._id)"
              class="btn btn-primary m-0"
            >
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const Data = ref([]);

// getAll
let getAll = async () => {
  try {
    let res = await axios.get("/metrologiya/all");
    if (res.data) {
      Data.value = res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

//delete
const deleteItem = async (id) => {
  if (!id) return;
  const confirmDelete = confirm("Tasdiqlaysizmi?");
  if (confirmDelete) {
    try {
      let res = await axios.delete("/metrology/delete/" + id);
      alert("Ma'lumot o'chirildi");
      getAll();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Delete canceled");
  }
};

onMounted(() => {
  getAll();
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
