export const state = () => ({
    //State
    cart: [],
    totalPrice: 0 
}) 

export const actions = {
    addProductToCart({ state, commit}, product){
        const cartProduct = state.cart.find(prod => prod._id === product._id);

        if(!cartProduct) {
            commit('pushProductToCart', product);
        } else {
            commit('incrementProductQty', product);
        }
        commit('incrementTotalPrice');
    }
}

export const mutations = {
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
    }
}

export const getters = {
    getTotalPrice(state) {
        return state.totalPrice.toFixed(2);
    }
}