<template>
  <main>
    <!-- Carousel -->
    <div class="inner_box_carousel mb-5">
      <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        :interval="5000"
        controls
        fade
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=10"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=22"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <!-- Categories -->
    <b-row class="outer-wrapper justify-content-between mb-5" >
      <b-col cols='12' sm='6' lg='4' class="p-0 " >
        <div @click="$router.push('/shop/sale')" class='subnavigation_img' style="background-image: url('/img/most-popular.jpg');"> 
          <div class="badge_text" style="background: #E52121;"><span>На промоция</span></div>
        </div>
      </b-col>
      <b-col cols='12' sm='6' lg='4' class="p-0 mt-3 mt-sm-0">
        <div @click="$router.push('/shop/most-bought')" class='subnavigation_img ml-auto mx-lg-auto' style="background-image: url('/img/most-popular.jpg');"> 
          <div class="badge_text" style="background: #64C042;"><span>Най Купувани</span></div>
        </div>
      </b-col>
      <b-col cols='12' sm='6' lg='4' class="p-0 mx-auto mt-3 mt-lg-0">
        <div @click="$router.push('/shop/suggested')" class='subnavigation_img mx-auto mr-lg-0 ml-lg-auto' style="background-image: url('/img/most-popular.jpg');"> 
          <div class="badge_text" style="background: #FBDE44;"><span>Избрани Продукти</span></div>
        </div>
      </b-col>
    </b-row>
    <!-- Препоръчани style='margin-left: -22px;'-->
    <div class="outer-wrapper mb-5">
      <h4 class="text-center font-weight-bold">ТОП ПРОДУКТИ</h4>
      <carousel 
      class="position-stabilisation"
      :paginationEnabled='true'
      :paginationPadding='5'
      :speed='800'
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
          v-if="product.sale == null || product.sale == 0"
          :product='product'
          :cardClass="'w-md-max-80'" 
          >
          </Card>

          <CardSale
          v-else
          :cardClass="'w-md-max-80'"
          :product='product'
          >
          </CardSale>
        </slide>
      </carousel>
    </div>
  </main>
</template>

<script>
import Card from "~/components/product/Card"
import CardSale from "~/components/product/CardSale"
export default {
  components:{
        Card, 
        CardSale, 
    },
  async asyncData({$axios}){
    const response = await $axios.$get('api/products/suggested/true');
    return {
      products: response.products.slice(0,20)
    }
  },
}
</script>

