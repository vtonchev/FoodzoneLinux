<template>
    <div id="page">
        <h1>Добавете нов продукт</h1>
        <form id="form">
            <!-- Category ID selection -->
            <label for="category">Категория</label>
            <select name="categoryID" id="category" v-model="categoryID" @change="onCategorySelected">
                <option v-for="category in categories" :value="category._id" :key="category._id" >{{category.title}}</option>
            </select>
            <!-- Subcategory ID selection -->
            <label for="subcategory">Подкатегория</label>
            <select name="subcategoryID" id="subcategory" v-model="subcategoryID">
                <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id">{{subcategory.title}}</option>
            </select>
            <!-- Title -->
            <label for="title">Име</label>
            <input class="width_100" id="title" type="text" name="title" v-model="title">
            <!-- Price -->
            <label for="price">Цена</label>
            <input id="price" type="number" step=".01" v-model="price">
            <!-- Weight -->
            <label for="weight">Количество на единица продукт <em>(в грамове)</em></label>
            <input id="weight" type="number" v-model="weight">
            <!-- StockQuantity -->
            <label for="stockQuantity">Наличност <em>(брой)</em></label>
            <input id="stockQuantity" type="number" v-model="stockQuantity">
            <!-- Description -->
            <label for="description">Описание</label>
            <textarea id="description" cols="30" rows="10" v-model="description"></textarea>
            <!-- Photo -->
            <label for="photo">Изберете снимка</label>
            <i class="fal fa-plus"></i>
            <input id="photo" type="file"  @change="onFileSelected" />
            <button class="btn btn-success" @click="onAddProduct" >Добави</button>
        </form>
            <div id="message">
                <p>{{message}}</p>
            </div>
    </div>    
</template>

<style>
   
</style>

<script>
export default {
    async asyncData({ $axios }){
        try {
            const response = await $axios.$get("/api/categories");
            return {
                categories: response.categories,
            }
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            message:"",
            subcategories: [],
            categoryID: null,
            subcategoryID: null,
            title: "",
            price: 0,
            description: "",
            weight: 0,
            stockQuantity: 0,
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
        async onAddProduct(){
            const data = new FormData();
            data.append("categoryID", this.categoryID);
            data.append("subcategoryID", this.subcategoryID);
            data.append("title", this.title);    
            data.append("price", this.price);    
            data.append("weight", this.weight);    
            data.append("stockQuantity", this.stockQuantity);    
            data.append("description", this.description);    
            data.append("photo", this.selectedFile);    
            const result = await this.$axios.$post("/api/products", data);
            this.message = result.message
        }
    }
}
</script>