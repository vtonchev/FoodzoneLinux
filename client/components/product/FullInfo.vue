<template>
    <b-modal :id='id' :title="product.title" scrollable class="product_info_modal" size='xl' hide-footer>
        <b-row style="color:#666666;" >
            <!-- IMAGE -->
            <b-col cols='12' lg='5' xl='4' class="p-0 mb-3 ">
                <span v-if="product.sale && !outOfStock">
                    <div class="sale_text_info">ПРОМОЦИЯ</div>
                    <div class="sale_sticker_info"><span class="m-auto" style="font-size:20px">-{{product.sale}}%</span></div>
                </span>
                <div v-if="outOfStock" 
                class="position-absolute text-center out_of_stock" 
                >
                    <span class="align-self-center mx-auto font-weight-bold">Не е наличен</span>
                </div>
                <img class="product_img" style="min-width:200px" :class="{ opacity : outOfStock }" :src="product.photo.url" alt="">
            </b-col>
            <!-- Описание -->
            <b-col cols='12' lg='6' xl='4' style="min-width:300px;" class="p-0 px-3 mb-3 ml-lg-auto ml-xl-0 d-flex flex-column">
                <h5><b-badge>{{product.weight.$numberDecimal}} {{product.unit}}</b-badge></h5>
                <!-- button -->
                <span v-if="product.sale && !outOfStock">
                    <p class="old_price_info">{{product.oldPrice}}<small>лв</small></p>
                    <p class="promo_price_info">{{product.price.$numberDecimal}}<small>лв</small></p>
                </span>
                <div v-else class="font-weight-bold" style="font-size:40px; color:black;">{{product.price.$numberDecimal}}<small>лв</small></div>
                <div v-if="product.properties">
                    <div v-if='product.properties.manufacturer'>
                        <span>Производител:</span>
                        <span  class="font-weight-bold" style="color:black;">{{product.properties.manufacturer}}</span>
                    </div>
                    <div v-if='product.properties.brand'>
                        <span>Марка:</span>
                        <span class="font-weight-bold" style="color:black;">{{product.properties.brand}}</span>
                    </div>
                    <div v-if='product.properties.origin'>
                        <span>Произход:</span>
                        <span class="font-weight-bold" style="color:black;">{{product.properties.origin}}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <span>Продуктов код:</span>
                    <span class="font-weight-bold" style="color:black;">{{product.productID}}</span>
                </div>
                <div v-if="product.description !== 'null'">
                    <span class="font-weight-bold" style="color:black;">Описание:</span>
                    <span>{{product.description}}</span>
                </div>
                <span v-if="product.properties">
                    <div v-if='product.properties.ingredients'>
                        <span  class="font-weight-bold" style="color:black;">Съставки:</span>
                        <span>{{product.properties.ingredients}}</span>
                    </div>
                </span>
                <button 
                    v-show='!isInCart' 
                    @click='addProductToCart(product)' 
                    :class="{ 'buy_btn' : !outOfStock, 'disabled_btn' : outOfStock }"
                    :disabled='outOfStock'
                    class="border rounded mr-3 mt-auto w-100"
                ><span class="fas fa-shopping-cart fa-1x"></span>Купи</button>
                <div v-show="isInCart" class="mt-auto">
                    <QuantityController
                    style="float:none !important; height:30px"
                    :id='product._id'
                    />
                </div>
            </b-col>
            <!-- Хранителна стойност таблица -->
            <b-col cols='12' lg='6' xl='4' class="ml-lg-auto ml-xl-0">
                <span v-if="product.properties" class="mr-lg-auto mr-xl-0">
                    <table v-if="product.properties.calories" class="border rounded p-3 product_props">
                        <thead>
                            <tr>
                                <th style="color:black;">Хранителна стойност за:</th>
                                <th style="color:black;">100г</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="product.properties.calories">
                                <td class="font-weight-normal">Енергийност (ккал/ kJ)</td>
                                <td>{{product.properties.calories}}</td>
                            </tr>
                            <tr v-if="product.properties.carbohydrates">
                                <td class="font-weight-normal">Въглехидрати(г)</td>
                                <td>{{product.properties.carbohydrates}}</td>
                            </tr>
                            <tr v-if="product.properties.sugars">
                                <td class="font-weight-light"><span class="ml-2">-от които захари (г)</span></td>
                                <td>{{product.properties.sugars}}</td>
                            </tr>
                            <tr v-if="product.properties.fats">
                                <td class="font-weight-normal">Мазнини (г)</td>
                                <td>{{product.properties.fats}}</td>
                            </tr>
                            <tr v-if="product.properties.saturated">
                                <td class="font-weight-light"><span class="ml-2">-от които наситени (г)</span></td>
                                <td>{{product.properties.saturated}}</td>
                            </tr>
                            <tr v-if="product.properties.saturated">
                                <td class="font-weight-normal">Протеини (г)</td>
                                <td>{{product.properties.saturated}}</td>
                            </tr>
                            <tr v-if="product.properties.salt">
                                <td class="font-weight-normal">Сол (г)</td>
                                <td>{{product.properties.salt}}</td>
                            </tr>   
                        </tbody>     
                    </table>
                </span>
            </b-col>
        </b-row>
    </b-modal>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import QuantityController from "~/components/product/QuantityController"
export default {
    components:{
        QuantityController
    },
    props:['product','id','outOfStock'],
    methods:{
        ...mapActions(['addProductToCart']),
    },
    computed:{
        ...mapGetters(['getCart']),
        isInCart(){
            return this.getCart.some(product => product._id === this.product._id)
        }
    }
}
</script>


