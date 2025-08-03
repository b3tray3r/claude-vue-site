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
      Нет данных о ресурсах для отображения.
    </div>
    
    <div v-else class="w-full">
      <div class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-xl overflow-hidden">
        <table class="w-full text-base">
          <thead>
            <tr class="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
              <th class="px-8 py-4 text-center font-semibold w-16">Ранг</th>
              <th class="px-3 py-4 text-left font-semibold cursor-pointer hover:bg-gray-700 transition-colors" 
                  @click="sortBy('name')">
                <div class="flex items-center gap-2">
                  Игрок
                  <span class="text-base">{{ getSortIcon('name') }}</span>
                </div>
              </th>
              <th class="px-12 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('metal')">
                <div class="flex flex-col items-center gap-1">
                  <p>Метал</p>
                  <span class="text-base">{{ getSortIcon('metal') }}</span>
                </div>
              </th>
              <th class="px-12 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('stone')">
                <div class="flex flex-col items-center gap-1">
                  <p>Камень</p>
                  <span class="text-base">{{ getSortIcon('stone') }}</span>
                </div>
              </th>
              <th class="px-12 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('sulfur')">
                <div class="flex flex-col items-center gap-1">
                  <p>Сера</p>
                  <span class="text-base">{{ getSortIcon('sulfur') }}</span>
                </div>
              </th>
              <th class="px-12 py-4 text-center font-semibold w-24 cursor-pointer hover:bg-gray-700 transition-colors"
                  @click="sortBy('wood')">
                <div class="flex flex-col items-center gap-1">
                  <p>Дерево</p>
                  <span class="text-base">{{ getSortIcon('wood') }}</span>
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

              <!-- Метал -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <img src="https://previews.dropbox.com/p/thumb/ACseHkDID0m5hRH8AzHJuglHAO3VYzJrQLl6Ao9eifxCngeuxs4d_WeVBZGoQ7qMSiZppccJ5Jyyere948PIG-okmkpz0MB8cWBxhvc9TfGInjYtMswoYiCIUDuzhIklL8OrFB3Am3vRTif7AEW5H4_IDeVqHq5rlmJiwzYSvsS80RVKZ3_INNEE25a3oCVoz3zBmfb4Ffjs8hDPLOWCqk-bC-18tTSmQrmrq_TDiFF0auftPk-631rKmZRaqUlkzj7nRI03eQWRTZ5S3YHKVeGAfX38DQ5mJSQ4qg7YgtdfzmPmCupkiXm7tz60yBIPID4/p.png" class="w-10 h-10" alt="М" />
                  <span class="font-semibold text-orange-300">{{ (player.gathered?.['metal.ore'] || 0).toLocaleString() }}</span>
                </div>
              </td>
              
              <!-- Камень -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <img src="https://previews.dropbox.com/p/thumb/ACvOA2vJfDD84pwkDpcCzMZDMJrYNbXODDDfH2U_S_ip-iPLMYTeBCkd_QUZ3dNJ8NraRS5jTHoH5nx6Ulwt8JFS_AIw80xaqKhWhxoZe_jCbBc-UM-GnZ21FyltbnG316bkJSHcGhnunWdSvB12lpaTb-99jUg6EzQIwhsfxhHmntr5ce8nJdH4aWqQHkZIS8sSm9zNwq6P7At6mvKo08lSfe-kUwz0CpsTmt8D6EWArigNAFvACNaIl6HfC7AX2uElKfyg4D8mrIIGnmso3ZUN11jHyfqyQ1c-3gga8DTVhJCBBB7OJj_Qfs3szQquVIo/p.png" class="w-10 h-10" alt="К" />
                  <span class="font-semibold text-gray-300">{{ (player.gathered?.['stones'] || 0).toLocaleString() }}</span>
                </div>
              </td>
              
              <!-- Сера -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <img src="https://previews.dropbox.com/p/thumb/ACs4C6g8RjnM9qXTp5ywZfM01blBTNSBp_hJWjebv33TmWMBKH1_0kJmO39bHLPBXbNCfUnhvOwhN83lVWOjzgrTP8Y2SbBOxbLj41tSH1OoxjrXO8-2xa0gajDSePpb_p-g_JAzC-pAcOeUryCPR0zMhZrs6gR5E4CjhbUIWyZsvr1uf-O9-m_8dCMp0Ft547eQgu5gaJHTDRCB3Zmku5W5dYif_LCOT8xeeDLCGTiS8yr8smXEeFdRtoSAybMi0ySPo0fDusUasNdyruaW2rvY6hlYEQwCrMQhHo17CfF_K6iHtP8Xd69cay1r53iUAUD5eGgWhSrEZyOmgGnoiBnH/p.png" class="w-10 h-10" alt="С" />
                  <span class="font-semibold text-yellow-300">{{ (player.gathered?.['sulfur.ore'] || 0).toLocaleString() }}</span>
                </div>
              </td>
              
              <!-- Дерево -->
              <td class="px-2 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <img src="https://previews.dropbox.com/p/thumb/ACuthB1gIwg9qPzDBvXYN2ijsLsycUbom6YI4OGVMpHsP_eSub_U6BW_-uT1JqvBAS7ErbaH9PE4xuVHJWl0H-DVugb5q1-X47HWbEJp4xWpSFADPoX9f5dTpX7oSQjMvtugMrdCDr9JU0x0cqTSsLV4bnV4i83xoqZGwEeAdu00-CT4xRZu_TUbkiC__Ua1e3XOQAnyrS0yl4TygBRwmIl3iYcYyR8CbHNRV5jNLmWpKssGu6pqP2M-Qk7u1uuO6E-f35EJarXKcBSLW8G5vI4Z_yYU2T_AjJhHg-96ooDnkXuIUVNz_7RP-lZ1Amzw-Ew/p.png" class="w-10 h-10" alt="Д" />
                  <span class="font-semibold text-green-300">{{ (player.gathered?.['wood'] || 0).toLocaleString() }}</span>
                </div>
              </td>
            </tr>

            <tr v-if="sortedAndFilteredPlayers?.length === 0">
              <td class="px-3 py-6 text-center text-gray-400" colspan="7">Игроки не найдены.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const players = ref([])
const searchQuery = ref('')
const isLoaded = ref(false)
const loading = ref(false)
const timeoutReached = ref(false)
const sortKey = ref('total') // По умолчанию сортируем по общему количеству ресурсов
const sortOrder = ref('desc') // 'asc' или 'desc'

const props = defineProps({
  active: Boolean,
})

watch(
  () => props.active,
  (active) => {
    if (active && !isLoaded.value) {
      fetchPlayers()
      isLoaded.value = true
    }
  },
  { immediate: true }
)

const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value || []
  return (players.value || []).filter((player) =>
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
      case 'metal':
        aVal = a.gathered?.['metal.ore'] || 0
        bVal = b.gathered?.['metal.ore'] || 0
        break
      case 'stone':
        aVal = a.gathered?.['stones'] || 0
        bVal = b.gathered?.['stones'] || 0
        break
      case 'sulfur':
        aVal = a.gathered?.['sulfur.ore'] || 0
        bVal = b.gathered?.['sulfur.ore'] || 0
        break
      case 'wood':
        aVal = a.gathered?.['wood'] || 0
        bVal = b.gathered?.['wood'] || 0
        break
      case 'total':
        aVal = calculateTotalResources(a)
        bVal = calculateTotalResources(b)
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

function calculateTotalResources(player) {
  const metal = player.gathered?.['metal.ore'] || 0
  const stone = player.gathered?.['stones'] || 0
  const sulfur = player.gathered?.['sulfur.ore'] || 0
  const wood = player.gathered?.['wood'] || 0
  return metal + stone + sulfur + wood
}

async function fetchPlayers() {
  loading.value = true
  timeoutReached.value = false

  const timeout = setTimeout(() => {
    loading.value = false
    timeoutReached.value = true
  }, 30000)

  try {
    const response = await fetch('https://ktor-server-u2py.onrender.com/rcon/stats-players-list')
    const data = await response.json()
    players.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error('❌ Ошибка при загрузке ресурсов:', e)
  } finally {
    clearTimeout(timeout)
    loading.value = false
  }
}
</script>

<style scoped>
input[type='search'] {
  border: none;
  font-size: 1rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>