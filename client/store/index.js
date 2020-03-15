import axios from 'axios'

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

    }
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
    setCategory(state, category){
        state.category = category;
    },
    setSubcategories(state, subcategories){
        state.subcategories = subcategories
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