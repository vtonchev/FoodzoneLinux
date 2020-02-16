<template>
    <main>
        <!-- Here will be placed the products of a specific category -->
        <div class="mx-lg-auto" id="products_page">
            <div class="row justify-content-between main-content">
                
            </div>
        </div>
        <Sidebar />
    </main>
</template>

<script>
import Sidebar from "~/components/sidebar/sidebar"
import Card from "~/components/product/card"
export default {
    components:{
        Sidebar,
        Card
    }
}
</script>

<style>
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
    #products_page{
    position:relative;
    width:1200px;
    margin-right: auto;
    }

    @media only screen and (max-width: 1199px) {
    #products_page{
        width:980px;
    }
    .main-content{
        width:83%;
    }

    }

    @media only screen and (max-width: 991px) {
        #products_page{
            width:auto;
            margin:0 3rem;

        }

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
        #products_page{
            margin:0 10px;
        }
        .card_col:nth-child(2n) .card{
            margin-left:auto;
        }
        .main-content{
            width:100%;
        }
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 575px) {
        .card{
            width:auto;
            height: fit-content;
        }
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