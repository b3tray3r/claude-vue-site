<template>
  <nav
    class="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300"
    :style="{ backgroundColor: `rgba(0, 0, 0, ${navOpacity})` }"
  >
    <div class="max-w-6xl mx-auto  py-4">
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
          <div v-if="testSteamUser || steamUser" class="flex items-center space-x-3">
            <img
              v-if="(testSteamUser && testSteamUser.avatar) || (steamUser && steamUser.avatar)"
              :src="(testSteamUser && testSteamUser.avatar) || (steamUser && steamUser.avatar)"
              :alt="(testSteamUser && testSteamUser.name) || (steamUser && steamUser.name)"
              class="w-12 h-12 rounded-full border-2 border-primary animate-pulse-glow"
            />
            
            <!-- Coin Balance -->
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

          <a href="steam://connect/203.16.163.232:28834" class="btn-primary flex items-center space-x-2" @click="showServerInfo">
            <span>Подключиться</span>
          </a>

          <button
            v-if="!testIsAuthenticated && !isAuthenticated"
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

          <button v-else-if="testIsAuthenticated" @click="testLogout" class="btn-primary flex items-center space-x-2">
            <img src="https://api.iconify.design/cuida:logout-outline.svg?color=%23ffffff" alt="Logout" class="w-5 h-5" />
            <span>Выйти</span>
          </button>

          <button v-else @click="logout" class="btn-primary flex items-center space-x-2">
            <img src="https://api.iconify.design/cuida:logout-outline.svg?color=%23ffffff" alt="Logout" class="w-5 h-5" />
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
          <!-- Mobile Coin Balance -->
          <div v-if="testSteamUser || steamUser" class="flex items-center justify-between bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-lg px-3 py-2">
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

// Данные пользователя Steam
const steamUser = ref(null)
const isAuthenticated = ref(false)
const userCoins = ref(0) // баланс пользователя

// Интерфейс
const navOpacity = ref(0.6)
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Главная', href: '/', internal: true },
  { name: 'Магазин', href: '/shop', internal: true },
  { name: 'Статистика', href: '/stats', internal: true },
  { name: 'Контакты', href: '/contacts', internal: true },
]

// 🔹 Логин через Steam по новой логике
function login() {
  window.location.href = 'https://api.konurarust.com/steam/login' // твой API
}

// 🔹 Логаут
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

// 🔹 Получение данных пользователя и баланса
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

    // Баланс
    const balRes = await fetch(`https://api.konurarust.com/rcon/balance/${data.steamId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (balRes.ok) {
      const bal = await balRes.json()
      userCoins.value = bal.balance
    }
  }
}

// Анимация прозрачности навигации
function handleScroll() {
  navOpacity.value = Math.min(0.6 + (window.scrollY / 100) * 0.3, 0.9)
}

// Мобильное меню
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
function closeMobileMenu() {
  mobileMenuOpen.value = false
}

// Классы для активных ссылок
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

// 🔹 Пополнение баланса (SweetAlert, твой код без изменений)
async function showTopUpMenu() {
  const { value: formValues } = await Swal.fire({
    title: '💰 Пополнение баланса',
    html: `
      <div style="text-align: left;">
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #f97316;">Сумма к оплате (₽):</label>
          <input id="amount" type="number" min="1" max="50000" value="100" 
                 style="width: 100%; padding: 12px; border: 2px solid #f97316; border-radius: 8px; 
                        background: rgba(0,0,0,0.3); color: white; font-size: 16px;" 
                 placeholder="Введите сумму в рублях">
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(249, 115, 22, 0.1); 
                    border: 1px solid #f97316; border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: center;">
            <div style="width: 24px; height: 24px; border: 2px solid #f97316; 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
              <img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" alt="Coin" class="w-4 h-4" />
            </div>
            <span style="font-size: 18px; font-weight: bold; color: #f97316;" id="coins-amount">200</span>
            <span style="margin-left: 8px; color: #ccc;">Konura Coins</span>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 12px; font-weight: bold; color: #f97316;">Способ оплаты:</label>
          <div style="display: grid; gap: 10px;">
            <label style="display: flex; align-items: center; padding: 12px; border: 2px solid #555; 
                          border-radius: 8px; cursor: pointer; transition: all 0.3s;" 
                   onmouseover="this.style.borderColor='#f97316'" 
                   onmouseout="this.style.borderColor='#555'">
              <input type="radio" name="payment" value="card" checked 
                     style="margin-right: 12px; accent-color: #f97316;">
              <div>
                <div style="font-weight: bold;">💳 Банковская карта</div>
                <div style="font-size: 12px; color: #ccc;">Visa, MasterCard, МИР</div>
              </div>
            </label>
            
            <label style="display: flex; align-items: center; padding: 12px; border: 2px solid #555; 
                          border-radius: 8px; cursor: pointer; transition: all 0.3s;" 
                   onmouseover="this.style.borderColor='#f97316'" 
                   onmouseout="this.style.borderColor='#555'">
              <input type="radio" name="payment" value="spb" 
                     style="margin-right: 12px; accent-color: #f97316;">
              <div>
                <div style="font-weight: bold;">🏦 СПБ (Система быстрых платежей)</div>
                <div style="font-size: 12px; color: #ccc;">Оплата по номеру телефона</div>
              </div>
            </label>
          </div>
        </div>

        <div style="font-size: 12px; color: #ccc; text-align: center; margin-top: 15px;">
          Курс: 1₽ = 2 KC<br>
          Комиссия отсутствует
        </div>
      </div>
    `,
    didOpen: () => {
      const amountInput = document.getElementById('amount')
      const coinsDisplay = document.getElementById('coins-amount')
      const updateCoins = () => {
        const amount = parseInt(amountInput.value) || 0
        coinsDisplay.textContent = (amount * 2).toLocaleString()
      }
      amountInput.addEventListener('input', updateCoins)
      updateCoins()
    },
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Перейти к оплате',
    cancelButtonText: 'Отмена',
    background: 'rgba(15,15,15,0.95)',
    color: '#fff',
    confirmButtonColor: '#f97316',
    cancelButtonColor: '#555',
    width: '500px',
    customClass: {
      popup: 'backdrop-blur-md border border-orange-500 rounded-xl shadow-2xl'
    },
    preConfirm: () => {
      const amount = document.getElementById('amount').value;
      const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
      if (!amount || amount < 1) {
        Swal.showValidationMessage('Введите корректную сумму');
        return false;
      }
      if (amount > 50000) {
        Swal.showValidationMessage('Максимальная сумма: 50,000₽');
        return false;
      }
      return { amount: parseInt(amount), paymentMethod, coins: parseInt(amount) * 2 }
    }
  })

  if (formValues) {
    await processPayment(formValues)
  }
}

async function processPayment(paymentData) {
  const result = await Swal.fire({
    title: 'Подтверждение платежа',
    html: `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 24px; margin-bottom: 20px;">💰</div>
        <div style="margin-bottom: 15px;"><strong>Сумма:</strong> ${paymentData.amount.toLocaleString()}₽</div>
        <div style="margin-bottom: 15px;">
          <strong>Получите:</strong>
          <div style="color: #f97316; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;">
            ${paymentData.coins.toLocaleString()} 
            <img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" style="width: 16px; height: 16px;" />
          </div>
        </div>
        <div style="margin-bottom: 20px;">
          <strong>Способ оплаты:</strong> ${paymentData.paymentMethod === 'card' ? '💳 Карта' : '🏦 СПБ'}
        </div>
        <div style="font-size: 14px; color: #ccc;">После оплаты монеты будут зачислены автоматически</div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Оплатить',
    cancelButtonText: 'Отмена',
    confirmButtonColor: '#f97316',
    cancelButtonColor: '#555',
    background: 'rgba(15,15,15,0.95)',
    color: '#fff',
    customClass: {
      popup: 'backdrop-blur-md border border-orange-500 rounded-xl shadow-2xl'
    }
  })

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Обработка платежа...',
      html: 'Пожалуйста, подождите',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: 'rgba(15,15,15,0.95)',
      color: '#fff'
    })

    setTimeout(() => {
      userCoins.value += paymentData.coins
      Swal.fire({
        icon: 'success',
        title: 'Платеж успешен!',
        html: `
          <div style="text-align: center;">
            <div style="font-size: 20px; margin: 15px 0;">
              Ваш баланс пополнен на <div style="color: #f97316; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;">${paymentData.coins.toLocaleString()} <img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" class="w-4 h-4" />
              </div>
            </div>
            <div style="color: #fff; font-weight: bold; display: inline-flex; align-items: center; gap: 5px;">
              Текущий баланс: <span style="color: #f97316;">${userCoins.value.toLocaleString()} </span><img src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331" class="w-4 h-4" />
            </div>
          </div>
        `,
        confirmButtonText: 'Отлично!',
        confirmButtonColor: '#f97316',
        background: 'rgba(15,15,15,0.95)',
        color: '#fff',
        customClass: {
          popup: 'backdrop-blur-md border border-green-500 rounded-xl shadow-2xl'
        }
      })
    }, 2000)
  }
}

// 📌 Хуки жизненного цикла
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
