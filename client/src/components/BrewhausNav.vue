<template>
    <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
        <BNavbarBrand class="me-5" href="#">
            <img src="../assets/beer-mug.svg" class="d-inline-block" alt="Brewhaus logo" />
            Brewhaus
        </BNavbarBrand>
        <BNavbarToggle target="nav-collapse" />
        <BCollapse id="nav-collapse" class="ms-lg-5" is-nav>
            <BNavbarNav>
                <BNavItem @click="resetSearchTerm" href="#/">Home</BNavItem>
            </BNavbarNav>
            <BNavbarNav class="ms-auto mb-2 mb-lg-0">
                <BNavForm class="d-flex" @submit="submitSearch">
                    <BFormInput v-model="searchTerm" class="me-2" placeholder="Search" />
                    <BButton type="submit" href="/" variant="success">Search</BButton>
                </BNavForm>
            </BNavbarNav>
        </BCollapse>
    </BNavbar>
</template>

<script setup>
import usePunkAPI from '../composables/usePunkAPI';

const { searchTerm, updatePageNumber, resetSearchTerm } = usePunkAPI()

const submitSearch = async () => {
    // redirect to home page and ensure component view updates
    history.replaceState(null, "Brewhaus", "#/")
    window.dispatchEvent(new HashChangeEvent("hashchange"))
    // ensure we get the first page of results
    await updatePageNumber(1)
}
</script>