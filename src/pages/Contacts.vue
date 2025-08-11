<template>
  <div class="min-h-screen bg-dark-900 text-white">
    
    <ContactsSection />
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
import ContactsSection from '../components/ContactsSection.vue';
import VideoBackground from '../components/VideoBackground.vue';


</script>