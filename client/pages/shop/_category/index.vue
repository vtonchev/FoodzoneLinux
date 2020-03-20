<template>

    <b-col class="p-0 position-static">
        <div type='button' @click='currentPage++' class="position-fixed d-none d-md-flex next_page" style="right:0; top:0; z-index:100; height:100vh; width: 5%;">
            <span class='align-self-center mx-auto'>
                <i class="fas fa-arrow-circle-right"></i>
            </span>
        </div>
        <b-col cols="12" class="p-0 position-static">
            <b-breadcrumb class="route">
                <b-breadcrumb-item to='/'>
                <i class="fas fa-home"></i>
                    Начало
                </b-breadcrumb-item>
                <b-breadcrumb-item active :to="{name: 'shop-category', params: { category: $route.params.category} }">{{$store.state.categories[$route.params.category]}} ({{count}})</b-breadcrumb-item>
            </b-breadcrumb>
            <span ref="scrollTo"></span>
            <b-form-group class="filter" >
                <b-form-radio-group v-model="sort">
                    <b-form-radio value="1"> Цена (ниска)</b-form-radio>
                    <b-form-radio value="2">Цена (висока)</b-form-radio>
                    <b-form-radio value="3">Име</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </b-col>
        <b-col cols="12" class='p-0' >
            <b-row class="m-0">
                <b-col cols='6' sm='4' lg='3' class="p-0 mb-3" v-for='(product,index) in products' :key='index'>
                    <Card 
                    v-if="!product.sale"
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
           <b-pagination
           align="center"
            v-model="currentPage"
            :total-rows="count"
            :per-page="perPage"
            prev-text="Prev"
            next-text="Next"
            page-class='text-success'
            ></b-pagination>
        </b-col>
    </b-col>

    
</template>
<script>
import Card from "~/components/product/Card"
import CardSale from "~/components/product/CardSale"
export default {
    layout: 'sidebar',
    components:{
        Card,
        CardSale,
    },
    scrollToTop: false,
    head: {
        script: [
            { src: '/swipe-events.min.js' }
        ]
    },
    // beforeMount () {
    //     document.addEventListener('swiped-left', () => {
    //             if(this.currentPage > 1){
    //                 this.currentPage--;
    //             }
    //         }
    //     );
    //     document.addEventListener('swiped-right', () => {
    //         if(this.currentPage < (this.rows/36)){
    //             this.currentPage++;
    //         }
    //     });
    // },
    // beforeDestroy() {
    //     document.removeEventListener('swiped-left', () => {
    //             if(this.currentPage > 1){
    //                 this.currentPage--;
    //             }
    //         }
    //     );
    //     document.removeEventListener('swiped-right', () => {
    //             if(this.currentPage > 1){
    //                 this.currentPage--;
    //             }
    //         }
    //     );
    // },
    async asyncData({$axios, params, store, route}){
        try {
            const response = await $axios.$get(`/api/products/categories/${params.category}`+ '?page=1' );
            return {
                products: response.products,
                //bootstrap paggination important 
                count: response.count
            }
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            screenWidth: screen.width,
            products:[],      
            sort:'',
            sortTag:[],
            //pagination nav 
            perPage: 36,
            currentPage: 1
        }
    },
    // created() {
    //     window.addEventListener('scroll', () => {
    //         this.bottom = this.bottomVisible()
    //     })
    // },
    // beforeDestroy() {
    //     window.removeEventListener('scroll', () => {
    //         this.bottom = this.bottomVisible()
    //     })
    // },
    watch: {
        currentPage(currentPage) {
            this.$axios.$get(`/api/products/categories/` + this.$route.params.category + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
            });
            if(this.currentPage >= 1){
                if(this.screenWidth > 991){
                    window.scroll({
                        top: 120,
                        behavior: 'smooth'
                    })
                } else {
                    console.log(window.pageYOffset);
                    console.log(this.$refs["scrollTo"].getBoundingClientRect().top)
                    window.scroll({
                        top: this.$refs["scrollTo"].getBoundingClientRect().top + window.pageYOffset - 16,
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
        nextPage(){
            alert(this.currentPage)
            return this.currentPage++;
        },
        sortBy(){
            this.currentPage = 1;
            console.log(this.sort);
            this.$axios.$get('/api/products/categories/'+ this.$route.params.category + '?page=' + this.currentPage + '&sort=' + this.sort)
            .then((response)=>{
                this.products = response.products;
            })
        }    
    }
    
}
</script>

<style scoped src="~/assets/products_page.css">

</style>