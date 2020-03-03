<template>
    <div id = "outer_box_middle">
        <div id = "inner_box_middle">
        <div id = "middle_menu">


            <!-- middle menu    -->
            <div class="row m-0" id="middle-menu">

                <!-- brandlogo -->
              <div class="col-sm-auto mx-auto p-0 mb-3 mb-sm-0 ">
                <img class= "brandLogo d-block mx-auto d-inline-block align-top" src="/img/brandlogo.png" alt="brand logo">
              </div>

                <!-- search bar -->
                <div class="col-6 order-3 order-sm-2 col-sm p-0 ml-sm-2 mr-sm-2">
                <!-- search bar on small to large screens -->
                  <form class="search-bar d-none d-sm-block">
                      <input class="form-control mr-sm-2" type="search" placeholder="Потърсете продукта тук ..." aria-label="Search">
                      <button type="button" class="btn btn-light btn-outline-light search-button-any "><i class="fas fa-search"></i></button>
                  </form>
                <!-- search btn on xs screens -->
                  <button type="button" class="btn btn-light btn-outline-light d-block d-sm-none mx-auto search-button-onphone" data-toggle="modal" data-target="#exampleModalLong"><i class="fas fa-search"></i></button>
                <!-- search panel which appears when search btn on xs screeen is triggered-->
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                          <form class="search-bar">
                              <input class="form-control mr-sm-2" type="search" placeholder="Потърсете продукта тук ..." aria-label="Search">
                              <button type="button" class="btn btn-light btn-outline-light search-button-any "><i class="fas fa-search"></i></button>
                          </form>
                      </div>
                    </div>
                </div>

                </div>

                <!-- CART -->
                <div class="col-6 order-2 order-sm-3 col-sm-auto p-0" id="cart" >
                  <span 
                  @mouseover="visible = true"
                  @mouseleave="visible = false"
                  >
                    <b-button class="shopping-cart-div-out mx-auto p-0" 
                    :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="onCartClick"
                    >
                      <span class="fas fa-shopping-cart fa-1x"></span>
                      <span id="price">{{getTotalPrice}} лв</span>           
                    </b-button>
                    <b-collapse id="collapse-4" v-model="visible" class="mt-2 cart_products" >
                      <b-card class='d-none d-lg-block'>
                        <div v-if="getCart == 0">Няма продукти в количката!</div>
                        <div style="display: flow-root; margin-bottom:1.25rem;" v-for="product in getCart" :key="product._id">
                          <img width="60" height="60" :src="product.photo.url" alt="" class="mr-3" style="float: left;">
                          <span style="vertical-align: top; color:#2E2E2E; display: inline-block; font-size:16px; font-weight:700;">{{product.title}}</span>
                          <button @click="$store.commit('removeProduct', product)" style="display:contents; margin:0 5px; display:contents"><span style="display: inline-table; font-weight:700; margin-left:20px">&times;</span></button>
                          <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400;">{{product.quantity}} </span>
                          <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400; padding:0 5px; ">&times;</span>
                          <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400;"> {{product.price.$numberDecimal}}лв</span>
                        </div> 
                      </b-card>
                    </b-collapse>
                  </span>
                </div>

            </div>

        </div>
        </div>
    </div>
</template>

<style>
a{
  color:white;
  text-decoration: none;
}
#outer_box_middle{
  width:100%;
  padding:1rem 0;
  height:fit-content;
  background-color:white;
}
.brandLogo , .search-bar,.shopping-cart-div-out,.search-button-onphone{
  height: 3rem;
}
.search-button-any,.search-button-onphone{
  border:none;
  color:black;
  background-color: white;
}
.brandLogo{
  text-align: center;
}
.form-control{
  height: inherit;
}

.search-bar{
  position:relative;
}
.search-button-any{
  position: absolute;
  right:0.3%;
  top:5%;
  height:90%;
}
 .shopping-cart-div-out{
  background-color: #E52121;
  width:120px;
  border-radius: 4px;
  border: 0;
}
.fa-shopping-cart{
    height: auto;
    margin-left: auto;
    margin-right:5px;
} 
#price{
    font-weight: bold;
    width: fit-content;
    margin-top:auto;
    margin-bottom:auto;
    margin-right: auto;
    font-size: 15px;
}
#cart{
  display:flex;
}
.cart_products{
  position: absolute;
  z-index: 200;
  top: 3rem;
  right: 0;
  width: max-content;

}
</style>
<script>
import {mapGetters} from 'vuex';
export default {
  computed:{
    ...mapGetters(['getTotalPrice', 'getCart']),
  },
  data(){
    return {
        visible: false
      }
  },
  methods:{
    onCartClick(){
      if(this.$store.state.cart != 0){
        this.$router.push('/shop/cart');
      }
    }
  }
}
</script>