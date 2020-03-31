<template>
    <div class="card ml-lg-auto product_card" :class='cardClass' >
        <!-- SALE ONLY -->
        <div v-if="product.sale" class="sale_text">ПРОМОЦИЯ</div>
        <div v-if="product.sale" class="sale_sticker"><span class="m-auto" style="font-size:20px">-{{product.sale}}%</span></div>
        <!-- --------- -->
        <img :src = product.photo.url class="card-img-top" alt="...">
        <div class="card-body" :class="{ addedProduct: isInCart }">
            <button @click="$bvModal.show(product._id)" class="card-title bg-transparent transparent_btn border-0 p-0 w-100 mb-1">{{product.title}}</button>
            <FullInfo
                :id="product._id" 
                :product='product'
            />
            <div class="w-100 text-center mb-1">
                <h5><b-badge>{{product.weight.$numberDecimal}} {{product.unit}}</b-badge></h5>
            </div>
            <span class="clearfix">
                <!-- SALE ONLY -->
                <span v-if="product.sale" class=" float-left position-relative">
                    <p class="old_price">{{product.oldPrice}}<small>лв</small></p>
                    <p class="promo_price">{{product.price.$numberDecimal}}<small>лв</small></p>
                </span>
                <!-- --------- -->
                <span v-else class="font-weight-bold float-left price">{{product.price.$numberDecimal}}<small>лв</small></span>
                <div v-show="isInCart" class="float-right">
                    <QuantityController
                    :id='product._id'
                    />
                </div> 
                <!--  -->
                <button @click.prevent='addProductToCart(product)' v-show='!isInCart' ref="buy_btn" class="buy_btn"><span class="fas fa-shopping-cart fa-1x"></span>Купи</button>
            </span>
        </div>
    </div>      
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
const FullInfo = () => import('~/components/product/FullInfo')
const QuantityController = () => import("~/components/product/QuantityController")
export default {
    components:{
        FullInfo,
        QuantityController
    },
    props:['product','cardClass'],
    methods:{
        ...mapActions(['addProductToCart']),
    },
    computed:{
        ...mapGetters(['getCart']),
        isInCart(){
            return this.getCart.some(product => product._id === this.product._id);
        },
    },
}
</script>

