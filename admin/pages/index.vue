<template>

  <b-container>
    <!-- Products -->
    <b-row>
      <b-col class="heading">Продукти</b-col>
    </b-row>
    <b-row>
      <hr>
    </b-row>
    <b-row>
      <b-col>
        <nuxt-link to="/product/update-delete">
          <CardNavigation
          :top_text="'Промени'"
          :middle_text="'.....'"
          :bottom_text="'Изтрий'"
          />
        </nuxt-link>
      </b-col>
      <b-col>
        <nuxt-link to='/product/create'>
          <CardNavigation
          :top_text="'.'"
          :middle_text="'Добави'"
          :bottom_text="'.'"
          />
        </nuxt-link>
      </b-col>
    </b-row>

  </b-container>

</template>

<script>
import  CardNavigation from "~/components/CardNavigation"
export default {
  components:{
    CardNavigation
  },
  
}
</script>
<style>
  .heading{
    font-size: 2rem;
    text-align: center;
  }
  hr{
    width:77%;
    height: 1px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 50%;
  }
  .margin_between{
    height:100px;
  }
  
 
</style>