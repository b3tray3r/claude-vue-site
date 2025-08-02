<template>
  <div class="flex flex-col min-h-screen text-white">
    <main class="flex-grow py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-10">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-2">📊 Статистика сервера</h1>
          <p class="text-gray-400 text-sm">Данные об онлайне, активности игроков и прочее</p>
        </div>
        <PlayerStats />
      </div>
    </main>

    <RconLogin />
  </div>
</template>

<script setup>
import PlayerStats from '../components/PlayerStats.vue'
import RconLogin from '../components/RconLogin.vue'
import { onMounted, onUnmounted } from 'vue'
import { useWebRcon } from '../composables/useWebRcon.js' // или путь к твоему хуку

const { startAutoFetch, stopAutoFetch } = useWebRcon()

// Запускаем автозагрузку при монтировании компонента
onMounted(() => {
  // Запускаем с интервалом 1 минута (для теста)
  startAutoFetch(1000 * 60)

  // Можно, например, вызвать и ручной первый запрос:
  // connect()
})

// Очищаем таймер при размонтировании компонента
onUnmounted(() => {
  stopAutoFetch()
})
</script>

<style scoped>
.text-primary {
  @apply text-orange-400;
}
</style>
