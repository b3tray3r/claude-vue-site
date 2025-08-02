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
        Привет, {{ steam.user.name }}!
      </div>

      <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
        Присоединяйся к самому интенсивному опыту выживания в пустошах.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="showServerInfo" 
                class="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
          <span></span>
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


import Swal from 'sweetalert2'
import { useSteam } from '../composables/useSteam'
import { useStats } from '../composables/useStats'
import StatsContainer from './StatsContainer.vue'

const steam = useSteam()
const { connectToServer } = useStats()
function showServerInfo() {
  Swal.fire({
    title: '🎮 Подключение к серверу',
    html: `
      <div style="text-align: left; font-size: 16px;">
        <p><strong>IP:</strong> 203.16.163.232:28834</p>
        <p><strong>Игроков онлайн:</strong> 70/150</p>
        <p><strong>Карта:</strong> Barren, размер 3500</p>
        <p><strong>Wipe:</strong> каждый четверг в 15:00</p>
        <p><strong>Особенности:</strong> PvP, кланы, ивенты, магазины</p>
      </div>
    `,
    confirmButtonText: 'Подключиться',
    cancelButtonText: 'Отмена',
    showCancelButton: true,
    background: 'rgba(15,15,15,0.9)',
    color: '#fff',
    confirmButtonColor: '#f97316',
    cancelButtonColor: '#555',
    customClass: {
      popup: 'backdrop-blur-md border border-orange-500 rounded-xl shadow-lg'
    },
    preConfirm: () => {
      // Можно вызвать прямое подключение
      window.location.href = 'steam://run/252490//+connect 203.16.163.232:28834'
    }
  })
}


</script>

<style scoped>
.glow {
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}
</style>