<template>
    <main class="container d-flex" >
        <div style="width:fit-content">
             <div class="border mt-4 rounded p-2">
                <h5 class="mb-2 p-2">Създай времеви <span class="d-block">диапазон</span> </h5>
                <div class="border mb-4 rounded p-2">
                    <label class="d-block">Избери часове</label>
                    <label>от</label>
                    <input style="" v-model="from" type="time">
                    <label>до</label>
                    <input v-model="to" type="time"> 
                </div>
                <div class="border mb-4 rounded p-2">
                    <label class='d-block'>Избери ден от седмица<span class="d-block ">(ако не е избрано се прилага за всички)</span></label>
                    <select v-model='dayOfWeek'>
                        <option value="">Всички</option>
                        <option value="понеделник">Понеделник</option>
                        <option value="вторник">Вторник</option>
                        <option value="сряда">Сряда</option>
                        <option value="четвъртък">Четвъртък</option>
                        <option value="петък">Петък</option>
                        <option value="събота">Събота</option>
                        <option value="неделя">Неделя</option>
                    </select> 
                </div>
                <div class="border rounded p-2">
                    <label class="d-block">Максимален брой доставки <span class="d-block">за даден период :</span></label>
                    <input v-model="max" type="number">
                </div> 
                <b-button variant='outline-success' class="d-block" @click="onCreateTimeframe">Създай</b-button>         
            </div>
        </div>
        <!-- Change MAX Orders per DATE or TIME -->
        <div class="ml-5" style="width:fit-content">
            <div class="border mt-4 rounded p-2">
                <h5 class="mb-2 p-2">Промени максимум <span class="d-block">доставки</span></h5>
                <div class="border mb-4 rounded p-2">
                    <label class="d-block">Избери дата</label>
                    <select v-model="orderDateTime" > 
                        <option v-for="orderDateTime in orderDateTimes" :key="orderDateTime._id" :value="orderDateTime" >{{orderDateTime.date}}</option>
                    </select>
                </div>
                <div class="border mb-4 rounded p-2">
                    <b-form-group label="Избери времеви диапазон:">
                        <label> <strong>за целия ден </strong> </label>
                        <b-form-checkbox
                        class="d-inline"
                            v-model="allSelected"
                        >
                        </b-form-checkbox>
                        <b-form-checkbox-group id="checkbox-group-2" v-model="selectedTimeframe" name="flavour-2" stacked>
                            <b-form-checkbox 
                            v-for="(timeframe, index) in orderDateTime.timeframe" 
                            :key='index' :value="timeframe"
                            >
                            {{timeframe.from}} : {{timeframe.to}} <span class="font-weight-bold">лимит:</span><span class="text-danger font-weight-bold">{{timeframe.max}}</span>
                            </b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group> 
                </div>  
                <div class="border mb-4 rounded p-2">
                    <label class="d-block">Промени максимум доставки <span class="d-block">за избраните времеви диапазони</span></label>
                    <input v-model="newMax" type="number">
                </div>
                <b-button variant='outline-primary' @click='onTimeframeUpdate'>Промени</b-button>
            </div>
        </div>
        <div class="ml-5" style="width:fit-content">
            <label class="d-block">добави ден и изтрий стария</label>
            <b-button @click='refreshDays'>Край на деня</b-button>
        </div>
        <div class="ml-5" style="width:fit-content">
            <label class="d-block">Не пипай !</label>
            <b-button  variant='danger' @click="onCreateDaysInDatabase">Създай</b-button>
        </div>
    </main>
</template>
<script>
export default {
    async asyncData({ $axios }){
        try {
            const response = await $axios.$get("/api/orderDateTime");
            return {
                orderDateTimes: response.orderDateTime,
            }
        } catch(err) {
            console.log(err)
        }
    },

    data(){
        return {
            message:'',
            dayOfWeek:'',
            from:'',
            to:'',
            max: null,
            newMax:3,
            date:'',
            orderDateTime:{},
            selectedTimeframe:[],
            allSelected:false
        }
    },
    methods:{
        async onCreateDaysInDatabase(){
            const response = await this.$axios.$post("/api/orderDateTime");
        },
        async onCreateTimeframe(){
            if(this.from == false || this.to == false) {
                return this.message = 'Въведете час';
            } else {
                const data = {
                    from: this.from,
                    to: this.to,
                    dayOfWeek: this.dayOfWeek,
                    max: this.max
                }
                const response = await this.$axios.$patch("/api/orderDateTime", data);
            }
        },
        async refreshDays(){
            const response = await this.$axios.$post("api/update/orderDateTime");
        },
        async onTimeframeUpdate(){
            if( this.allSelected || this.selectedTimeframe && this.orderDateTime.date && this.newMax   ){
                const data = {
                date: this.orderDateTime.date,
                selectedTimeframe: this.selectedTimeframe,
                max: this.newMax,
                allSelected: this.allSelected
                } 
                await this.$axios.$patch('/api/update/orderDateTime/max', data)
            } else {
                alert('моля въведете вс необходимо')
            }
            
        }
    }
}
</script>