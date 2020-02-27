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
                <nuxt-link to="/cart" class="col-6 order-2 order-sm-3 col-sm-auto p-0" id="cart">
                <div class="shopping-cart-div-out mx-auto">
                    <span class="fas fa-shopping-cart fa-1x"></span>
                    <span id="price">{{getTotalPrice}} лв</span>           
                </div>
                </nuxt-link>

            </div>

        </div>
        </div>
    </div>
</template>

<style scoped>
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
.search-bar,.form-control{
  width: inherit;
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
  display: inline-flex;
  background-color: #E52121;
  width:120px;
  border-radius: 4px;
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
</style>
<script>
import {mapGetters} from 'vuex';
export default {
  computed:{
    ...mapGetters(['getTotalPrice'])
  }
}
</script>