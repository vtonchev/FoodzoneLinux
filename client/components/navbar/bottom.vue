<template>
    <div id = "outer_box_bottom">
        <div id = "inner_box_bottom" class="rounded-bottom">
              <b-navbar toggleable="lg" type='none' class="pb-lg-0">
                <b-navbar-toggle target="nav-text-collapse" class="border-0 pl-0 cat_collapse_btn d-flex d-lg-none">
                    <div id="nav-icon2" :class="{ 'open' : isOpen }">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <span class="text-white font-weight-bold ml-3 align-self-center" style="font-size:14px">Категории</span>    
                </b-navbar-toggle>
                <b-collapse @show="isOpen = true" @hide='isOpen = false' id="nav-text-collapse" is-nav>
                    <b-navbar-nav fill class="w-100 text-white" >
                        <b-nav-item :to="{name: 'shop-category-id', params: { id:'5e540324b4a1883840b9a7a4'} }" link-classes='cat_item'>Месо</b-nav-item>
                        <b-nav-item :to="{name: 'shop-category-id', params: { id:'5e53ed71b4a1883840b9a7a0'} }" link-classes='cat_item'>Млечни продукти</b-nav-item>
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
            categories:[],
            isOpen:false
        }
    },
    computed:{
        ...mapGetters(['getCategories']) 
    }
}
</script>
<style scoped>
#nav-icon2{
  display: inline-block;
  width: 32px;
  height: 21px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}
#nav-icon2 span {
  display: block;
  position: absolute;
  height: 4px;
  width: 52%;
  background: white;
  opacity: 1;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon2 span:nth-child(even) {
  left: 50%;
  border-radius: 0 9px 9px 0;
}

#nav-icon2 span:nth-child(odd) {
  left:0px;
  border-radius: 9px 0 0 9px;
}

#nav-icon2 span:nth-child(1), #nav-icon2 span:nth-child(2) {
  top: 0px;
}

#nav-icon2 span:nth-child(3), #nav-icon2 span:nth-child(4) {
  top: 8px;
}

#nav-icon2 span:nth-child(5), #nav-icon2 span:nth-child(6) {
  top: 16px;
}

#nav-icon2.open span:nth-child(1),#nav-icon2.open span:nth-child(6) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon2.open span:nth-child(2),#nav-icon2.open span:nth-child(5) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
#nav-icon2.open{
    height: 21px;
}
#nav-icon2.open span:nth-child(1) {
  top: 4px;
}

#nav-icon2.open span:nth-child(2) {
  left: calc(50% - 4px);
  top: 4px;
}

#nav-icon2.open span:nth-child(3) {
  left: -50%;
  opacity: 0;
}

#nav-icon2.open span:nth-child(4) {
  left: 100%;
  opacity: 0;
}

/* #nav-icon2.open span:nth-child(5) {
  
} */

#nav-icon2.open span:nth-child(6) {
  left: calc(50% - 4px);
}
</style>