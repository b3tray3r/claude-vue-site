<template>
  <nav
    class="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }"
  >
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div @click="handleNavClick(link, $event)" class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" @click.prevent="handleLogoClick" class="flex items-center hover:opacity-80 transition-all">
  <img src="/src/assets/logo.png" alt="KONURA RUST Logo" class="w-12 h-12 mr-4" />
  <span class="text-2xl font-black text-primary text-shadow">KONURA</span>
</router-link>



        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <component
            v-for="link in navLinks"
            :key="link.name"
            :is="link.internal ? 'router-link' : 'a'"
            :to="link.internal ? link.href : undefined"
            :replace="link.internal"
            :href="!link.internal ? link.href : undefined"
            @click="handleNavClick(link, $event)"
            :class="getLinkClasses(link.href)"
          >
            {{ link.name }}
            <span
              class="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
            ></span>
          </component>
        </div>

        <!-- User Info & Actions -->
        <div class="flex items-center space-x-4">
          <div v-if="steamUser" class="flex items-center space-x-3">
            <img
              v-if="steamUser.avatar"
              :src="steamUser.avatar"
              :alt="steamUser.name"
              class="w-12 h-12 rounded-full border-2 border-primary animate-pulse-glow"
            />
          </div>

          <a href="steam://connect/203.16.163.232:28834" class="btn-primary flex items-center space-x-2" @click="showServerInfo">
            <span>Подключиться</span>
          </a>

          <button
            v-if="!isAuthenticated"
            @click="login"
            class="btn-steam flex items-center space-x-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/250px-Steam_icon_logo.svg.png"
              alt="Steam"
              class="w-5 h-5"
            />
            <span>Steam Login</span>
          </button>

          <button v-else @click="logout" class="btn-primary flex items-center space-x-2">
            <span>🚪</span>
            <span>Выйти</span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu" class="md:hidden flex flex-col space-y-1 p-2">
            <span
              class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }"
            ></span>
            <span
              class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="{ 'opacity-0': mobileMenuOpen }"
            ></span>
            <span
              class="w-6 h-0.5 bg-white transition-all duration-300"
              :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/10">
        <div class="flex flex-col space-y-4">
          <component
            v-for="link in navLinks"
            :key="link.name"
            :is="link.internal ? 'router-link' : 'a'"
            :to="link.internal ? link.href : undefined"
            :replace="link.internal"
            :href="!link.internal ? link.href : undefined"
            @click="!link.internal && scrollToSection(link.href, $event); closeMobileMenu()"
            class="text-white hover:text-primary transition-colors"
          >
            {{ link.name }}
          </component>
        </div>
      </div>
    </div>
  </nav>
  <div class="h-16"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSteam } from '../composables/useSteam'
import { useRoute } from 'vue-router'
const route = useRoute()

const { user: steamUser, isAuthenticated, login, logout } = useSteam()

const navOpacity = ref(0.6)
const mobileMenuOpen = ref(false)
const getLinkClasses = (href) => {
  const isActive = route.path === href
  return [
    'nav-link',
    'text-lg',
    'font-medium',
    'hover:text-primary',
    'transition-colors',
    'relative',
    'group',
    'cursor-pointer',
    isActive ? 'text-primary font-bold' : 'text-white'
  ]
}
const navLinks = [
  { name: 'Главная', href: '/', internal: true },
  { name: 'Магазин', href: '/shop', internal: true },
  { name: 'Статистика', href: '/stats', internal: true },
  { name: 'Контакты', href: '/contacts', internal: true },
]

const scrollToSection = (href, event) => {
  if (href.startsWith('#')) {
    event.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  const scrollY = window.scrollY
  navOpacity.value = Math.min(0.6 + (scrollY / 100) * 0.3, 0.9)
}
const handleLogoClick = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/').then(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 150)
    })
  }
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Закрыть мобильное меню при клике вне навигации
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      closeMobileMenu()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const handleNavClick = (link, event) => {
  // Если это якорь (#about и т.п.)
  if (!link.internal && link.href.startsWith('#')) {
    scrollToSection(link.href, event)
    return
  }

  // Если кликают по той же странице — просто прокрутка наверх
  if (route.path === link.href) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Если переход на другую внутреннюю страницу — дожидаемся роутинга и скроллим наверх
  if (link.internal) {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 150)
  }

  closeMobileMenu()
}

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
