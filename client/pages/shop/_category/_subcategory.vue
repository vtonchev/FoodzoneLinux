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
                <b-form-radio-group v-model="sort">
                    <b-form-radio value="1"> Цена (ниска)</b-form-radio>
                    <b-form-radio value="2">Цена (висока)</b-form-radio>
                    <b-form-radio value="3">Име</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-col>
        <b-col cols="12" class='p-0' >
            <b-row class="m-0">
                <b-col cols='6' sm='4' md='4' lg='3' class="p-0 mb-3 card_col" v-for='product in products' :key='product._id'>
                    <Card 
                    v-if="product.sale == null || product.sale == 0"
                    :product='product'
                    >
                    </Card> 
                    <CardSale
                    v-else
                    :product='product'
                    >
                    </CardSale>
                </b-col>
            </b-row>
            <Spinner class="position-fixed mx-auto my-5" style="bottom:0; left:50%;" v-if='bottom && (count/10) > page'/>
            <div class="text-center my-5" style="font-size:30px; font-weight:700; color:#64C042" v-if="(count/10) < page">Няма повече продукти...</div>
        </b-col>
    </b-col>
</template>
<script>
import Card from "~/components/product/Card"
import CardSale from "~/components/product/CardSale"
import Spinner from "~/components/spinner"
export default {
    layout: 'sidebar',
    components:{
        Card, 
        CardSale,
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
            products:[],
            sort:'',
            sortTag:[]
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
        },
        sort(sort){
            if(sort) {
                this.sortBy();
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
        sortBy(){
            this.page = 1;
            console.log(this.sort);
            this.$axios.$get('/api/products/subcategories/'+ this.$route.params.subcategory + '?page=' + this.page + '&sort=' + this.sort).then((response)=>{
                this.products = response.products;
            })
        } 
    }
    
}
</script>

<style scoped src="~/assets/products_page.css">

</style>