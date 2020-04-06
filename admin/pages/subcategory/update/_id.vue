<template>
    <div>
        <h1>Редактирайте подкатегорията</h1>
        <div class="w-50 m-auto">
            <form id="form">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">                
                <button class="btn btn-success" @click="onUpdateCategory">Редактирай</button>
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
        this.title = this.subcategory[0].title;
    },
    data(){
        return{
            title: "",
        }
    },
    methods:{
        async onUpdateCategory(){
            let data = new FormData();
            data.append("title", this.title)     
            let result = await this.$axios.$patch("/api/subcategories/" + this.subcategory._id, data);
            await this.$router.go();
        }
    }
}
</script>
