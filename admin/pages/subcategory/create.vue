<template>
    <div id="page">
        <h1>Добавете нова подкатегория</h1>
            <div class="d-flex justify-content-between">
                <form id="form" class="align-self-start">
                    <!-- Category selection -->
                    <label for="category">Изберете категория</label>
                    <select name="categoryID" id="category" v-model="categoryID" @change="onCategorySelected">
                        <option v-for="category in categories" :value="category._id" :key="category._id">{{category.title}}</option>
                    </select>
                    <!-- title -->
                    <label for="type">Име</label>
                    <input class="width_100" id="title" type="text" v-model="title">
                    <!-- Photo -->
                    <label for="photo">Изберете снимка</label>
                    <input id="photo" type="file"  @change="onFileSelected" />
                    <button class="btn btn-success" @click="onAddSubcategory"> Добави </button>
                </form>
                <div class="show_subcategories">
                    <p style="font-size:1.5rem;color: #6c757d; margin-left:1.25rem; ">Подкатегории в избраната категория:</p>
                    <b-list-group>
                        <b-list-group-item v-for="subcategory in subcategories" :key="subcategory._id">
                            {{subcategory.title}}
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
    </div>
</template>
<style>
    .show_subcategories{
        display: inline-grid;
        width:40%;
        font-size: 2rem;
    }
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
            title:"",
            categoryID: "", 
            selectedFile: null,
            subcategories:[]
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        async onCategorySelected({$axios}){
            const response = await this.$axios.$get('/api/subcategories/categories/'+this.categoryID)
            this.subcategories = response.subcategories
        },
        async onAddSubcategory(){
            const data = new FormData();
            data.append("categoryID", this.categoryID);
            data.append("title", this.title);    
            if(this.selectedFile){
                data.append("photo", this.selectedFile); 
            }
            await this.$axios.$post("/api/subcategories", data)
        }
    }
}
</script>