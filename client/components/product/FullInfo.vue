<template>
    <main>
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 card_col mt-5 p-0 ">  <!-- margin top===3rem   -->
        <div class="card mx-lg-0" >
            <img :src = product.photo.url class="card-img-top" alt="...">
            <nuxt-link to="/shop/:product">
                <div class="card-body">
                    <p>{{product.category.title}}</p>
                    <p class="card-title">{{product.title}}</p>
                    <p>{{product.price.$numberDecimal}} лв</p>
                </div>
            </nuxt-link>
        </div>
    </div>
    </main>
</template>
<style>

</style>
<script>
export default {
    
}
</script>
