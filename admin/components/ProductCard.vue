<template >
    <div>
        <b-card
            :title="product.title"
            :img-src="product.photo.url"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
            {{product.description}}
            </b-card-text>
            <n-link :to="{ name: 'product-update-id', params: {id: product._id} }" ><b-button  variant="primary">Промени</b-button></n-link>
            <b-button  variant="danger" @click="onDelete">Изтрий</b-button>
        </b-card>
    </div>
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

<style>

</style>

