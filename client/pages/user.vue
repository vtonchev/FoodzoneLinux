<template>
    <b-card 
    no-body 
    class="outer-wrapper"  
    >
        <b-tabs  
        small 
        card
        fill
        card-class="border-bottom-0"
        active-nav-item-class="font-weight-bold text-green"
        >
            <!-- FAVOURITE PRODUCTS -->
            <b-tab class="pt-0 pl-2" active>
                <template v-slot:title>
                    <div class="d-flex">
                        <i class="fas fa-heart fa-2x ml-auto"></i>
                        <span class="align-self-center ml-3 mr-auto">Любими продукти</span>
                    </div>
                </template>
            </b-tab>
            <!-- LAST ORDERS -->
            <b-tab class="pt-3">
                <template v-slot:title>
                    <div class="d-flex">
                        <i class="fas fa-dolly fa-2x ml-auto"></i>
                        <span class="align-self-center ml-3 mr-auto">Последни поръчки</span>
                    </div>
                </template>
                <div class="d-flex">
                    <b-row>
                        <b-col
                        cols='4'
                        v-for="order in orders" 
                        :key="order._id" 
                        class="justify-content-between mb-2 border-bottom"
                        >
                            <b-button 
                                variant='outline-info mb-2' 
                                @click="$bvModal.show('modal' + order._id)"
                            >
                                <b-card-text>{{order.orderDateTime.date}}, {{order.orderDateTime.timeframe}}ч.</b-card-text>
                            </b-button>
                            <b-modal 
                            ok-only size='md' 
                            :id="'modal'+order._id"
                            >
                                <template v-slot:modal-title>
                                    <span>Поръчка № {{order._id}}</span>
                                    <div v-if="order.status=='неизпълнена'" class=" bg-danger rounded px-2 text-white" style="width: fit-content;">{{order.status}}</div>
                                    <div v-if="order.status=='изпълнена'" class=" bg-success rounded  px-2 text-white" style="width: fit-content;">{{order.status}}</div>
                                    <div v-if="order.status=='на разнос'" class=" bg-warning rounded  px-2 text-white" style="width: fit-content;">{{order.status}}</div>
                                </template>
                                <FullInfo
                                :order='order'
                                />
                            </b-modal>
                        </b-col>
                    </b-row>
                </div>
            </b-tab>
            <!-- ACOUNT SETTINGS -->
            <b-tab>
                <template v-slot:title>
                    <div class="d-flex">
                        <i class="fas fa-cogs fa-2x ml-auto"></i> 
                        <span class="align-self-center ml-3 mr-auto">Настройки на акунта</span>
                    </div>
                </template>
                <b-row>
                    <!-- ADDRESSES -->
                    <b-col cols='12' sm='6' class="pt-4 border-bottom  pb-5">
                        <div>Настоящи адреси</div>
                        <div class='my-3 text-warning' v-if="addresses.length == 0">Нямате добавени адреси</div>
                        <div class="d-flex flex-column my-3" v-for="address in addresses" :key="address._id">
                            <div class="border rounded mb-2 text-left d-flex">
                                <span>{{address.city}},<span v-if="address.housingArea"> {{address.housingArea}},</span> {{address.street}}</span>
                                <b-button variant='outline-info py-0 px-1 ml-auto align-self-center' @click="$bvModal.show(address._id)"><i class="far fa-edit"></i></b-button>
                                <b-button variant='outline-danger py-0 px-1 ml-2 align-self-center' @click="deleteAddress(address._id)"><i class="fas fa-trash-alt"></i></b-button>
                            </div>
                            <b-modal hide-footer :id="address._id" title="Промени настоящия адрес">
                                <b-form  @submit.prevent="updateAddress(address._id),$bvModal.hide(address._id)">
                                    <p class="mb-3">Полетата в <span style="color:#5AA240">зелено</span> са задължителни !!!</p>
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
                                            <label style="color:#5AA240">Улица, Блок, номер</label>
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
                                    <b-button variant='outline-info' class=" border rounded mt-4" type="submit" >Промени</b-button>
                                </b-form>
                            </b-modal>
                        </div>
                        <button @click="$bvModal.show('address')" class="transparent_btn border rounded green_background text-white py-2 mb-2 position-absolute" style="bottom:0">Добави нов</button>
                        <b-modal hide-backdrop hide-footer id="address" title="Добави адрес">
                            <b-form  @submit.prevent="addAddress(),$bvModal.hide('address')">
                                <p class="mb-3">Полетата в <span style="color:#5AA240">зелено</span> са задължителни !!!</p>
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <label style="color:#5AA240">Град</label>
                                        <b-form-select v-model="newAddress.city" :options="cityOptions" required></b-form-select>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <label>Комплекс</label>
                                        <b-form-input id="city" v-model="newAddress.housingArea" type="text"></b-form-input> 
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <label style="color:#5AA240">Улица, Блок, номер</label>
                                        <b-form-input v-model="newAddress.street" type="text" required></b-form-input>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <label>Вход</label>
                                        <b-form-input v-model="newAddress.outsideDoor" type="text"></b-form-input>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <label >Eтаж</label>
                                        <b-form-input v-model="newAddress.floor" type="text"></b-form-input>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <label >Aпартамент</label>
                                        <b-form-input v-model="newAddress.apartment" type="text"></b-form-input>
                                    </div>
                                </div>
                                <button class="transparent_btn border rounded mt-4" type="submit" >Добави</button>
                            </b-form>
                        </b-modal>
                    </b-col>
                    <!-- PASSWORD -->
                    <b-col class="pt-4 border-bottom  pb-5">
                        <b-form @submit.prevent='changePassword'>
                            <b-row class="d-flex mb-3">
                                <b-col cols='12' lg='6'>
                                    <label>Настояща парола</label>
                                </b-col>
                                <b-col>
                                    <b-form-input v-model="password" class="ml-auto" type='password' required/>
                                </b-col>
                            </b-row>
                            <b-row class="d-flex mb-3">
                                <b-col cols='12' lg='6'>
                                    <label>Нова парола</label>
                                </b-col>
                                <b-col cols='12' lg='6'>
                                    <b-form-input v-model="newPassword" class="ml-auto" type='password' required/>
                                </b-col>
                            </b-row>
                            <b-button type='submit' variant='outline-info mb-2 py-2 position-absolute' style="bottom:0">Промени</b-button>
                        </b-form>
                    </b-col>
                    <b-col cols='12'>
                        <b-button variant='outline-danger' @click="$auth.logout('local')" class=" border mt-3 rounded mx-auto float-right">Изход</b-button>
                    </b-col>
                </b-row>
            </b-tab> 
        </b-tabs>
    </b-card>
</template>
<script>
const FullInfo = () => import('~/components/order/FullInfo');
export default {
    middleware: 'auth',
    auth: 'user',
    components:{
        FullInfo, 
    },
    async asyncData({$axios}){
        let addressRes = $axios.$get('/api/address');
        let orderRes = $axios.$get('/api/order/user');
        await Promise.all([addressRes, orderRes]).then((responses)=>{
            addressRes = responses[0].addresses,
            orderRes = responses[1].orders
                
        }).catch(err => {
         console.log(err)
        })
        return{
            addresses: addressRes,
            orders: orderRes
        }
        
    },
    data(){
        return{
            newAddress:{
                city: null,
                housingArea: null,
                street: null,
                outsideDoor:null,
                floor: null,
                apartment: null,
            },
            password:'',
            newPassword:'',
            confirmBox:'',
            cityOptions: [
                { value: null, text: 'Моля изберете град' },
                { value: 'Слънчев бряг', text: 'Слънчев бряг' },
                { value: 'Свети Влас', text: 'Свети Влас' },
                { value: 'Несебър стария град', text: 'Несебър стария град' },
                { value: 'Несебър новия град', text: 'Несебър новия град' }
            ],
        }
    },
    methods:{
        async addAddress(){
            if(this.newAddress.city && this.newAddress.street){
                if(this.addresses.length < 5){
                    const data = this.newAddress
                    const response = this.$axios.$post('/api/address', data)
                    if(response){
                        const response = await this.$axios.$get('/api/address')
                        return this.addresses = response.addresses
                    } else {
                        alert('възникна грешка')
                    }
                } else {
                    alert('не може да създавате повече от 5 адреса')
                }
            } 
        },
        async updateAddress(id){
            try {
                const address = this.addresses.find(address => address._id === id)
                if(address.city && address.street){
                    const response = await this.$axios.$patch('api/address/'+id ,address)
                    if(response){
                        const response = await this.$axios.$get('api/address')
                        return this.addresses = response.addresses
                    } else {
                        alert('възникна грешка')
                    }
                }
            } catch (err) {
                alert('възникна грешка')
            }
        },
        async deleteAddress(id){
            try {
                const confirmation = await this.confirm();
                console.log(confirmation)
                if(confirmation){
                    const response = await this.$axios.$delete('api/address/'+ id);
                    if(response.success){
                        const response = await this.$axios.$get('api/address')
                        return this.addresses = response.addresses
                    } else {
                        alert('възникна грешка')
                    }
                }
            } catch (err) {
                console.log(err)
                alert('възникна грешка')
            }
        },
        async changePassword(){
            try {
                const response = await this.$axios.$post('api/auth/password', 
                    {
                        password: this.password,
                        newPassword: this.newPassword
                    }
                )
                this.$auth.logout('local');
                alert('Успешна промяна на паролата')
            } catch (err) {
                alert('грешна парола');
            }
            
        },
        confirm() {
            return new Promise(resolve => {
                    this.$bvModal.msgBoxConfirm('Сигурни ли сте че искате да изтриете адреса?', {
                    title: 'Потвърждение',
                    size: 'sm',
                    buttonSize: 'sm',
                    cancelVariant: 'outline-success',
                    okVariant: 'outline-danger',
                    okTitle: 'Да',
                    cancelTitle: 'Не',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    resolve (value)
                })
                .catch(err => {
                    return new Error();
                })
            });
            
        }
    }
}
</script>
