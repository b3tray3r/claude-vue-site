<template>
  <div class="flex justify-center flex-wrap gap-4 py-6">
    <button
      v-for="(name, key) in categories"
      :key="key"
      @click="$emit('select', key)"
      :class="[
        'px-6 py-2 rounded-md font-semibold flex items-center gap-2 transition-all duration-300',
        currentCategory === key
          ? 'bg-gradient-to-br from-orange-500 to-orange-400 text-black shadow-lg'
          : 'bg-white/10 text-white hover:bg-orange-500 hover:text-black'
      ]"
    >
      <span>{{ getIcon(key) }}</span>
      {{ name }}
    </button>
  </div>
</template>

<script setup>
defineProps(['categories', 'currentCategory'])
defineEmits(['select'])

function getIcon(key) {
  return {
    subscriptions: '⭐',
    items: '🔧',
    access: '🔑',
    kits: '📦'
  }[key] || '🎁'
}
</script>
