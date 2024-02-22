<template>
    <div class="web-camera-container">
        
       <div class="camera-button">
            <button type="button" class="button is-rounded"
                @click="toggleCamera">
                    <span v-if="!isCameraOpen">Open camera</span>
                    <span v-else>Close camera</span>
            </button>
       </div>

       <div class="camera-loading" v-show="isCameraOpen && isLoading">
            <ul class="loader-circle">
                <li></li>
                <li></li>
                <li></li>
            </ul>
       </div>
       <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{'flash': isShotPhoto}">
            <div class="camera-shutter" :class="{'flash': isShotPhoto}"></div>
            <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
            <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
       </div>

       <div v-if="isCameraOpen && !isLoading"  class="camera-shoot">
            <button type="button" class="button" @click="takePhoto">
                <i class="bi bi-camera"></i>
            </button>
        </div>
        <div class="camera-download"  v-if="isPhotoTaken && isCameraOpen" >
            <a role="button" id="downloadPhoto" download="my-photo.jpeg" class="button" @click="downloadImage">
                Download
            </a>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isCameraOpen = ref(false);
  const isPhotoTaken = ref(false);
  const isShotPhoto = ref(false);
  const isLoading = ref(false);
  const camera = ref(null);
  const canvas = ref(null);
  
  const toggleCamera = () => {
    if (isCameraOpen.value) {
      isCameraOpen.value = false;
      isPhotoTaken.value = false;
      isShotPhoto.value = false;
      stopCameraStream();
    } else {
      isCameraOpen.value = true;
      createCameraElement();
    }
  };
  
  const createCameraElement = () => {
    isLoading.value = true;
    const constraints = { audio: false, video: true };
  
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        isLoading.value = false;
        camera.value.srcObject = stream;
      }).catch(error => {
        isLoading.value = false;
        alert("The browser may not support or there is an error: " + error);
      });
  };
  
  const stopCameraStream = () => {
    let tracks = camera.value.srcObject.getTracks();
  
    tracks.forEach(track => {
      track.stop();
    });
  };
  
  const takePhoto = () => {
    isPhotoTaken.value = true;
    const FLASH_TIMEOUT = 5;
    setTimeout(() => {
      isShotPhoto.value = false;
    }, FLASH_TIMEOUT);
  
    const context = canvas.value.getContext('2d');
    context.drawImage(camera.value, 0, 0, 450, 337.5);
  };
  
  const downloadImage = () => {
    const download = document.getElementById("downloadPhoto");
    const canvasData = canvas.value.toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream");
    download.setAttribute("href", canvasData);
  };

  
  </script>
  
  
  <style >
  </style>