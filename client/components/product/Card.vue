<template>
    <div class="card ml-lg-auto product_card">
        <img :src = product.photo.url class="card-img-top" alt="...">
        <div class="card-body" :class="{ addedProduct: isInCart }">
            <button @click="$bvModal.show(product._id)" class="card-title bg-transparent border-0 p-0 w-100 mb-1">{{product.title}}</button>
            <FullInfo 
                :id="product._id"
                :product='product'
                :isInCart='isInCart'
                :qty='qty'
            />
            <div class="w-100 text-center mb-1">
                <h5><b-badge>{{product.weight.$numberDecimal}} {{product.unit}}</b-badge></h5>
            </div>
            <span class="clearfix">
                <span class="font-weight-bold float-left price">{{product.price.$numberDecimal}}<small>лв</small></span>
                <div v-if="isInCart" class="float-right">
                    <!-- INCREASE/DECREASE QTY -->
                    <QuantityController
                    :product='product'
                    :qty='qty'
                    />
                </div> 
                <button v-else @click='addProductToCart(product)' class="buy_btn"><span class="fas fa-shopping-cart fa-1x"></span>Купи</button>
            </span>
        </div>
    </div>      
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import FullInfo from '~/components/product/FullInfo'
import QuantityController from "~/components/product/QuantityController"
export default {
    components:{
        FullInfo,
        QuantityController
    },
    props:['product'],
    
    methods:{
        ...mapActions(['addProductToCart']),
    },
    computed:{
        ...mapGetters(['getCart']),
        isInCart(){
            if(this.getCart.some(product => product._id === this.product._id)){
                return true
            } else {
                return false
            }
        },
        qty(){
            const prod = this.getCart.find(product => product._id === this.product._id);
            if(prod){
                return prod.quantity
            } else {
                return 0
            } 
        }
    },
}
</script>

<style scoped src="~/assets/product_card.css">

</style>