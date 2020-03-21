<template>
    <b-modal :id='id' :title="product.title" scrollable class="product_info_modal" size='xl' hide-footer>
        <b-row style="color:#666666;">
            <b-col cols='12' lg='5' xl='4' class="p-0 mb-3 ">
                <span v-if="product.sale">
                    <div class="sale_text_info">ПРОМОЦИЯ</div>
                    <div class="sale_sticker_info"><span class="m-auto" style="font-size:20px">-{{product.sale}}%</span></div>
                </span>
                <img class="product_img" style="min-width:200px" :src="product.photo.url" alt="">
            </b-col>
            <!-- Описание -->
            <b-col cols='12' lg='6' xl='4' style="min-width:300px;" class="p-0 pl-3 mb-3 ml-lg-auto ml-xl-0">
                <h5><b-badge>{{product.weight.$numberDecimal}} {{product.unit}}</b-badge></h5>
                <div  v-if="isInCart">
                    <!-- INCREASE/DECREASE QTY -->
                    <QuantityController
                    :product='product'
                    :qty='qty'
                    style="float:none !important;"
                    />
                </div>
                <b-button v-else @click='addProductToCart(product)' class='buy_btn' style="float:none;"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
                <span v-if="product.sale">
                    <p class="old_price_info">{{product.oldPrice}}<small>лв</small></p>
                    <p class="promo_price_info">{{product.price.$numberDecimal}}<small>лв</small></p>
                </span>
                <div v-else class="font-weight-bold" style="font-size:40px; color:black;">{{product.price.$numberDecimal}}<small>лв</small></div>
                <div v-if="product.properties" class="mb-3">
                    <span>
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
                    </span>
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
import QuantityController from "~/components/product/QuantityController"
export default {
    components:{
        QuantityController
    },
    props:['product','isInCart','qty','id'],
    data(){
        return{
            
        }
    },
    methods:{
        ...mapActions(['addProductToCart']),
    },
}
</script>

<style scoped src="~/assets/full_info.css">

</style>
