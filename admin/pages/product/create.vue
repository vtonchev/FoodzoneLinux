<template>
    <div id="page">
        <h1>Добавете нов продукт</h1>
        <form id="form">
            <!-- Category ID selection -->
            <label for="category">Категория</label>
            <select name="categoryID" id="category" v-model="categoryID" >
                <option v-for="category in categories" :value="category._id" :key="category._id">{{category.type}}</option>
            </select>
            <!-- Title -->
            <label for="title">Име</label>
            <input class="width_100" id="title" type="text" name="title" v-model="title">
            <!-- Price -->
            <label for="price">Цена</label>
            <input id="price" type="number" name="price" v-model="price">
            <!-- Weight -->
            <label for="weight">Количество на единица продукт <em>(в грамове)</em></label>
            <input id="weight" type="number" name="weight" v-model="weight">
            <!-- StockQuantity -->
            <label for="stockQuantity">Наличност <em>(брой)</em></label>
            <input id="stockQuantity" type="number" name="stockQuantity" v-model="stockQuantity">
            <!-- Description -->
            <label for="description">Описание</label>
            <textarea id="description" name="description" cols="30" rows="10" v-model="description"></textarea>
            <!-- Photo -->
            <label for="photo">Изберете снимка</label>
            <i class="fal fa-plus"></i>
            <input id="photo" type="file"  @change="onFileSelected" />
            <button class="btn btn-success" @click="onAddProduct" >Добавете продукта</button>
        </form>
    </div>    
</template>

<style>
   
</style>

<script>
export default {
    async asyncData({ $axios }){
        try {
            const response = await $axios.$get("/api/categories")

            return {
                categories: response.categories
            }
            console.log(categories)
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            categoryID: null,
            title: "",
            price: 0,
            description: "",
            weight: 0,
            stockQuantity: 0,
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },

        async onAddProduct(){
            let data = new FormData();
            data.append("category", this.categoryID);
            data.append("title", this.title)    
            data.append("price", this.price)    
            data.append("weight", this.weight)    
            data.append("stockQuantity", this.stockQuantity)    
            data.append("description", this.description)    
            data.append("photo", this.selectedFile)    
            let result = await this.$axios.$post("/api/products", data);
            this.$router.push("/");
        }
    }
}
</script>