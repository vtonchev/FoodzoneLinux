<template>
    <div id="cart_page" >
        <h1 class="cart_heading">Количка</h1>
        <hr class="horizontal_line">
        <!-- SHOW ON XS AND SM  SCREENS -->
        <div class='cart_table d-block d-md-none'>
            <div v-for="product in getCart" :key="product._id" >
                <button @click="$store.commit('removeProduct', product)" class="close_button">&times;</button>
                <img class="image_table_data" :src="product.photo.url">
                <button @click="onMinusClick(product)" style="display:contents">
                    <span  class="fas fa-minus fa-2x minus"></span>
                </button>
                
                <button @click="onPlusClick(product)" style="display:contents">
                    <span class="fas fa-plus fa-2x plus"></span>
                </button>  
                <p class="title_table_data">{{product.title}}</p>
                <div class="product_data">
                    <span class="cart_table_data">{{product.price.$numberDecimal}} лв</span>
                    <input class="input_quantity" type='number' min='1' :max="product.stockQuantity"  @change="onChangeQuantity($event, product)" :value="product.quantity">
                    <span class="totalProductPrice_table_data_xs" style="right:0">{{(product.quantity*product.price.$numberDecimal).toFixed(2)}} лв</span> 
                </div>
            </div>
            <div v-if="getCart == 0" style="border:solid 1px #E1E1E1; background-color:#f6f6f6; margin-top:-20px; margin-bottom:20px; text-align:center;"> Няма продукти в количката !</div>
            <div ref="lastElement"></div>
            <div ref="checkoutMenu" @scroll='handleScroll' class="stick_menu" v-bind:class="{ stick_to_bottom: isBottom }">
                <p class="totalPrice" style="font-size:1.3rem;">Общо: <span style="color: #5AA240;">{{getTotalPrice}}</span> лв</p>
                <button class="checkout_button"><nuxt-link style="padding: 8px 0;" to='/shop/order'>Продължи</nuxt-link></button>
            </div>
        </div>
        <!-- SHOW ON MD SCREEN AND BIGGER -->
        <div class="d-none d-md-table w-100 mb-3">
            <table class="cart_table">
                <thead class="cart_table_heading">
                    <tr>
                        <td></td>
                        <td class="product_table_data">Продукт</td>
                        <td></td>
                        <td>Количество</td>
                        <td>Цена</td>
                        <td>Общо</td>
                    </tr>
                </thead>
                <tbody class="table_body">
                    <tr v-for="product in getCart" :key="product._id" >
                        <td class="cart_table_data">
                            <button @click="$store.commit('removeProduct', product)" class="close_button">&times;</button>
                        </td>
                        <td class="image_table_data">
                            <img height="60" width="60" :src="product.photo.url" alt="">
                        </td>
                        <td class="title_table_data">
                            {{product.title}}
                        </td>
                        <td class="cart_table_data">
                            <input class="input_quantity" type='number' min='1' :max="product.stockQuantity"  @change="onChangeQuantity($event, product)" :value="product.quantity">
                        </td>
                        <td class="cart_table_data">
                            <span>{{product.price.$numberDecimal}} лв</span>
                        </td>
                        <td class="totalProductPrice_table_data">
                            <span>{{(product.quantity*product.price.$numberDecimal).toFixed(2)}} лв</span>  
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="getCart == 0" style="border:solid 1px #E1E1E1; background-color:#f6f6f6; margin-top:-20px; margin-bottom:20px; text-align:center;"> Няма продукти в количката !</div>
            <div class="checkoutMenuDesktop">
                <p class="totalPrice">Общо: <span style="color: #5AA240;">{{getTotalPrice}}</span> лв</p>
                <button class="checkout_button"><nuxt-link style="padding: 8px 0;" to='/shop/order'>Продължи</nuxt-link></button>
            </div>
        </div>
        
        
    </div>
</template>
<style scoped>
a:hover{
    color: white;
}
#cart_page{
    width:1200px;
    margin:0 auto;
}
.cart_heading{
    margin-top: 2rem;
    margin-left: -1.5px;
}
.cart_table{
    margin: 4rem 0 2rem;
    width: 100%
}
.table_body,
.cart_table_heading,
.input_quantity:focus {
    border: solid 1px #E1E1E1;
}
.cart_table_data, 
.product_table_data, 
.image_table_data, 
.title_table_data, 
.totalProductPrice_table_data{
    border-bottom: solid 1px #E1E1E1;
}

.cart_table_data{
    font-weight: 600;
    color: #b6b6b6;
}
.product_table_data, .image_table_data{
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem; 
    width: 140px;
}
.title_table_data{
    font-size: 16px;
    font-weight: 600;
}
.cart_table_heading{
    background-color: #f6f6f6;
}
.totalProductPrice_table_data{
    width: 15%;
    color: #5AA240;
    font-weight: 600;
}
.input_quantity{
    padding: 1rem;
    width: 70px;
    border: none;
    background-color: #f6f6f6;
}
.input_quantity:focus{
    outline: none;
}
.horizontal_line{
    color: #f6f6f6;
    border: solid 4px
}
.close_button{
    background-color: white;
    vertical-align: text-bottom;
    border: none;
    float:right;
    font-size: 30px;
    font-weight: 300;
    padding: 0;
}
.close_button:focus{
    outline:none;
    border: none;
}

.totalPrice{
    align-self: center;
    font-size: 1.5rem;
    font-weight: 700;
}
.checkout_button{
    background-color: #E52121;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    margin-left: auto;
    color: white;
}
.checkout_button :focus{
    outline: none;
    
}

.stick_menu{
    position:fixed;
    display:flex;  
    bottom:0; 
    right:0; 
    background-color:white; 
    opacity: 0.9;
    width:100%; 
    padding:5px 21%;
}
.stick_to_bottom{
    position: static;
    padding: 5px 0;
}
.minus, .plus{
    border: solid 3px #F6F6F6;
    border-radius: 100%;
    padding: 5px;
}
.plus{
    background-color: #dddddd;
    float: right;
    color: white;
}
 .checkoutMenuDesktop{
    width: fit-content;
    margin-left: auto;
    margin-right: 100px;
} 
@media screen and (max-width: 1199px){
    #cart_page{
      width:980px;
    }
  }

@media screen and (max-width: 991px) {
    #cart_page{
      width:auto;
      margin:0 3rem;
    }
  }
@media screen and (max-width: 767px) {
  #cart_page{
    width:auto;
    margin:0 10px;
  }
  .cart_heading{
      text-align: center;
  }
  .cart_table{
      width: 60%;
      padding: 4rem 0;
      margin: auto;
  }
  .image_table_data{
      padding: 0;
      margin-bottom: 20px;
      width: 100%;
      border: none
  }
  .title_table_data{
      padding: 10px;
      border: none;
      text-align: center;
  }
  .cart_table_data,.totalProductPrice_table_data_xs{
      border:none;
      align-self: center;
      position: absolute
  }
  .totalProductPrice_table_data_xs{
      color: #5AA240;
      font-weight: 600;
  }
  .product_data{
      width: 250px;
      margin: 20px auto;
      position: relative;
      display: flex;
  }
  .input_quantity{
      margin: auto;
  }
  .close_button{
    float: right;
    position: relative;
    margin-top: -45px;
    top: 45px;
  }
@media screen and (max-width: 438px){
    .product_data{
        width: auto;
    }
    .cart_table{
        width: 80%;
        margin: auto;
    }
    .stick_menu{
        padding:5px 12%;
    }
    .stick_to_bottom{
        position: static;
        padding: 5px 0;
    }   
}
}
</style>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            isBottom:false
        }
    },
    beforeMount () {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed:{
        ...mapGetters(['getTotalPrice']),
        ...mapGetters(['getCart']), 
    },
    methods: {
        onChangeQuantity(event, product){
            let qty = event.target.value;
            if(qty < 1){
                qty = 1
            }
            else if(qty > product.stockQuantity){
                qty = product.stockQuantity;
            }
            this.$store.commit("changeQty", {product, qty })
        },
        onPlusClick(product){
            if(product.quantity < product.stockQuantity){
                const qty = parseInt(product.quantity) + 1;
                this.$store.commit("changeQty", {product, qty })
            }
        },
        onMinusClick(product){
            if(product.quantity > 1){
                const qty = parseInt(product.quantity) - 1;
                this.$store.commit("changeQty", {product, qty })
            }
        }, 
        handleScroll(){
            if(this.$refs["checkoutMenu"].offsetTop + window.scrollY >= this.$refs["lastElement"].offsetTop){
                this.isBottom = true;
            } 
            if(window.scrollY + window.innerHeight <= this.$refs["checkoutMenu"].offsetTop + this.$refs["checkoutMenu"].offsetHeight){
                this.isBottom = false;
            }
            
        }
    }
}
</script>
