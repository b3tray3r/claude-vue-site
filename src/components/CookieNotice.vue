<template>
  <transition name="fade-slide">
    <div
      v-if="shouldShow"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-gray-900 to-black/90 text-white p-5 rounded-xl shadow-2xl z-[9999] w-full max-w-md border border-white/10 backdrop-blur-md"
    >
      <p class="text-sm text-gray-300 mb-3">
        Мы используем куки для улучшения вашего опыта на сайте. Продолжая использовать сайт, вы соглашаетесь с этим.
      </p>
      <div class="text-right">
        <button
          @click="acceptCookies"
          class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-colors px-4 py-2 rounded-md text-sm font-semibold text-white shadow-sm"
        >
          Понятно
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

// Чтение куки до монтирования компонента
function isCookieAccepted() {
  return document.cookie.includes('cookiesAccepted=true')
}

const shouldShow = ref(!isCookieAccepted())

function acceptCookies() {
  const oneYear = 60 * 60 * 24 * 365
  document.cookie = `cookiesAccepted=true; path=/; max-age=${oneYear}`
  shouldShow.value = false
}
</script>

<style scoped>
.fade-slide-enter-active {
  transition: all 0.4s ease;
}
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
