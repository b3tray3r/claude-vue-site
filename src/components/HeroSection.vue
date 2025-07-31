<template>
  <section id="home" class="min-h-screen flex flex-col justify-center items-center text-center px-6 py-32 z-20 relative">
    <!-- Hero Content -->
    <div class="mb-16 animate-fade-up">
      <h1 class="text-6xl md:text-8xl font-black mb-6 text-shadow-lg leading-none">
        KONURA <span class="text-primary glow">RUST</span>
      </h1>
      
      <!-- Steam Welcome Message -->
      <div v-if="steamUser" 
           class="mb-6 text-2xl font-bold text-accent animate-pulse-glow">
        Привет, {{ steamUser.name }}!
      </div>

      <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Присоединяйся к самому интенсивному опыту выживания в пустошах.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="connectToServer" 
                class="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
          <span>🚀</span>
          <span>Подключиться к серверу</span>
        </button>
      </div>
    </div>

    <!-- Stats Container -->
    <div class="w-full max-w-6xl">
      <StatsContainer />
    </div>
  </section>
</template>

<script setup>
import { useSteam } from '../composables/useSteam'
import { useStats } from '../composables/useStats'
import StatsContainer from './StatsContainer.vue'

const { user: steamUser } = useSteam()
const { connectToServer } = useStats()
</script>

<style scoped>
.glow {
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}
</style>