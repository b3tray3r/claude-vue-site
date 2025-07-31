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
            :key="player.id"
            class="border-b border-gray-700 hover:bg-gray-700 text-white"
          >
            <td class="px-4 py-2">{{ player.name }}</td>
            <td class="px-4 py-2 text-right">{{ player.kills }}</td>
            <td class="px-4 py-2 text-right">{{ player.deaths }}</td>
            <td class="px-4 py-2 text-right">{{ calculateKDA(player.kills, player.deaths) }}</td>
            <td class="px-4 py-2 text-right">{{ player.shotsFired }}</td>
            <td class="px-4 py-2 text-right">{{ player.shotsHit }}</td>
            <td class="px-4 py-2 text-right">{{ calculateAccuracy(player.shotsFired, player.shotsHit) }}</td>
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
import { ref, computed } from 'vue'

const players = ref([
  { id: 1, name: 'ShadowHunter', kills: 24, deaths: 7, shotsFired: 230, shotsHit: 115 },
  { id: 2, name: 'IronFist', kills: 15, deaths: 10, shotsFired: 190, shotsHit: 80 },
  { id: 3, name: 'SilentWolf', kills: 30, deaths: 5, shotsFired: 300, shotsHit: 200 },
  { id: 4, name: 'NightStalker', kills: 10, deaths: 12, shotsFired: 150, shotsHit: 60 },
  { id: 5, name: 'FireBlade', kills: 20, deaths: 8, shotsFired: 210, shotsHit: 130 },
  { id: 6, name: 'SteelArrow', kills: 18, deaths: 9, shotsFired: 180, shotsHit: 90 }
])

const searchQuery = ref('')

const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value
  return players.value.filter(player =>
    player.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function calculateKDA(kills, deaths) {
  if (deaths === 0) return kills.toFixed(2)
  return (kills / deaths).toFixed(2)
}

function calculateAccuracy(fired, hit) {
  if (fired === 0) return '0.00'
  return ((hit / fired) * 100).toFixed(2)
}
</script>

<style scoped>
input[type="search"] {
  border: none;
  font-size: 1rem;
}
</style>
