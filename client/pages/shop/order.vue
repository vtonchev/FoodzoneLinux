<template>
    <main>
        <div id="order_page">
            <p class="mt-4">Финализиране на поръчката</p>
            <hr class="mt-0 ml-0">
            <!-- CART -->
            <div class="cart d-flex my-4">
                <span class="cart_img mr-4"><i class="fas fa-shopping-cart fa-2x"></i></span>
                <span class="totalPrice">
                    <span style="color:#5AA240; font-weight:700; font-size:1.2rem; text-decoration:underline;">{{getTotalPrice}} лв</span>
                    <span style="color:#b6b6b6;">Обща сума</span>
                </span>
                <nuxt-link to="/shop/cart" class="ml-auto">
                    <div class="update">
                        <i style="margin: 12px;" class="fas fa-pencil-alt"></i>
                    </div>
                </nuxt-link>
            </div>
            <p>Полетата в <span style="color:#5AA240">зелено</span> са задължителни !!!</p>
            <!-- ORDER INFO -->
            <b-list-group class="my-4">
                <!-- Address -->
                <b-list-group-item button v-b-toggle.address class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="fas fa-map-marker-alt fa-2x ml-2"></i></div>
                    <div class="w-75 d-inline-block"><span>Къде да доставим поръчката Ви?</span></div>
                </b-list-group-item>
                    <b-collapse id="address" visible >
                        <div class="collapse_content">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <label style="color:#5AA240">Град</label>
                                    <b-form-select  @change="addressValidation" v-model="city" :options="cityOptions" required></b-form-select>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <label>Комплекс</label>
                                    <b-form-input id="city" @change="addressValidation" v-model="housingArea" type="text"></b-form-input> 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <label style="color:#5AA240">Улица, номер</label>
                                    <b-form-input @change="addressValidation" v-model="street" type="text"></b-form-input>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <label>Вход</label>
                                    <b-form-input v-model="outsideDoor" type="text"></b-form-input>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <label >Eтаж</label>
                                    <b-form-input v-model="floor" type="text"></b-form-input>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <label >Aпартамент</label>
                                    <b-form-input v-model="apartment" type="text"></b-form-input>
                                </div>
                            </div>
                        </div>
                    </b-collapse>
                <!-- Contact -->
                <b-list-group-item button v-b-toggle.contact :disabled='toContact' class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="far fa-address-card fa-2x ml-1"></i></div>
                    <div class="w-75 d-inline-block"><span>Контакт</span></div>
                </b-list-group-item>
                <b-collapse id="contact">
                    <div class="collapse_content">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Име </label>
                                <b-form-input  @change="contactValidation" v-model="contact.firstName" type='text' required></b-form-input>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Фамилия</label>
                                <b-form-input  @change="contactValidation" v-model="contact.lastName" type='text' required></b-form-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label style="color:#5AA240">Телефон</label>
                                <b-form-input  @change="contactValidation" v-model="contact.number" type='tel' required></b-form-input>
                            </div>
                        </div>
                    </div>
                </b-collapse>
                <!-- Additional info -->
                <b-list-group-item button v-b-toggle.additional_info :disabled='toAdditionalInfo' class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="fas fa-info fa-2x ml-3"></i></div>
                    <div class="w-75 d-inline-block"><span>Допълнителна информация</span></div>
                </b-list-group-item>
                <b-collapse id="additional_info" >
                    <div class="collapse_content">
                        <div class="row">
                            <div class="col">
                                <label>Допълнителна информация към доставчик</label>
                                <b-form-input  @change="contactValidation" v-model="additionalInfo.text" type='text' required></b-form-input>
                            </div>
                        </div>
                    </div>
                </b-collapse>
                <!-- Order Timespan -->
                <b-list-group-item button v-b-toggle.order_timespan :disabled='toOrderTimespan' class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="far fa-clock fa-2x ml-1"></i></div>
                    <div class="w-75 d-inline-block"><span>Ден и час за доставка</span></div>
                </b-list-group-item>
                <b-collapse id="order_timespan" >
                    <div class="collapse_content">
                        <span>Въведи адрес и избери от предложенията</span>
                    </div>
                </b-collapse>
                <!-- Payment method -->
                <b-list-group-item button v-b-toggle.payment_method :disabled='toPayentMethod' class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="far fa-credit-card fa-2x ml-1"></i></div>
                    <div class="w-75 d-inline-block"><span>Начин на плащане</span></div>
                </b-list-group-item>
                <b-collapse id="payment_method">
                    <div class="collapse_content">
                        <span>Въведи адрес и избери от предложенията</span>
                    </div>
                </b-collapse>
            </b-list-group>
        </div>
    </main>
</template>
<style scoped>
    p{
        font-size: 1.2rem;
        font-weight: 700;
    }
    hr{
        width: 260px;
        border: 1.2px solid #E52121;
        border-radius: 10px;
    }
    .cart{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px -20px rgba(0, 0, 0, 0.19);
        border: solid 1px #dddddd;
        border-radius: 5px;
        padding: 1.5rem;
    }
    .totalPrice{
        display:grid;
    }
    .cart_img{
        align-self: center;
    }
    a{
        align-self: center;
    }
    a:hover{
        color: white;
    }
    .update{
        width: 40px;
        height: 40px;
        background-color: #DAA328;
        border-radius: 50%;
    }
    .icon{
        width: 41px;
    }
    #order_page{
        width:1200px;
        margin:0 auto;
        height:inherit;
    }
    .collapse_content{
        padding: 1.5rem;
    }
    input:focus,select:focus{
        border:initial;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    @media screen and (max-width: 1199px){
        #order_page{
            width:980px;
        }
    }

    @media screen and (max-width: 991px) {
        #order_page{
        width:auto;
        margin:0 3rem;
        }
        #order_page{
        position:static;
        }
        #order_page{
        height:auto;
        }
    }
    @media screen and (max-width: 767px) {
        #order_page{
            width:auto;
            margin:0 10px;
        }
    }
</style>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            //City
            city: null,
            housingArea: null,
            street:null,
            outsideDoor:null,
            floor:null,
            apartment:null,
            //contact
            contact:{
                firstName:null,
                lastName:null,
                number:null
            },
            //additional Info
            additionalInfo:{
                text:null,
            },
            //Order Timespan
            orderTimespan:{
                timespan:null,
            },
            //Disabling booleans 
            toContact:true,
            toAdditionalInfo:true,
            toOrderTimespan:true,
            toPayentMethod:true,
            cityOptions: [
                { value: null, text: 'Моля изберете град' },
                { value: 'Слънчев бряг', text: 'Слънчев бряг' },
                { value: 'Свети Влас', text: 'Свети Влас' },
                { value: 'Несебър стария град', text: 'Несебър стария град' },
                { value: 'Несебър новия град', text: 'Несебър новия град' }
            ],
            orderTimespanOptions: [
                
            ]
        }
    },
    methods:{
        addressValidation(){
            if(this.city && this.street){
                this.toContact = false;
            }
        },
        contactValidation(){
            if(this.contact.firstName && this.contact.lastName && this.contact.number){
                this.toAdditionalInfo = false;
                this.toOrderTimespan = false;
            }
        },
        OrderTimespanValidation(){
            if(orderTimespan.timespan){
                this.toPaymentmethod = false;
            }
        }
    },
    computed:{
        ...mapGetters(['getTotalPrice']),
        ...mapGetters(['getCart']), 
    },
}
</script>