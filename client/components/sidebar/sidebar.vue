<template>
    <div class="sidebar mb-3">
        <nuxt-link class=" font-weight-bold pl-md-3" :to="{name: 'shop-category-id', params: { id: $route.params.id} }" >{{$store.state.categories[$route.params.id]}}</nuxt-link>
        <hr class="ml-md-3">
        <nuxt-link 
        class="d-block pl-md-3 py-1" 
        v-for="subcategory in $store.state.subcategories[$route.params.id]" 
        :key="subcategory.id" 
        :to="{name: 'shop-category-id-subcategory', params: { subcategory: subcategory.id } }"
        exact-active-class="active_sidebar_link"
        >
        <span>{{subcategory.title}}</span>
        </nuxt-link> 
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  
}
</script>
