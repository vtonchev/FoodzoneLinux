<template>
  <div id=''>
    <!-- Button -->
    <button @click="onAllSelected">Всички</button>
    <!-- Category ID selection -->
    <select id="category" v-model="categoryID" @change="onCategorySelected">
        <option v-for="category in categories" :value="category._id" :key="category._id" >{{category.title}}</option>
    </select>
    <!-- Subcategory ID selection -->
    <select id="subcategory" v-model="subcategoryID" @change="onSubcategorySelected">
        <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id">{{subcategory.title}}</option>
    </select>
    <!-- display all products card from here -->
    
      <ProductCard 
      v-for='product in products' 
      :key='product._id'
      :product='product'>
      </ProductCard>
    
  </div>
  
</template>

<script>
import ProductCard from '~/components/ProductCard'
export default {
  components: {
    ProductCard
  },
  async asyncData({ $axios }){
        try {
            const categories = $axios.$get("/api/categories");
            const products = $axios.$get("/api/products")
            const [catResponse,proResponse]= await Promise.all([categories,products])
            return {
                categories: catResponse.categories,
                products: proResponse.products
            }
        } catch(err) {
            console.log(err)
        }
  },

  data(){
    return{
        subcategories: [],
        products:[],        
        categoryID: null,
        subcategoryID: null,
    }
  },

  methods:{
    async onCategorySelected( {$axios} ){
      const subcategories = this.$axios.$get("/api/subcategories/categories/" + this.categoryID);
      const products = this.$axios.$get("/api/products/categories/" + this.categoryID)
      const [subcatResponse, productsResponse] = await Promise.all([
          subcategories,
          products
      ]);
      return {
          subcategories: subcatResponse.subcategories,
          products: productsResponse.products
      }
    },
    async onSubcategorySelected({ $axious }){
      const response = await this.$axios.$get('api/products/subcategory/' + this.subcategoryID);
      this.products = response.products
    },
    async onAllSelected ({$axios}) {
      const response = await this.$axios.$get("/api/products");
      this.products = response.products;
    }
  }
 
}
</script>

<style>

</style>
