<template>
  <div class="stats-tabs p-6 bg-gray-900/60 rounded-md text-white max-w-5xl mx-auto">

    <!-- Вкладки -->
    <div class="tabs flex gap-4 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="currentTab = tab.key"
        :class="[
          'px-4 py-2 rounded font-semibold transition',
          currentTab === tab.key
            ? 'bg-orange-500 text-black'
            : 'bg-gray-700 hover:bg-gray-600'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Контент вкладки -->
    <div>
      <PlayerStatsTable v-if="currentTab === 'players'" />
      <WeaponStatsTable v-if="currentTab === 'weapons'" />
      <TeamStatsTable v-if="currentTab === 'teams'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlayerStatsTable from './PlayerStatsTable.vue'
import WeaponStatsTable from './WeaponStatsTable.vue'
import TeamStatsTable from './TeamStatsTable.vue'

const tabs = [
  { key: 'players', label: 'Игроки' },
  { key: 'weapons', label: 'Оружие' },
  { key: 'teams', label: 'Команды' }
]

const currentTab = ref('players')
</script>

<style scoped>
.tabs button {
  min-width: 120px;
  cursor: pointer;
  user-select: none;
}
</style>
