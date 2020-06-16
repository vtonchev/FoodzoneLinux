<template>
  <div>
    <!-- Carousel -->
    <div class="inner_box_carousel mb-5">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000;"
        :interval="5000"
        controls
        fade 
      >
          <div class="carousel-item active">
            <img src="img/carousel2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="img/carousel1.jpg" class="d-block w-100"  alt="...">
          </div>
          <div class="carousel-item">
            <img src="img/carousel3.png" class="d-block w-100"  alt="...">
          </div>
      </b-carousel>
      <!-- <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000;"
        :interval="5000"
        controls
        fade 
      > -->
        <!-- <b-carousel-slide>
          <template v-slot:img>
              <img
                class="w-100 h-100"
                style=""
                src=
                alt="image slot"
              >
            </template>
        </b-carousel-slide>  -->
      <!-- </b-carousel> -->
    </div>
    <!-- PROMO, MOST BOUGHT, CHOSEN -->
    <b-row class="outer-wrapper justify-content-between mb-5" >
      <b-col cols='12' sm='6' lg='4' class="p-0" >
        <div @click="$router.push('/shop/sale')" class='subnavigation_img ' style=" background-position: left center;"> 
          <div class="badge_text" style="background: #E52121;"><span>На промоция</span></div>
          <img src="/client/img/sale1.jpg" alt="">
        </div>
      </b-col>
      <b-col cols='12' sm='6' lg='4' class="p-0 mt-3 mt-sm-0 ">
        <div @click="$router.push('/shop/most-bought')" class='subnavigation_img ml-auto mx-lg-auto'> 
          <div class="badge_text" style="background: #64C042;"><span>Най Купувани</span></div>
          <img src="/client/img/most-popular.jpg" alt="">
        </div>
      </b-col>
      <b-col cols='12' sm='6' lg='4' class="p-0 mx-auto mt-3 mt-lg-0">
        <div @click="$router.push('/shop/suggested')" class='subnavigation_img mx-auto mr-lg-0 ml-lg-auto'> 
          <div class="badge_text" style="background: #FBDE44;"><span>Избрани Продукти</span></div>
          <img style="-webkit-transform: scaleX(-1); transform: scaleX(-1);" src="/client/img/suggested1.jpg" alt="">
        </div>
      </b-col>
    </b-row>
    <!-- Препоръчани style='margin-left: -22px;'-->
    <div class="outer-wrapper mb-5">
      <h4 class="text-center font-weight-bold">ТОП ПРОДУКТИ</h4>
      <carousel 
      class="position-stabilisation"
      :minSwipeDistance='50'
      :paginationEnabled='true'
      :paginationPadding='5'
      :speed='500'
      :paginationActiveColor="'#61BD42'"
      :perPageCustom="[[575, 2], [767, 3], [991, 5]]"
      :scrollPerPage="true" 
      easing="linear" 
      >
        <slide
        style="padding-top: 15px; padding-bottom: 15px; padding-right:1px;"
        v-for="product in products" :key="product._id" 
        >
          <Card 
          :product='product'
          :cardClass="'w-md-max-80'" 
          >
          </Card>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import Card from "~/components/product/Card"
export default {
  components:{
        Card,  
    },
  async asyncData({$axios}){
    const response = await $axios.$get('/api/products/suggested/20');
    return {
      products: response.products
    }
  },
}
</script>
<style scoped>
.carousel-inner{

}
</style>

