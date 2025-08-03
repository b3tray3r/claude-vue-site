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
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener" class="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center 
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
              <router-link v-if="link.internal" :to="link.url"
                class="text-gray-400 hover:text-primary transition-colors relative group">
                {{ link.name }}
              </router-link>

              <a v-else :href="link.url" class="text-gray-400 hover:text-primary transition-colors relative group">
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
              <a :href="link.url" class="text-gray-400 hover:text-primary transition-colors relative group">

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

          <div class="flex flex-wrap gap-2 text-xs"> <!-- изменено на flex-wrap и gap для адаптивности -->
            <button @click="showUserAgreement" class="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              Пользовательское соглашение
            </button>
            <span class="text-gray-600">|</span>
            <button @click="showPrivacyPolicy" class="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              Политика конфиденциальности
            </button>
            <span class="text-gray-600">|</span>
            <button @click="showServerRules" class="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              Правила сервера
            </button>
            <span class="text-gray-600">|</span>
            <button @click="showAntiCheatPolicy" class="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              Проверка на читы
            </button>
            <span class="text-gray-600">|</span>
            <button @click="showDonationTerms" class="text-gray-400 hover:text-primary transition-colors cursor-pointer">
              Условия доната
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Swal from 'sweetalert2'

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
  { name: 'Подключиться', url: '#join', internal: false },
  { name: 'Правила', url: '#rules', internal: false },
]

const supportLinks = [
  { name: 'Помощь', url: '#help' },
  { name: 'Сообщить об ошибке', url: '#bugs' },
  { name: 'Администратор', url: '#admin' },
  { name: 'Апелляция', url: '#appeals' }
]

const userAgreementText = `
<div style="text-align: left; font-size: 14px; line-height: 1.6; max-height: 500px; overflow-y: auto;">
  <h3 style="color: #e11d48; margin-bottom: 15px;">ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ KONURA RUST</h3>
  <div style="margin-bottom: 10px;"><strong>Версия от: 02.08.2025</strong></div>
  
  <p style="margin-bottom: 10px;"><strong>1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</strong></p>
  <p style="margin-bottom: 15px;">«Сервер» – игровой сервер в игре Rust, а также связанные с ним веб-ресурсы (сайт, Discord-сервер, Телеграмм канал) управляемые Администрацией.</p>
  
  <p style="margin-bottom: 10px;"><strong>2. ПРИНЯТИЕ УСЛОВИЙ</strong></p>
  <p style="margin-bottom: 15px;">Используя Сервер "Konura Rust", вы подтверждаете, что ознакомились с настоящим Соглашением и безоговорочно принимаете все его условия.</p>
  
  <p style="margin-bottom: 10px;"><strong>3. ОБЯЗАННОСТИ ПОЛЬЗОВАТЕЛЯ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Соблюдать правила сервера и законодательство РФ</li>
    <li>Не использовать читы, эксплойты и стороннее ПО</li>
    <li>Поддерживать уважительную атмосферу</li>
    <li>Не нарушать права других игроков</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>4. ОТВЕТСТВЕННОСТЬ</strong></p>
  <p style="margin-bottom: 15px;">Администрация не несет ответственности за потерю игровых данных, технические сбои или действия других игроков.</p>
  
  <p style="margin-bottom: 10px;"><strong>5. ИЗМЕНЕНИЯ СОГЛАШЕНИЯ</strong></p>
  <p>Администрация оставляет за собой право изменять данное соглашение без предварительного уведомления.</p>
</div>
`

const privacyPolicyText = `
<div style="text-align: left; font-size: 14px; line-height: 1.6; max-height: 500px; overflow-y: auto;">
  <h3 style="color: #e11d48; margin-bottom: 15px;">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h3>
  <div style="margin-bottom: 10px;"><strong>Версия от: 02.08.2025</strong></div>
  
  <p style="margin-bottom: 10px;"><strong>1. СОБИРАЕМАЯ ИНФОРМАЦИЯ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>SteamID / SteamID64 и игровое имя</li>
    <li>IP-адрес и информация о подключении</li>
    <li>Логи игровых действий и чата</li>
    <li>Данные транзакций при донате</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>2. ЦЕЛИ ИСПОЛЬЗОВАНИЯ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Обеспечение работоспособности сервера</li>
    <li>Идентификация пользователей</li>
    <li>Расследование нарушений</li>
    <li>Техническая поддержка</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>3. ХРАНЕНИЕ ДАННЫХ</strong></p>
  <p style="margin-bottom: 15px;">Игровые данные хранятся до вайпа, данные о банах - бессрочно для перманентных банов, логи чата - 1 месяц.</p>
  
  <p style="margin-bottom: 10px;"><strong>4. ПРАВА ПОЛЬЗОВАТЕЛЕЙ</strong></p>
  <p>Вы имеете право запрашивать доступ к своим данным и требовать их исправления через support@konurarust.com</p>
</div>
`

const serverRulesText = `
<div style="text-align: left; font-size: 14px; line-height: 1.6; max-height: 500px; overflow-y: auto;">
  <h3 style="color: #e11d48; margin-bottom: 15px;">ПРАВИЛА СЕРВЕРА "KONURA RUST"</h3>
  <div style="margin-bottom: 10px;"><strong>Версия от: 02.08.2025</strong></div>
  
  <p style="margin-bottom: 10px;"><strong>1. ОСНОВНЫЕ ПРИНЦИПЫ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li><strong>Уважение:</strong> Взаимное уважение ко всем участникам</li>
    <li><strong>Честность:</strong> Запрет на получение несправедливого преимущества</li>
    <li><strong>Ответственность:</strong> Отвечайте за свои действия</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>2. ГЛОБАЛЬНЫЕ ЗАПРЕТЫ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li><strong>Читы и эксплойты:</strong> Перманентный бан</li>
    <li><strong>Дискриминация:</strong> Запрет на разжигание розни</li>
    <li><strong>Спам и реклама:</strong> Мут/предупреждение</li>
    <li><strong>Обход бана:</strong> Пермабан всех аккаунтов</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>3. ИГРОВЫЕ ПРАВИЛА</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>PvP и рейды разрешены в любое время</li>
    <li>Соблюдайте правила чата</li>
    <li>Не стройте лагающие постройки</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>4. НАКАЗАНИЯ</strong></p>
  <p>Предупреждение → Мут → Временный бан → Перманентный бан</p>
</div>
`

const antiCheatPolicyText = `
<div style="text-align: left; font-size: 14px; line-height: 1.6; max-height: 500px; overflow-y: auto;">
  <h3 style="color: #e11d48; margin-bottom: 15px;">ПОЛИТИКА ПРОВЕРКИ НА ЧИТЫ</h3>
  <div style="margin-bottom: 10px;"><strong>Версия от: 02.08.2025</strong></div>
  
  <p style="margin-bottom: 10px;"><strong>1. ОСНОВАНИЯ ДЛЯ ПРОВЕРКИ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Статистические аномалии (K/D > 5.0)</li>
    <li>Жалобы игроков с доказательствами</li>
    <li>Подозрительные паттерны поведения</li>
    <li>Совпадение HWID/IP с забаненными аккаунтами</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>2. МЕТОДЫ ПРОВЕРКИ</strong></p>
  <ul style="margin-bottom: 15px; padding-left: 20px;">
    <li>Автоматические системы (BattlEye, EAC)</li>
    <li>Демонстрация экрана через Discord</li>
    <li>Проверка с помощью rustcheatcheck.ru и anydesk.com</li>
  </ul>
  
  <p style="margin-bottom: 10px;"><strong>3. ЭТАПЫ ПРОВЕРКИ</strong></p>
  <ol style="margin-bottom: 15px; padding-left: 20px;">
    <li>Уведомление в игре (5 минут на ответ)</li>
    <li>Присоединение к каналу в Discord</li>
    <li>Прохождение проверки</li>
    <li>Получение результата</li>
  </ol>
  
  <p style="margin-bottom: 10px;"><strong>4. ВАШИ ПРАВА</strong></p>
  <p>Вы можете отказаться от проверки, но это может повлиять на решение администрации. Ложные срабатывания рассматриваются через апелляцию.</p>
</div>
`

const donationTermsText = `
<div style="text-align: left; font-size: 14px; line-height: 1.6; max-height: 500px; overflow-y: auto;">
  <h3 style="color: #e11d48; margin-bottom: 15px;">УСЛОВИЯ ДОНАТА</h3>
  <div style="margin-bottom: 10px;"><strong>Скоро будет доступно</strong></div>
  
  <p style="margin-bottom: 10px;"><strong>1. СУЩНОСТЬ ДОНАТА</strong></p>
  <p style="margin-bottom: 15px;">Донат — это добровольное безвозмездное пожертвование в поддержку развития сервера. Донат не является покупкой товара или услуги.</p>
  
  <p style="margin-bottom: 10px;"><strong>2. ПРИВИЛЕГИИ</strong></p>
  <p style="margin-bottom: 15px;">В качестве благодарности за донат могут предоставляться игровые привилегии ("киты"). Администрация может изменять или удалять привилегии без компенсации.</p>
  
  <p style="margin-bottom: 10px;"><strong>3. ВОЗВРАТ СРЕДСТВ</strong></p>
  <p style="margin-bottom: 15px;">Возврат средств не предусмотрен, так как донат является добровольным пожертвованием.</p>
  
  <p style="margin-bottom: 10px;"><strong>4. ОТВЕТСТВЕННОСТЬ</strong></p>
  <p>При изменении функционала привилегий или прекращении работы сервера компенсация не предоставляется.</p>
</div>
`

const showUserAgreement = () => {
  Swal.fire({
    title: 'Пользовательское соглашение',
    html: userAgreementText,
    icon: 'info',
    confirmButtonText: 'Понятно',
    confirmButtonColor: '#e11d48',
    width: '700px',
    customClass: {
      popup: 'swal-dark-theme',
      title: 'swal-title',
      content: 'swal-content'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCloseButton: true,
    focusConfirm: false,
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}

const showPrivacyPolicy = () => {
  Swal.fire({
    title: 'Политика конфиденциальности',
    html: privacyPolicyText,
    icon: 'info',
    confirmButtonText: 'Понятно',
    confirmButtonColor: '#e11d48',
    width: '700px',
    customClass: {
      popup: 'swal-dark-theme',
      title: 'swal-title',
      content: 'swal-content'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCloseButton: true,
    focusConfirm: false,
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}

const showServerRules = () => {
  Swal.fire({
    title: 'Правила сервера',
    html: serverRulesText,
    icon: 'info',
    confirmButtonText: 'Понятно',
    confirmButtonColor: '#e11d48',
    width: '700px',
    customClass: {
      popup: 'swal-dark-theme',
      title: 'swal-title',
      content: 'swal-content'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCloseButton: true,
    focusConfirm: false,
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}

const showAntiCheatPolicy = () => {
  Swal.fire({
    title: 'Политика проверки на читы',
    html: antiCheatPolicyText,
    icon: 'info',
    confirmButtonText: 'Понятно',
    confirmButtonColor: '#e11d48',
    width: '700px',
    customClass: {
      popup: 'swal-dark-theme',
      title: 'swal-title',
      content: 'swal-content'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCloseButton: true,
    focusConfirm: false,
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}

const showDonationTerms = () => {
  Swal.fire({
    title: 'Условия доната',
    html: donationTermsText,
    icon: 'info',
    confirmButtonText: 'Понятно',
    confirmButtonColor: '#e11d48',
    width: '700px',
    customClass: {
      popup: 'swal-dark-theme',
      title: 'swal-title',
      content: 'swal-content'
    },
    background: '#1f2937',
    color: '#f9fafb',
    showCloseButton: true,
    focusConfirm: false,
    allowOutsideClick: true,
    allowEscapeKey: true
  })
}
</script>

<style>
/* Кастомные стили для SweetAlert2 */
.swal-dark-theme {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.swal-title {
  color: #e11d48 !important;
  font-weight: bold !important;
}

.swal-content {
  color: #f9fafb !important;
}

/* Стили для скроллбара в модальном окне */
.swal2-html-container::-webkit-scrollbar {
  width: 6px;
}

.swal2-html-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.swal2-html-container::-webkit-scrollbar-thumb {
  background: #e11d48;
  border-radius: 3px;
}

.swal2-html-container::-webkit-scrollbar-thumb:hover {
  background: #be185d;
}
</style>