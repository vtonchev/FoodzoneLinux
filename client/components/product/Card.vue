<template>
    <div class="card ml-lg-auto product_card" :class='cardClass' >
        <!-- SALE ONLY -->
        <span @click="$bvModal.show(product._id)">
            <div v-if="product.sale && outOfStock == false" class="sale_text">ПРОМОЦИЯ</div>
            <div v-if="product.sale && outOfStock == false" class="sale_sticker"><span class="m-auto" style="font-size:20px">-{{product.sale}}%</span></div>
            <!-- --------- -->
            <!-- OUT OF STOCK -->
            <div v-if="outOfStock" 
            class="position-absolute text-center out_of_stock" 
            >
                <span class="align-self-center mx-auto font-weight-bold">Не е наличен</span>
            </div>
            <!-- ------------ -->
            <img :src = product.photo.url class="card-img-top" :class="{ opacity : outOfStock }" :alt="'Продукт '+ product.title">
        </span>
        <div class="card-body" :class="{ addedProduct: isInCart }">
            <button @click="$bvModal.show(product._id)" class="card-title bg-transparent transparent_btn border-0 p-0 w-100 mb-1">{{product.title}}</button>
            <FullInfo
                :id="product._id" 
                :product='product'
                :outOfStock='outOfStock'
            />
            <div class="w-100 text-center mb-1">
                <h5><b-badge>{{product.weight.$numberDecimal}} {{product.unit}}</b-badge></h5>
            </div>
            <span class="clearfix">
                <!-- SALE ONLY -->
                <span v-if="product.sale && !outOfStock" class=" float-left position-relative">
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
                <button 
                @click.prevent='addProductToCart(product)' 
                v-show='!isInCart' 
                ref="buy_btn" 
                class="buy_btn"
                :class="{ 'disabled_btn' : outOfStock }"
                :disabled='outOfStock'
                >
                <span class="fas fa-shopping-cart fa-1x"></span>
                Купи
                </button>
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
        outOfStock(){
            return this.product.stockQuantity<=0
        }
    },
}
</script>

