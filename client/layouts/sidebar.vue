<template>
    <div >
        <div v-if="loaded == false"> 
            <Loading/>
        </div>
        <div v-else>
            <Navbar />
            <div class="container-fluid container_fluid_width p-0 position-relative">
                <b-row class="m-0">
                    <b-col cols='12' lg='auto' class="p-0 sidebar_column">
                        <Sidebar/>
                    </b-col>
                    <nuxt/>        
                </b-row>
            </div>
            <Footer/>
        </div>
    </div>
    
</template>
<script>
import Loading from '~/components/loading.vue'
import Navbar from "~/components/navbar/navbar"
import Sidebar from "~/components/sidebar/sidebar"
import Footer from "~/components/footer/footer"
export default {

  components:{
      Navbar,
      Footer,
      Loading,
      Sidebar
  },
  created(){
    this.loaded = false;
  },
  mounted(){
    this.loaded = true;
  },
  data(){
    return{
      loaded:null
    }
  }
}
</script>

<style>
.container_fluid_width{
        width: 1200px
    }
@media only screen and (max-width: 1199px) {
    .container_fluid_width{
        width:980px;
        }
    .sidebar_column{
        width: 200px;
    }
}
@media only screen and (max-width: 991px) {
    .container_fluid_width{
            width:auto;
            margin:0 3rem;
        }  
}
@media only screen and (max-width: 767px) {
    .container_fluid_width{
        margin:0 10px;
    }
  }
@media only screen and (max-width: 575px) {
    .container_fluid_width{
            width:auto;
            height: fit-content;
        }
  }
</style>