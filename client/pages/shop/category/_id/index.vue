<template>
    <b-col class="p-0 position-static">
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item active :to="{name: 'shop-category-id', params: { id: $route.params.id} }">{{$store.state.categories[$route.params.id]}} ({{count}} резултата)</b-breadcrumb-item>
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
    // beforeMount () {
    //     smoothscroll.polyfill();
    //     document.addEventListener('touchstart', this.handleTouchStart, false);        
    //     document.addEventListener('touchmove', this.handleTouchMove, false);
    //     document.addEventListener('touchend', this.handleTouchEnd, false)
    // },
    mounted(){
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    },
    // beforeDestroy() {
    //     document.removeEventListener('touchstart', this.handleTouchStart, false);
    //     document.removeEventListener('touchmove', this.handleTouchMove, false);  
    //     document.removeEventListener('touchend', this.handleTouchEnd, false);

    // },
    async asyncData({$axios, params, store, route}){
        try {
            const response = await $axios.$get(`/api/products/categories/${params.id}`+'?page=1'); 
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
            perPage: 24,
            currentPage: 1,
        }
    },
    watch: {
        currentPage(currentPage) { 
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
        // getTouches(evt) {
        //     return evt.touches || evt.originalEvent.touches; 
        // },                                                  
        // async handleTouchStart(evt) {
        //     const firstTouch = this.getTouches(evt)[0];                                      
        //     this.xDown = firstTouch.clientX;                                      
        //     this.yDown = firstTouch.clientY;                                      
        // },                                                
        // async handleTouchEnd(){
        //     if(this.swipe == 'left'){
        //         if(this.currentPage < this.count/this.perPage){
        //             this.swipe = '';    
        //             this.currentPage++  
        //         }
        //     }
        //     else if (this.swipe == 'right'){
        //          if(this.currentPage > 1){
        //              this.swipe = ''; 
        //             this.currentPage--
        //         }
        //     }
        // },
        // async handleTouchMove(evt) {
        //     if ( ! this.xDown || ! this.yDown ) {
        //         return;
        //     }
        //     let xUp = evt.touches[0].clientX;                                    
        //     let yUp = evt.touches[0].clientY;

        //     let xDiff = this.xDown - xUp;
        //     let yDiff = this.yDown - yUp;

        //     if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        //         if ( xDiff > 0 ) {
        //             return this.swipe = 'left'
        //             // console.log('left swipe')
                    
        //         } else {
        //             return this.swipe = 'right'
        //             // console.log('right swipe') 
        //         }                       
        //     }
        //     /* reset values */
        //     this.xDown = null;
        //     this.yDown = null;                                             
        // },
        async asyncScrollToTopMobile(){
            await this.$axios.$get('/api/products/categories/'+ this.$route.params.id+ '?page=' + this.currentPage + '&sort=' + this.sort)
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
            await this.$axios.$get('/api/products/categories/'+ this.$route.params.id+ '?page=' + this.currentPage + '&sort=' + this.sort)
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
            this.$axios.$get('/api/products/categories/'+ this.$route.params.id+ '?page=' + this.currentPage + '&sort=' + this.sort)            .then((response)=>{
                this.products = response.products;
                }
            ) 
            window.scroll({
                top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 116,
                behavior: 'smooth'
            })
        },
        sortBy(){
            this.currentPage = 1;
            this.$axios.$get('/api/products/categories/'+ this.$route.params.id+ '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
            })
        }   
    }
}
</script>
