<template>
    <b-col class="p-0 position-static">
        <div @click="nextPage" class="position-fixed h-100 next_page d-md-flex d-none" style="right:0; top:0; z-index:10; width:5%" >
            <i class="fas fa-arrow-circle-right align-self-center"></i>
        </div>
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item :to="{name: 'shop-category', params: { category: $route.params.category} }">{{$store.state.categories[$route.params.category]}}</b-breadcrumb-item>
                <b-breadcrumb-item active>{{$store.state.subcategories[$route.params.category].find(({id}) => id === $route.params.subcategory).title}}({{count}})</b-breadcrumb-item>
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
import CardSale from "~/components/product/CardSale"
import smoothscroll from 'smoothscroll-polyfill'
export default {
    layout: 'sidebar',
    components:{
        Card, 
        CardSale,
        
    },
    scrollToTop: false,
    beforeMount () {
        smoothscroll.polyfill();
        document.addEventListener('touchstart', this.handleTouchStart, false);        
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('touchend', this.handleTouchEnd, false)
    },
    beforeDestroy() {
        document.removeEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);  
        document.removeEventListener('touchend', this.handleTouchEnd, false);

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
            // swipe events
            xDown: null,                                                        
            yDown: null,
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
        nextPage(){
            if(this.currentPage < this.count/this.perPage){
                this.currentPage++ 
            }
        },
        sortBy(){
            this.currentPage = 1;
            console.log(this.sort);
            this.$axios.$get('/api/products/categories/'+ this.$route.params.category + '?page=' + this.currentPage + '&sort=' + this.sort).then((response)=>{
                this.products = response.products;
            })
        },
        getTouches(evt) {
            return evt.touches || evt.originalEvent.touches; 
        },                                                  
        handleTouchStart(evt) {
            const firstTouch = this.getTouches(evt)[0];                                      
            this.xDown = firstTouch.clientX;                                      
            this.yDown = firstTouch.clientY;                                      
        },
        async handleTouchEnd(){
            if(this.swipe == 'left'){
                if(this.currentPage < this.count/this.perPage){
                    this.swipe = '';    
                    this.currentPage++;  
                }
            }
            else if (this.swipe == 'right'){
                 if(this.currentPage > 1){
                     this.swipe = ''; 
                    this.currentPage--;
                }
            }
        },
        async handleTouchMove(evt) {
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }
            let xUp = evt.touches[0].clientX;                                    
            let yUp = evt.touches[0].clientY;

            let xDiff = this.xDown - xUp;
            let yDiff = this.yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    return this.swipe = 'left'
                    // console.log('left swipe')
                    
                } else {
                    return this.swipe = 'right'
                    // console.log('right swipe') 
                }                       
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;                                             
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