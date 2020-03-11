import axios from 'axios'

export const state = () => ({
    //State
    cart: [],
    totalPrice: 0,
    categories:[]
}) 

export const actions = {
    addProductToCart({ state, commit}, product) {
        const cartProduct = state.cart.find(prod => prod._id === product._id);
        if(!cartProduct) {
            commit('pushProductToCart', product);
        } else {
            commit('incrementProductQty', cartProduct);
        }
        commit('incrementTotalPrice');
    },
    // async nuxtServerInit({commit}){
    //     const response = await this.$axios.$get('/api/categories');
    //     commit('setCategories',response.categories)
    //     console.log(response)
    // }
    
}

export const mutations = {
    setCategories(state, categories){
        state.categories = categories;
    },
    pushProductToCart(state,product){
        product.quantity = 1;
        state.cart.push(product)
    },

    incrementProductQty(state,product){
        product.quantity++;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, product);
    },

    incrementTotalPrice(state){
        state.totalPrice = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.totalPrice += product.price.$numberDecimal*product.quantity
            })
        }
    },
    changeQty( state, {product, qty} ){
        let cartProduct = state.cart.find(prod => prod._id === product._id)
        cartProduct.quantity = qty;

        state.totalPrice = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.totalPrice += product.price.$numberDecimal*product.quantity
            })
        }

        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct, 1, cartProduct);
    },
    /* 
        1.get the index of the product thet we want to delete  
        2.remove that product by using splice
    */
    removeProduct(state,product){
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1);
        state.totalPrice = 0;
        if (state.cart.length > 0) {
            state.cart.map(product => {
                state.totalPrice += product.price.$numberDecimal*product.quantity
            })
        }
    },
}

export const getters = {
    getTotalPrice(state) {
        return state.totalPrice.toFixed(2);
    },
    getCart(state) {
        return state.cart
    },
    getCategories(state){
        return state.categories
    }
}