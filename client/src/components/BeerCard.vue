<template>
    <BCard
        :title="beer.name"
        :subtitle="beer.tagline"
        :img-src="beer.image_url"
        :img-alt="beer.name"
        :class="isCompact ? 'compact-card': 'my-5'">
        <BButton v-if="isCompact" :href="`#/beers/${beer.id}`" @click="updateCurrentBeer(beer)" variant="primary">Learn More</BButton>
        <template v-else-if="currentBeer">
            <ul>
                <li>Alcohol by Volume: {{ `${beer.abv}%` }}</li>
                <li>International Bitterness Unit: {{ beer.ibu }}</li>
                <li>Hops:</li>
                <ul>
                    <li v-for="hop in beer.ingredients.hops">
                        {{ `${hop.amount.value} ${hop.amount.unit} of ${hop.name}` }}
                    </li>
                </ul>
                <li>Malt:</li>
                <ul>
                    <li v-for="malt in beer.ingredients.malt">
                        {{ `${malt.amount.value} ${malt.amount.unit} of ${malt.name}` }}
                    </li>
                </ul>
                <li>Food Pairing:</li>
                <ul>
                    <li v-for="pairing in beer.food_pairing">
                        {{ pairing }}
                    </li>
                </ul>
            </ul>
        </template>
        <template #footer>
            <em>First Brewed: {{ beer.first_brewed }}</em>
        </template>
    </BCard>
</template>

<script setup>
    import usePunkAPI from "../composables/usePunkAPI" 
    defineProps({
        beer: Object,
        isCompact: Boolean
    })

    const { updateCurrentBeer, currentBeer } = usePunkAPI()
</script>

<style>
    .compact-card {
        min-width: 200px;
    }

    .compact-card:only-of-type {
        max-width: 200px;
    }

    .card-img {
        object-fit: contain;
    }

    .compact-card .card-img {
        width: 200px;
        height: 350px;
    }

    .card:not(.compact-card) .card-img {
        height: 600px;
    }
</style>