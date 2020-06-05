<template>
    <div id = "outer_box_middle">
        <div id = "inner_box_middle">
        <div id = "middle_menu">
            <!-- middle menu    -->
            <div class="row m-0" id="middle-menu">
              <!-- LOGO -->
              <b-col sm='auto' class="mx-auto p-0 mb-3 mb-sm-0">
                <div  class="d-flex mx-auto" style="width:fit-content;">
                  <n-link to="/"><b-img  class= "brandLogo mr-3" src="/img/brandlogo.png" alt="brand logo"/></n-link>
                  <n-link to='/delivery' class="text-uppercase align-self-center text-left transparent_btn" style="font-size:12px; color:black">
                    <span>Първи свободен час</span>
                    <span class="font-weight-bold d-block" v-if="from">{{from}}-{{$moment(from,'HH:mm').add(1,'h').format('HH:mm')}}</span>
                  </n-link>
                </div>
              </b-col>
              <!-- SEARCH -->
              <div class="col-5 order-3 order-sm-2 col-sm p-0 ml-sm-2 mr-sm-2 d-flex">
                <!-- PHONE SEARCH -->
                <b-button v-if="screenWidth < 992" v-b-modal.searchModal class="border-0 bg-transparent mr-auto mr-sm-0 ml-sm-auto h-100">
                  <i  class="fas fa-search text-dark "></i>
                </b-button>
                <b-modal v-if="screenWidth < 992" id="searchModal" 
                hide-footer 
                hide-header
                body-class="p-0"
                >
                  <input v-model="searchText" @keyup.enter="fullSearch" class="form-control mr-sm-2 h-100" placeholder="Потърси продукт..." />
                  <b-button @click='fullSearch' class="border-0 bg-transparent search_button"><i  class="fas fa-search text-dark"></i></b-button>
                    <div v-if="searchProducts" class='displayProduct' >
                    <div v-for="product in searchProducts" :key="product._id" class="position-relative">
                      <div class="promotion_text" v-if="product.sale">ПРОМОЦИЯ</div>
                      <div v-if="product.sale" class="promotion_sticker"><span class="m-auto">{{product.sale}}%</span></div>
                      <div class="search_product_wrapper_xs">
                        <img :src="product.photo.url" alt="" class="float-left search_product_img">
                        <span class="ml-2 position-relative">
                          <button @click="$bvModal.show(product._id+'search')" class="ml-auto result_title p-0">
                            {{product.title}}
                          </button>
                          <FullInfo 
                              :id="product._id+'search'"
                              :product='product'
                          />
                          <b-badge class=" mb-0 mr-2 position-absolute" style=" bottom:0; left:0;z-index:100;">{{product.weight.$numberDecimal}} {{product.unit}}</b-badge>
                        </span>
                        <span class="ml-auto" style="min-width:90px;">
                          <div class="ml-auto font-weight-bold mr-2" style="color:#666666; flex-shrink: 0;">{{product.price.$numberDecimal}} лв</div>
                          <div v-show="isInCart(product)" class="ml-auto mr-2">
                            <!-- INCREASE/DECREASE QTY -->
                            <QuantityController
                            :id='product._id'
                            style="float:none !important; width: inherit; margin-top: 6px;"
                            />
                          </div> 
                          <b-button v-show='!isInCart(product)' @click.prevent='addProductToCart(product)' class="buy_btn ml-auto" style="float:none; width: inherit; margin-top:13px;"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
                        </span>  
                      </div>
                      <hr class="m-1">
                    </div>
                  </div>
                </b-modal>
                <!-- LAPTOP SEARCH -->
                <div v-else @keyup.enter="fullSearch" class="h-100 position-relative ml-auto mr-2" style="width: inherit;">
                  <span
                    @mouseover="display = true" 
                    @mouseleave="display = false"
                  >
                    <b-form-input autocomplete="off" class="h-100 ml-auto border search" :class="{ search_focus: display}" v-model="searchText" placeholder="Потърси продукт..." />
                    <b-button  @click='fullSearch' class="transparent_btn search_button"><i  class="fas fa-search text-dark" style="height:inherit;"></i></b-button>
                    <div v-if="searchProducts" :class="{ displayProduct: display, 'd-none': !display }" >
                      <div v-for="product in searchProducts" :key="product._id" class="position-relative">
                          <div class="promotion_text" v-if="product.sale">ПРОМОЦИЯ</div>
                          <div v-if="product.sale" class="promotion_sticker"><span class="m-auto">{{product.sale}}%</span></div>
                        <div class="search_product_wrapper_lg">
                          <img :src="product.photo.url" alt="" width="60" height="60">
                          <button @click="$bvModal.show(product._id+'search_phone')" class="ml-auto result_title">
                            {{product.title}}
                          </button>
                          <FullInfo 
                              :id="product._id+'search_phone'"
                              :product='product'
                          />
                          <b-badge class="ml-auto mb-0 mr-2">{{product.weight.$numberDecimal}} {{product.unit}}</b-badge>
                          <div class="ml-auto font-weight-bold mr-2" style="color:#666666; flex-shrink: 0;">{{product.price.$numberDecimal}} лв</div>
                          <div v-if="isInCart(product)" class="ml-auto mr-2">
                            <!-- INCREASE/DECREASE QTY -->
                            <QuantityController
                            :id='product._id'
                            />
                          </div> 
                          <b-button v-else @click='addProductToCart(product)' class="buy_btn ml-auto" style="height: fit-content; align-self: center; flex-shrink: 0;"><span class="fas fa-shopping-cart fa-1x"></span>Купи</b-button>
                          
                        </div>
                        <hr class="m-1">
                      </div>
                    </div>
                  </span>
                </div>
                <!-- AUTHENTICATION -->
                <div class="d-flex">
                  <div v-if='$auth.$state.loggedIn' style="display:grid">
                    <b-button to='/user' class="bg-transparent text-dark border-0 p-0 w-100 h-100" >
                      <i class="fas fa-user"></i>
                      <div class="text-dark mt-0" style="font-size:14px;">Профил</div>          
                    </b-button>        
                  </div>
                  
                  <span v-else>
                      <LoginPanel />
                  </span >
                  
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
                  <b-collapse id="collapse-4" v-model="visible" class="mt-2 cart_products">
                    <b-card class='d-none d-lg-block p-2' style="max-height: 340px;overflow-y: scroll;">
                      <div v-if="getCart == 0">Няма продукти в количката!</div>
                      <div style="display: flow-root; margin-bottom:1.25rem;" v-for="product in getCart" :key="product._id">
                        <img width="60" height="60" :src="product.photo.url" :alt="product.title" class="mr-3 float-left">
                        <span class="cart_hover_title">{{product.title}}</span>
                        <button @click="removeProduct(product)" class="transparent_btn p-0"><span class="cart_hover_close">&times;</span></button>
                        <span class="cart_hover_data">{{product.quantity}} </span>
                        <span class="cart_hover_data">&times;</span>
                        <span class="cart_hover_data"> {{product.price.$numberDecimal}}лв</span>
                      </div>
                      <span v-if="getCart!=0" class="font-weight-bold">Общо: <span style="color: #5AA240;">{{getTotalPrice}}</span> лв</span>
                      <button @click="$router.push('/shop/order')" v-if="getCart!=0" style="background-color: #E52121;" class="rounded pt-1 pb-1 transparent_btn float-right text-white">Продължи</button> 
                    </b-card>
                  </b-collapse>
                </span>
              </div>
              <!-- LANGUAGE -->
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
<script>
import * as vuex from 'vuex'
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
  async mounted(){
    const response = await this.$axios.get('api/orderDateTime/available');
    this.from = response.data.from
  },
  data(){
    return {
        from:'',
        visible: false,
        language: 'BG',
        languages: [
          { value: 'BG', text: 'БГ' },
          { value: 'RU', text: 'РУ' },
          { value: 'EN', text: 'EN' },
        ],
        orderDateTime:[],
        searchText:'',
        searchProducts:[],
        screenWidth: window.innerWidth,
        isShown:false,
        display:false,
      }
  },
  watch:{
    searchText(){
      this.searchCollapse();
    }
  },
  methods:{
    ...mapActions(['addProductToCart','removeProduct']),
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
    fullSearch(){
        this.$router.push("/shop/search/" + this.searchText);
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
    ...vuex.mapGetters(['getTotalPrice', 'getCart']),
  },
}
</script>