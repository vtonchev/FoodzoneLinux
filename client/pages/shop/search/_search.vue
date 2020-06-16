<template>
    <b-col class="p-0 position-static">
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item>Търси</b-breadcrumb-item>
                <b-breadcrumb-item active >{{this.$route.params.search}} ({{count}} резултата)</b-breadcrumb-item>
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
        <b-col cols="12" class='p-0'>
            <b-row class="m-0">
                <b-col v-if="!count" class="text-center text-weight-bold" style="height:100%">Няма намерени продукти</b-col>
                <b-col cols='6' sm='4' md='4' lg='3' class="p-0 mb-3 card_col" v-for='product in products' :key='product._id'>
                    <Card 
                    :product='product'
                    >
                    </Card> 
                    
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
        <template v-slot:page="{ page, active }">
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
    layout: 'sidebarSearch',
    components:{
        Card,
         
    },
    scrollToTop: false,
    async asyncData({$axios, route}){
        const response = await $axios.$get('/api/products/search/page/' + encodeURIComponent(route.params.search) +'?page=1');
        return{
            products: response.products,
            count: response.count
        }
    },
    mounted(){
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    },
    // created(){
    //     this.$axios.$get('/api/products/search/page/'+ this.$route.query.search +'?page=1').then((response)=>{
    //         this.products = response.products;
    //         this.count = response.count
    //     }); 
    // },
    data(){
        return{
            screenWidth: window.innerWidth,
            products:[],
            sort:'',
            sortTag:[],
            count:null,
            //pagination nav 
            perPage: 24,
            currentPage: 1,
            // swipe events
            
        }
    },
    
    // created() {
    //     window.addEventListener('scroll', () => {
    //         this.bottom = this.bottomVisible()
    //     })
    // },
    watch: {
        async currentPage(currentPage) {
            if(this.currentPage >= 1){
                if(this.screenWidth <= 991){
                    this.asyncScrollToTopMobile();
                } else {
                    if(this.currentPage == Math.ceil(this.count/this.perPage)){
                        this.asyncScrollToTop()
                    } else {
                        this.scrollToTop();
                    }
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
            this.$axios.$get(`/api/products/search/page/` + this.$route.params.search + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                alert(this.$route.params.search)
                this.products = response.products;
            })
        },
        async asyncScrollToTopMobile(){
            await this.$axios.$get(`/api/products/search/page/` + this.$route.params.search + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
                }
            )
            window.scroll({
                top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 16,
                behavior: 'smooth'
            })
        },
        async asyncScrollToTop(){
            await this.$axios.$get(`/api/products/search/page/` + this.$route.params.search + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
                }
            )
            window.scroll({
                top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 116,
                behavior: 'smooth'
            })
        },
        scrollToTop(){
            this.$axios.$get(`/api/products/search/page/` + this.$route.params.search + '?page=' + this.currentPage + '&sort=' + this.sort)  
            .then((response)=>{
                this.products = response.products;
                }
            ) 
            window.scroll({
                top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 116,
                behavior: 'smooth'
            })
        }     
    }
}
</script>
