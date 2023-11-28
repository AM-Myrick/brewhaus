<template>
  <BrewhausNav />
  <div class="container">
    <component :is="currentView" />
  </div>
</template>

<script setup>
import BrewhausNav from './components/BrewhausNav.vue'
import BeerDetails from './views/BeerDetails.vue';
import Home from './views/Home.vue';
import { ref, computed } from 'vue'

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  if (currentPath.value.includes("beers")) {
    return BeerDetails
  }
  return Home
})
</script>