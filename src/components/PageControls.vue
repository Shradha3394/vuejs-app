<template>
    <div class="row mt-2">
        <div class="col-2 form-group">
            <select class="form-control" v-on:change="changePageSize">
                <option value="4">4 per page</option>
                <option value="8">8 per page</option>
                <option value="12">12 per page</option>
            </select>
        </div>
        <div v-if="pageCount > 1" class="text-right col">
            <button class="btn btn-secondary mx -1" v-bind:disabled="currentPage == 1" v-on:click="setCurrentPage(currentPage-1)">Previous</button>
            <button class="btn btn-secondary mx -1" v-show="currentPage > 4" v-on:click="setCurrentPage(1)">...</button>
            <div class="btn-group mx-2">
                <button v-for="i in pageNumbers" v-bind:key="i"
                        class="btn btn-secpmdary"
                        v-bind:class="{ 'btn-primary': i == currentPage }" v-on:click="setCurrentPage(i)    ">
                    {{ i }}
                </button>
            </div>
            <button class="btn btn-secondary mx -1" v-show="currentPage <= pageCount - 4" v-on:click="setCurrentPage(pageCount)">...</button>
            <button class="btn btn-secondary mx -1" v-bind:disabled="currentPage == pageCount" v-on:click="setCurrentPage(currentPage+1)">Next</button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from "vuex";

    export default {
        computed:
        {
            ...mapState(["currentPage"]),
            ...mapGetters(["pageCount"]),
            pageNumbers() {
                if (this.pageCount < 4) {
                    return Array.from({ length: this.pageCount }, (v, k) => k + 1);
                } else if (this.currentPage <= 4) {
                    return [1, 2, 3, 4, 5];
                } else if (this.currentPage > this.pageCount - 4) {
                    return [...Array(5).keys()].reverse()
                        .map(v => this.pageCount - v);
                } else {
                    return [this.currentPage - 1, this.currentPage,
                    this.currentPage + 1];  
                }
            }
        },
        methods: {
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            changePageSize($event) {
                this.setPageSize(Number($event.target.value));
            }
        }
    }
</script>