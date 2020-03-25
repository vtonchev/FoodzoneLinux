<template>
    
    <div>
        <h1>Редактирайте категорията</h1>
        <div class="w-50 m-auto">
            <form id="form">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">
                <!-- Photo -->    
                <button class="btn btn-success" @click="onUpdateCategory">Редактирай</button>
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
            selectedFile: null
        }
    },
    methods:{
        async onUpdateCategory(){
            let data = new FormData();
            data.append("title", this.title)       
            let result = await this.$axios.$patch("/api/categories/" + this.category._id, data);
            await this.$router.go();
        }
    }
}
</script>
