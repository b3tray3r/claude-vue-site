<template>
  <section id="shop" class="py-16 bg-gradient-to-br from-primary/10 via-black/80 to-primary/10 relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-30 pointer-events-none">
      <div class="absolute inset-0"
        style="background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 100px 100px;">
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
      <div class="animate-fade-up">
        <h2 class="text-4xl md:text-5xl font-black mb-6 text-shadow-lg">
          Готовы выживать?
        </h2>

        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Присоединяйтесь к тысячам игроков. Получите VIP доступ.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showServerInfo"
            class="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
            <span></span>
            <span>Подключиться</span>
          </button>

          <router-link to="/shop" class="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
            <img src="https://api.iconify.design/material-symbols:shopping-cart.svg?color=%23ffffff" alt="Shop Icon" class="w-6 h-6" />
            <span>Магазин</span>
          </router-link>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Swal from 'sweetalert2'

import { useStats } from '../composables/useStats'

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