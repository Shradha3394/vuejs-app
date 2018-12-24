export default {
    namespaced: true,
    state: {
        lines: []
    },
    getters: {
        totalPrice: state => state.lines.reduce((total, line) => total + (line.quantity * line.product.price), 0),
        itemCount: state => state.lines.reduce((total, line) => total + line.quantity, 0)

    },
    mutations: {
        addProduct(state, product) {
            let line = state.lines.find(line => line.product.id === product.id);
            if (line) {
                line.quantity++;
            } else {
                state.lines.push({ product: product, quantity: 1 });
            }
        },
        removeProduct(state, lineToRemove) {
            let index = state.lines.findIndex(line => line === lineToRemove);
            if (index > -1) {
                state.lines.splice(index, 1);
            }
        },
        changeQuantity(state, update) {
            update.line.quantity = update.quantity;
        },
        setCartData(state, data) {
            state.lines = data;
        }
    },
    actions: {
        storeCartData(context) {
            localStorage.setItem("cart", JSON.stringify(context.state.lines));
        },
        loadCartData(context) {
            let data = localStorage.getItem("cart");
            if (data !== null) {
                context.commit("setCartData", JSON.parse(data));
            }
        },
        initializeCart(context, store) {
            context.dispatch("loadCartData");
            store.watch(state => state.cart.lines, () => context.dispatch("storeCartData"), { deep: true });
        }
    }
}