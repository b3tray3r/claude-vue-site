<template>
  <section id="about" class="py-16 bg-black/20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- YouTube Content -->
        <div class="card animate-fade-up">
          <h2 class="text-3xl font-bold mb-8 relative">
            Последние видео
            <span class="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded"></span>
          </h2>
          
          <div class="space-y-6">
            <div v-for="video in videos" :key="video.videoId" 
                 class="bg-black/60 rounded-lg overflow-hidden border border-white/10 
                        hover:-translate-y-1 transition-transform duration-300">
              
              <div class="aspect-video">
                <iframe 
                  :src="`https://www.youtube.com/embed/${video.videoId}`"
                  :title="video.title"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
              
              <div class="p-4">
                <h3 class="font-semibold mb-2 line-clamp-2">{{ truncateTitle(video.title) }}</h3>
                <div class="flex space-x-4 text-sm text-gray-400">
                  <span>👁️ {{ formatNumber(video.views) }}</span>
                  <span>💬 {{ formatNumber(video.comments) }}</span>
                </div>
              </div>
            </div>
            
            <div v-if="loading" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            
            <div v-else-if="videos.length === 0" class="text-center py-8 text-gray-400">
              <p>Не удалось загрузить видео</p>
              <button @click="loadVideos" class="btn-primary mt-4">
                Попробовать снова
              </button>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="animate-fade-up">
          <h2 class="text-3xl font-bold mb-8 relative">
            Почему выбрать Konura?
            <span class="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded"></span>
          </h2>
          
          <div class="space-y-6">
            <div v-for="feature in features" :key="feature.title"
                 class="card hover:translate-x-2 transition-transform duration-300 relative group">
              
              <div class="absolute left-0 top-0 w-1 h-full bg-primary transform scale-y-0 
                          group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
              
              <div class="text-3xl mb-4 opacity-80">{{ feature.icon }}</div>
              <h3 class="text-xl font-semibold text-primary mb-3">{{ feature.title }}</h3>
              <p class="text-gray-300 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

const { getYouTubeVideos } = useApi()

const videos = ref([])
const loading = ref(false)

const features = [
  {
    icon: '⚔️',
    title: 'Уникальный геймплей',
    description: 'Кастомные плагины, события и PvP механики.'
  },
  {
    icon: '👥',
    title: 'Активное сообщество',
    description: 'Более 1000 игроков в Discord, постоянная активность.'
  },
  {
    icon: '🛡️',
    title: 'Честная игра',
    description: 'Античит, модерация, прозрачные правила.'
  },
  {
    icon: '🔄',
    title: 'Обновления',
    description: 'Сервер актуален, учитываем ваши отзывы.'
  }
]

const loadVideos = async () => {
  loading.value = true
  try {
    videos.value = await getYouTubeVideos()
  } catch (error) {
    console.error('Error loading videos:', error)
  } finally {
    loading.value = false
  }
}

const formatNumber = (num) => {
  return Number(num).toLocaleString('ru-RU')
}

const truncateTitle = (title, maxLength = 60) => {
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
}

onMounted(() => {
  loadVideos()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>