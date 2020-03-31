<template>
  <span>
    <div class="sidebar mb-3">
      <div class="text-center font-weight-bold">
        <a v-if="routeName=='shop-suggested'" class="mx-md-auto">Препоръчани</a>
        <a v-if="routeName=='shop-sale'" class="mx-md-auto">Промоция</a>
        <a v-if="routeName=='shop-search'" class="mx-md-auto">Търсене</a>
        <a v-if="routeName=='shop-most-bought'" class="mx-md-auto">Най-купувани</a>
      </div>
    </div>
  </span>
</template>
<script>
export default {
  data(){
    return{
      routeName: this.$route.name,
    }
  }
}
</script>
