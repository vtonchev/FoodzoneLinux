<template>
    <div class="sidebar d-none d-md-block">
      <ul class="list-group list-group-flush">
        <h6 class="list-group-item" >Категории</h6>
        <a href="/" class="list-group-item" style="">Риба</a>
        <a href="/" class="list-group-item">Месо</a>
        <a href="/" class="list-group-item">Тестени изделия</a>
        <a href="/" class="list-group-item">Плодове</a>
        <a href="/" class="list-group-item">Зеленчуци</a>
      </ul>
    </div>
</template>

<style scoped>
.sidebar{
    position:absolute;
    right:0;
    top:3rem;
    width:17%;
  }
  h6{
    color:black;
  }
  .sidebar a{
    color:grey;
    transition:0s;
  }
  .sidebar a:hover,.card a:hover{
    color:#E52121;
    font-weight:900;
    text-decoration:none
  }
</style>