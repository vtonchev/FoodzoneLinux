<template>
  <div id='main_page'>
    <b-container>
      <b-row cols="1" cols-md="3">
        <b-col>
          <!-- Button -->
          <b-button @click="onAllSelected">Всички</b-button>
        </b-col>
        <b-col>
          <!-- Category ID selection -->
          <label for="category">Категория</label>
          <select id="category" v-model="categoryID" @change="onCategorySelected">
              <option disabled selected>Изберете категория</option>
              <option v-for="category in categories" :value="category._id" :key="category._id" >{{category.title}}</option>
          </select>
        </b-col>
        <b-col>
          <!-- Subcategory ID selection -->
          <label for="subcategory">Подкатегория</label>
          <select id="subcategory" v-model="subcategoryID" @change="onSubcategorySelected">
              <option disabled selected>Изберете подкатегория</option>
              <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id">{{subcategory.title}}</option>
          </select>
        </b-col>
      </b-row>
    </b-container>

    <!-- display all products card from here -->
    

    <b-container>
      <b-row cols="1" cols-sm="2" cols-md="3" cols-lg="4">
        <b-col>
          <ProductCard 
          v-for='product in products' 
          :key='product._id'
          :product='product'>
          </ProductCard>
        </b-col>
      </b-row>
    </b-container>

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
            const [catResponse, productsResponse]= await Promise.all([
              categories,
              products
            ]);
            console.log(catResponse);
            return {
                categories: catResponse.categories,
                products: productsResponse.products
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
        
      this.subcategories = subcatResponse.subcategories;
      this.products = productsResponse.products;
      
    },
    async onSubcategorySelected({ $axious }){
      const response = await this.$axios.$get('api/products/subcategories/' + this.subcategoryID);
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
  #main_page{
    margin-top:10px;
    width:90%;
    margin:auto;
  }
  #main-page select{
    width:200px;
  }
</style>
