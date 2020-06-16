<template>
    <div>
        <b-row class="mt-3 table_wrapper">
            <table class="w-100" style="border:solid 3px black; font-size:14px">
                <thead >
                    <tr class="font-weight-bold text-center">
                        <td class="border">Продукт</td>
                        <td class="border">Име</td>
                        <td class="border ">Код на продукта</td>
                        <td class="border">Количество</td>
                        <td class="border">Цена</td>
                        <td class="border">Общо</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in order.products" :key="product._id" class="border text-center">
                        <td class="border">
                            <img height="60" width="60" :src="product.product.photo.url" alt="">
                        </td>
                        <td class="border">
                            {{product.product.title}}
                        </td>
                        <td class="">
                            {{product.product.productID}}
                        </td>
                        <td class="border">
                            <span class="text-warning" style="font-size:18px;">{{product.quantity}} </span><span style="vertical-align: text-bottom;">x {{product.product.weight.$numberDecimal}}{{product.product.unit}} = {{product.quantity*product.product.weight.$numberDecimal}}{{product.product.unit}}</span>
                        </td>
                        <td class="border">
                            <span>{{product.product.price.$numberDecimal}} лв</span>
                        </td>
                        <td class="border">
                            <span>{{(product.quantity*product.product.price.$numberDecimal).toFixed(2)}} лв</span>  
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <th class=""></th>
                        <td>Общо:</td>
                        <td class="text-danger font-weight-bold" style="font-size:22px">
                            <span>{{totalPrice(order.products)}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-row>
    </div>
</template>
<script>
export default {
    props:['order'],
    methods:{
        totalPrice(products){
            let total = 0;
            products.forEach(product => {
               total += product.quantity*product.product.price.$numberDecimal
            });
            return total.toFixed(2) 
        },
    }
}
</script>
<style>
.table_wrapper{
    overflow-x:auto;
}
</style>