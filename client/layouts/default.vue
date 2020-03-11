<template>
  <div >
    <div v-if="loaded == false"> 
      <Loading/>
    </div>
    <div v-else>
      <Navbar />
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import Loading from '~/components/loading.vue'
import Navbar from "~/components/navbar/navbar"
import Footer from "~/components/footer/footer"
export default {

  components:{
      Navbar,
      Footer,
      Loading
  },
  created(){
    
    this.loaded = false;
    console.log(this.loaded)
  },
  mounted(){
    this.loaded = true;
    console.log(this.loaded)
  },
  data(){
    return{
      loaded:false
    }
  }
}
</script>

<style>

</style>
