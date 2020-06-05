<template>
    
    <div>
        <h1>Редактирайте категорията</h1>
        <div class="w-50 m-auto">
            <form id="form" @submit="onUpdateCategory">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">
                <button class="btn btn-success" type='submit'>Редактирай</button>
                </div>
            </form>
        </div>
    </div>

</template>
<script>
export default {
    async asyncData( {$axios, params } ){
        const response = await $axios.$get(`/api/categories/${params.id}`);
        return{
            category: response.category
        }
    },
    created(){
        this.title = this.category.title;
    },
    data(){
        return{
            title: "",
        }
    },
    methods:{
        async onUpdateCategory(){     
            const data = {
                title : this.title
            }  
            const response = await this.$axios.$patch("/api/categories/" + this.category._id, data);
            alert(response.message);
        }
    }
}
</script>
