<template>
    <div class="card ml-lg-auto product_card" @mouseover='hover = true' @mouseleave='hover = false' >
        <img :src = product.photo.url class="card-img-top" alt="...">
        <div class="card-body">
            <b-button @click="$bvModal.show(product._id)" class="card-title bg-transparent border-0 p-0 w-100 mb-1">{{product.title}}</b-button>
            <b-modal :id='product._id' :title="product.title">
                <img class="card-img-top" :src="product.photo.url" alt="">
            </b-modal>
            <div class="w-100 text-center mb-1">
                <b-badge>{{product.weight.$numberDecimal}}</b-badge>
            </div>
            <span class="clearfix">
                <!-- <span class="float-left d-flex">
                    <div class="plus_minus_outer" style="border: 2px solid #D6282E;">
                        <span class="minus_inner" style="font-size:40px;">-</span>
                    </div>
                    <input class="display-inline border" style="width: 20px; height: 24px; margin: 0 5px;" />
                    <span class="plus_minus_outer" style="border: 2px solid #64C042;">
                        <span class="plus_inner" style="font-size:20px;">+</span>
                    </span>
                </span> -->
                <span class="font-weight-bold float-left" style="color:#2e2e2e">{{product.price.$numberDecimal}}</span><small>лв</small>

                <b-button @click='addProduct(product)' style="color:#61BD42; font-weight:600;" class="bg-transparent p-0 border-0 float-right"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
            </span>
        </div>
    </div>      
</template>
<script>
import {mapActions} from 'vuex'
export default {
    props:['product','properties'],
    data(){
        return{
            hover: false,
            quantity:1
        }
    },
    methods:{
        ...mapActions(['addProductToCart']),
        decrease(){
            if(this.quantity!=1){
                this.quantity--
            }
        },
        increase(inStock){
            if(this.quantity<inStock){
                this.quantity++
            }
        },
        addProduct(product){
            for(var i = 0; i < this.quantity; i++){
                this.addProductToCart(product)
            }
        }
    }
}
</script>
<style scoped>

.card-img-top {
    padding: 15px;
    width:220px;
    height:220px;
}
.product_card{
    width:min-content;
    transition: 0.5s;
}
.card:hover{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card-title{
    font-size: 14px;
    line-height: 1.3;
    font-weight:500;
    color:#2e2e2e;
    text-align: left;
    height: 3.3rem;
}
.card-body{
padding:15px;
}
.custom_button{
    background-color: transparent;
    border:none;
}
.custom_button:focus{
    outline-color: green;
}
.card-body p:last-child{
    color: black;
    font-size:20px;
    font-weight: bold;
    margin:0;
}
.card-body p:first-child{
    color: #A0A0A9;
    font-weight:400;
    font-size:14px;
    margin:0px;
  }
/* .plus_minus_outer{
    border-radius: 50%;
    position: relative;
    text-align: center;
    align-self: center;
    width: 20px;
    height: 20px;
}
.minus_inner{
    position: absolute;
    color: #D6282E;
    top: -24px;
    right: 2px;
}
.plus_inner{
    position: absolute;
    color: #64C042;
    font-weight: 500;
    top: -6.59px;
    right: 2.3px; 
}*/

@media screen and (max-width: 1199px){
    .card-img-top {
        padding:0;
        width:165px;
        height:165px;
    }
}

@media only screen and (max-width: 991px) {
    .card-img-top {
        width:100%;
        height:auto;
    } 

}
@media only screen and (max-width: 767px){
    
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 575px) {
    
}
    
</style>