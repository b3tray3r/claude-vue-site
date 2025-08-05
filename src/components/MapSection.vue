<template>
  <section id="map" class="py-16 bg-black/30">
    <div class="max-w-4xl mx-auto px-6">
      <div class="card animate-fade-up h-full">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold">Информация о сервере</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <!-- Map Image -->
          <div class="relative rounded-lg overflow-hidden group">
            <img
              v-if="mapIconsUrl"
              :src="mapIconsUrl"
              :alt="mapData.name"
              class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 flex items-center justify-center"
            >
              <a
                v-if="mapData.url"
                :href="mapData.url"
                target="_blank"
                rel="noopener"
                class="btn-primary"
              >
                Открыть карту
              </a>
            </div>
          </div>

          <!-- Map Info -->
          <div class="flex flex-col h-full">
            <div class="space-y-4 flex-1">
              <div class="flex justify-between items-center py-2">
                <strong class="text-gray-300">Дата последнего вайпа:</strong>
                <span class="font-semibold">{{ formattedLastWipe }}</span>
              </div>

              <div class="flex justify-between items-center">
                <strong class="text-gray-300">Время с вайпа:</strong>
                <span class="font-semibold text-primary">{{ wipeTime }}</span>
              </div>

              <div class="flex justify-between items-center pt-8">
                <strong class="text-gray-300">Дата следующего вайпа:</strong>
                <span class="font-semibold">{{ formattedNextWipe }}</span>
              </div>

              <div class="flex justify-between items-center">
                <strong class="text-gray-300">Время до вайпа:</strong>
                <span class="font-semibold text-primary">{{ wipeCountdown }}</span>
              </div>

              <div
                class="flex justify-between items-center pt-4 border-t border-white/10"
              >
                <strong class="text-gray-300">Размер карты:</strong>
                <span class="font-semibold">{{ mapData.size }} м</span>
              </div>
            </div>

            <!-- Кнопка внизу -->
            <button @click="openMetrices" class="btn-primary mt-6">
              Battle Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStats } from '../composables/useStats'

const { rustStats, wipeTime, openMetrices } = useStats()

const mapIconsUrl = ref(null)
const nextWipeDate = ref(null)
const wipeCountdown = ref('Загрузка...')

// Отсчет до вайпа
function startWipeCountdown(wipeDateStr) {
  const update = () => {
    const now = new Date()
    const wipeDate = new Date(wipeDateStr)
    const diff = wipeDate - now

    if (diff <= 0) {
      wipeCountdown.value = 'Сервер вайпнут!'
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    const parts = []
    if (days > 0) parts.push(`${days}д`)
    parts.push(`${hours}ч ${minutes}м ${seconds}с`)

    wipeCountdown.value = parts.join(' ')
  }

  update()
  const interval = setInterval(update, 1000)
  onUnmounted(() => clearInterval(interval))
}

async function getMapIconsUrl() {
  try {
    const res = await fetch('https://api.battlemetrics.com/servers/34847101')
    const data = await res.json()

    const thumbnailUrl = data?.data?.attributes?.details?.rust_maps?.thumbnailUrl
    nextWipeDate.value = data?.data?.attributes?.details?.rust_next_wipe

    if (!thumbnailUrl) throw new Error('thumbnailUrl отсутствует')

    mapIconsUrl.value = thumbnailUrl.replace('thumbnail.webp', 'map_icons.png')

    if (nextWipeDate.value) {
      startWipeCountdown(nextWipeDate.value)
    }
  } catch (err) {
    console.error('Ошибка получения карты:', err)
    wipeCountdown.value = 'Ошибка загрузки'
  }
}

const mapData = computed(() => rustStats.value.mapData || {
  name: 'Неизвестна',
  size: 0,
  url: null
})

const formattedLastWipe = computed(() => {
  const raw = rustStats.value.lastWipe
  return raw
    ? new Date(raw).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '--'
})

const formattedNextWipe = computed(() => {
  const raw = nextWipeDate.value
  return raw
    ? new Date(raw).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '--'
})

onMounted(() => {
  getMapIconsUrl()
})
</script>
