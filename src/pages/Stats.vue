<template>
  <div class="flex flex-col min-h-screen text-white">
    <main class="flex-grow py-16 px-4 sm:px-6 lg:px-8">
      <div class="w-full  mx-auto space-y-10 overflow-x-auto">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-2">Статистика сервера</h1>
          <p class="text-gray-400 text-sm">Данные об онлайне, активности игроков и прочее</p>
        </div>
        <PlayerStats />
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
    </main>
  </div>
</template>


<script setup>
import PlayerStats from '../components/PlayerStats.vue'




</script>

<style scoped>
.text-primary {
  @apply text-orange-400;
}
</style>
