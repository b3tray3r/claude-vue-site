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
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase' // путь к твоему файлу firebase.js

const players = ref([])
const searchQuery = ref('')

// Загрузка игроков из Firestore
async function fetchPlayers() {
  const snapshot = await getDocs(collection(db, 'rust_login_players'))
  players.value = snapshot.docs.map(doc => {
    const data = doc.data()

    return {
      id: doc.id,
      name: Array.isArray(data.name) ? data.name[0] : 'Без имени',
      kills: data.kills || 0,
      deaths: data.deaths || 0,
      shotsFired: data.shotsFired || 0,
      shotsHit: data.shotsHit || 0
    }
  })
}

onMounted(fetchPlayers)

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
