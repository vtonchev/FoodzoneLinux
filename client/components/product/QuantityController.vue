<template>
    <span class="float-left d-flex">
        <button @click="$store.commit('decrementProductQty', product);" class="plus_minus_outer" style=" border: solid grey;">
            <i class="fas fa-minus minus_inner"></i>
        </button>
        <div class="display-inline d-flex mx-2"><span class="align-self-center font-weight-bold">{{qty}}</span></div>
        <button @click="$store.commit('incrementProductQty', product)" class="plus_minus_outer">
            <i class="fas fa-plus-circle plus_inner"></i>
        </button>
    </span> 
</template>
<script>
export default {
    props:['product','qty']
}
</script>
<style scoped src="~/assets/quantity_controller.css">

</style>