<template>
    <div>
        <h1>Редактирайте подкатегорията</h1>
        <div class="w-50 m-auto">
            <form id="form" @submit="updateSubcategory">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">                
                <button class="btn btn-success" type="submit">Редактирай</button>
                </div>
            </form>
        </div>
    </div>

</template>
<script>
export default {
    async asyncData( {$axios, params } ){
        const response = await $axios.$get(`/api/subcategories/${params.id}`);
        return{
            subcategory: response.subcategory
        }
    },
    created(){
        this.title = this.subcategory.title;
    },
    data(){
        return{
            title: ''
        }
    },
    methods:{
        async updateSubcategory(){
            const data = { 
                title : this.title
            }     
            const response = await this.$axios.$patch("/api/subcategories/" + this.subcategory._id, data);
            alert(response.message);
        }
    }
}
</script>
