<template>
  <main>
    <!-- Carousel -->
    <div class="inner-box">
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
    <b-row class="inner-box justify-content-between" >
      <b-col  class="subnavigation_img_wrapper p-0">
        <span class="badge_text">Най Популярни</span>
        <img src="img/most-popular.jpg" class='subnavigation_img' alt="">
      </b-col>
      <b-col  class="subnavigation_img_wrapper p-0">
        <div>fak</div>
      </b-col>
      <b-col  class="subnavigation_img_wrapper p-0">
        <div>fak</div>
      </b-col>
    </b-row>
  </main>
</template>

<script>

export default {
  
}
</script>

<style>
  .inner-box{
    margin:1rem auto;
    width:1000px;
  }
  .subnavigation_img{
    width: 100%;
    height: auto;
  }
  .subnavigation_img_wrapper{
    max-width: 32%;
  }
  .badge_text{
    position:absolute;
    top:10px;
    left:10px;
    color: white;
    font-size: 20px;
    width: 7rem;
  }
@media screen and (max-width: 1199px){
    .inner-box{
      width:780px;
    }
  }

@media screen and (max-width: 991px) {
    .inner-box{
      width:auto;
      margin:1rem 3rem;
    }
  }
@media screen and (max-width: 767px) {
  .inner-box{
    width:auto;
    margin:1rem 10px;
  }
}
</style>
