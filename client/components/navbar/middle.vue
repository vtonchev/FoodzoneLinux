<template>
    <div id = "outer_box_middle">
        <div id = "inner_box_middle">
        <div id = "middle_menu">


            <!-- middle menu    -->
            <div class="row m-0" id="middle-menu">

              <!-- LOGO -->
              <b-col sm='auto' class="mx-auto p-0 mb-3 mb-sm-0">
                <div @click="$router.push('/')" class="d-flex mx-auto" style="width:fit-content;">
                  <b-img class= "brandLogo mr-3" src="/img/brandlogo.png" alt="brand logo"/>
                  <div class="text-uppercase align-self-center" style="font-size:12px">
                    <span>Първи свободен час</span>
                    <span class="font-weight-bold d-block">Днес 21:00-22:00</span>
                  </div>
                </div>
              </b-col>

              <!-- SEARCH -->
              <div class="col-5 order-3 order-sm-2 col-sm p-0 ml-sm-2 mr-sm-2 d-flex" >
                  <!-- SEARCH RESULTS BOX -->
                  <div class="d-none d-md-block h-100 position-relative ml-auto mr-2" style="width: inherit;">
                    <span
                     @mouseover="display = true" 
                     @mouseleave="display = false"
                    >
                      <b-form-input  @input="searchCollapse" class="h-100 ml-auto border search" :class="{ search_focus: display}" v-model="searchText" placeholder="Потърси продукт..." />
                      <b-button class="border-0 bg-transparent search_button"><i  class="fas fa-search text-dark"></i></b-button>
                      <div v-if="searchProducts" :class="{ displayProduct: display, 'd-none': !display }" >
                        <div v-for="product in searchProducts" :key="product._id" class="position-relative">
                            <div class="promotion_text" v-if="product.sale">ПРОМОЦИЯ</div>
                            <div v-if="product.sale" class="promotion_sticker"><span class="m-auto">{{product.sale}}%</span></div>
                          <div style="display:flex; align-items:center; width:90%; margin:auto; padding: 10px 0;">
                            <!-- <div class="promotion_sticker" v-if="product.sale"><span class="m-auto">{{product.sale}}%</span></div> -->
                            <img :src="product.photo.url" alt="" width="60" height="60">
                            <button @click="$bvModal.show(product._id+'search_phone')" class="ml-auto result_title">
                              {{product.title}}
                            </button>
                            <FullInfo 
                                :id="product._id+'search_phone'"
                                :product='product'
                                :isInCart='isInCart(product)'
                                :qty='qty(product)'
                            />
                            
                            <b-badge class="ml-auto mb-0 mr-2">{{product.weight.$numberDecimal}} {{product.unit}}</b-badge>
                            <div class="ml-auto font-weight-bold mr-2" style="color:#666666; flex-shrink: 0;">{{product.price.$numberDecimal}} лв</div>
                            <div v-if="isInCart(product)" class="ml-auto mr-2">
                              <!-- INCREASE/DECREASE QTY -->
                              <QuantityController
                              
                              :product='product'
                              :qty='qty(product)'
                              />
                            </div> 
                            <b-button v-else @click='addProductToCart(product)' class="buy_btn ml-auto" style="height: fit-content; align-self: center; flex-shrink: 0;"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
                            
                          </div>
                          <hr class="m-1">
                        </div>
                      </div>
                    </span>
                  </div>
                  <!-- PHONE SEARCH -->
                  <b-button v-b-modal.searchModal class="d-block d-md-none border-0 bg-transparent mr-auto mr-sm-0 ml-sm-auto h-100">
                    <i  class="fas fa-search text-dark "></i>
                  </b-button>
                  <b-modal id="searchModal" 
                  hide-footer 
                  hide-header 
                  body-class="p-0"
                  >
                    <b-form-input @input="searchCollapse" v-model="searchText" class="form-control mr-sm-2 h-100" placeholder="Потърси продукт..." />
                    <b-button class="border-0 bg-transparent search_button"><i  class="fas fa-search text-dark"></i></b-button>
                     <div v-if="searchProducts" class='displayProduct' >
                      <div v-for="product in searchProducts" :key="product._id" class="position-relative">
                          <div class="promotion_text" v-if="product.sale">ПРОМОЦИЯ</div>
                          <div v-if="product.sale" class="promotion_sticker"><span class="m-auto">{{product.sale}}%</span></div>
                        <div style="display:flex; align-items:center; width:90%; margin:auto; padding: 10px 0;">
                          <!-- <div class="promotion_sticker" v-if="product.sale"><span class="m-auto">{{product.sale}}%</span></div> -->
                          <img :src="product.photo.url" alt="" width="100" height="100" class="float-left">
                          <span>
                            <button @click="$bvModal.show(product._id+'search')" class="ml-auto result_title">
                              {{product.title}}
                            </button>
                            <FullInfo 
                                :id="product._id+'search'"
                                :product='product'
                                :isInCart='isInCart(product)'
                                :qty='qty(product)'
                            />
                            <b-badge class=" mb-0 mr-2 d-block" style="width:min-content">{{product.weight.$numberDecimal}} {{product.unit}}</b-badge>
                          </span>
                          <span class="ml-auto">
                            <div class="ml-auto font-weight-bold mr-2" style="color:#666666; flex-shrink: 0;">{{product.price.$numberDecimal}} лв</div>
                            <div v-if="isInCart(product)" class="ml-auto mr-2">
                              <!-- INCREASE/DECREASE QTY -->
                              <QuantityController
                              :product='product'
                              :qty='qty(product)'
                              />
                            </div> 
                            <b-button v-else @click='addProductToCart(product)' class="buy_btn ml-auto" style="height: fit-content; align-self: center; flex-shrink: 0;width:max-content;"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
                          </span>  
                        </div>
                        <hr class="m-1">
                      </div>
                    </div>
                  </b-modal>
                  <div class="align-self-center d-flex" style="align-items: flex-end;">
                    <div v-if='$auth.$state.loggedIn' style="display:grid" class="mr-3">
                      <b-button class="bg-transparent text-dark border-0 p-0" ><i class="fas fa-user"></i></b-button>
                      <a href="#" @click="onLogout" class="text-dark" style="margin-top: -5px;">изход</a>                            
                    </div>
                    <template v-else>
                        <LoginPanel />
                    </template>
                    
                  </div>
                
              </div>

                <!-- CART -->
              <div class="col-6 order-2 order-sm-3 col-sm-auto p-0" id="cart" >
                <span
                  @mouseover="visible = true" 
                  @mouseleave="visible = false"
                >
                  <b-button class="shopping-cart-div-out p-0" 
                  :class="visible ? null : 'collapsed'"
                  :aria-expanded="visible ? 'true' : 'false'"
                  aria-controls="collapse-4"
                  @click="onCartClick"
                  >
                    <span class="fas fa-shopping-cart fa-1x"></span>
                    <span id="price">{{getTotalPrice}} лв</span>           
                  </b-button>
                  <b-collapse id="collapse-4" v-model="visible" class="mt-2 cart_products" >
                    <b-card class='d-none d-lg-block' style="max-height: 340px;overflow-y: scroll;">
                      <div v-if="getCart == 0">Няма продукти в количката!</div>
                      <div style="display: flow-root; margin-bottom:1.25rem;" v-for="product in getCart" :key="product._id">
                        <img width="60" height="60" :src="product.photo.url" alt="" class="mr-3" style="float: left;">
                        <span style="vertical-align: top; color:#2E2E2E; display: inline-block; font-size:16px; font-weight:700; width: 150px;height:24px;overflow: hidden;">{{product.title}}</span>
                        <button @click="$store.commit('removeProduct', product)" style="display:contents; margin:0 5px; display:contents"><span style="display: inline-table; font-weight:700; margin-left:20px">&times;</span></button>
                        <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400;">{{product.quantity}} </span>
                        <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400; padding:0 5px; ">&times;</span>
                        <span style="display: table-cell; color:#707070; font-size:14px; font-weight:400;"> {{product.price.$numberDecimal}}лв</span>
                      </div>
                      <span v-if="getCart!=0" style="font-size:16px; margin-right: 46px;" class="font-weight-bold">Общо: <span style="color: #5AA240;">{{getTotalPrice}}</span> лв</span>
                      <button v-if="getCart!=0" style="background-color:transparent; border:none; background-color: #E52121;" class="border rounded pt-1 pb-1"><nuxt-link class="text-white" to='/shop/order'>Продължи</nuxt-link></button> 
                    </b-card>
                  </b-collapse>
                </span>
              </div>
              <div class="col-auto ml-auto ml-sm-3 p-0 order-4">
                <div style="display:grid"> 
                  <span style="width: fit-content;margin-left: 1px;"><i class="fas fa-globe"></i></span>
                  <b-form-select
                  v-model="language"
                  :options='languages'
                  class="p-0 border-0"
                  style="background: transparent; height:fit-content;"
                  >
                  </b-form-select>
                </div>
              </div>
              

            </div>

        </div>
        </div>
    </div>
</template>

<style>
a{
  text-decoration: none;
  
}
#outer_box_middle{
  width:100%;
  padding:0.5rem 0;
  height:fit-content;
  background-color:white;
}
.brandLogo , .search-bar,.shopping-cart-div-out{
  height: 3rem;
}

.brandLogo{
  text-align: center;
}
.search_button{
  position: absolute;
  right:0;
  top:0;
  height:100%;
}
 .shopping-cart-div-out{
  background-color: #64c042;
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
.search{
  max-width:200px;
  transition: max-width 0.3s;
}
.search_focus{
  max-width:100%; 
}
.displayProduct{
  display: block;
  position:absolute;
  font-size: 18px;
  
  top:3rem;
  right:-10%;
  z-index:200;
  background: white;
  width: 120%;
}
.result_title{
  border: 0;
  background: transparent;
  font-weight: 700;
  color: #28324B;
  width: 250px;
  overflow: auto;
  text-align: left;
}
.promotion_text{
    width: 100px;
    background-color: #FBDE44;
    text-align: center;
    color:  #28324B;
    font-size:12px; 
    font-weight: 600;
}
.promotion_sticker{
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 5px;

    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color:#E52121;
    color: white;
    text-align: center;
    vertical-align: center;
    font-size: 14px;
}
@media screen and (max-width: 991px) {
    .displayProduct{
      width:200%;
      left: -50%;
      
      font-weight: 700;
      margin:auto
    }
    .result_title{
      color: #28324B;
      font-size: 14px;
      width: 150 px;
      overflow: auto;
    }
}
@media screen and (max-width: 767px) {
  .search_button{
    position: absolute;
    right:0;
    top:0;
    max-height: 30px;
  }
  .displayProduct{
    width: 100%;
    right:0;
    left:0;
  }
  .result_title{
    width: auto;
  }
}

</style>
<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex'
import LoginPanel from "~/components/navbar/loginPanel"
import FullInfo from '~/components/product/FullInfo'
import QuantityController from "~/components/product/QuantityController"
export default {
  components:{
    LoginPanel,
    QuantityController,
    FullInfo
  },
  data(){
    return {
        visible: false,
        language: 'BG',
        languages: [
          { value: 'BG', text: 'БГ' },
          { value: 'RU', text: 'РУ' },
          { value: 'EN', text: 'EN' },
        ],
        searchText:'',
        searchProducts:[],
        isShown:false,
        display:false,
      }
  },
  
  methods:{
    ...mapActions(['addProductToCart']),
    async onLogout(){
      await this.$auth.logout();
    },
    onCartClick(){
      if(this.$store.state.cart != 0){
        this.$router.push('/shop/cart');
      }
    },
    async Search(){
      const response = await this.$axios.$get('/api/products/search/' + this.searchText);
      this.searchProducts = response.products
      if (!this.searchText){
        this.searchProducts = []
      }
    },
    qty(prod){
      const prodQ = this.getCart.find(product => product._id === prod._id)
      if(prodQ){
          return prodQ.quantity
      } else {
          return 0
      } 
    },
    isInCart(product){
      return this.getCart.some(prod => prod._id === product._id);
    },
    searchCollapse(){
      if (this.searchText) {
        this.Search();
      } else {
        this.searchProducts = []
      }
    }
  },
  computed:{
    ...mapGetters(['getTotalPrice', 'getCart']),
      
  },
}
</script>