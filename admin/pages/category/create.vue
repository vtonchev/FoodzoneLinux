<template>
    <div id="page">
        <h1>Добавете нова категория</h1>
        <form id="form">
            <!-- Title -->
            <label for="title">Име</label>
            <input class="width_100" id="title" type="text"  v-model="title">
            <!-- Photo -->
            <label for="photo">Изберете снимка</label>
            <i class="fal fa-plus"></i>
            <input id="photo" type="file"  @change="onFileSelected" />
            <button class="btn btn-success" @click="onAddCategory" >Добави</button>
        </form>
    </div>
</template>

<script>
export default {
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