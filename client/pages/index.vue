<template>
  <main>
    <!-- Carousel -->
    <div id="inner-box-carousel">
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
    
  </main>
</template>

<script>

export default {
  
}
</script>

<style>
  #inner-box-carousel{
    margin:1rem auto;
    width:1000px;
  }
@media screen and (max-width: 1199px){
    #inner-box-carousel{
      width:780px;
    }
  }

@media screen and (max-width: 991px) {
    #inner-box-carousel{
      width:auto;
      margin:1rem 3rem;
    }
  }
@media screen and (max-width: 767px) {
  #inner-box-carousel{
    width:auto;
    margin:1rem 10px;
  }
}
</style>
