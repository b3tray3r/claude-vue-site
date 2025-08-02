<template>
  <div class="min-h-screen bg-dark-900 text-white">
    
    <!-- Video Background -->
    <VideoBackground />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Map Section -->
    <MapSection />
    
    <!-- Content Section -->
    <ContentSection />
    
    <!-- CTA Section -->
    <CTASection />
  
  </div>
</template>

<script setup>
import VideoBackground from '../components/VideoBackground.vue'
import HeroSection from '../components/HeroSection.vue'
import MapSection from '../components/MapSection.vue'
import ContentSection from '../components/ContentSection.vue'
import CTASection from '../components/CTASection.vue'
</script>