<template>
    
    <div>
        <h1>Редактирайте подкатегорията</h1>
        <div class="w-50 m-auto">
            <div id="image_preview" style="border:solid 1px; border-style:dashed; width:50%;">
                <img :src="newImageUrl" style='width:100%; height:auto'/>
            </div>
            <form id="form">
                <div style="display:grid">
                <!-- Title -->
                <label for="title">Име</label>
                <input class="width_100" id="title" type="text"  v-model="title">
                <!-- Photo -->
                <label for="photo">Изберете снимка</label>
                <input id="photo" type="file"  @change="onFileSelected" />
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
        this.newImageUrl = this.subcategory[0].photo.url;
        this.title = this.subcategory[0].title;
    },
    data(){
        return{
            newImageUrl: '',
            title: "",
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.newImageUrl = URL.createObjectURL(this.selectedFile);
        },

        async onUpdateCategory(){
            let data = new FormData();
            data.append("title", this.title)
            if(this.selectedFile){
                data.append("photo", this.selectedFile)   
            }       
            let result = await this.$axios.$patch("/api/subcategories/" + this.subcategory._id, data);
            await this.$router.go();
        }
    }
}
</script>
