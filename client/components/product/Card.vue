<template>
    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 card_col mt-5 p-0 ">  <!-- margin top===3rem   -->
        <div class="card mx-lg-0" @mouseover='hover = true' @mouseleave='hover = false' >
            <img :src = product.photo.url class="card-img-top" alt="...">
                <div class="card-body">
                    <nuxt-link to="/shop/:product">
                    <p>{{product.category.title}}</p>
                    <p class="card-title">{{product.title}}</p>
                    </nuxt-link>
                    <transition name="hover" mode="out-in">
                        <p v-if="hover==false" key='price'>{{product.price.$numberDecimal}} лв</p>
                        <button @click='addProductToCart(product)' v-else key="cart" style="display:contents;"><img src='/img/cartIcon.png'> Купи</button>
                        
                    </transition>
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
<style>
    .card-img-top {
    padding:0;
    margin:0;
    width:190px;
    height:190px;
    }
    .card{
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
    
</style>