<template>
  <div class="flex flex-col min-h-screen text-white">
    <!-- Main content -->
    <main class="flex-grow py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto space-y-10">
        <!-- Title -->
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-2">📊 Статистика сервера</h1>
          <p class="text-gray-400 text-sm">Данные об онлайне, активности игроков и прочее</p>
        </div>

        <!-- Example component: ProductCard (можно заменить на ServerInfo, PlayerStats и т.п.) -->
        <PlayerStats />
      </div>
    </main>

    <!-- Footer -->
  </div>
</template>

<script setup>
import PlayerStats from '../components/PlayerStats.vue';
</script>

<style scoped>
.text-primary {
  @apply text-orange-400;
}
</style>
