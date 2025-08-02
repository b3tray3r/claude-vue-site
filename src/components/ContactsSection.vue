<template>
  <section id="about" class="py-16 bg-black/20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Features -->
        <div class="animate-fade-up">
          <h2 class="text-3xl font-bold mb-8 relative">
            Ищите как с нами связаться?
            <span class="absolute -bottom-2 left-0 w-16 h-1 bg-primary rounded"></span>
          </h2>

          <div class="space-y-6">
            <div v-for="feature in features" :key="feature.title"
              class="card hover:translate-x-2 transition-transform duration-300 relative group">

              <div class="absolute left-0 top-0 w-1 h-full bg-primary transform scale-y-0 
              group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

              <img :src="feature.image" alt="feature icon" class="w-16 h-16 mb-4 rounded-lg object-contain shadow-md" />

              <h3 class="text-xl font-semibold text-primary mb-3">{{ feature.title }}</h3>
              <p class="text-gray-300 leading-relaxed">{{ feature.description }}</p>
            </div>

          </div>
        </div>

        <div class="hidden lg:block animate-fade-up z-10 py-14">
          <img src="../assets/contactlogo.png" alt="Контактная информация"
            class="w-[450px] h-auto rounded-2xl shadow-xl object-cover" />
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
    image: 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.png',
    title: 'Discord сервер',
    description: 'discord.gg/pYR8brsq5W'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
    title: 'Telegram Бот',
    description: 't.me/KonuraBobikbot'
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Deepin_Icon_Theme_%E2%80%93_deepin-mail_%2815%29.svg/1024px-Deepin_Icon_Theme_%E2%80%93_deepin-mail_%2815%29.png',
    title: 'Напишите нам на почту',
    description: 'support@konurarust.com'
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