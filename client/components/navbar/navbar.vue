<template>
    <header>
        <Top />
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
    components:{
        Top,
        Middle,
        Bottom
    }
}
</script>

<style>
.modal-backdrop{
    z-index:1;
}
body {
  font-family: 'Roboto', sans-serif;
  color:white;
}
p, header{
  margin:0;
  padding:0;
  z-index: 2;
}
header{
  position:sticky;
  top:-52px;
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
  height:inherit;
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