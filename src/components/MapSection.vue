<template>
  <section id="map" class="py-16 bg-black/30">
    <div class="max-w-4xl mx-auto px-6">
      <div class="card animate-fade-up">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold">Информация о сервере</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Map Image -->
          <div class="relative rounded-lg overflow-hidden group">
            <img v-if="mapIconsUrl" :src="mapIconsUrl" :alt="mapData.name"
              class="w-full h-auto transition-transform duration-300 group-hover:scale-105" loading="lazy" />

            <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 
           transition-opacity duration-300 flex items-center justify-center">
              <a v-if="mapData.url" :href="mapData.url" target="_blank" rel="noopener" class="btn-primary">
                🌍 Открыть карту
              </a>
            </div>
          </div>


          <!-- Map Info -->
          <div class="space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-white/10">
              <strong class="text-gray-300">Еженедельные вайпы:</strong>
              <span class="font-semibold">Каждый четный четвертый четверг</span>
            </div>

            <div class="flex justify-between items-center py-2 border-b border-white/10">
              <strong class="text-gray-300">Дата последнего вайпа:</strong>
              <span class="font-semibold">{{ metricsWipeDate }}</span>
            </div>

            <div class="flex justify-between items-center py-2 border-b border-white/10">
              <strong class="text-gray-300">Время с вайпа:</strong>
              <span class="font-semibold text-primary">{{ wipeTime }}</span>
            </div>

            <div class="flex justify-between items-center py-2">
              <strong class="text-gray-300">Размер карты:</strong>
              <span class="font-semibold">{{ mapData.size }} м</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStats } from '../composables/useStats'

const { rustStats, wipeTime } = useStats()

const mapIconsUrl = ref(null)

async function getMapIconsUrl() {
  try {
    const res = await fetch('https://api.battlemetrics.com/servers/34847101')
    const data = await res.json()

    const thumbnailUrl = data?.data?.attributes?.details?.rust_maps?.thumbnailUrl

    if (!thumbnailUrl) {
      throw new Error('Поле thumbnailUrl не найдено')
    }

    // Заменяем thumbnail на map_icons
    const url = thumbnailUrl.replace('thumbnail.webp', 'map_icons.png')
    mapIconsUrl.value = url
  } catch (error) {
    console.error('Ошибка при получении ссылки на map_icons:', error)
  }
}

const mapData = computed(() => {
  return rustStats.value.mapData || {
    name: 'Неизвестна',
    size: 0,
    monuments: 0,
    thumbnail: null,
    url: null
  }
})

const metricsWipeDate = computed(() => {
  if (!rustStats.value.lastWipe) return '--'
  return new Date(rustStats.value.lastWipe).toLocaleDateString('ru-RU')
})

onMounted(() => {
  getMapIconsUrl()
})
</script>
