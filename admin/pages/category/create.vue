<template>
    <div id="page">
        <h1>Добавете нова категория</h1>
        <div class="d-flex justify-content-between">
            <form id="form" @submit="onAddCategory" class="align-self-start">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">
                <!-- Submit button -->
                <button type="submit" class="btn btn-success">Добави</button>
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
        }
    },
    methods:{
        async onAddCategory(){     
            const data = {
                title: this.title
            }  
            const response = await this.$axios.$post('/api/categories', data);
            alert(response.message);
        }
    }
}
</script>