<template>
  <div class="fixed inset-0 z-0 overflow-hidden">
    <video
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      class="w-full h-full object-cover opacity-40"
    >
      <source :src="currentVideo" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  </div>
</template>

<script setup>
import domeVideo1 from '../assets/dome.mp4'
import domeVideo2 from '../assets/mountain.mp4'
import domeVideo3 from '../assets/oilrig.mp4'
import domeVideo4 from '../assets/outpost.mp4'

// Массив с видео
const videos = [domeVideo1, domeVideo2, domeVideo3, domeVideo4]

// Переменная для выбранного видео
import { ref, onMounted } from 'vue'
const currentVideo = ref('')

// Функция выбора случайного видео
function getRandomVideo() {
  const index = Math.floor(Math.random() * videos.length)
  return videos[index]
}

// При монтировании выбираем случайное видео
onMounted(() => {
  currentVideo.value = getRandomVideo()
})
</script>
