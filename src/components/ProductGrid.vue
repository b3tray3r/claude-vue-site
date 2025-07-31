<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <div
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300"
      :style="{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
        pointerEvents: isTransitioning ? 'none' : 'auto'
      }"
    >
      <ProductCard
        v-for="(product, index) in products"
        :key="product.id"
        :product="product"
        :index="index"
        @buy="$emit('buy', product)"
      />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

defineProps(['products', 'isTransitioning'])
defineEmits(['buy'])
</script>
