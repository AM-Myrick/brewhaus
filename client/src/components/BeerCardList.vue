<template>
    <BCardGroup deck>
        <template v-for="beer in beerList" :key="beer.id">
            <BeerCard :beer="beer" :isCompact="true" />
        </template>
    </BCardGroup>
</template>

<script setup>
import BeerCard from "./BeerCard.vue";
defineProps({
    beerList: Array
})
</script>