<template>
  <div >
    <div v-if="loaded==false"> 
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
import Loading from '~/components/loading'
import Navbar from "~/components/navbar/navbar"
import Footer from "~/components/footer/footer"
export default {
  components:{
      Navbar,
      Footer,
      Loading
  },
  data(){
    return{
      loaded:false
    }
  },
  mounted(){
    this.loaded = true;
  },
  
}
</script>

