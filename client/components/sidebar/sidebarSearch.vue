<template>
    <div class="sidebar mb-3">
        <a class=" font-weight-bold pl-md-3" style="font-size:16px" >Препоръчани продукти</a>
        <b-row
        class='m-0' 
        v-for="product in products" 
        :key="product.id" 
        exact-active-class="active"
        >
        <b-col class="p-0 border border-bottom-0">
          <SmallCard
          :product='product'
          />
        </b-col>
        </b-row> 
    </div>
</template>
<script>
import SmallCard from "~/components/product/SmallCard";
export default {
  components:{
      SmallCard 
    },
  async created(){
    const response = await this.$axios.$get('api/products/suggested/true');
    return this.products=response.products
    
  },
  data(){
    return{
      products:[]
    }
  }
}
</script>
<style scoped>
  .active{
    background-color: #64C042;
    color: white !important;
    font-weight: 700;
  }
  h6{
    color:black;
  }
  
  .sidebar a{
    color:#64C042;
    transition:0s;
  }
  .card a:hover{
    font-weight:900;
    text-decoration:none
  }
  .sidebar{
    width:200px;
  }
  @media only screen and (max-width: 991px) {
    .sidebar{
      width: 100%;
      margin-top:60px;
    }  
}
</style>