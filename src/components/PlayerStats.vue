<template>
  <div class="stats-tabs w-[80vw] p-6 bg-gray-900/60 rounded-md text-white mx-auto">
    <!-- Вкладки -->


    <!-- Контент вкладки -->
    <div>
      <PlayerStatsTable v-if="currentTab === 'players'" />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import PlayerStatsTable from './PlayerStatsTable.vue'

const currentTab = ref('players')
</script>



<style scoped>
.tabs button {
  min-width: 120px;
  cursor: pointer;
  user-select: none;
}
</style>
