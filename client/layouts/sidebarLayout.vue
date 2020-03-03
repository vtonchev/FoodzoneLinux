<template>
  <div>
    <Navbar />
    <div class="container-fluid container_fluid_width">
        <div class="row">
            <div class="col-2 p-0">
                
            </div>
            <div class="col-10 p-0">
                <select>
                    <option>

                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-2 p-0">
                <Sidebar/>
            </div>
            <div class="col-10 p-0">
                <nuxt />
            </div>
        </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/navbar/navbar"
import Footer from "~/components/footer/footer"
import Sidebar from "~/components/sidebar/sidebar"
export default {
    components:{
        Navbar,
        Footer,
        Sidebar
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