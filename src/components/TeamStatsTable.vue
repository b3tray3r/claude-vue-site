<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      placeholder="Поиск по названию команды..."
      class="mb-4 p-2 rounded w-full max-w-md text-black"
    />
    <div class="overflow-x-auto">
      <table class="min-w-full bg-gray-800 rounded-md">
        <thead>
          <tr class="border-b border-gray-600 text-white">
            <th class="px-4 py-2 text-left">Команда</th>
            <th class="px-4 py-2 text-right">Убийств</th>
            <th class="px-4 py-2 text-right">Смертей</th>
            <th class="px-4 py-2 text-right">Участников</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="team in filteredTeams"
            :key="team.id"
            class="border-b border-gray-700 hover:bg-gray-700 text-white"
          >
            <td class="px-4 py-2">{{ team.name }}</td>
            <td class="px-4 py-2 text-right">{{ team.kills }}</td>
            <td class="px-4 py-2 text-right">{{ team.deaths }}</td>
            <td class="px-4 py-2 text-right">{{ team.membersCount }}</td>
          </tr>
          <tr v-if="filteredTeams.length === 0">
            <td class="px-4 py-2 text-center" colspan="4">Команды не найдены.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const teams = ref([
  { id: 1, name: 'Red Dragons', kills: 400, deaths: 250, membersCount: 10 },
  { id: 2, name: 'Blue Wolves', kills: 350, deaths: 300, membersCount: 8 },
  { id: 3, name: 'Green Vipers', kills: 280, deaths: 220, membersCount: 6 },
  { id: 4, name: 'Black Panthers', kills: 310, deaths: 270, membersCount: 12 }
])

const searchQuery = ref('')

const filteredTeams = computed(() => {
  if (!searchQuery.value) return teams.value
  return teams.value.filter(team =>
    team.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
input[type="search"] {
  border: none;
  font-size: 1rem;
}
</style>
