<template>
    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 card_col mt-5 p-0 ">  <!-- margin top===3rem   -->
        <div class="card mx-lg-0" @mouseover='hover = true' @mouseleave='hover = false' >
            <img :src = product.photo.url class="card-img-top" alt="...">
            <nuxt-link to="/shop/:product">
                <div class="card-body">
                <p>{{product.category.title}}</p>
                <p class="card-title">{{product.title}}</p>
                <transition name="hover">
                    <p v-if="hover==false">{{product.price.$numberDecimal}} лв</p>
                </transition>
                <transition>
                    <p v-if="hover==true"></p>
                </transition>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    props:['product'],
    data(){
        return{
            hover: false
        }
    },
}
</script>
<style>
    .card-img-top {
    padding:0;
    margin:0;
    width:190px;
    height:190px;
    }
    .card{
    margin-bottom: 20px;
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
    .hover-enter-active{
        transition: 0.5s;
    }
    .hover-leave-active{
        transition: 0.5s;
        opacity: 0;
    }
    
</style>