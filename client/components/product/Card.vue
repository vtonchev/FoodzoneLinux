<template>
    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 card_col mt-5 p-0 ">  <!-- margin top===3rem   -->
        <div class="card mx-lg-0">
            <img :src = product.image class="card-img-top" alt="...">
            <nuxt-link to="/shop/:product">
                <div class="card-body">
                <p>{{product.category}}</p>
                <p class="card-title">{{product.name}}</p>
                <p>{{product.price}} лв</p>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<style>
    .card-img-top {
    padding:0;
    margin:0;
    width:190px;
    height:190px;
    }
    .card{
    width:min-content;
    height: 20rem;
    transition: 0.5s;
    }
    .card:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .card-title{
    font-size:14px;
    font-weight:500;
    color:black;
    }
    .card-body{
    padding:15px;
    }
    
</style>