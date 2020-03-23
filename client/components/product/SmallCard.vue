<template>
    <div :class="{ addedProduct: isInCart }" class="p-2">
        <div class="d-flex">
            <img :src='product.photo.url' style="width:60px;height:70px" class="card-img-bottom mr-2" :alt="'снимка на '+product.title"  >
            <button @click="$bvModal.show(product._id+'suggested')" class="card-title bg-transparent border-0 p-0 m-0" style="height:inherit">{{product.title}}</button>
        </div>
       <div class="d-flex">
            
                <span class="font-weight-bold float-left price">{{product.price.$numberDecimal}}<small>лв</small></span>
                <div v-if="isInCart" class="float-right">
                    <!-- INCREASE/DECREASE QTY -->
                    <QuantityController
                    :product='product'
                    :qty='qty'
                    />
                </div> 
                <button v-else @click='addProductToCart(product)' class="buy_btn"><span class="fas fa-shopping-cart fa-1x"></span>Купи</button>
            
        </div>
        <FullInfo 
            :id="product._id+'suggested'"
            :product='product'
            :isInCart='isInCart'
            :qty='qty'
        />
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