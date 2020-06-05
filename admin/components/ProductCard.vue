<template >
    <b-col>
        <b-card
        :img-src="product.photo.url"
        img-top
        tag="article"
        style="max-width: 20rem; "
        class="mb-2"
        >   
            <i @click="onSuggestedChange" class="fas fa-heart fa-2x heart position-absolute" :class="{ red: product.suggested }"></i>
            <b-card-sub-title class="mb-3" v-if="product.category.title">
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
        async onDelete(){ 
            const confirmation = await this.confirm();
            if(confirmation){
                const response = await this.$axios.$delete('api/products/'+ this.product._id, { data: { key: this.product.photo.key } });
                alert(response.message);
            }
        },
        async onSuggestedChange(){
            const data = new FormData();
            if(this.product.suggested){
                data.append('suggested', false);
            } else {
                data.append('suggested', true);
            }
            await this.$axios.$patch('/api/products/'+ this.product._id, data);
        },
        confirm() {
            return new Promise(resolve => {
                    this.$bvModal.msgBoxConfirm('Сигурни ли сте че искате да изтриете продукта?', {
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
    .heart{
        top:0; 
        right:0;
        color: #666666;
    }
    .heart:hover{
        color: #E52121;
    }
    .red{
        color: #E52121;
    }
</style>

