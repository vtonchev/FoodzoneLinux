<template>
    <b-col class="p-0 position-static">
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item :to="{name: 'shop-category-id', params: { id: $route.params.id} }">{{$store.state.categories[$route.params.id]}}</b-breadcrumb-item>
                <b-breadcrumb-item active>{{$store.state.subcategories[$route.params.id].find(({id}) => id === $route.params.subcategory).title}} ({{count}} резултата)</b-breadcrumb-item>
            </b-breadcrumb>
            <div ref="scrollTo"></div>
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
                    <Card :product='product'/> 
                </b-col>
            </b-row>
        </b-col>
        <b-pagination
            v-model="currentPage"
            :total-rows="count"
            :per-page="perPage"
            align="center"
            last-class='text-success'
        >
            <template v-slot:page="{ page, active }" >
                <span class="text-success" style="backgroud-color:red;">
                    <b v-if="active" class="text-white pagination_active">{{ page }}</b>
                    <i v-else>{{ page }}</i>
                </span>
                
            </template>
        </b-pagination>
    </b-col>
</template>
<script>
import Card from "~/components/product/Card"
import smoothscroll from 'smoothscroll-polyfill'
export default {
    layout: 'sidebar',
    components:{
        Card, 
    },
    scrollToTop: false,
    mounted(){
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
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
            screenWidth: window.innerWidth,
            products:[],
            sort:'',
            sortTag:[],
            count:null,
            //pagination nav 
            perPage: 26,
            currentPage: 1,
        }
    },
    watch: {
        async currentPage(currentPage) {
            if(this.currentPage >= 1){
                if(this.screenWidth <= 991){
                    this.$axios.$get(`/api/products/subcategories/` + this.$route.params.subcategory + '?page=' + this.currentPage + '&sort=' + this.sort)
                    .then((response)=>{
                        this.products = response.products;
                    });
                    window.scroll({
                        top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 16,
                        behavior: 'smooth'
                    })
                } else {
                    this.$axios.$get(`/api/products/subcategories/` + this.$route.params.subcategory + '?page=' + this.currentPage + '&sort=' + this.sort)
                    .then((response)=>{
                        this.products = response.products;
                    });
                    window.scroll({
                        top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 116,
                        behavior: 'smooth'
                    })
                }      
            }
        },
        sort(sort){    
            this.sortBy();
        }
    },
    methods:{
        sortBy(){
            this.currentPage = 1;
            console.log(this.sort);
            this.$axios.$get('/api/products/categories/'+ this.$route.params.category + '?page=' + this.currentPage + '&sort=' + this.sort).then((response)=>{
                this.products = response.products;
            })
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

