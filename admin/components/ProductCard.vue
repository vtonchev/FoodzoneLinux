<template >
    <b-col>
        <b-card
            :img-src="product.photo.url"
            img-top
            tag="article"
            style="max-width: 20rem; "
            class="mb-2"
        >   <b-card-sub-title class="mb-3">
                {{product.category.title}}, {{product.subcategory.title}}
            </b-card-sub-title>
            <b-card-title>{{product.title}}</b-card-title>
            <n-link :to="{ name: 'product-update-id', params: {id: product._id} }" ><b-button  variant="primary">Промени</b-button></n-link>
            <b-button  variant="outline-danger" @click="onDelete"><i class="far fa-trash-alt"></i></b-button>
        </b-card>
    </b-col>
</template>

<script>
export default {
    props:['product'],
    methods:{
        async onDelete({ $axios, $router}){
            
            await this.$axios.$delete('api/products/'+ this.product._id);
            this.$router.go();
        }
    }
}
</script>

<style scoped>
    .card-title{
        font-size: 1rem;
        height:40px;
    }
    img{
        width:100%;
        height:auto;
        max-height:250px;
    }
</style>

