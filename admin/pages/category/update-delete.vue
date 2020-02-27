<template>
    <div class="container">
        <b-row v-for='category in categories'  :key='category._id' cols='1'>
            <b-col class="category_outer_box">
                <b-button  v-b-toggle="category._id" variant="primary" @click="onSubcategories"  :value='category._id' >+</b-button>
                <span class="category_title_box">{{category.title}}</span>
                <img v-if='category.photo.url' :src="category.photo.url" alt="">
                <n-link :to="{ name: 'category-update-id', params: {id: category._id} }"><b-button  size="sm" variant="outline-primary">Промени</b-button></n-link>
            </b-col>
            <b-col>
                <b-collapse :id="category._id" class="mt-2">
                    <b-card v-for='subcategory in subcategories' :key='subcategory._id' >
                        <span class="card-text"> {{subcategory.title}} </span>
                        <n-link :to="{ name: 'subcategory-update-id', params: {id: subcategory._id} }" style="margin-right:10px"><b-button  size="sm" variant="outline-primary">Промени</b-button></n-link>
                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    async asyncData({$axios}){
        let catResponse = await $axios.$get('/api/categories/'); 
        let categories = catResponse.categories;
        return{
            categories:categories
        }
    }, 
    data(){
        return{
            subcategories : [],
            id : null,
        }
        
    },
    
    methods:{
        async onSubcategories(e){
            let id = e.target.value
            if(this.id) {           
                    this.$root.$emit('bv::toggle::collapse', this.id)    
            }
            
            await this.$axios.$get('api/subcategories/categories/' + id).then(response => {
                console.log(response)
                this.subcategories = response.subcategories
            }) 
            
            this.id = id
        }
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
    .card-body{
        padding:0 !important;
        display:flex;
    }
    .card-text{
        height: fit-content;
        margin-right: auto;
    }
</style>