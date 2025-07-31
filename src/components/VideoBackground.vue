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
      <source :src="domeVideo" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>

    <!-- Полупрозрачный градиент поверх видео -->
    <!-- <div class="absolute inset-0 bg-gradient-to-br from-black/20 via-black/20 to-black/20"></div> -->
  </div>
</template>

<script setup>
import domeVideo from '../assets/dome.mp4'
</script>

<style scoped>
/* Если нужно, добавь кастомные стили */
</style>
