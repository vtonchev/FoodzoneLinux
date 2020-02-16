<template>
    <!-- TOP MENU -->
    <div id = "outer_box_top">
        <div id = "inner_box_top">
            <nav  class = "navbar navbar-expand-lg top-menu-out" id = "top_menu">
                <button class = "navbar-toggler  res-btn" type="button" data-toggle="collapse" data-target="#top-menu" aria-controls="top-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="fas fa-arrow-down"></span>
                </button>
                <div class="collapse navbar-collapse" id="top-menu">
                    <ul class="navbar-nav text-center text-sm-left mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <span class="text-muted mr-1">
                            Обратна връзка
                            </span>
                        </li>
                        <li class="nav-item mr-lg-3">
                            <a href="tel:+359 894727475">0894727475</a>
                        </li>
                        <li class = "nav-item mr-lg-3">
                            <span class="fas fa-map-marker-alt mr-1"></span>
                            <a href="">Улица Княз Борис</a>
                        </li>
                        <li class="nav-item ">
                            <span class="fas fa-mobile-alt mr-1"></span>
                            <a href="">Изтегли</a>
                        </li>
                    </ul>
                    <div class="text-center text-sm-left">
                    <LoginPanel />
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <!-- TOP MENU -->
</template>

<script>
import LoginPanel from "~/components/navbar/loginPanel"
export default {
    components:{
        LoginPanel
    }
}
</script>

<style>
    #top-menu a{
    color:white;
    }   
    #top-menu a:hover {
    text-decoration: none;
    color: #6C757D;
    }
    #outer_box_top{
    width:100%;
    padding: 1rem 0;
    background-color: #272727;
    font-weight: 800;
    font-size:13px;
    }
    .res-btn{
    width: 100%;
    color:white;
    }
    

</style>

