<template>
    <div id="page">
        <h1>Добавете нова подкатегория</h1>
            <div class="d-flex justify-content-between">
                <form id="form" @submit='onAddSubcategory' class="align-self-start">
                    <!-- Category selection -->
                    <label for="category">Изберете категория</label>
                    <select id="category" v-model="categoryID" @change="onCategorySelected">
                        <option v-for="category in categories" :value="category._id" :key="category._id">{{category.title}}</option>
                    </select>
                    <!-- title -->
                    <label for="type">Име</label>
                    <input class="width_100" id="title" type="text" v-model="title">
                    <!-- Submit button -->
                    <button type="submit">Добави</button>
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
            
        } catch(err) {
            console.log(err)
        }
    },
    data(){
        return{
            title:"",
            categoryID: "", 
            subcategories:[]
        }
    },
    methods:{
        async onCategorySelected({$axios}){
            const response = await this.$axios.$get('/api/subcategories/categories/' + this.categoryID)
            this.subcategories = response.subcategories
        },
        async onAddSubcategory(){
            const data = {
                categoryID: this.categoryID,
                title: this.title
            }
            const response = await this.$axios.$post("/api/subcategories", data);
            alert(response.message);
        }
    }
}
</script>