<template>
  <div>
    <!-- Overlay для закрытия сайдбара при клике вне его -->
    <div 
      v-if="isOpen" 
      @click="closeSidebar" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
    ></div>

    <!-- Discord Sidebar -->
    <div 
      class="discord-sidebar fixed z-50 transition-all duration-500 ease-out"
      :class="{ 'sidebar-open': isOpen }"
    >
      <!-- Кнопка переключения -->
      <button 
        @click="toggleSidebar"
        class="sidebar-toggle absolute bg-gradient-to-br border-none cursor-pointer flex flex-col items-center justify-center gap-2 text-white font-bold text-xs transition-all duration-300 focus:outline-none"
        :class="{ 'toggle-open': isOpen }"
      >
        
        
        <svg class="discord-icon w-7 h-7 fill-white mb-1" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0786-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0795.0095c.1192.099.2463.1981.3721.2924a.077.077 0 01-.0064.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1824 0-2.1568-1.0857-2.1568-2.419 0-1.3332.9554-2.4189 2.1568-2.4189 1.2108 0 2.1757 1.0952 2.1569 2.419 0 1.3332-.946 2.4189-2.1569 2.4189z"/>
        </svg>
        
        <span class="sidebar-text text-xs font-bold tracking-wide">DISCORD</span>
      </button>

      <!-- Содержимое сайдбара -->
      <div class="sidebar-content w-full h-full flex flex-col bg-discord-dark rounded-l-2xl">
        <!-- Заголовок -->
        <div class="sidebar-header bg-discord-darker p-4 border-b-2 border-discord-primary flex justify-between items-center rounded-tl-2xl">
          <h3 class="text-white text-lg font-semibold m-0">Discord Chat</h3>
          <button 
            @click="closeSidebar"
            class="close-btn bg-transparent border-none text-gray-400 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110 focus:outline-none"
          >
            ×
          </button>
        </div>

        <!-- Discord iframe -->
        <div class="flex-1 bg-discord-bg relative " >
          <iframe
            ref="discordFrame"
            src="https://discord.com/widget?id=1395897188202188888&theme=dark"
            allowtransparency="true"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            loading="lazy"
            class="discord-iframe w-full h-full border-none"
            style="text-size-adjust: 50px;"
            @load="onIframeLoad"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const discordFrame = ref(null)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}



// Закрытие по Escape
const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeSidebar()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>




/* Альтернативный подход - используем CSS zoom */
.discord-iframe {
  zoom: 100%;                      /* Увеличить масштаб на 10% */
}

.discord-sidebar {
  /* ШИРИНА ОКНА */
  width: 400px;        /* Измените это значение для ширины (например: 300px, 500px) */
  
  /* ВЫСОТА ОКНА */
  height: 600px;       /* Измените это значение для высоты (например: 500px, 700px) */
  
  /* ПОЗИЦИОНИРОВАНИЕ */
  top: 50%;
  right: -400px;       /* Должно быть равно ширине окна со знаком минус */
  transform: translateY(-50%);
  
  /* Остальные стили */
  background: var(--discord-dark);
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 15px 0 0 15px;
}

.discord-sidebar.sidebar-open {
  right: 0;
}

.sidebar-toggle {
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 120px;
  border-radius: 15px 0 0 15px;
}

.sidebar-toggle.toggle-open {
  background: linear-gradient(to bottom right, #4a5b90, #3d4b7a) !important;
}

.sidebar-toggle:hover {
  background: linear-gradient(to bottom right, #5b6eae, #4a5b90) !important;
}

.sidebar-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}


/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .discord-sidebar {
    /* МОБИЛЬНЫЕ РАЗМЕРЫ */
    width: 95vw;         /* Ширина на мобильных (95% экрана) */
    height: 80vh;        /* Высота на мобильных (80% экрана) */
    right: -95vw;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
  }
  
  .sidebar-toggle {
    left: -50px;
    width: 50px;
    height: 100px;
    top: 20px;
    transform: none;
  }
  
  .discord-icon {
    width: 24px;
    height: 24px;
  }
  
  .sidebar-text {
    font-size: 10px;
  }
}

/* Fallback цвета если Tailwind не настроен */
.bg-discord-primary { background-color: var(--discord-primary); }
.bg-discord-secondary { background-color: var(--discord-secondary); }
.bg-discord-dark { background-color: var(--discord-dark); }
.bg-discord-darker { background-color: var(--discord-darker); }
.bg-discord-bg { background-color: var(--discord-bg); }
.bg-discord-light { background-color: var(--discord-light); }
.border-discord-primary { border-color: var(--discord-primary); }
.from-discord-primary { --tw-gradient-from: var(--discord-primary); }
.to-discord-secondary { --tw-gradient-to: var(--discord-secondary); }
</style>