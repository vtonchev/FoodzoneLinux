<template>
    <div id = "outer_box_bottom">
        <div id = "inner_box_bottom" class="rounded-bottom">
            <!-- <nav class="navbar navbar-expand-sm bg-light" id = "bottom_menu">
                <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="fas fa-bars"></span>
                </button>

                <div class="collapse navbar-collapse navbar-bottom" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto ">
                    <li class="nav-item">
                        <nuxt-link to="/" class="nav-link pl-0 ">Начало</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/shop" class="nav-link">Магазин</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/sales" class="nav-link">Промоции</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/blog" class="nav-link">Блог</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/about" class="nav-link">За нас</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link to="/contacts" class="nav-link">Контакти</nuxt-link>
                    </li>
                    </ul>
                </div>
            </nav> -->
              <b-navbar toggleable="lg" type='none' class="pb-0">
                <b-navbar-toggle target="nav-text-collapse" class="mb-2 border-0 pl-0 cat_collapse_btn"><span class="fas fa-bars text-white"></span></b-navbar-toggle>
                <b-collapse id="nav-text-collapse" is-nav>
                    <b-navbar-nav fill class="w-100 text-white" >
                        <b-nav-item :to="{name: 'shop-category', params: { category:'5e540324b4a1883840b9a7a4'} }" link-classes='cat_item'>Месо</b-nav-item>
                        <b-nav-item :to="{name: 'shop-category', params: { category:'5e53ed71b4a1883840b9a7a0'} }" link-classes='cat_item'>Млечни продукти</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Плодове и зеленчуци</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Хляб и тестени</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Риба и морски дарове</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Салами и делиакатеси</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Сладки храни</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Солени храни</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Замрaзени храни</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Пакетирани храни</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Напитки</b-nav-item>
                        <b-nav-item link-classes='cat_item'>Алкохол</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            categories:[]
        }
    },
    computed:{
        ...mapGetters(['getCategories']) 
    }
}
</script>
<style scoped>

#outer_box_bottom{
  width:100%;
  background-color: white;
  margin-bottom:1rem;
}
#inner_box_bottom{
    background-color: #64c042;
}
.nav-link{
  font-weight: 500;
  font-size:14px;
  padding: 0;
  color:white;
}
.nav-toggler-icon{
  color:#272727;
}
.cat_item{ 
    line-height:1;
    height:100%;
    padding-bottom:0.5rem;
    width:fit-content;
}
.cat_item:hover{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: white;
    color: #64c042; 
}
.cat_collapse_btn:focus{
    outline:none
}
@media screen and (max-width: 1199px){
    .nav-link{
      font-size:12px;
    }
  }
</style>