<template>
<b-row class="m-0">
    <b-col cols='auto' class="p-0" v-for='product in products' :key='product._id'>
        <Card 
        :product='product'
        >
        </Card> 
    </b-col>
</b-row>
    
</template>

<script>
import Card from "~/components/product/card"
export default {
    layout: 'sidebarLayout',
    components:{
        Card
    },
    async asyncData({$axios, params}){
        try {
            const categories = $axios.$get("/api/categories");
            const products = $axios.$get(`/api/products/categories/${params.category}`)
            const [catResponse, productsResponse]= await Promise.all([
              categories,
              products
            ]);
            return {
                categories: catResponse.categories,
                products: productsResponse.products
            }
        } catch(err) {
            console.log(err)
        }
    },
    
}
</script>

<style scoped>
    .card-body p:first-child{
    color: #A0A0A9;
    font-weight:400;
    font-size:14px;
    margin:0px;
    }
    .card-body p:last-child{
    color: black;
    font-size:20px;
    font-weight: bold;
    margin:0;
    }
    .main-content{
    margin:0;
    width:85%;
    }
    

    @media only screen and (max-width: 1199px) {
    
    .main-content{
        width:83%;
    }

    }

    @media only screen and (max-width: 991px) {
        

        .card{
            width: 90%;
            height: fit-content;
        }

        .card-img-top {
            width: 100%;
            height: auto;
        }

    }
    @media only screen and (max-width: 767px){
        
        .card_col:nth-child(2n) .card{
            margin-left:auto;
        }
        .main-content{
            width:100%;
        }
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 575px) {
        
        .card-img-top {
            width:100%;
            height:auto;
        }
        .main-content{
            width: 70%;
            margin: auto;
        }
    }
</style>