<template>
  <footer id="connect" class="bg-gradient-to-br from-gray-900 to-dark-900 border-t border-white/10 relative z-10 ">
    <div class="max-w-6xl mx-auto px-6 py-8"> <!-- padding уменьшен -->
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"> <!-- gap и margin уменьшены -->
        <!-- Brand Section -->
        <div class="text-center md:text-left">
          <h3 class="text-xl font-bold text-primary mb-3">KONURA RUST</h3> <!-- размер и margin уменьшены -->
          <p class="text-gray-300 mb-4 leading-relaxed">
            Интенсивные PvP бои, строительство и выживание.
          </p>
          
          <div class="flex justify-center md:justify-start space-x-4">
            <a v-for="social in socialLinks" :key="social.name"
               :href="social.url" 
               target="_blank" 
               rel="noopener"
               class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center 
                      hover:bg-primary hover:-translate-y-1 transition-all duration-300">
              <img :src="social.icon" :alt="social.name" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="text-center md:text-left">
          <h3 class="text-lg font-bold mb-4">Быстрые ссылки</h3> <!-- размер и margin уменьшены -->
          <ul class="space-y-2"> <!-- уменьшен вертикальный отступ -->
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.url" 
                 class="text-gray-400 hover:text-primary transition-colors relative group">
                <span class="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="text-center md:text-left">
          <h3 class="text-lg font-bold mb-4">Поддержка</h3> <!-- размер и margin уменьшены -->
          <ul class="space-y-2">
            <li v-for="link in supportLinks" :key="link.name">
              <a :href="link.url" 
                 class="text-gray-400 hover:text-primary transition-colors relative group">
                <span class="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-white/10 pt-4"> <!-- padding сверху уменьшен -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-2">
          <p class="text-gray-400 text-xs"> <!-- размер шрифта уменьшен -->
            &copy; 2024 Konura Rust. Все права защищены.
          </p>
          
          <div class="flex space-x-4 text-xs"> <!-- уменьшены отступы и размер шрифта -->
            <a href="#privacy" class="text-gray-400 hover:text-primary transition-colors">
              Конфиденциальность
            </a>
            <a href="#terms" class="text-gray-400 hover:text-primary transition-colors">
              Условия
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socialLinks = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@KonuraRust',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/konurarust',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/pYR8brsq5W',
    icon: 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.png'
  }
]

const quickLinks = [
  { name: 'Подключиться', url: '#join' },
  { name: 'Правила', url: '#rules' },
  { name: 'Магазин', url: 'shop' },
]

const supportLinks = [
  { name: 'Помощь', url: '#help' },
  { name: 'Сообщить об ошибке', url: '#bugs' },
  { name: 'Администратор', url: '#admin' },
  { name: 'Апелляция', url: '#appeals' }
]
</script>
