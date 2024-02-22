<template>
    <div class="container">
      <div class="row">
        <div class="col-sm col-md col-lg container justify-content-center card">
          <div class="container bg-yellow d-flex justify-content-center text-black">
            <h1>Shablon qo'shish</h1>
          </div>
          <hr />
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="form-group col">
                <label>Nomi</label>
                <input v-model="formData.nomi" class="form-control" placeholder="O'V va SU nomlarini kiriting" />
              </div>
              <div class="form-group col">
                <label>Soni</label>
                <input v-model="formData.soni" type="number" min="1" value="0" class="form-control" placeholder="sonini kiriting" />
              </div>
            </div>
            <!-- Add other form fields as needed -->
  
            <div class="box-footer justify-content-center row">
              <button type="submit" class="btn btn-primary btn-block col">Saqlash</button>
              <router-link to="/metrologiya" class="btn btn-danger col">Ortga</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const formData = ref({
    nomi: "",
    soni: 0,
    // Add other form fields here
  });
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/metrologiya/template", formData.value);
      if (response.data) {
        alert("Saqlandi");
        // Reset form data after successful submission if needed
        formData.value = {
          nomi: "",
          soni: 0,
          // Reset other form fields here
        };
      }
    } catch (error) {
      console.error(error);
      // Handle error, show user-friendly message, etc.
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here if needed */
  </style>
  