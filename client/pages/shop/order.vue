<template>
    <main>
        <b-form @submit.prevent="onOrder" id="order_page">
            <p class="mt-4">Финализиране на поръчката</p>
            <hr class="mt-0 ml-0">
            <!-- CART -->
            <div class="cart d-flex my-4 p-2">
                <span class="cart_img mr-4"><i class="fas fa-shopping-cart fa-2x"></i></span>
                <span class="orderTotalPrice">
                    <span style="color:#5AA240; font-weight:700; font-size:1.2rem; text-decoration:underline;">{{getTotalPrice}} лв</span>
                    <span style="color:#b6b6b6;">Обща сума</span>
                </span>
                <nuxt-link to="/shop/cart" class="ml-auto edit_cart_button">
                    <div class="update">
                        <i style="margin: 12px;" class="fas fa-pencil-alt text-white"></i>
                    </div>
                </nuxt-link>
            </div>
            <p>Полетата в <span style="color:#5AA240">зелено</span> са задължителни !!!</p>
            <!-- ORDER INFO -->
            <b-list-group class="my-4">
                <!-- Address -->
                <b-list-group-item button v-b-toggle.address class="d-flex p-2">
                    <div class="d-flex align-self-center text-info icon mr-4"><i class="fas fa-map-marker-alt fa-2x m-auto"></i></div>
                    <div class="d-grid w-75 mr-2">
                        <div class="text-dark"><span>Къде да доставим поръчката Ви?</span></div>
                        <div v-if="address.city&&address.street">{{address.city}}, {{address.street}}</div>
                    </div>
                    <div v-if="address.city && address.street" class="d-inline-block align-self-center ml-auto"><i class="fas fa-check-circle fa-2x text-success"></i></div>
                </b-list-group-item>
                <b-collapse id="address" accordion="order_form" >
                    <div v-if="$auth.user" class="collapse_content">
                        <b-form-select class="mt-3" v-model="address">
                            <b-form-select-option 
                            v-for="address in addresses" 
                            :key="address._id" 
                            :value='{
                                city:address.city,
                                housingArea:address.housingArea,
                                street: address.street,
                                outsideDoor:address.outsideDoor,
                                floor: address.floor,
                                apartment: address.apartment,
                            }'
                            >
                                <div class="d-flex font-weight-light flex-column">
                                    <span>гр.{{address.city}}</span> 
                                    <span v-if="address.housingArea">,кв.{{address.housingArea}}</span>
                                    <div v-if="address.street">,ул.{{address.street}}</div>
                                    <div v-if="address.outsideDoor">,вх.{{address.outsideDoor}}</div> 
                                    <div v-if="address.floor">,ет.{{address.floor}}</div>
                                    <div v-if="address.apartment">,ап.{{address.apartment}}</div> 
                                </div>
                            </b-form-select-option>
                        </b-form-select>
                    </div>
                    <b-form class="collapse_content" @submit.prevent="validateAddress">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Град</label>
                                <b-form-select v-model="address.city" :options="cityOptions" required></b-form-select>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label>Комплекс</label>
                                <b-form-input id="city" v-model="address.housingArea" type="text"></b-form-input> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Улица, номер</label>
                                <b-form-input v-model="address.street" type="text" required></b-form-input>
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
                        <b-button class="mt-4" type='submit' variant='outline-success'>Запази</b-button>
                    </b-form>
                </b-collapse>
                <!-- Contact -->
                <b-list-group-item button v-b-toggle.contact class="d-flex p-2">
                    <div class="d-flex align-self-center text-info icon mr-4"><i class="far fa-address-card fa-2x m-auto"></i></div>
                    <div class="d-grid w-75 mr-2">
                        <div class="text-dark"><span>Контакт</span></div>
                        <div v-if="contact.firstName && contact.lastName && contact.number">{{contact.firstName}} {{contact.lastName}}, {{contact.number}}</div>
                    </div>
                    <div v-if="contact.firstName && contact.lastName && contact.number" class="d-inline-block align-self-center ml-auto"><i class="fas fa-check-circle fa-2x text-success"></i></div>
                </b-list-group-item>
                <b-collapse id="contact" accordion="order_form" >
                    <b-form class="collapse_content" @submit.prevent="validateContact">
                        <div class="row">
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Име </label>
                                <b-form-input v-model="contact.firstName" type='text' required></b-form-input>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label style="color:#5AA240">Фамилия</label>
                                <b-form-input v-model="contact.lastName" type='text' required></b-form-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label style="color:#5AA240">Телефон</label>
                                <b-form-input v-model="contact.number" minlength="10" maxlength='10' type='tel' required></b-form-input>
                            </div>
                        </div>
                        <b-button class="mt-4" type='submit' variant='outline-success'>Запази</b-button>
                    </b-form>
                </b-collapse>
                <!-- Additional info -->
                <b-list-group-item button v-b-toggle.additional_info class="d-flex p-2">
                    <div class="d-flex align-self-center text-info icon mr-4"><i class="fas fa-info fa-2x m-auto"></i></div>
                    <div class="d-grid w-75 mr-2">
                        <div class="text-dark"><span>Допълнителна информация</span></div>
                        <div v-if="additionalInfo.accept">Приемам общите условия</div>
                    </div>
                    <div v-if="additionalInfo.accept" class="d-inline-block align-self-center ml-auto"><i class="fas fa-check-circle fa-2x text-success"></i></div>
                </b-list-group-item>
                <b-collapse id="additional_info" accordion="order_form" >
                    <b-form @submit.prevent="validateAdditionalInfo" class="collapse_content">
                        <div class="row">
                            <div class="col">
                                <label>Допълнителна информация към доставчик</label>
                                <b-form-input v-model="additionalInfo.text" type='text'></b-form-input>
                                <b-form-checkbox
                                    id="checkbox"
                                    v-model="additionalInfo.accept"
                                    required
                                    size='lg'
                                > 
                                <h6>
                                    <small style="vertical-align: sub;">
                                        Съгласен съм с Общите Условия и Политика за поверителност и ги приемам
                                    </small>
                                </h6>
                                </b-form-checkbox>
                            </div>
                        </div>
                        <b-button class="mt-4" type='submit' variant='outline-success'>Запази</b-button>
                    </b-form>
                </b-collapse>
                <!-- Order Timetimeframe -->
                <b-list-group-item button v-b-toggle.order_timeframe class="d-flex p-2">
                    <div class="d-flex align-self-center text-info icon mr-4"><i class="far fa-clock fa-2x m-auto"></i></div>
                    <div class="d-grid w-75 mr-2">
                        <div class="text-dark"><span>Ден и час за доставка</span></div>
                        <div v-if="orderTimeframe.timeframe">{{orderTimeframe.date.replace(/-/g,'.')}}, между {{orderTimeframe.timeframe}} и {{$moment(orderTimeframe.timeframe,'HH:mm').add(1,'h').format('HH:mm')}}</div>
                    </div>
                    <div v-if="orderTimeframe.timeframe" class="d-inline-block align-self-center ml-auto"><i class="fas fa-check-circle fa-2x text-success"></i></div>
                </b-list-group-item>
                <b-collapse id="order_timeframe" accordion="order_form"  >
                    <b-form class='my-5' @submit.prevent="validateTimeframe" >
                        <div style="overflow-x: auto;">
                            <div class="collapse_content p-0 mx-sm-auto mb-2" style="width: max-content;">
                                <!-- <b-card no-body header-text-variant='success'>
                                    <b-tabs 
                                    vertical 
                                    pills 
                                    card
                                    id="timeframe_tabs"
                                    active-nav-item-class='font-weight-bold green_background text-white'
                                    nav-class='text-capitalize'
                                    >
                                        <b-tab v-for="(dateTime,index) in orderDate7" :key="'dyn-tab-' + index" >
                                            <template v-slot:title v-if="$moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().format('DD-MM-YYYY')">
                                                Днес
                                            </template>
                                            <template v-slot:title v-else-if=" $moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().add(1,'d').format('DD-MM-YYYY')">
                                                Утре
                                            </template>
                                            <template v-slot:title v-else>
                                                {{$moment(dateTime.date, 'DD-MM-YYYY').format('dddd')}}
                                            </template>
                                                <div style='height: 278px; overflow: auto;'>
                                                <h6 class="text-center">{{$moment(dateTime.date, 'DD-MM-YYYY').format('Do MMMM')}}</h6>
                                                <div 
                                                v-for="timeframe in dateTime.timeframe" :key="timeframe.from" 
                                                >
                                                    <div
                                                    v-if="$moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().format('DD-MM-YYYY')"
                                                    >
                                                        <span v-if="$moment(timeframe.from,'HH:mm').isAfter($moment().add(2,'h'))" class="mb-3 d-flex">
                                                            <div class="px-2 align-self-center">
                                                                {{timeframe.from}}
                                                            </div>
                                                            <b-button 
                                                            @click="onDayChosen(timeframe.from, dateTime.date)" 
                                                            class="border rounded transparent_btn text-dark mx-auto p-2" 
                                                            :disabled='timeframe.orders >= timeframe.max'
                                                            >
                                                                <h6>
                                                                    <small>
                                                                        Доставка между 
                                                                        <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                                        и 
                                                                        <span class="font-weight-bold">{{timeframe.to}}</span>
                                                                        <div class="text-left" v-if="timeframe.orders >= timeframe.max">Капацитета е запълнен</div>
                                                                    </small>
                                                                </h6>
                                                            </b-button>
                                                        </span>    
                                                        
                                                    </div> 
                                                    <div class='d-flex mb-3' v-else>
                                                        <div class="px-2 align-self-center">
                                                            {{timeframe.from}}
                                                        </div>
                                                        <b-button 
                                                        @click="onDayChosen(timeframe.from, dateTime.date)" 
                                                        class="border rounded bg-white text-dark mr-4" 
                                                        :disabled='timeframe.orders >= timeframe.max'
                                                        >
                                                        <h6>
                                                            <small>
                                                                Доставка между 
                                                                <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                                и 
                                                                <span class="font-weight-bold">{{timeframe.to}}</span>
                                                                <div class="text-left" v-if="timeframe.orders >= timeframe.max">Капацитета е запълнен</div>
                                                            </small>
                                                        </h6>
                                                        </b-button> 
                                                    </div>       
                                                </div>
                                            </div>
                                        </b-tab>
                                    </b-tabs>  
                                </b-card> -->
                                <b-card no-body header-text-variant='success'>
                                    <b-tabs  
                                    pills 
                                    card
                                    id="timeframe_tabs"
                                    active-nav-item-class='font-weight-bold green_background text-white'
                                    nav-class='text-capitalize'
                                    >
                                        <b-tab class='pb-0' title-item-class='text-success' v-for="(dateTime,index) in orderDate7" :key="'dyn-tab-' + index" >
                                            <template v-slot:title v-if="$moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().format('DD-MM-YYYY')">
                                                Днес
                                            </template>
                                            <template v-slot:title v-else-if=" $moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().add(1,'d').format('DD-MM-YYYY')">
                                                Утре
                                            </template>
                                            <template v-slot:title v-else>
                                                {{$moment(dateTime.date, 'DD-MM-YYYY').format('dddd')}}
                                            </template>
                                                <div style='height: 278px; overflow: auto;'>
                                                <h6 class="text-center">{{$moment(dateTime.date, 'DD-MM-YYYY').format('Do MMMM')}}</h6>
                                                <div 
                                                v-for="timeframe in dateTime.timeframe" :key="timeframe.from" 
                                                >
                                                    <div
                                                    v-if="$moment(dateTime.date,'DD-MM-YYYY').format('DD-MM-YYYY') == $moment().format('DD-MM-YYYY')"
                                                    >
                                                        <span v-if="$moment(timeframe.from,'HH:mm').isAfter($moment().add(2,'h'))" class="mb-3 d-flex">
                                                            <div class="px-2 align-self-center">
                                                                {{timeframe.from}}
                                                            </div>
                                                            <b-button 
                                                            @click="onDayChosen(timeframe.from, dateTime.date)" 
                                                            class="border rounded bg-white text-dark mx-auto" 
                                                            :disabled='timeframe.orders >= timeframe.max'
                                                            >
                                                                <h6 class="m-0">
                                                                    <small>
                                                                        Доставка между 
                                                                        <span class="font-weight-bold">{{timeframe.from}}</span> 
                                                                        и 
                                                                        <span class="font-weight-bold">{{timeframe.to}}</span>
                                                                        <div class="text-left" v-if="timeframe.orders >= timeframe.max">Капацитета е запълнен</div>
                                                                    </small>
                                                                </h6>
                                                            </b-button>
                                                        </span>
                                                    </div> 
                                                    <div class='d-flex mb-3' v-else>
                                                        <div class="px-2 align-self-center">
                                                            {{timeframe.from}}
                                                        </div>
                                                        <b-button 
                                                        @click="onDayChosen(timeframe.from, dateTime.date)" 
                                                        class="border rounded bg-white text-dark mx-auto" 
                                                        :disabled='timeframe.orders >= timeframe.max'
                                                        >
                                                            <h6 class="m-0">
                                                                <small>
                                                                    <span class="d-flex">
                                                                        <span class='mr-1'>
                                                                        Доставка между 
                                                                        </span>
                                                                        <span class="font-weight-bold mr-1">{{timeframe.from}}</span> 
                                                                        <span class="mr-1">и</span> 
                                                                        <span class="font-weight-bold">{{timeframe.to}}</span>
                                                                    </span>
                                                                    
                                                                    <div class="text-left" v-if="timeframe.orders >= timeframe.max">Капацитета е запълнен</div>
                                                                </small>
                                                            </h6>
                                                        </b-button> 
                                                    </div>       
                                                </div>
                                            </div>
                                        </b-tab>
                                    </b-tabs>  
                                </b-card>     
                            </div>
                        </div>
                        <div v-if='orderTimeframe.date' class="mb-4 mx-sm-auto pl-3" style="width:300px">
                            Вашата поръчка ще бъде доставена 
                            <div class="text-center">на <span class="font-weight-bold">{{orderTimeframe.date.replace(/-/g,'.')}}</span></div>
                            
                            <span class="d-block text-center">
                            между
                            {{orderTimeframe.timeframe}} 
                            и 
                            {{$moment(orderTimeframe.timeframe,'HH-mm').add(1,'hour').format('HH:mm')}}
                            часа
                            </span>
                        </div>
                        <div class="mb-4 mx-sm-auto w-100"><b-button type='submit' variant='outline-success' class="w-100">Запази</b-button></div>
                    </b-form>
                </b-collapse>
                <!-- Payment method -->
                <b-list-group-item button v-b-toggle.payment_method class="d-flex p-2">
                    <div class="d-flex text-info icon mr-4"><i class="far fa-credit-card fa-2x m-auto"></i></div>
                    <div class="w-75 d-inline-block mr-2"><span>Начин на плащане</span></div>
                </b-list-group-item>
                <b-collapse id="payment_method" accordion="order_form">
                    <div class="collapse_content">
                        <b-form-group required>
                            <b-form-radio v-model="paymentMethod.select"  value="на място">На място</b-form-radio>
                            <b-form-radio v-model="paymentMethod.select"  value="виза">Виза</b-form-radio>
                        </b-form-group>
                        <b-button type='submit' style="background-color:#E52121">
                            ПОРЪЧАЙ
                        </b-button>
                    </div>
                </b-collapse>
            </b-list-group>
        </b-form>
        <!-- Modal -->
        <b-modal id="validationModal" hide-footer content-class="shadow" title="Внимание!">
            <p class="my-2">
                {{validationMessage}}
            </p>
        </b-modal>
        <!-- ENd Modal -->
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
.edit_cart_button{
    height: min-content;
    align-self: center;
}
.orderTotalPrice{
    display:grid;
}
.cart_img{
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
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
    async asyncData({$auth,$axios}){
        if($auth.user){
            const response = await $axios.$get('api/address');
            return {
                addresses: response.addresses,
                contact:{
                    firstName:$auth.user.name.firstName,
                    lastName:$auth.user.name.lastName,
                    number:$auth.user.phone
                }
            }
        }
    },
    async created(){
            const response = await this.$axios.$get("/api/orderDateTime");
            return this.orderDateTime = response.orderDateTime
    },
    data({$moment,$store}){
        return{
            orderDateTime:[],
            //Address
            address:{
                city: null,
                housingArea: null,
                street: null,
                outsideDoor:null,
                floor: null,
                apartment: null,
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
                accept:null,
            },
            //Order Timespan
            orderTimeframe:{
                date: null,
                timeframe:null,
            },
            paymentMethod:{
                select:'',
            },
            cityOptions: [
                { value: null, text: 'Моля изберете град' },
                { value: 'Слънчев бряг', text: 'Слънчев бряг' },
                { value: 'Свети Влас', text: 'Свети Влас' },
                { value: 'Несебър стария град', text: 'Несебър стария град' },
                { value: 'Несебър новия град', text: 'Несебър новия град' }
            ],
            //Validation message
            validationMessage:'',
            visibleID: '',
        }
    },
    mounted(){     
        this.$root.$emit('bv::toggle::collapse', 'address');    
    },
        
    methods:{
        ...mapActions(['addAddress','addContact','addAdditionalInfo','addTimeframe']),
        
        async onOrder(){
            if(
                this.address.city && 
                this.address.street && 
                this.contact.firstName && 
                this.contact.lastName && 
                this.contact.number && 
                this.orderTimeframe.date &&
                this.orderTimeframe.timeframe &&
                this.additionalInfo.accept 
            )  
                {
                    let data = {
                        address: this.address,
                        contact: this.contact,
                        additionalInfo: this.additionalInfo,
                        orderDateTime: this.orderTimeframe,
                        paymentMethod: this.paymentMethod,
                        cart: this.getCart
                    } 
                    if(this.$auth.user){
                        alert(JSON.stringify(this.$auth.user))
                        data.userID = this.$auth.user._id
                    }
                    const response = await this.$axios.$get("/api/orderDateTime/"+ this.orderTimeframe.date +"/"+ this.orderTimeframe.timeframe);
                    if(response.timeframe.orders < response.timeframe.max){
                        if( this.$moment(this.orderTimeframe.date).isSame(this.$moment().format('DD-MM-YYYY'))){
                            if(this.$moment(this.orderTimeframe.timeframe,'HH:mm').isAfter(this.$moment().add(2,'h'))){ 
                                try {
                                    const response = await this.$axios.$post('api/order', data)
                                    this.validationMessage = response.message
                                    this.$root.$emit('bv::show::modal', 'validationModal')
                                    return
                                } catch (err) {
                                    this.validationMessage = 'Възникна грешка при поръчката';
                                    this.$root.$emit('bv::show::modal', 'validationModal')
                                    return
                                }   
                            } else {
                                this.validationMessage = 'Часът за доставка, който сте избрали вече не свободен, моля изберете друг!';
                                this.$root.$emit('bv::show::modal', 'validationModal')
                                return  
                            }
                        } else {    
                                try {
                                    const response = await this.$axios.$post('api/order', data)
                                    this.validationMessage = response.message
                                    this.$root.$emit('bv::show::modal', 'validationModal')
                                    return
                                } catch (err) {
                                    this.validationMessage = 'Възникна грешка при поръчката';
                                    this.$root.$emit('bv::show::modal', 'validationModal')
                                    return
                                }   
                            }
                    } else {
                            this.validationMessage = 'Часът за доставка, който сте избрали е достигнал своя лимит в последния момент. Извиняваме се!';
                            this.$root.$emit('bv::show::modal', 'validationModal')
                            return
                        }
                } else {
                    this.validationMessage = 'Не сте въвели всички необходими данни';
                    this.$root.$emit('bv::show::modal', 'validationModal')
                    return
                }
                    
        },
        validateAddress(){
            if(this.address.city && this.address.street){
                this.$root.$emit('bv::toggle::collapse', 'contact');
                this.visibleID = 'contact'
            } else {
                this.validationMessage = 'Не сте въвели всички необходими данни';
                this.$root.$emit('bv::show::modal', 'validationModal');
            }  
        },
        validateContact(){
            if(this.contact.firstName && this.contact.lastName && this.contact.number){  
                this.$root.$emit('bv::toggle::collapse', 'additional_info');
                this.visibleID = 'additional_info'
            } else {
                this.validationMessage = 'Не сте въвели всички необходими данни';
                this.$root.$emit('bv::show::modal', 'validationModal');
            }
        },
        validateAdditionalInfo(){
            if(this.additionalInfo.accept){
                this.$root.$emit('bv::toggle::collapse', 'order_timeframe');
                this.visibleID = 'order_timeframe'
            } else {
                this.validationMessage = 'Mоля приемете общите условия';
                this.$root.$emit('bv::show::modal', 'validationModal');
            }
        },
        validateTimeframe(){
            if(this.orderTimeframe.date && this.orderTimeframe.timeframe){
                this.$root.$emit('bv::toggle::collapse', 'payment_method');
                this.visibleID = 'payment_method'
            } else {
                this.validationMessage = 'Възникна грешка при избора моля опитайте пак';
                this.$root.$emit('bv::show::modal', 'validationModal');
            }
        },
        // DAYS CHOOSE FUNCTIONS 
        onDayChosen(timeframe, day){
            this.orderTimeframe.timeframe = timeframe; 
            this.orderTimeframe.date = day
        },
    },
    computed:{
        ...mapGetters(['getTotalPrice','getCart']),
        orderDate7(){
            return this.orderDateTime.slice(0,4);
        }
    }
}
</script>
<style scoped>
/* .nav-link:not(.active) {
    background-color: rgba(255, 0, 0, 0.5) !important;
} */
/* .nav-pills .pill-2 .nav-link:not(.active) {
    background-color: rgba(0, 250, 0, 0.5);
}

.nav-pills .pill-3 .nav-link:not(.active) {
    background-color: rgba(0, 0, 250, 0.5);
    color: white;
} */
</style>