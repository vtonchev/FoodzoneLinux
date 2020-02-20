<template>
    <div class="cardNav">
        <p class="text_top">{{top_text}}</p> 
        <p class="text_middle">{{middle_text}}</p> 
        <p class="text_bottom">{{bottom_text}}</p>
    </div>
</template>

<script>
export default {
    props:['top_text','bottom_text','middle_text','link_url'],
}
</script>
<style>    
    .cardNav{
        width:300px;;
        height:200px;
        margin: auto;
        margin-top: 10%;
        background-color: #17a2b8;
        border-radius: 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        color:white;
        font-size: 2rem; 
    }
    .cardNav:hover{
        transition: 0.5s;
        opacity: 0.5;
    }
    
    .text_top{
        margin-left: 8%;
    }
    .text_middle{
        text-align: center;
    }
    .text_bottom{
        float: right;
        margin-right:8%;
    } 
    a:hover{
        text-decoration: none;
    }
</style>
