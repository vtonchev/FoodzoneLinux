

export const state = () => ({
    //State
    cart: [],
    totalPrice: 0,
    categories:{
        '5e53ed71b4a1883840b9a7a0': 'Млечни Продукти',
        '5e540324b4a1883840b9a7a4': 'Месо',
    },
    subcategories:{
        //МЛЕЧНИ ПРОДУКТИ
        '5e53ed71b4a1883840b9a7a0':[
            {
                id: '5e53ed83b4a1883840b9a7a1',
                title: 'Мляко',
            },
            {
                id: '5e6ac7bf8a295720f880b34a',
                title: 'Сирене',
            },
            {
                id: '5e6ac83c8a295720f880b34c',
                title: 'Кашкавал',
            },
            {
                id: '5e6ac88fe7d9fc38044e5b4c',
                title: 'Масло и сметана',
            },
            {
                id: '5e6ac913e7d9fc38044e5b4d',
                title: 'Яйца'
            },
            {
                id: '5e6ac91ce7d9fc38044e5b4e',
                title: 'Прясно мляко',
            },
            {
                id: '5e6ac9acc47fc53d944c9091',
                title: 'Кисело Мляко',
            }
        ],
        //МЕСО
        '5e540324b4a1883840b9a7a4':[
            {
                id:'5e54038cb4a1883840b9a7a5',
                title:'Свинско'
            }
        ]

    },
}) 

export const actions = {
    addProductToCart({commit}, product) {
        commit('pushProductToCart', product);
        commit('refreshTotalPrice')
    },
    incrementQty({state, commit}, id){
        const cartProduct = state.cart.find(prod => prod._id === id)
        if(cartProduct.quantity < cartProduct.stockQuantity){
            commit('incrementProductQty', cartProduct);
            commit('refreshTotalPrice')
        } 
    },
    decrementQty({state, commit}, id){
        const cartProduct = state.cart.find(prod => prod._id === id)
        if(cartProduct.quantity > 1){
            commit('decrementProductQty', cartProduct);
        } else {
            commit('removeProduct', cartProduct);
        }
        commit('refreshTotalPrice')
    },
    changeQty({state, commit}, {id, qty}){
        let cartProduct = state.cart.find(prod => prod._id === id)
        commit('changeQty', {cartProduct, qty})
        commit('refreshTotalPrice')
    },
    removeProduct({commit}, cartProduct){
        commit('removeProduct', cartProduct);
        commit('refreshTotalPrice')
    }
}

export const mutations = {
    pushProductToCart(state, product){
        product.quantity = 1;
        state.cart.push(product);
    },
    incrementProductQty(state, cartProduct){
        cartProduct.quantity++;
    },
    decrementProductQty(state, cartProduct){
        cartProduct.quantity--;
    },
    refreshTotalPrice(state){
        state.totalPrice = 0
        if(state.cart){
            state.cart.map(product => {
                state.totalPrice += product.price.$numberDecimal*product.quantity
            })
        }
        
    },
    changeQty( state, {cartProduct, qty} ){
        cartProduct.quantity = qty;
        // state.cart.splice(state.cart.indexOf(cartProduct), 1, cartProduct);
    },
    removeProduct(state, cartProduct){
        state.cart.splice(state.cart.indexOf(cartProduct), 1); //replace 
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