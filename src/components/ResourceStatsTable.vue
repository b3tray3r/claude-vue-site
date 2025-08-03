<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Поиск игрока..."
      class="mb-4 p-2 rounded w-full max-w-md text-black"
    />

    <div class="overflow-x-auto" v-if="allResources.length > 0">
      <table class="min-w-full bg-gray-800 rounded-md">
        <thead>
          <tr class="border-b border-gray-600 text-white">
            <th class="px-4 py-2 text-left">Имя</th>
            <th
              v-for="resource in allResources"
              :key="resource"
              class="px-4 py-2 text-right"
            >
              {{ resource }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in filteredPlayers"
            :key="player.steamId"
            class="border-b border-gray-700 hover:bg-gray-700 text-white"
          >
            <td class="px-4 py-2">{{ player.names?.at(-1) || 'Без имени' }}</td>
            <td
              v-for="resource in allResources"
              :key="resource"
              class="px-4 py-2 text-right"
            >
              {{ player.gathered?.[resource] || 0 }}
            </td>
          </tr>
          <tr v-if="filteredPlayers.length === 0">
            <td class="px-4 py-2 text-center" :colspan="allResources.length + 1">
              Игроки не найдены.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-white text-sm">
      Нет данных о ресурсах для отображения.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const players = ref([])
const searchQuery = ref('')
const isLoaded = ref(false)

// Загружаем данные при первом показе компонента
const props = defineProps({
  active: Boolean
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

const allResources = computed(() => {
  const resourceSet = new Set()
  for (const player of players.value) {
    const gathered = player.gathered || {}
    Object.keys(gathered).forEach(key => resourceSet.add(key))
  }
  return Array.from(resourceSet).sort()
})

const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value
  return players.value.filter(player =>
    (player.names?.at(-1) || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

async function fetchPlayers() {
  try {
    const response = await fetch('https://konurarust.onrender.com/rcon/stats-players-list')
    const data = await response.json()
    players.value = data
  } catch (e) {
    console.error('❌ Ошибка при загрузке ресурсов:', e)
  }
}
</script>


<style scoped>
input[type="search"] {
  border: none;
  font-size: 1rem;
}
</style>
