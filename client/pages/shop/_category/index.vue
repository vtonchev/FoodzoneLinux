<template>
    <b-col class="p-0 position-static">
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item active :to="{name: 'shop-category', params: { category: $route.params.category} }">{{$store.state.categories[$route.params.category]}} ({{count}})</b-breadcrumb-item>
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
import smoothscroll from 'smoothscroll-polyfill';
export default {
    layout: 'sidebar',
    components:{
        Card,
        CardSale,
        Spinner
    },
    scrollToTop: false,
    beforeMount () {
        smoothscroll.polyfill();
        document.addEventListener('touchstart', this.handleTouchStart, false);        
        document.addEventListener('touchmove', this.handleTouchMove, false);
    },
    beforeDestroy() {
        document.removeEventListener('touchstart', this.handleTouchStart, false);  
        document.removeEventListener('touchmove', this.handleTouchMove, false);
    },
    async asyncData({$axios, params, store, route}){
        try {
            const response = await $axios.$get(`/api/products/categories/${params.category}`+'?page=1'); 
            
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
            sortTag:[],
            count:null,
            //pagination nav 
            perPage: 36,
            currentPage: 1,
            // swipe events
            xDown: null,                                                        
            yDown: null,
        }
    },
    created() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
    },
    watch: {
        async currentPage(currentPage) {
            this.$axios.$get(`/api/products/categories/` + this.$route.params.category + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
            });
            if(this.currentPage >= 1){
                if(this.screenWidth > 991){
                    await window.scroll({
                        top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 116,
                        behavior: 'smooth'
                    })
                } else {
                    await window.scroll({
                        top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 16,
                        behavior: 'smooth'
                    }) 
                    
                }      
            }
        },
        sort(sort){
            if(sort) {
                this.sortBy();
            }
        }
    },
    methods:{
        // bottomVisible() {
        //     const scrollY = window.scrollY
        //     const visible = document.documentElement.clientHeight
        //     const pageHeight = document.documentElement.scrollHeight;
        //     const bottomOfPage = visible + scrollY >= (pageHeight - 300)
        //     return bottomOfPage || (pageHeight - 300) < visible
        // },
        // async addProducts(){
        //     if((this.count/10) > this.page ){
        //         this.page++;
        //         let newProducts = null;
        //         if( this.sort == true){
        //             newProducts = await this.$axios.$get('/api/products/categories/'+ this.$route.params.category + '?page=' + this.page + '&sortBy=' + this.sort);
        //         } else {
        //             newProducts = await this.$axios.$get('/api/products/categories/'+ this.$route.params.category+ '?page=' + this.page);
        //         }
        //         this.products = this.products.concat(newProducts.products)
            
        //         if (this.bottomVisible()) {
        //             this.addProducts()
        //         }
        //     }
        // }, 
        
        sortBy(){
            this.page = 1;
            console.log(this.sort);
            this.$axios.$get('/api/products/categories/'+ this.$route.params.category + '?page=' + this.page + '&sort=' + this.sort).then((response)=>{
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

        async handleTouchMove(evt) {
            if ( ! this.xDown || ! this.yDown ) {
                return;
            }
            var xUp = evt.touches[0].clientX;                                    
            var yUp = evt.touches[0].clientY;

            var xDiff = this.xDown - xUp;
            var yDiff = this.yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    // console.log('left swipe')
                    if(this.currentPage < this.count/this.perPage){
                        this.currentPage++ 
                    }
                } else {
                    // console.log('right swipe') 
                    if(this.currentPage > 1){
                        this.currentPage--
                    }
                }                       
            }
            /* reset values */
            this.xDown = null;
            this.yDown = null;                                             
        }   
    }
}
</script>

<style scoped src="~/assets/products_page.css">

</style>