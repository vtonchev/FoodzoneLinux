<template>
  <div id='main_page'>
    <b-container>
      <b-row cols="1" cols-md="5" class="mb-3">
        <b-col>
          <!-- Button -->
          <b-button @click="onAllSelected">Всички</b-button>
        </b-col>
        <b-col>
          <!-- ProductID -->
          <label for="productID">Продуктов код</label>
          <input type='number' v-model="productID" @keydown.enter="findProduct">
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
        
          <ProductCard 
          v-for='product in products' 
          :key='product._id'
          :product='product'>
          </ProductCard>
        
      </b-row>
    </b-container>
  <b-pagination
  v-model="currentPage"
  :total-rows="count"
  :per-page="perPage"
  align="center"
  last-class='text-success'
  >
    <template v-slot:page="{ page, active }" >
      <span class="text-success" style="backgroud-color:red;">
          <b v-if="active" class="text-white pagination_active">{{ page }}</b>
          <i v-else>{{ page }}</i>
      </span>
    </template>
  </b-pagination>
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
            const products = $axios.$get("/api/products?page=1")
            const [catResponse, productsResponse]= await Promise.all([
              categories,
              products
            ]);
            return {
                categories: catResponse.categories,
                products: productsResponse.products,
                count: productsResponse.count
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
        count:null,
        productID:null,
        //pagination nav 
        perPage: 26,
        currentPage: 1,
    }
  },
  watch: {
    async currentPage(currentPage) { 
      if(this.currentPage >= 1){
          this.$axios.$get("/api/products?page=" + this.currentPage)
              .then((response)=>{
                  this.products = response.products;
              }
          )
          window.scroll({
              top: 0,
              behavior: 'smooth'
          })    
      }
    },
  },
  methods:{
    async onCategorySelected(){
      this.currentPage = 1;
      this.productID = null;
      const subcategories = this.$axios.$get("/api/subcategories/categories/" + this.categoryID);
      const products = this.$axios.$get("/api/products/categories/" + this.categoryID)
      const [subcatResponse, productsResponse] = await Promise.all([
          subcategories,
          products
      ]);
        
      this.subcategories = subcatResponse.subcategories;
      this.products = productsResponse.products;
      this.count = productsResponse.count;
    },
    async onSubcategorySelected(){
      this.currentPage = 1;
      this.productID = null;
      const response = await this.$axios.$get('api/products/subcategories/' + this.subcategoryID);
      this.products = response.products
      this.count = response.count
    },
    async onAllSelected () {
      this.currentPage = 1;
      this.productID = null;
      this.categoryID = null;
      this.subcategoryID = null;
      const response = await this.$axios.$get("/api/products?page=1");
      this.products = response.products;
      this.count = response.count;
    },
    async findProduct () {
      this.currentPage = 1;
      this.count = 1;
      if(this.productID){
        const response = await this.$axios.$get('/api/products/productID/'+ this.productID);
        this.products = response.products;
      } else {
        this.onAllSelected()
      }
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
