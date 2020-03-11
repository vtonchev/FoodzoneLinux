<template>
    <div>
        <div v-if="loaded == false"> 
            <Loading/>
            </div>
        <div v-else>
            <Navbar />
            <div class="container-fluid container_fluid_width">
                <b-row>
                    <b-col cols="auto" class="p-0">
                        <Sidebar/>
                    </b-col>
                    <b-col cols="10" class="p-0 ml-3">
                        <b-col cols="12" class="p-0">
                            <select>
                                <option>
                                </option>
                            </select>
                        </b-col>
                    
                        <b-col cols="12" class='p-0'>
                            <nuxt />
                        </b-col>
                    </b-col>        
                </b-row>
            </div>
            <Footer />
        </div>
  </div>
</template>

<script>
import Loading from '~/components/loading.vue'
import Navbar from "~/components/navbar/navbar"
import Footer from "~/components/footer/footer"
import Sidebar from "~/components/sidebar/sidebar"
export default {
    components:{
        Navbar,
        Footer,
        Sidebar,
        Loading
    }
}
</script>

<style>
    .container_fluid_width{
        width: 1200px
    }
    @media screen and (max-width: 1199px){
        .container_fluid_width{
        width:980px;
        }
    }

    @media only screen and (max-width: 991px) {
        .container_fluid_width{
            width:auto;
            margin:0 3rem;
        }

    }
    @media only screen and (max-width: 767px){
        .container_fluid_width{
            margin:0 10px;
        }
    }
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 575px) {
        .container_fluid_width{
            width:auto;
            height: fit-content;
        }
    }
</style>