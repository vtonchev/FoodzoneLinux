<template>
    <header>
        <!-- <Top /> -->
        <Middle />
        <Bottom />
    </header>
</template>

<style>

</style>

<script>
import Top from "~/components/navbar/top"
import Middle from "~/components/navbar/middle"
import Bottom from "~/components/navbar/bottom"
export default {
    components: {
        Top,
        Middle,
        Bottom
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap&subset=cyrillic');
body {
  font-family: 'Roboto';
}
body a:hover{
  text-decoration: none;
}
p, header{
  margin:0;
  padding:0;
  z-index: 2;
}
header{
  position:sticky;
  -webkit-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  top:0;
  width:100%
}
/* creates a grey shadow on click NOT DEFAULT BLUE */
.form-control:focus {
  border:initial;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#inner_box_top, #inner_box_middle, #inner_box_bottom{
  width:1200px;
  margin:0 auto;
  height:3rem;
}
#top_menu,#bottom_menu{
  padding:0;
  height:inherit;
  margin:auto;
}



@media screen and (max-width: 1199px){
    #inner_box_top,#inner_box_middle,#inner_box_bottom{
      width:980px;
    }
  }

@media screen and (max-width: 991px) {
    #inner_box_top,#inner_box_middle,#inner_box_bottom{
      width:auto;
      margin:0 3rem;
    }
    header{
      position:static;
    }
    #outer_box_top{
      height:auto;
    }
  }
@media screen and (max-width: 767px) {
  #inner_box_top,#inner_box_middle,#inner_box_bottom{
    width:auto;
    margin:0 10px;
  }
}

</style>