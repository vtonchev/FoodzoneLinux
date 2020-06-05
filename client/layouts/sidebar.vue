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
  layout: 'default',
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

