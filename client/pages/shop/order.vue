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
                                <b-form-select  @change="addressValidation" v-model="address.city" :options="cityOptions" required></b-form-select>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label>Комплекс</label>
                                <b-form-input id="city" @change="addressValidation" v-model="address.housingArea" type="text"></b-form-input> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Улица, номер</label>
                                <b-form-input @change="addressValidation" v-model="address.street" type="text"></b-form-input>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label>Вход</label>
                                <b-form-input v-model="address.outsideDoor" type="text"></b-form-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label >Eтаж</label>
                                <b-form-input v-model="address.floor" type="text"></b-form-input>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label >Aпартамент</label>
                                <b-form-input v-model="address.apartment" type="text"></b-form-input>
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
                <!-- Order Timespan :disabled='toOrderTimespan' -->
                <b-list-group-item button v-b-toggle.order_timespan  class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="far fa-clock fa-2x ml-1"></i></div>
                    <div class="w-75 d-inline-block"><span>Ден и час за доставка</span></div>
                </b-list-group-item>
                <b-collapse id="order_timespan" style="overflow-x: auto" >
                    <div class="collapse_content p-0 mx-sm-auto my-5" style="width: max-content;">
                            <b-tabs 
                                class="m-0" 
                                active-nav-item-class="btn-outline-success"
                                pills 
                                vertical 
                                content-class="p-0 border rounded bg-light"
                            >
                                <!-- Day 1 -->
                                <b-tab title="Днес">
                                    <div class="d-grid" style='height: 278px;overflow: auto;width: 327px;'>
                                        <h6 class="text-center">{{orderTimeframe.day1.format('Do MMMM')}}</h6>
                                        <div v-for="timeframe in orderDateTimes[0].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-1' v-if="$moment(timeframe.from,'HH:mm').isAfter($moment().add(2,'hours'))">
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay1Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </b-tab>
                                <!-- Day 2 -->
                                <b-tab title="Утре">
                                    <div style='height: 278px;overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day2.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[1].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay2Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <!-- Day 3 -->
                                <b-tab :title="orderTimeframe.day3.format('dddd').charAt(0).toUpperCase() + orderTimeframe.day3.format('dddd').slice(1)">
                                    <div style='height: 278px;overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day3.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[2].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">
                                                    {{timeframe.from}}
                                                </div>
                                                <b-button 
                                                @click="onDay3Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button> 
                                            </div>       
                                        </div>
                                    </div>
                                </b-tab>
                                <!-- Day 4 -->
                                <b-tab :title="orderTimeframe.day4.format('dddd').charAt(0).toUpperCase() + orderTimeframe.day4.format('dddd').slice(1)">
                                    <div style='height: 278px;overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day4.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[3].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay4Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span>
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>  
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <!-- Day 5 -->
                                <b-tab :title="orderTimeframe.day5.format('dddd').charAt(0).toUpperCase() + orderTimeframe.day5.format('dddd').slice(1)">
                                    <div style='height: 278px; overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day5.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[4].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay5Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>  
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <!-- Day 6 -->
                                <b-tab :title="orderTimeframe.day6.format('dddd').charAt(0).toUpperCase() + orderTimeframe.day6.format('dddd').slice(1)">
                                    <div style='height: 278px;overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day6.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[5].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay6Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>  
                                            </div>
                                        </div>
                                    </div>
                                </b-tab>
                                <!-- Day 7 -->
                                <b-tab :title="orderTimeframe.day7.format('dddd').charAt(0).toUpperCase() + orderTimeframe.day7.format('dddd').slice(1)">
                                    <div style='height: 278px;overflow: auto;'>
                                        <h6 class="text-center">{{orderTimeframe.day7.format('Do MMMM')}}</h6>
                                        <div class="" v-for="timeframe in orderDateTimes[6].timeframe" :key="timeframe.from">
                                            <div class='d-flex mb-3'>
                                                <div class="px-2 align-self-center">{{timeframe.from}}</div>
                                                <b-button 
                                                @click="onDay7Chosen(timeframe.from)" 
                                                class="border rounded p-2 bg-white text-dark mr-4" 
                                                :disabled='timeframe.orders == timeframe.max'
                                                >
                                                Доставка между 
                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                и 
                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                </b-button>  
                                            </div>
                                        </div>
                                    </div>
                                </b-tab> 
                            </b-tabs>
                    </div>
                    <div v-if='orderTimeframe.date' class="mb-4 mx-sm-auto pl-3" style="width:460px">
                        Вашата поръчка ще бъде доставена на 
                        {{orderTimeframe.date.replace(/-/g,'.')}} 
                        между 
                        <span class="d-block text-center">
                        {{orderTimeframe.timeframe}} 
                        и 
                        {{$moment(orderTimeframe.timeframe,'HH-mm').add(1,'hour').format('HH:mm')}}
                        часа
                        </span>
                    </div>
                    <div v-if="validationMessage">{{validationMessage}}</div>
                    <div class="mb-4 mx-sm-auto pl-3" style="width:460px"><b-button @click="timeframeValidation" class="w-100">Продължи</b-button></div>
                </b-collapse>
                <!-- Payment method -->
                <b-list-group-item button v-b-toggle.payment_method :disabled='toPaymentMethod' class="d-flex p-4">
                    <div class="d-inline-block icon mr-4"><i class="far fa-credit-card fa-2x ml-1"></i></div>
                    <div class="w-75 d-inline-block"><span>Начин на плащане</span></div>
                </b-list-group-item>
                <b-collapse id="payment_method">
                    <div class="collapse_content">
                        <b-form-group>
                            <b-form-radio v-model="paymentMethod.select"  value="на място">На място</b-form-radio>
                            <b-form-radio v-model="paymentMethod.select"  value="виза">Виза</b-form-radio>
                        </b-form-group>
                        <b-button @click="onOrder" style="background-color:#E52121">
                            ПОРЪЧАЙ
                        </b-button>
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
    async asyncData({$axios}){
        try {
            const response = await $axios.$get("/api/orderDateTime");  
            return{
                orderDateTimes : response.orderDateTime
            } 
        } catch (err) {
        }
    },
    data({$moment}){
        return{
            //Address
            address:{
                city: null,
                housingArea: null,
                street:null,
                outsideDoor:null,
                floor:null,
                apartment:null,
            },
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
            orderTimeframe:{
                day1:$moment(),
                day2:$moment().add(1,'d'),
                day3:$moment().add(2,'d'),
                day4:$moment().add(3,'d'),
                day5:$moment().add(4,'d'),
                day6:$moment().add(5,'d'),
                day7:$moment().add(6,'d'),
                date: null,
                timeframe:null,
            },
            paymentMethod:{
                select:'',
            },
            //Disabling booleans 
            toContact:true,
            toAdditionalInfo:true,
            toOrderTimespan:true,
            toPaymentMethod:true,
            cityOptions: [
                { value: null, text: 'Моля изберете град' },
                { value: 'Слънчев бряг', text: 'Слънчев бряг' },
                { value: 'Свети Влас', text: 'Свети Влас' },
                { value: 'Несебър стария град', text: 'Несебър стария град' },
                { value: 'Несебър новия град', text: 'Несебър новия град' }
            ],
            //Validation message
            validationMessage:'',
            validationMessage2:'',
        }
    },
    methods:{
        async onOrder(){
            if(
                this.address.city && 
                this.contact.firstName && 
                this.contact.lastName && 
                this.contact.number && 
                this.orderTimeframe.date &&
                this.orderTimeframe.timeframe )
                {
                    const response = await this.$axios.$get("/api/orderDateTime/"+ this.orderTimeframe.date +"/"+ this.orderTimeframe.timeframe);
                    if(response.timeframe.orders < response.timeframe.max){
                        if( this.$moment(this.orderTimeframe.date).isSame(this.$moment('DD-MM-YYYY')) && this.$moment(this.orderTimeframe.timeframe,'HH:mm').isAfter(this.$moment().add(2,'hours'))){
                            return alert('Поръчката е за днес, има свободни места и е два часа преди уговорения час за поръчка');
                            
                        } else {
                            return alert('Поръчката не е за днес и има свободни места');
                        }
                    } else {
                        return alert('Няма свободни места')
                    }
                } else {
                    this.validationMessage2 = 'Някои от задължителните полета не са попълнени'
                }

                // const data = {
                //     address: this.address,
                //     contact: this.contact,
                //     additionalInfo: this.additionalInfo,
                //     orderDateTime: {
                //         date: this.orderTimeframe.date,
                //         from: this.orderTimeframe.from
                //     },
                //     paymentMethod: this.paymentMethod
                // }
        },
        addressValidation(){
            if(this.address.city && this.address.street){
                this.toContact = false;
            }
        },
        contactValidation(){
                if(this.contact.firstName && this.contact.lastName && this.contact.number){  
                    this.toAdditionalInfo = false;
                    this.toOrderTimespan = false;
            }
        },
        timeframeValidation(){
            if(this.orderTimeframe.date && this.orderTimeframe.timeframe){
                this.toPaymentMethod = false;
            } else {
                this.validationMessage = 'Възникна грешка при избора моля опитайте пак'
            }
        },
        // DAYS CHOOSE FUNCTIONS 
        onDay1Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe; 
            this.orderTimeframe.date = this.orderTimeframe.day1.format('DD-MM-YYYY');
        },
        onDay2Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe; 
            this.orderTimeframe.date = this.orderTimeframe.day2.format('DD-MM-YYYY');
        },
        onDay3Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe;
            this.orderTimeframe.date = this.orderTimeframe.day3.format('DD-MM-YYYY');
        },
        onDay4Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe; 
            this.orderTimeframe.date = this.orderTimeframe.day4.format('DD-MM-YYYY');
        },
        onDay5Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe;  
            this.orderTimeframe.date = this.orderTimeframe.day5.format('DD-MM-YYYY');
        },
        onDay6Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe;  
            this.orderTimeframe.date = this.orderTimeframe.day6.format('DD-MM-YYYY');
        },
        onDay7Chosen(timeframe){
            this.validationMessage = '';
            this.orderTimeframe.timeframe = timeframe;  
            this.orderTimeframe.date = this.orderTimeframe.day7.format('DD-MM-YYYY');
        }
    },
    computed:{
        ...mapGetters(['getTotalPrice']),
        ...mapGetters(['getCart']), 
    },
}
</script>