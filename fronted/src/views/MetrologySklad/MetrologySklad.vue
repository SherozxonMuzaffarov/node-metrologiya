<template>
    <div>
        <div class="d-flex align-items-center column-gap-2">
            <p class="lead m-0">
                <i class="bi bi-house-door-fill"></i>Birliklar 
            </p>
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
            <BFormInput v-model="FormData.name" placeholder= "Nomi" />
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
            <BFormInput v-model="FormData.name" placeholder= "Nomi" />
        </BModal>
        <!-- Modal update -->

        <!-- Table -->
        <BTableSimple striped="true" hover="true" bordered="true" class="mt-4">
            <BThead>
                <BTh class="id-tr">ID</BTh>
                <BTh>Nomi</BTh>
                <BTh class="btns"></BTh>
                <BTh class="btns"></BTh>
            </BThead>
            <BTbody>
                <BTr v-for="item in Data" :key="item.id">
                    <BTh class="id-tr">{{ item.id }}</BTh>
                    <BTd>{{ item.name }}</BTd>
                    <BTd class="btns">
                        <button @click="getOne(item.id)" class="btn btn-primary m-0"><i class="bi bi-pen-fill"></i></button>
                    </BTd>
                    <BTd class="btns">
                        <button @click="deleteItem(item.id)" class="btn btn-danger m-0"><i class="bi bi-trash-fill"></i></button>
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
    id: null,
    name: null,
});

    //create
    const handleOk = async () => {
        try {
            let res = await axios.post("/measure/create", FormData.value);
            if (res) {
                getAll();
                modalCreate.value = !modalCreate.value;
                FormData.value.id = null;
                FormData.value.name = null;
            }
        } catch (error) {
            console.error(error);
        }
    };

    // update
    const handleUpdate = async () => {
        let id = FormData.value.id;
        try {
            let res = await axios.patch("/measure/update/" + id, FormData.value);
            if (res) {
                getAll();
                modalUpdate.value = !modalUpdate.value;
                FormData.value.id = null;
                FormData.value.name = null;
            }
        } catch (error) {
            console.error(error);
        }
    };

    //delete
    const deleteItem = async(id) => {
        try {
            if(!id) return;
        let confirmDelete = confirm("Tasdiqlaysizmi?");
        if (confirmDelete) {
                try {
                    let res = await axios.delete("/measure/delete/" + id);
                    alert("Ma'lumot o'chirildi")
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
    }

    //getAll
    let getAll = async () => {
        try {
            let res = await axios.get("/measure/all")
            if(res.data) {
                Data.value = res.data
            }
        } catch (error) {
            console.error(error);
        }
    }

    // getOne;
    let getOne = async(id) => {
        try {
            let res = await axios.get("/measure/one/" + id);
            if (res.data) {
                FormData.value = res.data;
                modalUpdate.value = !modalUpdate.value;
            }
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(()=>{
        getAll();
    })
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
