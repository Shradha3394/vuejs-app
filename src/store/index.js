import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrdersModule from "./orders";

Vue.use(Vuex);

const baseUrl = "http://localhost:8081";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule, orders: OrdersModule },
    state: {
        products: [],
        categoriesData: [],
        productsTotal: 0,
        currentPage: 1,
        pageSize: 4,
        currentCategory: "All",
        searchTerm: ""
    },
    getters: {
        productsFilteredByCategory: state => {
            return state.products.filter(p => state.currentCategory === "All" || p.category === state.currentCategory);
        },
        processedProducts: (state, getters) => {
            const index = (state.currentPage - 1) * state.pageSize;
            return getters.productsFilteredByCategory.slice(index, index + state.pageSize);
        },
        pageCount: (state, getters) => Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
        categories: state => ["All", ...state.categoriesData]
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
        },
        setCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        },
        setData(state, data) {
            state.products = data.pdata;
            state.productsTotal = data.pdata.length;
            state.categoriesData = data.cdata.sort();
        },
        setSearchTerm(state, term) {
            state.searchTerm = term;
            state.currentPage = 1;
        }
    },
    actions: {
        async getData(context) {
            let url = productsUrl;
            var separator = "?";
            if (context.state.currentCategory !== "All") {
                url += `${separator}category=${context.state.currentCategory}`;
                separator = "&";
            }

            if (context.state.searchTerm !== "") {
                url += `${separator}q=${context.state.searchTerm}`;
            }

            let response = await Axios.get(url);
            let cdata = (await Axios.get(categoriesUrl)).data;
            context.commit("setData", { pdata: response.data, cdata });
        },
        search(context, term) {
            context.commit("setSearchTerm", term);
            context.dispatch("getData");
        }
    }
});