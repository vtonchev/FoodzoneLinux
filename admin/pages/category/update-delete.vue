<template>
    <div class="container">
        <b-row v-for='category in categories' :key='category._id'>
            <b-col class="category_outer_box">
                <span class="category_title_box">{{category.title}}</span>
                <img :src="imageUrl" v-if="imageUrl">
                <img :src="category.photo.url" v-else alt="">
                <input class="image_input" type="file" @change="onFileSelected">
                <n-link :to="{ name: 'category-update-id', params: {id: category._id} }"><b-button  size="sm" variant="outline-primary">Промени</b-button></n-link>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    async asyncData({$axios}){
        const catResponse = await $axios.$get('/api/categories/'); 
        return{
            categories: catResponse.categories,   
        }
        
    },
    data(){
        return{
            imageUrl:'',
            selectedFile:null,
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.selectedFile)
        }, 
    }
}
</script>
<style>
    .category_outer_box{
        display: inline-flex;
        height: 52px;
        margin-top: 1rem;
        border: solid 0.5px;
        border-radius: 10px;
    }
    .category_title_box{
        margin:auto;
        flex:auto;
        font-size:large;
        font-weight: 600;
    }
    img{
        width: 50px;
        height:50px
    }
    .image_input{
        height: fit-content;
        margin: auto;
        margin-right: 10px; 
    }
    .button{
        margin:0 !important;
    }
</style>