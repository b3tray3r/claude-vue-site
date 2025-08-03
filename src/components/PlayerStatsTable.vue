<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Поиск игрока..."
      class="mb-4 p-2 rounded w-full max-w-md text-black"
    />
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-800 rounded-md">
        <thead>
          <tr class="border-b border-gray-600 text-white">
            <th class="px-4 py-2 text-left">Имя</th>
            <th class="px-4 py-2 text-right">Убийств</th>
            <th class="px-4 py-2 text-right">Смертей</th>
            <th class="px-4 py-2 text-right">KDA</th>
            <th class="px-4 py-2 text-right">Выстрелов</th>
            <th class="px-4 py-2 text-right">Попаданий</th>
            <th class="px-4 py-2 text-right">Точность (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in filteredPlayers"
            :key="player.steamId"
            class="border-b border-gray-700 hover:bg-gray-700 text-white"
          >
            <td class="px-4 py-2">{{ player.names?.at(-1) || 'Без имени' }}</td>
            <td class="px-4 py-2 text-right">{{ player.kills }}</td>
            <td class="px-4 py-2 text-right">{{ player.deaths }}</td>
            <td class="px-4 py-2 text-right">{{ calculateKDA(player.kills, player.deaths) }}</td>
            <td class="px-4 py-2 text-right">{{ player.shots }}</td>
            <td class="px-4 py-2 text-right">{{ player.headshots }}</td>
            <td class="px-4 py-2 text-right">{{ calculateAccuracy(player.shots, player.headshots) }}</td>
          </tr>
          <tr v-if="filteredPlayers.length === 0">
            <td class="px-4 py-2 text-center" colspan="7">Игроки не найдены.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const players = ref([])
const searchQuery = ref('')

async function fetchPlayers() {
  try {
    const response = await fetch('https://ktor-server-u2py.onrender.com/rcon/stats-players-list')
    const data = await response.json()
    console.log('📥 Получены игроки:', data)
    players.value = data
  } catch (error) {
    console.error('❌ Ошибка при загрузке игроков:', error)
  }
}

onMounted(fetchPlayers)

const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value
  return players.value.filter(player =>
    (player.names?.at(-1) || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function calculateKDA(kills, deaths) {
  if (deaths === 0) return kills.toFixed(2)
  return (kills / deaths).toFixed(2)
}

function calculateAccuracy(shots, headshots) {
  if (shots === 0) return '0.00'
  return ((headshots / shots) * 100).toFixed(2)
}
</script>

<style scoped>
input[type="search"] {
  border: none;
  font-size: 1rem;
}
</style>
