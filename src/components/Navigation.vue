<template>
  <nav
    class="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }"
  >
    <div class="max-w-6xl mx-auto py-4">
      <div class="flex items-center justify-between">
        <!-- Лого -->
        <router-link to="/" @click.prevent="handleLogoClick" class="flex items-center hover:opacity-80 transition-all">
          <img src="/src/assets/logo.png" alt="KONURA RUST Logo" class="w-12 h-12 mr-4" />
          <span class="text-2xl font-black text-primary text-shadow">KONURA</span>
        </router-link>

        <!-- Десктопное меню -->
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
            <span class="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </component>
        </div>

        <!-- Блок пользователя -->
        <div class="flex items-center space-x-4">
          <!-- Если авторизован -->
          <div v-if="isAuthenticated && steamUser" class="flex items-center space-x-3">
            <!-- Аватар -->
            <img
              v-if="steamUser.avatar"
              :src="steamUser.avatar"
              :alt="steamUser.name"
              class="w-12 h-12 rounded-full border-2 border-primary animate-pulse-glow"
            />

            <!-- Баланс -->
            <div class="flex items-center bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-lg px-3 py-2">
              <div class="flex items-center space-x-2 mr-3">
                <div class="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" alt="Coin" class="w-4 h-4" />
                </div>
                <span class="text-white font-semibold">{{ userCoins.toLocaleString() }}</span>
              </div>
              <button
                @click="showTopUpMenu"
                class="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
                title="Пополнить баланс"
              >
                <span class="text-white text-sm font-bold">+</span>
              </button>
            </div>
          </div>

          <!-- Кнопка подключения -->
          <a href="steam://connect/203.16.163.232:28834" class="btn-primary flex items-center space-x-2" @click="showServerInfo">
            <span>Подключиться</span>
          </a>

          <!-- Кнопки авторизации -->
          <button v-if="!isAuthenticated" @click="login" class="btn-steam flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/250px-Steam_icon_logo.svg.png"
              alt="Steam"
              class="w-5 h-5"
            />
            <span>Steam Login</span>
          </button>

          <button v-else @click="logout" class="btn-primary flex items-center space-x-2">
            <img src="https://api.iconify.design/cuida:logout-outline.svg?color=%23ffffff" alt="Logout" class="w-5 h-5" />
            <span>Выйти</span>
          </button>

          <!-- Кнопка бургера -->
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

      <!-- Мобильное меню -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-white/10">
        <div class="flex flex-col space-y-4">
          <!-- Баланс -->
          <div v-if="isAuthenticated && steamUser" class="flex items-center justify-between bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-lg px-3 py-2">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 border-orange-500 border-2 rounded-full flex items-center justify-center">
                <img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" alt="Coin" class="w-4 h-4" />
              </div>
              <span class="text-white font-semibold">{{ userCoins.toLocaleString() }}</span>
            </div>
            <button
              @click="showTopUpMenu"
              class="w-8 h-8 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
            >
              <span class="text-white font-bold">+</span>
            </button>
          </div>

          <!-- Ссылки -->
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
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()

const steamUser = ref(null)
const isAuthenticated = ref(false)
const userCoins = ref(0)
const navOpacity = ref(0.6)
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Главная', href: '/', internal: true },
  { name: 'Магазин', href: '/shop', internal: true },
  { name: 'Статистика', href: '/stats', internal: true },
  { name: 'Контакты', href: '/contacts', internal: true },
]

// Авторизация
function login() {
  window.location.href = 'https://api.konurarust.com/steam/login'
}

async function logout() {
  const token = localStorage.getItem('authToken')
  if (token) {
    await fetch('https://api.konurarust.com/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    }).catch(() => {})
  }
  localStorage.removeItem('authToken')
  steamUser.value = null
  isAuthenticated.value = false
  userCoins.value = 0
}

async function fetchUser() {
  const token = localStorage.getItem('authToken')
  if (!token) return

  const res = await fetch('https://api.konurarust.com/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (res.ok) {
    const data = await res.json()
    steamUser.value = data.user
    isAuthenticated.value = true

    const balRes = await fetch(`https://api.konurarust.com/rcon/balance/${data.steamId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (balRes.ok) {
      const bal = await balRes.json()
      userCoins.value = bal.balance
    }
  }
}

// Скролл
function handleScroll() {
  navOpacity.value = Math.min(0.6 + (window.scrollY / 100) * 0.3, 0.9)
}

// Меню
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
function closeMobileMenu() {
  mobileMenuOpen.value = false
}

// Навигация
function getLinkClasses(href) {
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
function handleLogoClick() {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/').then(() => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150)
    })
  }
}
function handleNavClick(link, event) {
  if (!link.internal && link.href.startsWith('#')) {
    scrollToSection(link.href, event)
    return
  }
  if (route.path === link.href) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (link.internal) {
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150)
  }
  closeMobileMenu()
}
function scrollToSection(href, event) {
  if (href.startsWith('#')) {
    event.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }
}

// SweetAlerts — магазин и подключение
function showServerInfo() {
  Swal.fire({
    title: '🎮 Подключение к серверу',
    html: `
      <div style="text-align: left; font-size: 16px;">
        <p><strong>IP: </strong> 80.242.59.103:35016</p>
        <p><strong>Игроков онлайн: </strong> 70/400</p>
        <p><strong>Карта: </strong> Barren, размер 4500</p>
        <p><strong>Wipe: </strong> каждый четверг в 15:00</p>
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
    scrollbarPadding: false,
    customClass: {
      popup: 'backdrop-blur-md border border-orange-500 rounded-xl shadow-lg'
    },
    preConfirm: () => {
      window.location.href = 'steam://run/252490//+connect 203.16.163.232:28834'
    }
  })
}

async function showTopUpMenu() {
  // (твой полный код пополнения из старой версии)
}

async function processPayment(paymentData) {
  // (твой полный код обработки платежа из старой версии)
}

onMounted(() => {
  if (route.query.token) {
    localStorage.setItem('authToken', route.query.token)
    router.replace({ query: {} })
  }
  fetchUser()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', e => {
    if (!e.target.closest('nav')) closeMobileMenu()
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
