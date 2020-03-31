<template>
    <div class="outer-wrapper">
        <div class="delivery_breadcrumb my-3">
            <n-link to='/' class="text-secondary">Начало</n-link>
            <span>></span>
            <n-link to='/delivery' class="text-green">Доставки</n-link>
        </div>
        <h4 class="text-left">Свободни часове за доставка</h4>
        <b-row>
            <b-col cols='12' lg='6' style="overflow-x: auto;">
                <div class="collapse_content p-0" style="width: max-content;">
                    <b-card no-body header-text-variant='success'>
                        <b-tabs 
                        vertical 
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
                                            </span>    
                                            
                                        </div> 
                                        <div class='d-flex mb-3' v-else>
                                            <div class="px-2 align-self-center">
                                                {{timeframe.from}}
                                            </div>
                                            <b-button  
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
                    </b-card>
                </div>
            </b-col>
            <b-col cols='12' lg='6' class='my-5 my-lg-0'>
                <div class="ml-lg-5 h-100">
                    <div class=" delevery_info_box ml-lg-5 h-100">
                        <div class="text-center py-lg-4 text-green">
                            <i class="fas fa-history fa-9x "></i>
                        </div>
                        <p class="text-center mx-lg-5">
                            Онлайн супермаркет Food Zone доставя 
                            <span class="font-weight-bolder">всеки ден за град Бургас</span> 
                            до вашата врата хранителни стоки от 
                            <span class="text-yellow font-weight-bolder">8:00 до 20:00</span>
                        </p>
                    </div>
                </div>
            </b-col>
        </b-row>
        
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    async asyncData({$axios}){
        const response = await $axios.$get("/api/orderDateTime");
        return {
            orderDateTime:response.orderDateTime
        }
    },
    computed:{
        orderDate7(){
            return this.orderDateTime.slice(0,4);
        }
    }
}
</script>