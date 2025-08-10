<!-- Shop.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-orange-900 relative overflow-x-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="text-center py-12">
        <h1 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 mb-4">
          KONURA SHOP
        </h1>
        <p class="text-xl text-white/80 max-w-2xl mx-auto px-4">
          Покупайте привилегии, оружие, ресурсы и взрывчатку для доминирования на сервере
        </p>
      </div>

      <!-- Category Navigation -->
      <CategoryNav
        :categories="categories"
        :currentCategory="currentCategory"
        @select="selectCategory"
      />

      <!-- Products Grid -->
      <ProductGrid
        :products="filteredProducts"
        :isTransitioning="isTransitioning"
        @buy="openPurchaseModal"
      />

      <!-- Purchase Modal -->
      <PurchaseModal
        v-if="showPurchaseModal"
        :product="selectedProduct"
        @close="closePurchaseModal"
        @purchase="handlePurchase"
      />
    </div>

    <!-- Particles Effect -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        v-for="i in 15" 
        :key="i"
        class="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-bounce"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CategoryNav from '../components/CategoryNav.vue'
import ProductGrid from '../components/ProductGrid.vue'
import PurchaseModal from '../components/PurchaseModal.vue'
import { categories, products } from '../utils/shopData'
import Swal from 'sweetalert2'

// Reactive state
const currentCategory = ref('privileges')
const isTransitioning = ref(false)
const showPurchaseModal = ref(false)
const selectedProduct = ref(null)

// Computed properties
const filteredProducts = computed(() => {
  return products[currentCategory.value] || []
})

// Methods
const selectCategory = async (category) => {
  if (category === currentCategory.value) return
  
  isTransitioning.value = true
  
  setTimeout(() => {
    currentCategory.value = category
    setTimeout(() => {
      isTransitioning.value = false
    }, 100)
  }, 200)
}

const openPurchaseModal = (product) => {
  selectedProduct.value = product
  showPurchaseModal.value = true
}

const closePurchaseModal = () => {
  showPurchaseModal.value = false
  selectedProduct.value = null
}

const handlePurchase = async (purchaseData) => {
  try {
    // Здесь должна быть логика обработки покупки
    console.log('Purchase data:', purchaseData)
    
    // Симуляция обработки покупки
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Показываем сообщение об успешной покупке
    await Swal.fire({
      imageUrl: "https://konurarust.com/assets/logo-3nGJ9XyH.png",
      imageWidth: 150,
      imageHeight: 150,
      title: 'Покупка успешна!',
      text: `${purchaseData.product.name} был добавлен в ваш инвентарь`,
      icon: 'success',
      confirmButtonText: 'Отлично!',
      background: '#1f1f1f',
      color: '#fff',
      confirmButtonColor: '#f97316',
      scrollbarPadding: false,
      customClass: {
        popup: 'custom-swal-popup',
        backdrop: 'custom-swal-backdrop'
      }
    })
    
    closePurchaseModal()
    
  } catch (error) {
    console.error('Purchase error:', error)
    
    await Swal.fire({
      imageUrl: "https://konurarust.com/assets/logo-3nGJ9XyH.png",
      imageWidth: 150,
      imageHeight: 150,
      title: 'Ошибка покупки',
      text: 'Произошла ошибка при обработке покупки. Попробуйте снова.',
      icon: 'error',
      confirmButtonText: 'Понятно',
      background: '#1f1f1f',
      color: '#fff',
      confirmButtonColor: '#f97316'
    })
  }
}

// Lifecycle
onMounted(() => {
  // Инициализация компонента
})
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
}

/* Custom SweetAlert styles */
:global(.custom-swal-popup) {
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
}

:global(.custom-swal-backdrop) {
  backdrop-filter: blur(8px);
}
</style>