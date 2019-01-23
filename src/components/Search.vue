<template>
    <div class="m-2 text-left row">
        <label class="col-3 col-form-label">Search:</label>
        <input class="col-6 form-control" v-on:input="performSearch()" placeholder="Text to Search" v-model="searchTerm" />
    </div>
</template>

<script>
    import { mapActions } from "vuex"

    export default ({
        data: () => ({
            searchTerm: ""
        }),
        methods: {
            ...mapActions(["search"]),
            performSearch() {
                this.search(this.searchTerm);
            }
        }
    })
</script>