<template>
  <div>
    <input v-model="searchQuery" type="search" placeholder="Поиск игрока..."
      class="mb-4 p-2 rounded w-full max-w-md text-black" />

    <div v-if="loading" class="flex justify-center items-center h-24">
      <img src="https://api.iconify.design/svg-spinners:blocks-shuffle-2.svg?color=%23f97316" alt="Loading spinner"
        class="w-12 h-12" />
    </div>

    <div v-else-if="timeoutReached && players.length === 0" class="text-white text-center mt-8">
      Нет данных о статистике для отображения.
    </div>

    <div v-else class="w-full">
      <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl overflow-hidden">
        <table class="w-full text-base">
          <thead>
            <tr class="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <th class="px-3 py-4 text-center font-semibold w-16">Ранг</th>
              <th class="px-3 py-4 text-left font-semibold cursor-pointer hover:bg-gray-700 transition-colors" 
                  @click="sortBy('name')">
                <div class="flex items-center gap-2">
                  Игрок
                  <span class="text-xs">{{ getSortIcon('name') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-20 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('kills')">
                <div class="flex flex-col items-center gap-1">
                  <p>Убийства</p>
                  <span class="text-xs">{{ getSortIcon('kills') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-20 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('deaths')">
                <div class="flex flex-col items-center gap-1">
                  <p>Смерти</p>
                  <span class="text-xs">{{ getSortIcon('deaths') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-20 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('kda')">
                <div class="flex flex-col items-center gap-1">
                  <p>KDA</p>
                  <span class="text-xs">{{ getSortIcon('kda') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('shots')">
                <div class="flex flex-col items-center gap-1">
                  <p>Выстрелы</p>
                  <span class="text-xs">{{ getSortIcon('shots') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('headshots')">
                <div class="flex flex-col items-center gap-1">
                  <p>Попадания</p>
                  <span class="text-xs">{{ getSortIcon('headshots') }}</span>
                </div>
              </th>
              <th class="px-8 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('accuracy')">
                <div class="flex flex-col items-center gap-1">
                  <p>Точность</p>
                  <span class="text-xs">{{ getSortIcon('accuracy') }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in sortedAndFilteredPlayers" :key="player.steamId"
              class="border-b border-gray-600 hover:bg-gray-600 transition-colors duration-200 text-white">
              
              <!-- Ранг -->
              <td class="px-3 py-3 text-center">
                <div class="flex items-center justify-center">
                  <span v-if="index === 0" class="text-2xl">🥇</span>
                  <span v-else-if="index === 1" class="text-2xl">🥈</span>
                  <span v-else-if="index === 2" class="text-2xl">🥉</span>
                  <span v-else class="text-gray-400 font-semibold">{{ index + 1 }}</span>
                </div>
              </td>

              <!-- Имя игрока -->
              <td class="px-3 py-3 font-medium">{{ player.names?.at(-1) || 'Без имени' }}</td>

              <!-- Убийства -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2">
                  <img src="https://i.postimg.cc/HkS6WTLt/Assault-Rifle-icon.png" class="w-16 h-16 " alt="Т" />
                  <span class="font-semibold text-violet-400">{{ player.kills || 0 }}</span>
                </div>
              </td>
              
              <!-- Смерти -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2 ">
                <div class="rounded-xl bg-red-600 p-1">
                  <img src="https://api.iconify.design/mdi:skull.svg?color=%23ffffff" class="w-8 h-8 " alt="С" />
                  </div>
                  <span class="font-semibold text-slate-400">{{ player.deaths || 0 }}</span>
                  
                </div>
              </td>
              
              <!-- KDA -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2">
                  <img src="https://api.iconify.design/pajamas:status-health.svg?color=%2310b981" class="w-8 h-8" alt="KDA" />
                  <span class="font-semibold text-emerald-400">{{ calculateKDA(player.kills, player.deaths) }}</span>
                </div>
              </td>
              
              <!-- Выстрелы -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2">
                  <img src="https://i.postimg.cc/zXrt0dMT/5-56-Rifle-Ammo-icon.png" class="w-12 h-12" alt="В" />
                  <span class="font-semibold text-amber-400">{{ player.shots || 0 }}</span>
                </div>
              </td>
              
              <!-- Попадания -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2">
                  <img src="https://previews.dropbox.com/p/thumb/ACtD5NALi8ZPAEYZa_v0jlmuRRqNfGLvPT4FflDkPOMjcjib6PaHjnrRuO-6iq4L77sa4ltlQ11YPkBu9J2Qt9l_77_LRVhs6-jxz2ksacFCPB3JaU1ukhGzv3ryXQc8epmWUuT6-KvWE7JDdxnhVdpDdQKEH-rxyMJHYYKmegFitirJLNGNcHvjNu9vwJWKaqg61A8ID2Wftck3n2R2m9bfC38s6WAr1_MLveZcNrdMAFqC-sXBEwxOe6T2B71s78BKzonV6GxttTL-S-W16ip3ZleKVWZe93rh-xSfiEmTK1RJ4UrTWBYW8XZS6Ck6QmE/p.png" class="w-8 h-8" alt="П" />
                  <span class="font-semibold text-orange-400">{{ player.headshots || 0 }}</span>
                </div>
              </td>
              
              <!-- Точность -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-right gap-2">
                  <img src="https://api.iconify.design/ri:crosshair-2-line.svg?color=%23ef4444" class="w-8 h-8" alt="К" />
                  <span class="font-semibold text-red-400">{{ calculateAccuracy(player.shots, player.headshots) }}%</span>
                </div>
              </td>
            </tr>

            <tr v-if="sortedAndFilteredPlayers?.length === 0">
              <td class="px-3 py-6 text-center text-gray-400" colspan="8">Игроки не найдены.</td>
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
const sortKey = ref('kills') // По умолчанию сортируем по убийствам
const sortOrder = ref('desc') // 'asc' или 'desc'

async function fetchPlayers() {
  try {
    const response = await fetch('https://ktor-server-u2py.onrender.com/rcon/stats-players-list')
    const data = await response.json()
    console.log('📥 Получены игроки:', data)
    players.value = data
  } catch (error) {
    console.error('❌ Ошибка при загрузке игроков:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPlayers()
  setTimeout(() => {
    if (loading.value) {
      timeoutReached.value = true
      loading.value = false
    }
  }, 30000)
})

const filteredPlayers = computed(() => {
  if (!Array.isArray(players.value)) return []
  if (!searchQuery.value) return players.value
  return players.value.filter((player) =>
    (player.names?.at(-1) || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedAndFilteredPlayers = computed(() => {
  const filtered = filteredPlayers.value
  if (!filtered.length) return []
  
  return [...filtered].sort((a, b) => {
    let aVal, bVal
    
    switch (sortKey.value) {
      case 'name':
        aVal = (a.names?.at(-1) || '').toLowerCase()
        bVal = (b.names?.at(-1) || '').toLowerCase()
        break
      case 'kills':
        aVal = a.kills || 0
        bVal = b.kills || 0
        break
      case 'deaths':
        aVal = a.deaths || 0
        bVal = b.deaths || 0
        break
      case 'kda':
        aVal = parseFloat(calculateKDA(a.kills, a.deaths))
        bVal = parseFloat(calculateKDA(b.kills, b.deaths))
        break
      case 'shots':
        aVal = a.shots || 0
        bVal = b.shots || 0
        break
      case 'headshots':
        aVal = a.headshots || 0
        bVal = b.headshots || 0
        break
      case 'accuracy':
        aVal = parseFloat(calculateAccuracy(a.shots, a.headshots))
        bVal = parseFloat(calculateAccuracy(b.shots, b.headshots))
        break
      default:
        return 0
    }
    
    if (typeof aVal === 'string') {
      return sortOrder.value === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    } else {
      return sortOrder.value === 'asc' 
        ? aVal - bVal
        : bVal - aVal
    }
  })
})

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = key === 'name' ? 'asc' : 'desc' // Имена по возрастанию, числа по убыванию
  }
}

function getSortIcon(key) {
  if (sortKey.value !== key) return ''
  return sortOrder.value === 'asc' ? '' : ''
}

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