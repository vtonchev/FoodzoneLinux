<template>
    <div id="page">
        <h1>Добавете нова категория</h1>
        <div class="d-flex justify-content-between">
            <form id="form" class="align-self-start">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">
                <!-- Photo -->
                <label for="photo">Изберете снимка</label>
                <input id="photo" type="file"  @change="onFileSelected" />
                <button class="btn btn-success" @click="onAddCategory" >Добави</button>
                </div>
            </form>
            <div class="show_categories">
                <p style="font-size:1.5rem;color: #6c757d; margin-left:1.25rem; ">Категории</p>                          
                <b-list-group v-for="category in categories" :key="category._id">
                    <b-list-group-item>{{category.title}}</b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</template>
<style>
    .show_categories{
        display: inline-grid;
        width:40%;
        font-size: 2rem;
    }
    .category_title{
        border:solid 1px;
    }
    
</style>
<script>
export default {
    async asyncData({$axios}){
        const catResponse = await $axios.$get('/api/categories');
        return{
            categories: catResponse.categories
        }
    },
    data(){
        return{
            title: "",
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },

        async onAddCategory(){
            let data = new FormData();
            data.append("title", this.title)         
            data.append("photo", this.selectedFile)    
            let result = await this.$axios.$post("/api/categories", data);
            this.$router.push("/");
        }
    }
}
</script>