<template>
  <div class="min-h-screen flex flex-col">
    <SplashScreen />
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <CookieConsent />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import CookieConsent from './components/CookieConsent.vue'
import SplashScreen from './components/SplashScreen.vue'
</script>