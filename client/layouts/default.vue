<template>
  <div>
    <Navbar />
      <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/navbar/navbar"
import Footer from "~/components/footer/footer"
export default {
    components:{
        Navbar,
        Footer
    }
}
</script>

<style>

</style>
