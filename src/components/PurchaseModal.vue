<template>
  <div 
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[99999] p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white/10 backdrop-blur-md border-2 border-white/10 rounded-xl w-full max-w-xs shadow-2xl overflow-hidden transition-all duration-300">
      <!-- Header -->
      <div class="flex items-center justify-between p-3 border-b border-white/10">
        <h3 class="text-sm font-bold text-white">{{ product.name }}</h3>
        <button
          @click="$emit('close')"
          class="text-white/60 hover:text-white transition-colors p-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-3 space-y-3">
        <!-- Product Info -->
        <div class="text-center space-y-2">
          <div class="text-2xl transition-transform duration-300 hover:scale-110">{{ product.icon }}</div>
          <p class="text-xs text-white/80 leading-tight">{{ product.description }}</p>
        </div>

        <!-- Features -->
        <div class="space-y-1">
          <div 
            v-for="(feature, index) in product.features.slice(0, 2)" 
            :key="index" 
            class="text-xs text-white/80 flex items-center gap-1.5"
          >
            <span class="text-green-400 text-xs font-bold">✓</span>
            <span>{{ feature }}</span>
          </div>
          <div 
            v-if="product.features.length > 2"
            class="text-xs text-white/60 pl-4"
          >
            +{{ product.features.length - 2 }} ещё
          </div>
        </div>

        <!-- Price -->
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <div class="flex items-center justify-between">
            <span class="text-xs text-white/80">Цена</span>
            <span class="text-sm font-extrabold text-orange-500">{{ product.price }} ₽</span>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="space-y-1.5">
          <p class="text-xs font-medium text-white">Оплата:</p>
          <div class="flex gap-1.5">
            <button
              v-for="method in paymentMethods"
              :key="method.id"
              @click="selectedPaymentMethod = method.id"
              :class="[
                'flex-1 p-1.5 rounded-lg border-2 transition-all text-xs flex flex-col items-center gap-0.5',
                selectedPaymentMethod === method.id
                  ? 'border-orange-500 bg-gradient-to-b from-orange-500/20 to-orange-600/20 text-orange-400'
                  : 'border-white/10 hover:border-orange-500/50 bg-white/5 text-white/80'
              ]"
            >
              <!-- Credit Card Icon -->
              <svg v-if="method.id === 'card'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <!-- Wallet Icon -->
              <svg v-else-if="method.id === 'yoomoney'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <!-- QIWI Emoji -->
              <span v-else-if="method.id === 'qiwi'" class="text-xs">🥝</span>
              
              <span class="text-xs">{{ method.name }}</span>
            </button>
          </div>
        </div>

        <!-- Purchase Button -->
        <button
          @click="handlePurchase"
          :disabled="!selectedPaymentMethod || isProcessing"
          class="w-full py-2 px-3 bg-gradient-to-br from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 text-sm shadow-lg hover:-translate-y-1"
        >
          <template v-if="isProcessing">
            <div class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span class="text-xs">Покупка...</span>
          </template>
          <template v-else>
            <span class="text-lg">🛒</span>
            <span class="text-xs">Купить сейчас</span>
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Types
interface Product {
  name: string
  icon: string
  description: string
  features: string[]
  price: number
}

interface PaymentMethod {
  id: string
  name: string
}

// Props
const props = defineProps<{
  product: Product
}>()

// Emits
const emit = defineEmits<{
  close: []
  purchase: [data: { product: Product; paymentMethod: string }]
}>()

// Reactive state
const selectedPaymentMethod = ref<string | null>(null)
const isProcessing = ref(false)

// Payment methods
const paymentMethods: PaymentMethod[] = [
  { id: 'card', name: 'Карта' },
  { id: 'qiwi', name: 'QIWI' },
  { id: 'yoomoney', name: 'ЮMoney' }
]

// Methods
const handlePurchase = () => {
  if (!selectedPaymentMethod.value) return
  
  isProcessing.value = true
  
  emit('purchase', {
    product: props.product,
    paymentMethod: selectedPaymentMethod.value
  })
  
  setTimeout(() => {
    isProcessing.value = false
    emit('close')
  }, 2000)
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>


