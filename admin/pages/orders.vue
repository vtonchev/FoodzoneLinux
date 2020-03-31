<template>
    <div class="mx-5">
        <h1>Доставки</h1>
        <!-- Ден -->
        <b-form-select v-model="date" class="w-25">
            <b-form-select-option v-for="(i, index) in 7" :key="i" :value="$moment().add(index,'d').format('DD-MM-YYYY')">{{$moment().add(index,'d').format('LLLL')}}</b-form-select-option>
        </b-form-select>
        <!-- Час -->
        <b-form-select v-model="from" class="w-25">
            <b-form-select-option value='all'>Всички</b-form-select-option>
            <b-form-select-option v-for="(i, index) in 12" :key="i" :value="$moment('09:00','H').add(index,'H').format('H')+':00'">{{$moment('09:00','H').add(index,'h').format('H')+':00'}}-{{$moment('09:00','H').add(index+1,'H').format('H')+':00'}}</b-form-select-option>
        </b-form-select>
        <span class="float-right" @click="refresh"><i class="fas fa-sync-alt fa-2x"></i></span>
        <div style='font-size:18px'>
            <div v-for="(order,index) in orders" :key="order._id" class="border my-3 p-1">
                <div class="w-100 no-style d-flex">
                    <div style="width:400px;">
                        <div class="d-inline" >Номер {{order._id}}</div>
                        <div>{{order.address.city}}, {{order.address.street}}</div>
                    </div>
                    <b-row>
                        <b-col cols='12'><b-button @click="unFinish(order._id)" class="my-0 px-0 p-0" style="width:100px;" variant='outline-danger'>Неизпълнена</b-button></b-col>
                        <b-col cols='12'><b-button @click="onDelivery(order._id)" class="my-0 p-0" variant='outline-warning'>на разнос</b-button></b-col>
                        <b-col cols='12'><b-button @click="finish(order._id)" class="my-0 p-0" variant='outline-success'>Изпълни</b-button></b-col>
                    </b-row>
                    <b-row class="ml-auto m-0" style='width:min-content;'>
                        <b-col cols='12' >
                            <div v-if="order.status=='неизпълнена'" class=" bg-danger rounded px-2 text-white" style="width:120px;"><span style="">{{order.status}}</span></div>
                            <div v-if="order.status=='изпълнена'" class=" bg-success rounded  px-2 text-white" style="width:120px;"><span style="">{{order.status}}</span></div>
                            <div v-if="order.status=='на разнос'" class=" bg-warning rounded  px-2 text-white" style="width:120px;"><span style="">{{order.status}}</span></div>
                        </b-col>
                        <b-col cols='12' ><b-button @click="$bvModal.show('modal'+index)" class=" my-0 ml-auto mr-3" style="width:auto">детайли</b-button></b-col>
                    </b-row>
                </div>
                <b-modal ok-only size='xl' :id="'modal'+index">
                    <template v-slot:modal-title>
                        <span>Поръчка № {{order._id}}</span>
                        <div v-if="order.status=='неизпълнена'" class=" bg-danger rounded px-2 text-white"><span style="vertical-align: middle;">{{order.status}}</span></div>
                        <div v-if="order.status=='изпълнена'" class=" bg-success rounded  px-2 text-white">{{order.status}}</div>
                        <div v-if="order.status=='на разнос'" class=" bg-warning rounded  px-2 text-white">{{order.status}}</div>
                    </template>
                    <b-row>
                        <b-col cols='6'>
                            <h5 class="font-weight-bolder">Адрес</h5>
                            <div><span class="font-weight-bold">Адрес: </span>{{order.address.city}},{{order.address.street || 'няма'}}</div>
                            <span class="font-weight-bold"> Вход: </span>{{order.address.outsideDoor || 'няма'}}
                            <span class="font-weight-bold ml-2"> Етаж: </span>{{order.address.floor || 'няма'}}
                            <span class="font-weight-bold ml-2"> Апартамент: </span>{{order.address.apartment || 'няма'}}
                        </b-col>
                        <b-col cols='6'>
                            <h5 class="font-weight-bolder">Контакт</h5>
                            <span class="font-weight-bold">Име: </span>{{order.contact.firstName}} {{order.contact.lastName}}
                            <span class="font-weight-bold">Телефон: </span>{{order.contact.number}}
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <b-col>
                            <h5 class="font-weight-bolder">Дата и час на доставка</h5>
                            <div><span class="font-weight-bold">Дата: </span>{{order.orderDateTime.date}}</div>
                            <div><span class="font-weight-bold">Час: </span>{{order.orderDateTime.timeframe}} - {{$moment(order.orderDateTime.timeframe,'HH:mm').add(1,'h').format('HH:mm')}}</div>
                        </b-col>
                        <b-col>
                            <h5 class="font-weight-bolder">Допълнителна информация: </h5>{{order.additionalInfo.text}}
                        </b-col>
                    </b-row>
                    <b-row class="mt-3">
                        <table class="w-100" style="border:solid 3px black">
                            <thead >
                                <tr class="font-weight-bold">
                                    <td class="border">Продукт</td>
                                    <td class="border">Име</td>
                                    <td class="border">Код на продукта</td>
                                    <td class="border">Количество</td>
                                    <td class="border">Цена</td>
                                    <td class="border">Общо</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in order.products" :key="product._id" class="border">
                                    <td class="border">
                                        <img height="60" width="60" :src="product.product.photo.url" alt="">
                                    </td>
                                    <td class="border">
                                        {{product.product.title}}
                                    </td>
                                    <td class="border text-center">
                                        {{product.product.productID}}
                                    </td>
                                    <td class="border">
                                        <span class="text-warning" style="font-size:20px;">{{product.quantity}} </span><span style="vertical-align: text-bottom;">x {{product.product.weight.$numberDecimal}}{{product.product.unit}} = {{product.quantity*product.product.weight.$numberDecimal}}{{product.product.unit}}</span>
                                    </td>
                                    <td class="border">
                                        <span>{{product.product.price.$numberDecimal}} лв</span>
                                    </td>
                                    <td class="border">
                                        <span>{{(product.quantity*product.product.price.$numberDecimal).toFixed(2)}} лв</span>  
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <th></th>
                                    <td>Общо:</td>
                                    <td class="text-danger font-weight-bold" style="font-size:22px">
                                        <span>{{totalPrice(order.products)}}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-row>
                </b-modal>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
    async asyncData({$axios,$moment}){
        const response = await $axios.$get('api/order/timeframe/'+ $moment().format('DD-MM-YYYY') + '/' + $moment().format('H')+':00' );
        return{
            orders: response.orders
        }
    },
    watch:{
        date(){
            this.from = 'all'
            this.onTimeframeSelected();
        },
        from(){
            this.onTimeframeSelected();
        }
    },
    data(){
        return{
            date: this.$moment().format('DD-MM-YYYY'),
            from: this.$moment().format('H')+':00',
            orders:[],
            
        }
    },
    
    methods:{
        async onTimeframeSelected(){
            const response = await this.$axios.$get('api/order/timeframe/'+ this.date + '/'+ this.from );
            this.orders = response.orders
        },
        totalPrice(products){
            let total = 0;
            products.forEach(product => {
               total += product.quantity*product.product.price.$numberDecimal
            });
            return total.toFixed(2) 
        },
        refresh(){
            this.onTimeframeSelected();
        },
        async finish(id){
            const data = {
                status:'изпълнена'
            }
            await this.$axios.$patch('api/order/'+ id, data );
            this.onTimeframeSelected()
        },
        async unFinish(id){
            const data = {
                status:'неизпълнена'
            }
            await this.$axios.$patch('api/order/'+ id, data );
            this.onTimeframeSelected()
        },
        async onDelivery(id){
            const data = {
                status:'на разнос'
            }
            await this.$axios.$patch('api/order/'+ id, data );
            this.onTimeframeSelected()
        }
    },
}
</script>
<style scoped>
.no-style{
    background: transparent;
    border:none;
}
</style>