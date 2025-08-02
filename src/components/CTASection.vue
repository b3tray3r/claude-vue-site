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
            <span>🚀</span>
            <span>Подключиться</span>
          </button>

          <router-link to="/shop" class="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
            <span>🛒</span>
            <span>Магазин</span>
          </router-link>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStats } from '../composables/useStats'

const { connectToServer } = useStats()
</script>