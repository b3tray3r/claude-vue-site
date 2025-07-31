<template>
  <div class="flex flex-col min-h-screen relative z-0">
    <Navigation />

    <main class="flex-grow relative z-10">
      <router-view />
      <CookieNotice />
    </main>

    <Footer />

    <!-- Видеофон должен быть **последним в DOM** и с fixed позиционированием -->
    <VideoBackground />
  </div>
</template>

<script setup>
import Navigation from './Navigation.vue'
import VideoBackground from './VideoBackground.vue'
import CookieNotice from './CookieNotice.vue'
import Footer from './Footer.vue'
</script>

<style>
/* Если нужно, можно добавить глобальные стили */
</style>
