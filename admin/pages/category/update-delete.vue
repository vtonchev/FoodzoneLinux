<template>
    <div class="container">
        <b-row v-for='category in categories'  :key='category._id' cols='1'>
            <b-col class="category_outer_box">
                <b-button  
                v-b-toggle="category._id" 
                variant="primary" 
                @click="onSubcategories"  
                :value='category._id' >+</b-button>

                <!-- Category name -->
                <span class="category_title_box ml-5">{{category.title}}</span>

                <!-- Delete category button -->
                <b-button
                class="mr-5"
                size='sm'
                variant='outline-danger'
                @click="deleteCategory(category._id)"
                >
                    Изтрий    
                </b-button>
                
                <!-- Edit category button -->
                <b-button 
                class="p-0"
                size="sm" 
                variant="outline-primary"
                >
                    <nuxt-link class="d-block text-decoration-none" :to="{ name: 'category-update-id', params: {id: category._id} }"> Промени </nuxt-link>
                </b-button>
            
            </b-col>
            <b-col>
                <b-collapse :id="category._id" class="mt-2">
                    <b-card v-for='subcategory in subcategories' :key='subcategory._id'>

                        <!-- Subcategory name -->
                        <span class="card-text"> {{subcategory.title}} </span>

                        <!-- Delete subcategory button -->
                        <b-button 
                        class="mr-5"
                        size="sm"
                        variant="outline-danger"
                        @click='deleteSubcategory(subcategory._id)' 
                        style="margin-right:10px"
                        >
                            Изтрий
                        </b-button>
                        <!-- Edit subcategory button -->
                        <b-button 
                        class="mr-5 p-0"
                        size="sm"
                        variant="outline-primary"
                        >
                        <n-link 
                        class="d-block text-decoration-none" 
                        :to="{ name: 'subcategory-update-id', params: {id: subcategory._id} }" 
                        >
                            Промени
                        </n-link>
                            
                        </b-button>
                    </b-card>
                </b-collapse>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    async asyncData({$axios}){
        const response = await $axios.$get('/api/categories/'); 
        return{
            categories: response.categories
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
            this.$axios.$get('api/subcategories/categories/' + id).then(response => {
                this.subcategories = response.subcategories
            }) 
            this.id = id
        },
        async deleteCategory(id){
            const confirmation = await this.confirm('Категорията');
            if(confirmation){
                const response = await this.$axios.$delete('api/categories/' + id);
                alert(response.message);
                const refresh = await this.$axios.$get('/api/categories/'); 
                this.categories = refresh.categories
            }
        },
        async deleteSubcategory(id){
            const confirmation = await this.confirm('Подкатегорията');
            if(confirmation){
                const response = await this.$axios.$delete('api/subcategories/' + id);
                alert(response.message);
                const refresh = await this.$axios.$get('api/subcategories/categories/' + id);
                this.subcategories = refresh.subcategories
            }
        },
        confirm(object) {
            return new Promise(resolve => {
                    this.$bvModal.msgBoxConfirm('Сигурни ли сте че искате да изтриете ' + object + ' ?', {
                    title: 'Потвърждение',
                    size: 'sm',
                    buttonSize: 'sm',
                    cancelVariant: 'outline-success',
                    okVariant: 'outline-danger',
                    okTitle: 'Да',
                    cancelTitle: 'Не',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then(value => {
                    resolve (value)
                })
                .catch(err => {
                    return new Error();
                })
            });
            
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