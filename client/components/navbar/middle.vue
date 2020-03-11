<template>
    <div id = "outer_box_middle">
        <div id = "inner_box_middle">
        <div id = "middle_menu">


            <!-- middle menu    -->
            <div class="row m-0" id="middle-menu">

              <!-- LOGO -->
              <b-col sm='auto' class="mx-auto p-0 mb-3 mb-sm-0">
                <div class="d-flex mx-auto" style="width:fit-content;">
                  <b-img class= "brandLogo mr-3" src="/img/brandlogo.png" alt="brand logo"/>
                  <div class="text-uppercase align-self-center" style="font-size:12px">
                    <span>Първи свободен час</span>
                    <span class="font-weight-bold d-block">Днес 21:00-22:00</span>
                  </div>
                </div>
              </b-col>

              <!-- SEARCH -->
              <div class="col-5 order-3 order-sm-2 col-sm p-0 ml-sm-2 mr-sm-2 d-flex">
                
                  <div class="d-none d-md-block h-100 position-relative ml-auto mr-2">
                    <b-form-input class="h-100 ml-auto border" type="search" style="max-width:200px" placeholder="Потърси продукт..." />
                    <b-button class="border-0 bg-transparent search_button"><i  class="fas fa-search text-dark"></i></b-button>
                  </div>
                
                  <b-button v-b-modal.searchModal class="d-block d-md-none border-0 bg-transparent mr-auto mr-sm-0 ml-sm-auto h-100">
                    <i  class="fas fa-search text-dark "></i>
                  </b-button>
                  <b-modal id="searchModal" hide-footer hide-header body-class="p-0">
                    <b-form-input class="form-control mr-sm-2 h-100" type="search" placeholder="Потърси продукт..." />
                    <b-button class="border-0 bg-transparent search_button"><i  class="fas fa-search text-dark"></i></b-button>
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
  color:white;
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
@media screen and (max-width: 575px){
    
}
</style>
<script>
import {mapGetters} from 'vuex';
import LoginPanel from "~/components/navbar/loginPanel"
export default {
  components:{
    LoginPanel
  },
  computed:{
    ...mapGetters(['getTotalPrice', 'getCart']),
  },
  data(){
    return {
        visible: false,
        language: 'BG',
        languages: [
          { value: 'BG', text: 'БГ' },
          { value: 'RU', text: 'РУ' },
          { value: 'EN', text: 'EN' },
        ]
      }
  },
  methods:{
    async onLogout(){
      await this.$auth.logout();
    },
    onCartClick(){
      if(this.$store.state.cart != 0){
        this.$router.push('/shop/cart');
      }
    }
  }
}
</script>