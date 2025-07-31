<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Поиск по названию оружия..."
      class="mb-4 p-2 rounded w-full max-w-md text-black"
    />
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-800 rounded-md">
        <thead>
          <tr class="border-b border-gray-600 text-white">
            <th class="px-4 py-2 text-left">Оружие</th>
            <th class="px-4 py-2 text-right">Убийств</th>
            <th class="px-4 py-2 text-right">Выстрелов</th>
            <th class="px-4 py-2 text-right">Попаданий</th>
            <th class="px-4 py-2 text-right">Точность (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="weapon in filteredWeapons"
            :key="weapon.id"
            class="border-b border-gray-700 hover:bg-gray-700 text-white"
          >
            <td class="px-4 py-2">{{ weapon.name }}</td>
            <td class="px-4 py-2 text-right">{{ weapon.kills }}</td>
            <td class="px-4 py-2 text-right">{{ weapon.shotsFired }}</td>
            <td class="px-4 py-2 text-right">{{ weapon.shotsHit }}</td>
            <td class="px-4 py-2 text-right">{{ calculateAccuracy(weapon.shotsFired, weapon.shotsHit) }}</td>
          </tr>
          <tr v-if="filteredWeapons.length === 0">
            <td class="px-4 py-2 text-center" colspan="5">Оружие не найдено.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const weapons = ref([
  { id: 1, name: 'AK-47', kills: 150, shotsFired: 1200, shotsHit: 900 },
  { id: 2, name: 'M4A1', kills: 130, shotsFired: 1100, shotsHit: 850 },
  { id: 3, name: 'Sniper Rifle', kills: 75, shotsFired: 500, shotsHit: 400 },
  { id: 4, name: 'Pistol', kills: 60, shotsFired: 700, shotsHit: 300 },
  { id: 5, name: 'Shotgun', kills: 50, shotsFired: 400, shotsHit: 350 }
])

const searchQuery = ref('')

const filteredWeapons = computed(() => {
  if (!searchQuery.value) return weapons.value
  return weapons.value.filter(weapon =>
    weapon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

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
