<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a class="navbar-brand">SPORTS STORE</a>
            </div>
            <div class="col bg-dark text-white">
                <CartSummary />
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p-2">
                <ProductCategory />
                <Search />

            </div>
            <div class="col-9 p-2 ">
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>
    import ProductList from './ProductList.vue'
    import ProductCategory from './ProductCategory.vue'
    import CartSummary from './CartSummary.vue'
    import Search from './Search.vue'

    export default {
        components: {
            ProductList,
            ProductCategory,
            CartSummary,
            Search
        }
    }
</script>
