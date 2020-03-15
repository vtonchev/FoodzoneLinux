<template>
    <b-col class="p-0 position-static">
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item :to="{name: 'shop-category', params: { category: $route.params.category} }">{{$store.state.categories[$route.params.category]}}</b-breadcrumb-item>
                <b-breadcrumb-item active>{{$store.state.subcategories[$route.params.category].find(({id}) => id === $route.params.subcategory).title}}({{count}})</b-breadcrumb-item>
            </b-breadcrumb>
            <b-form-group class="filter">
                <b-form-radio-group id="radio-group-2" style='' name="radio-sub-component">
                    <b-form-radio value="first"> Цена (ниска)</b-form-radio>
                    <b-form-radio value="second">Цена (висока)</b-form-radio>
                    <b-form-radio value="third">Име</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-col>
        <b-col cols="12" class='p-0' >
            <b-row class="m-0">
                <b-col cols='6' sm='4' md='4' lg='3' class="p-0 mb-3 card_col" v-for='product in products' :key='product._id'>
                    <Card 
                    :product='product'
                    >
                    </Card> 
                </b-col>
            </b-row>
            <Spinner class="position-fixed mx-auto my-5" style="bottom:0; left:50%;" v-if='bottom && (count/10) > page'/>
            <div class="text-center my-5" style="font-size:30px; font-weight:700; color:#64C042" v-if="(count/10) < page">Няма повече продукти...</div>
        </b-col>
    </b-col>
</template>
<script>
import Card from "~/components/product/card"
import Spinner from "~/components/spinner"
export default {
    layout: 'sidebar',
    components:{
        Card, 
        Spinner
    },
    async asyncData({$axios, params, store}){
        try { 
            const response = await $axios.$get(`/api/products/subcategories/${params.subcategory}` + '?page=1');
            return {
                products: response.products,
                count: response.count
            }
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            page: 1,
            bottom: false,
            count:null,
            products:[]
        }
    },
    created() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.addProducts()
            }
        }
    },
    methods:{
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = visible + scrollY >= (pageHeight/2)
            return bottomOfPage || (pageHeight/2) < visible
        },
        async addProducts(){
            if((this.count/10) > this.page ){
                this.page++;
                const newProducts = await this.$axios.$get('/api/products/categories/'+ this.$route.params.category+ '?page=' + this.page);
                this.products = this.products.concat(newProducts.products);
                if (this.bottomVisible()) {
                    this.addProducts()
                }
            }
        }, 
    }
    
}
</script>

<style scoped src="~/assets/products_page.css">
</style>