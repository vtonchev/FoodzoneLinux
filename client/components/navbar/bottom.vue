<template>
    <div id = "outer_box_bottom">
        <div id = "inner_box_bottom">
        <nav class="navbar navbar-expand-sm bg-light" id = "bottom_menu">
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
            </nav>

        </div>
    </div>
</template>

<style>
#outer_box_bottom{
  width:100%;
  padding:0.5rem 0;
  background-color: #f8f9fa;
}
.nav-link{
  font-weight: 600;
  color: #272727;
}
.nav-link:hover{
  color: #E52121;
}
.nav-toggler-icon{
  color:#272727;
}
</style>