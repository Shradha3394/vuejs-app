<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col bg-dark text-white">
                    <a class="navbar-brand">SPORTS STORE</a>
                </div>
            </div>
        </div>
        <div class="m-2">
            <div class="form-group m-2">
                <label>Name</label>
                <input v-model="$v.order.name.$model" class="form-control " />
                <div v-if="$v.order.name.$dirty && $v.order.name.$invalid" class="text-danger">
                    Required
                </div>
                <label>Email</label>    
                <input v-model="order.email" class="form-control " />
                <label>Address</label>
                <input v-model="order.address" class="form-control " />
                <label>City</label>
                <input v-model="order.city" class="form-control " />
                <label>Zip Code</label>
                <input v-model="order.zip" class="form-control " />
            </div>
        </div>
        <div class="text-center">
            <router-link to="/cart" class="btn btn-secondary m-1">
                Back
            </router-link>
            <button class="btn btn-primary m-1" v-on:click="submitOrder">
                Place Order
            </button>
        </div>
    </div>
</template>

<script>
    import { required } from "vuelidate/lib/validators";
    import { mapActions } from "vuex"
    export default ({
        data: () => ({
            order: {
                name: null,
                email: null,
                address: null,
                city: null,
                zip: null
            }
        }),
        validations: {
            order: {
                name: { required }
            }
        },
        methods: {
            ...mapActions({ "storeOrder": "storeOrder", "clearCartData": "cart/clearCartData" }),
            async submitOrder() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let orderId = await this.storeOrder(this.order);
                    this.clearCartData();
                    this.$router.push(`/thanks/${orderId}`);
                }
            }
        }
    })
</script>