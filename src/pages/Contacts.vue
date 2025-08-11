<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 relative overflow-x-hidden">
    <!-- Градиентные круги -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    <!-- Контент страницы -->
    <div class="relative z-10 text-white">
      <ContactsSection />
    </div>

    <!-- Частицы -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        v-for="i in 15" 
        :key="i"
        class="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-bounce"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import ContactsSection from '../components/ContactsSection.vue'
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
}
</style>
