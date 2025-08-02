<template>
  <section id="map" class="py-16 bg-black/30">
    <div class="max-w-4xl mx-auto px-6">
      <div class="card animate-fade-up">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold">🗺️ Карта сервера</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Map Image -->
          <div class="relative rounded-lg overflow-hidden group">
            <img v-if="mapData.thumbnail" 
                 :src="mapData.thumbnail" 
                 :alt="mapData.name"
                 class="w-full h-auto transition-transform duration-300 group-hover:scale-105" 
                 loading="lazy" />
            
            <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex items-center justify-center">
              <a v-if="mapData.url" 
                 :href="mapData.url" 
                 target="_blank" 
                 rel="noopener"
                 class="btn-primary">
                🌍 Открыть карту
              </a>
            </div>
          </div>

          <!-- Map Info -->
          <div class="space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-white/10">
              <strong class="text-gray-300">Название:</strong>
              <span class="font-semibold">{{ mapData.name }}</span>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b border-white/10">
              <strong class="text-gray-300">Размер:</strong>
              <span class="font-semibold">{{ mapData.size }} м</span>
            </div>
            
            <div class="flex justify-between items-center py-2">
              <strong class="text-gray-300">Монументов:</strong>
              <span class="font-semibold">{{ mapData.monuments }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStats } from '../composables/useStats'

const { rustStats } = useStats()

const mapData = computed(() => {
  return rustStats.value.mapData || {
    name: 'Неизвестна',
    size: 0,
    monuments: 0,
    thumbnail: null,
    url: null
  }
})
</script>