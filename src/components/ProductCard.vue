<template>
  <div ref="card" :style="cardStyle"
    class="flex flex-col h-full p-4 rounded-xl border-2 bg-black/40 border-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-orange-500 group relative overflow-hidden"
    :class="{
      'border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-white/10': product.rarity === 'legendary',
      'border-purple-400 bg-gradient-to-br from-purple-400/10 to-white/10': product.rarity === 'rare',
      'border-blue-400 bg-gradient-to-br from-blue-400/10 to-white/10': product.rarity === 'common'
    }">
    
    <!-- Популярный баннер -->
    <div v-if="product.popular"
      class="absolute top-8 right-[-40px] bg-red-500 text-white px-10 py-1 text-xs font-bold rotate-45 shadow-lg z-10">
      ПОПУЛЯРНО
    </div>

    <!-- Заголовок -->
<div class="text-center mb-4 pt-2">
  <div class="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
    {{ product.icon }}
  </div>
  <h3 class="text-xl font-bold text-white mb-1">
    {{ product.name }}
  </h3>
  <div class="text-2xl font-extrabold text-orange-500 flex items-center justify-center m;">
    {{ product.price }}
    <img
      src="https://api.iconify.design/streamline:bone-solid.svg?color=%23ff7331"
      alt="Coin"
      class="w-5 h-5 ml-3"
    />
  </div>
</div>



    <!-- Описание -->
    <div v-if="product.description" class="text-center text-sm text-white/70 mb-4">
      {{ product.description }}
    </div>

    <!-- Срок действия -->
    <div v-if="product.duration" class="text-center text-sm italic text-white/60 mb-4">
      Срок действия: {{ product.duration }}
    </div>

    <!-- Количество -->
    <div v-if="product.quantity" class="text-center text-sm italic text-green-400 mb-4">
      Количество: {{ product.quantity }}
    </div>

    <!-- Особенности -->
    <ul class="mb-6 space-y-2 text-center flex flex-col items-center">
      <li v-for="feature in product.features" :key="feature" class="flex items-center gap-2 text-white/80 text-sm">
        <span class="text-green-400 font-bold">✓</span> {{ feature }}
      </li>
    </ul>

    <!-- Картинка -->
    <div class="mb-4 pb-8 flex justify-center">
      <img :src="product.image" :alt="product.name"
        class="w-60 h-auto object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105 group-hover:rotate-2" />
    </div>

    <!-- Кнопка -->
    <button
      class="mt-auto w-full bg-gradient-to-br from-orange-500 to-orange-400 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-300 hover:from-orange-600 hover:to-orange-500 hover:-translate-y-1"
      @click="handleBuy">
      Купить сейчас
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { useSteam } from '../composables/useSteam'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['buy'],
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    cardStyle() {
      return {
        opacity: this.isVisible ? 1 : 0,
        transform: this.isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${this.index * 100}ms, transform 0.6s ease ${this.index * 100}ms`
      }
    }
  },
  mounted() {
    this.observeCard()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    observeCard() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true
            this.observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      if (this.$refs.card) {
        this.observer.observe(this.$refs.card)
      }
    },
    async handleBuy() {
      const steam = useSteam()
      await steam.refreshAuth()

      if (!steam.isAuthenticated.value) {
        await Swal.fire({
          imageUrl: "https://konurarust.com/assets/logo-3nGJ9XyH.png",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: "Custom image",
          title: 'Авторизация',
          text: 'Пожалуйста, авторизуйтесь через Steam перед покупкой.',
          confirmButtonText: 'Понятно',
          background: '#1f1f1f',
          color: '#fff',
          confirmButtonColor: '#f97316',
          scrollbarPadding: false,
          customClass: {
            popup: 'custom-swal-popup',
            backdrop: 'custom-swal-backdrop'
          }
        })
        return
      }

      this.$emit('buy', this.product)
    }
  }
}
</script>