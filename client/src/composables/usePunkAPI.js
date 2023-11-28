import { ref, computed } from 'vue'

const baseURL = 'https://api.punkapi.com/v2/beers'
// using a singleton composable for simple shared state
export default (function () {
    // refs
    const beerList = ref(null)
    const loadingBeerList = ref(false)
    const pageNumber = ref(1)
    const searchTerm = ref("")
    const currentBeer = ref(undefined)
    const loadingCurrentBeer = ref(false)

    // computed
    const isOnFirstPage = computed(() => {
        return pageNumber.value === 1
    })

    const isOnLastPage = computed(() => {
        return beerList.length < 25 || pageNumber.value === 4
    })

    const hasBeerList = computed(() => {
        return beerList.value && beerList.value.length > 0
    }) 

    const isAdvancedSearch = computed(() => {
        // users can execute an advanced search with this pattern: “(param): value” 
        // ex. “abv_gt: 7” will return all beers with an alcohol by volume greater than 7.
        return searchTerm.value.includes(":")
    })

    // methods
    const updateBeerList = async () => {
        loadingBeerList.value = true
        let response
        
        if (isAdvancedSearch.value && searchTerm.value) {
            const [param, searchValue] = searchTerm.value.split(":")
            response = await fetch(`${baseURL}?page=${pageNumber.value}&${param}=${searchValue.trim()}`)
        } else if (searchTerm.value) {
            response = await fetch(`${baseURL}?page=${pageNumber.value}&beer_name=${searchTerm.value}`)
        } else {
            response = await fetch(`${baseURL}?page=${pageNumber.value}`)
        }
    
        if (response.ok) {
            beerList.value = await response.json()
            loadingBeerList.value = false
        }

        if (beerList.value.length === 1) {
            const beer = beerList.value[0]
            updateCurrentBeer(beer)
            // redirect to BeerDetail page and ensure component view updates
            history.replaceState(null, beer.name, `#/beers/${beer.id}`)
            window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
    }

    const updatePageNumber = async (newPageNumber) => {
        if (newPageNumber) {
            pageNumber.value = newPageNumber
        } else {
            pageNumber.value = pageNumber.value++
        }
        await updateBeerList(searchTerm.value)
    }

    const updateCurrentBeer = (newBeer) => {
        currentBeer.value = newBeer
    }

    const fetchCurrentBeer = async (id) => {
        loadingCurrentBeer.value = true
        const response = await fetch(`${baseURL}/${id}`)
        if (response.ok) {
            const fetchedBeer = await response.json()
            currentBeer.value = fetchedBeer[0]
            loadingCurrentBeer.value = false
        }
    }
    
    const resetSearchTerm = async () => {
        searchTerm.value = ''
        await updateBeerList()
    }

    const instance = {
        beerList,
        pageNumber,
        currentBeer,
        searchTerm,
        isOnFirstPage,
        isOnLastPage,
        hasBeerList,
        loadingBeerList,
        updateBeerList,
        updatePageNumber,
        updateCurrentBeer,
        fetchCurrentBeer,
        resetSearchTerm
    }

    return () => instance
})()