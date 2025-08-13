<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Поиск игрока..."
      class="mb-4 p-2 rounded w-full max-w-md text-black"
    />

    <div v-if="loading" class="flex justify-center items-center h-24">
      <img
        src="https://api.iconify.design/svg-spinners:blocks-shuffle-2.svg?color=%23f97316"
        alt="Загрузка..."
        class="w-12 h-12"
      />
    </div>

    <div v-else-if="timeoutReached || players.length === 0" class="text-white text-center mt-8">
      Нет данных о статистике для отображения.
    </div>

    <div v-else class="w-full overflow-x-auto">
      <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl overflow-hidden min-w-[1200px]">
        <table class="w-full text-base">
          <thead>
            <tr class="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <th class="px-3 py-4 text-center font-semibold">#</th>
              <th class="px-3 py-4 text-left font-semibold cursor-pointer hover:bg-gray-700" @click="sortBy('name')">
                Игрок <span class="text-xs">{{ getSortIcon('name') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('kills')">
                Убийства <span class="text-xs">{{ getSortIcon('kills') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('deaths')">
                Смерти <span class="text-xs">{{ getSortIcon('deaths') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('kda')">
                KDA <span class="text-xs">{{ getSortIcon('kda') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('shots')">
                Выстрелы <span class="text-xs">{{ getSortIcon('shots') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('accuracy')">
                Точность <span class="text-xs">{{ getSortIcon('accuracy') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('metal')">
                Металл <span class="text-xs">{{ getSortIcon('metal') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('stone')">
                Камень <span class="text-xs">{{ getSortIcon('stone') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('sulfur')">
                Сера <span class="text-xs">{{ getSortIcon('sulfur') }}</span>
              </th>
              <th class="px-3 py-4 text-center cursor-pointer hover:bg-gray-700" @click="sortBy('wood')">
                Дерево <span class="text-xs">{{ getSortIcon('wood') }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in sortedAndFilteredPlayers" :key="player.steamId"
              class="border-b border-gray-600 hover:bg-gray-600 transition-colors duration-200 text-white">
              
              <td class="text-center py-2">
                <span v-if="index === 0">1</span>
                <span v-else-if="index === 1">2</span>
                <span v-else-if="index === 2">3</span>
                <span v-else class="text-gray-400 font-semibold">{{ index + 1 }}</span>
              </td>

              <td class="px-3 py-2 font-medium">
                {{ player.currentName|| 'Без имени' }}
              </td>

              <td class="text-center py-2 text-violet-400">{{ player.kills || 0 }}</td>
              <td class="text-center py-2 text-red-400">{{ player.deaths || 0 }}</td>
              <td class="text-center py-2 text-emerald-400">{{ calculateKDA(player.kills, player.deaths) }}</td>
              <td class="text-center py-2 text-amber-400">{{ player.shots || 0 }}</td>
              <td class="text-center py-2 text-slate-300">{{ calculateAccuracy(player.shots, player.headshots) }}%</td>
              <td class="text-center py-2 text-orange-300">{{ (player.gathered?.['metal.ore'] || 0).toLocaleString() }}</td>
              <td class="text-center py-2 text-gray-300">{{ (player.gathered?.['stones'] || 0).toLocaleString() }}</td>
              <td class="text-center py-2 text-yellow-300">{{ (player.gathered?.['sulfur.ore'] || 0).toLocaleString() }}</td>
              <td class="text-center py-2 text-green-300">{{ (player.gathered?.['wood'] || 0).toLocaleString() }}</td>
            </tr>

            <tr v-if="sortedAndFilteredPlayers.length === 0">
              <td colspan="11" class="text-center text-gray-400 py-6">Игроки не найдены.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const players = ref([])
const searchQuery = ref('')
const loading = ref(true)
const timeoutReached = ref(false)
const sortKey = ref('kills')
const sortOrder = ref('desc')

onMounted(() => {
  fetchPlayers()
  setTimeout(() => {
    if (loading.value) {
      timeoutReached.value = true
      loading.value = false
    }
  }, 30000)
})

async function fetchPlayers() {
  try {
    const response = await fetch('https://ktor-server-u2py.onrender.com/rcon/stats-players-list')
    const data = await response.json()
    players.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('Ошибка загрузки:', e)
  } finally {
    loading.value = false
  }
}

const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value || []
  return players.value.filter((player) =>
    (player.names?.at(-1) || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedAndFilteredPlayers = computed(() => {
  return [...filteredPlayers.value].sort((a, b) => {
    let aVal, bVal

    switch (sortKey.value) {
      case 'name':
        aVal = (a.names?.at(-1) || '').toLowerCase()
        bVal = (b.names?.at(-1) || '').toLowerCase()
        break
      case 'kills': aVal = a.kills || 0; bVal = b.kills || 0; break
      case 'deaths': aVal = a.deaths || 0; bVal = b.deaths || 0; break
      case 'kda': aVal = parseFloat(calculateKDA(a.kills, a.deaths)); bVal = parseFloat(calculateKDA(b.kills, b.deaths)); break
      case 'shots': aVal = a.shots || 0; bVal = b.shots || 0; break
      case 'accuracy': aVal = parseFloat(calculateAccuracy(a.shots, a.headshots)); bVal = parseFloat(calculateAccuracy(b.shots, b.headshots)); break
      case 'metal': aVal = a.gathered?.['metal.ore'] || 0; bVal = b.gathered?.['metal.ore'] || 0; break
      case 'stone': aVal = a.gathered?.['stones'] || 0; bVal = b.gathered?.['stones'] || 0; break
      case 'sulfur': aVal = a.gathered?.['sulfur.ore'] || 0; bVal = b.gathered?.['sulfur.ore'] || 0; break
      case 'wood': aVal = a.gathered?.['wood'] || 0; bVal = b.gathered?.['wood'] || 0; break
      default: return 0
    }

    return sortOrder.value === 'asc'
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1
  })
})

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = key === 'name' ? 'asc' : 'desc'
  }
}

function getSortIcon(key) {
  if (sortKey.value !== key) return ''
  return sortOrder.value === 'asc' ? '↑' : '↓'
}

function calculateKDA(kills, deaths) {
  if (!deaths) return (kills || 0).toFixed(2)
  return ((kills || 0) / deaths).toFixed(2)
}

function calculateAccuracy(shots, headshots) {
  if (!shots) return '0.00'
  return ((headshots || 0) / shots * 100).toFixed(2)
}
</script>

<style scoped>
input[type='search'] {
  border: none;
  font-size: 1rem;
}
</style>
