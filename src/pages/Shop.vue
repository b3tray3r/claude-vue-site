<template>
  <div class="shop-container flex flex-col min-h-screen">
    <!-- Категории товаров -->
    <section class="shop-categories">
      <div class="container">
        <div class="categories-nav">
          <!-- @click="switchCategory(categoryKey)" -->
          <button
  v-for="(categoryName, categoryKey) in categories"
  :key="categoryKey"
  class="category-btn"
  @click="stopCategory(categoryKey)"
  :class="{
    active: currentCategory === categoryKey,
    'under-construction': categoryKey !== 'privilege'
  }"
>
  <span class="category-icon">{{ getCategoryIcon(categoryKey) }}</span>
  {{ categoryName }}
</button>

        </div>
      </div>
    </section>

    <!-- Товары -->
    <section class="shop-products">
      <div class="container">
        <div class="products-grid" :style="{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
          pointerEvents: isTransitioning ? 'none' : 'auto'
        }">
          <ProductCard v-for="(product, index) in currentProducts" :key="product.id" :product="product" :index="index"
            @buy="openPurchaseModal" />
        </div>
      </div>
    </section>

    <!-- Модальное окно покупки -->
    <PurchaseModal v-if="showModal" :product="selectedProduct" @close="closePurchaseModal"
      @purchase="processPurchase" />
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import PurchaseModal from '../components/PurchaseModal.vue'
import CategoryNav from '../components/CategoryNav.vue'
import { SHOP_CONFIG, SHOP_DATA } from '../utils/shopData.js'
import Swal from 'sweetalert2'


export default {
  name: 'Shop',
  components: {
    ProductCard,
    PurchaseModal
  },
  data() {
    return {
      currentCategory: 'privilege',
      categories: SHOP_CONFIG.CATEGORIES,
      shopData: SHOP_DATA,
      showModal: false,
      selectedProduct: null,
      isTransitioning: false
    }
  },
  computed: {
    currentProducts() {
      return this.shopData[this.currentCategory] || []
    }
  },
  methods: {
    getCategoryIcon(categoryKey) {
      const icons = {
        subscriptions: '',
        items: '',
        access: '',
        kits: ''
      }
      return icons[categoryKey] || ''
    },

    switchCategory(category) {
      if (category === this.currentCategory || this.isTransitioning) return

      this.isTransitioning = true

      setTimeout(() => {
        this.currentCategory = category
        this.isTransitioning = false
      }, SHOP_CONFIG.ANIMATION.TRANSITION_DURATION)
    },
    stopCategory(category) {
      // если категория 'privilege' — переключаемся
      if (category === 'privilege') {
        this.switchCategory(category)
        return
      }

      // иначе показываем SweetAlert
      Swal.fire({
        icon: 'info',
        title: 'В разработке',
        text: `Категория "${this.categories[category]}" пока в разработке.`,
        confirmButtonText: 'Ок',
        confirmButtonColor: '#ff6b35',
        background: '#1a1a1a',
        color: '#fff',
        scrollbarPadding: false,
      })
    }
    ,

    openPurchaseModal(product) {
      this.selectedProduct = product
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },

    closePurchaseModal() {
      this.showModal = false
      this.selectedProduct = null
      document.body.style.overflow = ''
    },

    processPurchase(purchaseData) {
      // Здесь должна быть логика обработки покупки
      const confirmMessage = `
Подтверждение покупки:

Товар: ${purchaseData.product.name}
Цена: ${purchaseData.product.price} ₽
Способ оплаты: ${this.getPaymentMethodName(purchaseData.paymentMethod)}

Продолжить?
      `

      if (confirm(confirmMessage)) {
        this.simulatePurchase(purchaseData)
      }
    },

    getPaymentMethodName(method) {
      const methods = {
        card: 'Банковская карта',
        qiwi: 'QIWI Кошелёк',
        yoomoney: 'ЮMoney'
      }
      return methods[method] || method
    },

    simulatePurchase(purchaseData) {
      // Симуляция процесса покупки
      setTimeout(() => {
        alert(`Покупка "${purchaseData.product.name}" успешно завершена!\n\nТовар будет выдан в течение 5 минут.`)
        this.closePurchaseModal()
      }, 2000)
    }
  }
}



</script>

<style scoped>
.shop-container {
  width: 100%;
}

/* Категории */
.shop-categories {
  padding: var(--spacing-xl, 2rem) 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.categories-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(8px);
  min-width: 140px;
  justify-content: center;
}

.category-btn:hover {
  border-color: #ff6b35;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  background: rgba(255, 107, 53, 0.1);
}

.category-btn.active {
  background: linear-gradient(135deg, #ff6b35, #ff8c5a);
  border-color: #ff6b35;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  transform: translateY(-2px);
}

.category-icon {
  font-size: 1.2rem;
}

/* Товары */
.shop-products {
  padding: 3rem 0;
  min-height: 600px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.category-btn.under-construction {
  position: relative;
  overflow: hidden;
}

.category-btn.under-construction::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 15px;
  background: repeating-linear-gradient(
    45deg,
    #ff6b35,
    #ff6b35 10px,
    #000 10px,
    #000 20px
  );
  top: 40%;
  left: -50%;
  transform: rotate(-15deg);
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
}


/* Адаптивность */
@media (max-width: 768px) {
  .categories-nav {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    min-width: 120px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .categories-nav {
    flex-direction: column;
    align-items: center;
  }

  .category-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>