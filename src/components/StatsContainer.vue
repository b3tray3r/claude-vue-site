<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 neon-active">
    <!-- Rust Server Stats -->
    <div class="card animate-fade-up relative">
      <div class="neon-line" style="animation-delay: 0s;"></div>
      
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold">Статус сервера</h3>
        <span :class="serverStatusClass">{{ serverStatusText }}</span>
      </div>

      <div class="text-center mb-6">
        <strong class="block text-lg mb-1">Konura Rust Официальный</strong>
        <span class="text-gray-400 text-sm">EU West - Низкая задержка</span>
      </div>

      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-300">👥 Игроков онлайн</span>
        <span class="font-semibold">{{ rustStats.players }}/{{ rustStats.maxPlayers }}</span>
      </div>

      <div class="mb-4">
        <div class="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-secondary via-accent to-pink-500 rounded-full transition-all duration-1000"
               :style="{ width: `${rustStats.fillPercentage}%` }"></div>
        </div>
        <span class="text-gray-400 text-sm">{{ rustStats.fillPercentage }}% заполненность</span>
      </div>
    </div>

    <!-- Discord Stats -->
    <div class="card animate-fade-up relative">
      <div class="neon-line" style="animation-delay: 1.3s;"></div>
      
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold">Discord сервер</h3>
        <span class="status-live">Live</span>
      </div>

      <div class="text-center mb-6">
        <strong class="block text-lg mb-1">Konura Community</strong>
        <span class="text-gray-400 text-sm">Официальный хаб сообщества</span>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="text-center">
          <div class="text-sm text-gray-400 mb-1">Всего участников</div>
          <strong class="text-2xl">{{ formatNumber(discordStats.totalMembers) }}</strong>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-400 mb-1">Сейчас онлайн</div>
          <strong class="text-2xl text-success">{{ formatNumber(discordStats.onlineMembers) }}</strong>
        </div>
      </div>

      <button @click="joinDiscord" class="btn-discord">
        <span class="mr-2">💬</span>
        Присоединиться
      </button>
    </div>

    <!-- Server Info -->
    <div class="card animate-fade-up relative">
      <div class="neon-line" style="animation-delay: 2.6s;"></div>
      
      <div class="mb-6">
        <h3 class="text-xl font-bold">Информация о сервере</h3>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Дата последнего вайпа:</span>
          <span class="font-semibold">{{ wipeDate }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-300">Время с вайпа:</span>
          <span class="font-semibold text-primary">{{ wipeTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStats } from '../composables/useStats'

const { rustStats, discordStats, wipeTime, joinDiscord } = useStats()

const serverStatusClass = computed(() => {
  return rustStats.value.status === 'online' ? 'status-online' : 'status-offline'
})

const serverStatusText = computed(() => {
  return rustStats.value.status === 'online' ? 'Онлайн' : 'Оффлайн'
})

const wipeDate = computed(() => {
  return rustStats.value.lastWipe 
    ? rustStats.value.lastWipe.toLocaleDateString('ru-RU')
    : '--'
})

const formatNumber = (num) => {
  return Number(num).toLocaleString('ru-RU')
}
</script>