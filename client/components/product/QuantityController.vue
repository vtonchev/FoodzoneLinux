<template>
    <span class="float-left d-flex">
        <button @click.prevent="decrementQty(id)" class="plus_minus_outer" style=" border: solid grey;display: flex;">
            <i class="fas fa-minus minus_inner"></i>
        </button>
        <div class="display-inline d-flex mx-2">
            <!-- {{getCart.find(product => product._id === this.id).quantity}} -->
            <span class="align-self-center font-weight-bold">{{qty}}</span> 
        </div>
        <button @click.prevent="incrementQty(id)" class="plus_minus_outer">
            <i class="fas fa-plus-circle plus_inner"></i>
        </button>
    </span> 
</template>
<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
export default {
    props:['id'],
    created() {
        const prod = this.getCart.find(product => product._id === this.id);
        if(prod) this.qty = prod.quantity
        else this.qty = 0;
        this.unsubscribe = this.$store.subscribe((mutation, state) => {
                const prod = this.getCart.find(product => product._id === this.id);
                if(prod) this.qty = prod.quantity
            }
        )
    },
    beforeDestroy() {
        this.unsubscribe();
    },
    methods:{
        ...mapActions(['incrementQty','decrementQty']),
    },
    data(){
        return{
            qty: 0,
        }
    },
    computed:{
        ...mapGetters(['getCart']), 
    },
}
</script>
