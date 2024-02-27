<template>
    <div class="container-fluid pt-1">
      <!-- Toggle button with house door icon -->
      <button class="btn btn-light btn-lg border-2 rounded-circle text-danger" @click="click">
        <i class="bi bi-list"></i>
    </button>
  
      <!-- Sidebar Offcanvas -->
      <BOffcanvas v-model="show">
        <!-- Sidebar Content -->
        <div class="sidebar-content">
          <!-- Home Button -->
          <BButton to="/" variant="primary w-100" @click="click" :disabled="userData.role == 'User'">
            <i class="bi bi-house-door"></i> Bosh sahifa
          </BButton>
  
          <!-- Malumotlar Section -->
          <BButton v-b-toggle="'collapse-2'" class="mt-2" variant="primary w-100" :disabled="userData.role == 'User'">
            <i class="bi bi-info-circle"></i> Malumotlar
          </BButton>
  
          <!-- Collapse Element for Malumotlar Section -->
          <BCollapse id="collapse-2" class="mt-1">
            <div class="card p-1">
              <!-- Viloyatlar Link (if user role is not 'User') -->
              <BButton
                v-if="userData.role !== 'User'"
                variant="outline-link m-0"
                @click="click"
              >
                <router-link to="/region" class="text-decoration-none w-100">
                  Viloyatlar
                </router-link>
              </BButton>

              <!-- Korxonalar Link (if user role is not 'User') -->
              <BButton
                v-if="userData.role !== 'User'"
                variant="outline-link m-0"
                @click="click"
              >
                <router-link to="/depo" class="text-decoration-none w-100">
                  Korxonalar
                </router-link>
              </BButton>
  
              <!-- Foydalanuvchilar Link (if user role is not 'User') -->
              <BButton
                v-if="userData.role !== 'User'"
                variant="outline-link m-0"
                @click="click"
              >
                <router-link to="/user" class="text-decoration-none w-100">
                  Foydalanuvchilar
                </router-link>
              </BButton>
            </div>
          </BCollapse>
  
          <!-- Shablonlar Section -->
          <BButton v-b-toggle="'collapse-1'" class="mt-2" variant="primary w-100">
            <i class="bi bi-box"></i> Shablonlar
          </BButton>
  
          <!-- Collapse Element for Kirim Chiqim Section -->
          <BCollapse id="collapse-1" class="mt-1">
            <div class="card p-1">
              <!-- Sexdagi Link -->
              <BButton variant="outline-link m-0" @click="click">
                <router-link to="/metrology" class="text-decoration-none w-100">
                  Sexdagi shablonlar
                </router-link>
              </BButton>
  
              <!-- Skladdagi Link -->
              <BButton variant="outline-link m-0" @click="click">
                <router-link to="/metrology-sklad" class="text-decoration-none w-100">
                  Yangi shablonlar
                </router-link>
              </BButton>
            </div>
          </BCollapse>
  
          <!-- Logout Button -->
          <BButton class="mt-5" variant="primary w-100" @click="logout">
            <i class="bi bi-box-arrow-right"></i> Tizimdan chiqish
          </BButton>
        </div>
      </BOffcanvas>
  
      <!-- Main Content -->
      <RouterView />
    </div>
  </template>
  
  <script setup>
  import { RouterView, useRouter } from "vue-router";
  import { ref } from "vue";
  
  const show = ref(false);
  const router = useRouter();
  
  const userData = ref({});

  const storedUserData = localStorage.getItem("userData");
  try {
    if (storedUserData) {
      userData.value = JSON.parse(storedUserData);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  
  const click = () => {
    show.value = !show.value;
  };
  
  const logout = () => {
    localStorage.clear();
    router.push("/login");
    // Reload the entire page after logout
    window.location.reload();
  };
  </script>
  
  <style lang="scss">
  .container-fluid {
    background-color: #f8f9fa; /* Light background color */
  }
  
  .sidebar-content {
    background-color: #343a40; /* Dark sidebar background color */
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar-content .card {
    background-color: #495057; /* Dark card background color */
  }
  
  .sidebar-link {
    color: #fff; /* White text color for links */
  }
  
  /* Add more custom styles as needed */
  </style>
  