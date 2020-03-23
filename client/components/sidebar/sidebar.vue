<template>
    <div class="sidebar mb-3">
        <nuxt-link class=" font-weight-bold pl-md-3" :to="{name: 'shop-category-id', params: { id: $route.params.id} }" style="font-size:20px" >{{$store.state.categories[$route.params.id]}}</nuxt-link>
        <hr class="ml-md-3">
        <nuxt-link 
        class="d-block pl-md-3 pt-md-2 pb-md-2 rounded" 
        v-for="subcategory in $store.state.subcategories[$route.params.id]" 
        :key="subcategory.id" 
        :to="{name: 'shop-category-id-subcategory', params: { subcategory: subcategory.id } }"
        exact-active-class="active"
        >
        {{subcategory.title}}
        </nuxt-link> 
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  
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