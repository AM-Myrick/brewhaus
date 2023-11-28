<template>
    <h1 class="my-3 text-center">Welcome to Brewhaus!</h1>
    <div v-if="loadingBeerList" class="d-flex justify-content-center">
        <BSpinner variant="primary "/>
    </div>
    <BeerCardList :beerList="beerList" v-else />
    <BButtonGroup class="my-5">
        <BButton :disabled="isOnFirstPage" @click="updatePageNumber(1)">First</BButton>
        <BButton v-if="!isOnFirstPage" @click="updatePageNumber(--pageNumber)">Previous</BButton>
        <BButton v-if="!isOnLastPage" @click="updatePageNumber(++pageNumber)">Next</BButton>
        <BButton :disabled="isOnLastPage" @click="updatePageNumber(4)">Last</BButton>
    </BButtonGroup>
</template>

<script setup>
import { onMounted } from 'vue'
import BeerCardList from '../components/BeerCardList.vue';
import usePunkAPI from "../composables/usePunkAPI"

const { 
    beerList, 
    hasBeerList, 
    pageNumber, 
    isOnFirstPage, 
    isOnLastPage, 
    loadingBeerList, 
    updateBeerList, 
    updatePageNumber,
} = usePunkAPI()

onMounted(async () => {
    if (!hasBeerList.value) {
        await updateBeerList()
    }
})
</script>