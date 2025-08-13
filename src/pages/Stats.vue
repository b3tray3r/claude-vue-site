<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 relative overflow-x-hidden">
    <!-- Фоновые элементы, перемещены вниз по z-index -->
    <div class="absolute inset-0 opacity-30 z-[-1]">
      <div class="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    <!-- Декоративные частицы, тоже под контентом -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
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

    <!-- Основной контент -->
    <div class="flex flex-col min-h-screen text-white relative z-10">
      <main class="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div class="w-full mx-auto space-y-10 overflow-x-auto">
          <div class="text-center">
            <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-2">Статистика сервера</h1>
            <p class="text-gray-400 text-sm">Данные об онлайне, активности игроков и прочее</p>
          </div>
          <PlayerStats />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import PlayerStats from '../components/PlayerStats.vue'
</script>

<style scoped>
.text-primary {
  @apply text-orange-400;
}
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
