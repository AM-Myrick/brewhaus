<template>
    <BeerCard v-if="currentBeer" :beer="currentBeer" />
    <div v-else class="d-flex justify-content-center">
        <BSpinner variant="primary "/>
    </div>
</template>

<script setup>
import BeerCard from '../components/BeerCard.vue';
import { computed, onMounted, onUnmounted } from 'vue'
import usePunkAPI from "../composables/usePunkAPI"
import { getLastNumberOfString } from '../utilities.js'

const { 
    currentBeer, 
    fetchCurrentBeer, 
    resetSearchTerm 
} = usePunkAPI()

const beerId = computed(() => {
    return getLastNumberOfString(window.location.href)
})

onMounted(async () => {
    if (!currentBeer.value || currentBeer.value.id !== beerId.value) {
        await fetchCurrentBeer(beerId.value)
    }
})
</script>