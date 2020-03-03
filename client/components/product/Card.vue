<template>
        <div class="col p-0">
            <div class="card mx-lg-0 product_card" @mouseover='hover = true' @mouseleave='hover = false' >
                <img :src = product.photo.url class="card-img-top" alt="...">
                    <div class="card-body">
                        <p>{{product.category.title}}, {{product.subcategory.title}}</p>
                        <nuxt-link to="/shop/:product">
                            <p class="card-title">{{product.title}}</p>
                        </nuxt-link>
                        <transition name="hover" mode="out-in">
                            <span  class="d-none d-lg-block">
                                <p v-if="hover==false" key='price'>{{product.price.$numberDecimal}} лв</p>
                                <button @click='addProductToCart(product)' v-if="hover==true" key="cart" style="display:contents; color:green; font-weight:600;"><span class="fas fa-shopping-cart fa-1x"></span> Купи</button>
                            </span>
                        </transition>
                        <span class="d-block d-lg-none">
                            <span>{{product.price.$numberDecimal}}</span>
                            <button class="custom_button float-right" @click='addProductToCart(product)'>Купи</button>
                        </span>
                    </div>
                
            </div>
        </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:['product'],
    data(){
        return{
            hover: false
        }
    },
    methods:{
        ...mapActions(['addProductToCart'])
    }
}
</script>
<style scoped>
    .card-img-top {
    padding:0;
    margin:0;
    width:190px;
    height:190px;
    }
    .product_card{
    margin-bottom: 20px;
    width:min-content;
    height: 20rem;
    transition: 0.5s;
    }
    .card:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .card-title{
    font-size:14px;
    font-weight:500;
    color:black;
    }
    .card-body{
    padding:15px;
    }
    .custom_button{
        background-color: transparent;
        border:none;
    }
    .custom_button:focus{
        outline-color: green;
    }
    
</style>