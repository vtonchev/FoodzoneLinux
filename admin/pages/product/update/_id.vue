<template>
    <div id="page">
        <h1>Промяна на продукта</h1>
        <form id="form">
            <img :src="product[0].photo.url" alt="">
            <!-- Category ID selection -->
            <label for="category">Категория</label>
            <select  id="category" v-model="categoryID"  @change="onCategorySelected">
                <option v-for="category in categories" :value="category._id" :key="category._id" >{{category.title}}</option>
            </select>
            <!-- Subcategory ID selection -->
            <label for="subcategory">Подкатегория</label>
            <select  id="subcategory"  v-model="subcategoryID">
                <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id" >{{subcategory.title}}</option>
            </select>
            <!-- Title -->
            <label for="title">Име</label>
            <input class="width_100" id="title" type="text" v-model="title"  :placeholder="product[0].title">
            <!-- Price -->
            <label for="price">Цена</label>
            <input id="price" type="number"  v-model="price" :placeholder="product[0].price.$numberDecimal"  step=".01">
            <!-- Weight -->
            <label for="weight">Количество на единица продукт <em>(в грамове)</em></label>
            <input id="weight" type="number" v-model="weight" :placeholder="product[0].weight.$numberDecimal">
            <!-- StockQuantity -->
            <label for="stockQuantity">Наличност <em>(брой)</em></label>
            <input id="stockQuantity" type="number" v-model="stockQuantity" :placeholder="product[0].stockQuantity">
            <!-- Description -->
            <label for="description">Описание</label>
            <textarea id="description" cols="30" rows="10" v-model="description" :placeholder="product[0].description"></textarea>
            <!-- Photo -->
            <label for="photo">Изберете снимка</label>
            <i class="fal fa-plus"></i>
            <input id="photo" type="file"  @change="onFileSelected" />
            <button class="btn btn-success" @click="onUpdateProduct" >Промени</button>
        </form>
    </div>
</template>
<style>
    img{
        width: 100%;
        height: auto;
    }
</style>
<script>
export default {
    async asyncData({ $axios, params }){
        try {
            const categories = $axios.$get("/api/categories");
            const product = $axios.$get(`/api/products/${params.id}`)
            const [catResponse, productResponse] = await Promise.all([
                categories,
                product
            ]);
            console.log(productResponse)
            return {
                categories: catResponse.categories,
                product: productResponse.product

            }
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            subcategories: [],
            categoryID: null,
            subcategoryID: null,
            title: null,
            price: null,
            description: null,
            weight: null,
            stockQuantity: null,
            selectedFile: null,        
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        // show all subcategories of the selected category
        async onCategorySelected( {$axios} ){
            const response = await this.$axios.$get("/api/subcategories/categories/" + this.categoryID)
            this.subcategories = response.subcategories
        },
        async onUpdateProduct({ params }){
            const data = new FormData();
            if(this.categoryID){
                data.append("categoryID", this.categoryID);
            }
            if(this.subcategoryId){
                data.append("subcategoryID", this.subcategoryID);
            }
            if(this.title){
                data.append("title", this.title);
            }    
            if(this.price){
                data.append("price", this.price); 
            }
            if(this.weight){
                data.append("weight", this.weight);   
            }   
            if(this.stockQuantity){
                data.append("stockQuantity", this.stockQuantity); 
            }
            if(this.description){
                data.append("description", this.description);   
            }   
            if(this.selectedFile){
                data.append("photo", this.selectedFile);
            }    
            const result = await this.$axios.$patch('/api/products/'+ this.product[0]._id, data);
        }
    }
}
</script>
