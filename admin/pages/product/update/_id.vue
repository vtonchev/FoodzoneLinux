<template>
    <div id="page">
        <h1>Промяна на продукта</h1>
        <div class="d-flex justify-content-between">
            <div class="w-30">
                <div id="form">
                    <!-- Category ID selection -->
                    <label for="category">Категория</label>
                    <select  id="category" v-model="categoryID"  @change="onCategorySelected">
                        <option v-for="category in categories" :value="category._id" :key="category._id">{{category.title}}</option>
                    </select>
                    <!-- Subcategory ID selection -->
                    <label for="subcategory">Подкатегория</label>
                    <select  id="subcategory"  v-model="subcategoryID">
                        <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id" >{{subcategory.title}}</option>
                    </select>
                    <!-- Title -->
                    <label for="title">Име</label>
                    <input class="width_100" id="title" type="text" v-model="title"  :placeholder="product.title">
                    <!-- ProductID -->
                    <label for="productID">Продуктов код</label>
                    <input class="width_100" id="title" type="number" v-model="productID" :placeholder="product.productID" required>
                    <!-- Price -->
                    <label for="price">Цена (с отстъпка)</label>
                    <input id="price" type="number"  v-model="price" :placeholder="product.price.$numberDecimal"  step=".01">
                    <!-- Suggested -->
                    <hr class="w-100 m-2">
                    <b-form-checkbox
                    id="checkbox-1"
                    v-model="suggested"
                    name="checkbox-1"
                    value = true
                    unchecked-value = false
                    >
                    добави в топ предложения
                    </b-form-checkbox>
                    <hr class="w-100 m-2">
                    <!-- On sale -->
                    <label for='sale'>Промоция<em>(в проценти)</em></label>
                    <input id='sale' type='number' v-model="sale" :placeholder="product.sale">
                    <span style="display:grid" v-if="sale || product.sale">
                        <span><small>Нова цена с отстъпка(информативно): {{(product.price.$numberDecimal/100)*(100 - sale)}} лв</small></span>
                        <label>Стара цена</label>
                        <input type="number" step=".01" v-model="oldPrice"  :placeholder="product.oldPrice">
                    </span>
                    <!-- Weight -->
                    <label for="weight">Количество на единица продукт</label>
                    <input id="weight" type="number" v-model="weight" :placeholder="product.weight.$numberDecimal">
                    <!-- Unit -->
                    <b-form-group label="Избери мерна единица">
                        <b-form-radio-group id="radio-group-2" v-model="unit">
                            <b-form-radio value="мл">мл</b-form-radio>
                            <b-form-radio value="л">л</b-form-radio>
                            <b-form-radio value="кг">кг</b-form-radio>
                            <b-form-radio value="г">г</b-form-radio>
                            <b-form-radio value="бр">бр</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <!-- StockQuantity -->
                    <label for="stockQuantity">Наличност <em>(брой)</em></label>
                    <input id="stockQuantity" type="number" v-model="stockQuantity" :placeholder="product.stockQuantity">
                    <!-- Description -->
                    <label for="description">Описание</label>
                    <textarea id="description" cols="30" rows="10" v-model="description" :placeholder="product.description"></textarea>
                    <!-- Photo -->
                    <label for="photo">Изберете снимка</label>
                    <input id="photo" type="file"  @change="onFileSelected" />
                    <button class="btn btn-success" @click="onUpdateProduct" >Промени</button>
                </div>
            </div>
            <div class="mx-5 w-25">
                <div id="image_preview" style="border:solid 1px; border-style:dashed;">
                    <img :src="imageUrl" />
                </div>
                <div style="display:grid">
                    <label for="ingredients">Съставки</label>
                    <textarea id="ingredients" rows="1" v-model="properties.ingredients" ></textarea>
                    <!-- <label for="storage_conditions">Условия за съхранение</label>
                    <textarea id="storage_conditions" rows="1" v-model="properties.storageConditions"></textarea>
                    <label for="consumation">Начин на употреба</label>
                    <textarea id="consumation" rows="1" v-model="properties.consumtionWay"></textarea> -->
                    <label for="manufacturer">Производител</label>
                    <input id="manufacturer" type="text" v-model="properties.manufacturer">
                </div>
            </div>
            <!-- Хранителна стойност -->
            <div class="w-30">
                <table>
                    <thead>
                        <tr>
                            <th>Хранителна стойност за:</th>
                            <th>100г</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Енергийност (ккал/ kJ)</td>
                            <td><input type="text" v-model="properties.calories"></td>
                        </tr>
                        <tr>
                            <td>Въглехидрати(г)</td>
                            <td><input type="text" v-model="properties.carbohydrates"></td>
                        </tr>
                        <tr>
                            <td><span class="ml-2">-от които захари (г)</span></td>
                            <td><input type="text" v-model="properties.sugars"></td>
                        </tr>
                        <tr>
                            <td>Мазнини (г)</td>
                            <td><input type="text" v-model="properties.fats"></td>
                        </tr>
                        <tr>
                            <td><span class="ml-2">-от които наситени (г)</span></td>
                            <td><input type="text" v-model="properties.saturated"></td>
                        </tr>
                        <tr>
                            <td>Протеини (г)</td>
                            <td><input type="text" v-model="properties.proteins"></td>
                        </tr>
                        <tr>
                            <td>Сол (г)</td>
                            <td><input type="text" v-model="properties.salt"></td>
                        </tr>   
                        <!-- <tr>
                            <td>Фибри (г)</td>
                            <td><input type="text" v-model="properties.fibers"></td>
                        </tr>    -->
                    </tbody>      
                </table>
                <div style="width:100%; height:2rem;"></div>
                <table style="width:100%;">
                    <tbody>
                        <!-- <tr>
                            <td class="w-50">Срок на годност:</td>
                            <td><input type="date"  v-model="properties.expirationDate"></td>
                        </tr> -->
                        <tr>
                            <td class="w-50">Марка:</td>
                            <td><input type="text" v-model="properties.brand"></td>
                        </tr>
                        <tr>
                            <td class="w-50">Произход:</td>
                            <td><input type="text" placeholder="страна" v-model="properties.origin"></td>
                        </tr>
                    </tbody>
                </table>
                <div style="width:100%; height:2rem;"></div>  
            </div> 
        </div>
    </div>
</template>
<style>
    img{
        width: 100%;
        height: auto;
    }
</style>
<script>
export default {
    async asyncData({ $axios, params }){
        try {
            const categories = $axios.$get("/api/categories");
            const product = $axios.$get(`/api/products/${params.id}`);   
            const [catResponse, productResponse] = await Promise.all([
                categories,
                product
            ]);
            return {
                categories: catResponse.categories,
                product: productResponse.product,   
            }
        } catch(err) {
            console.log(err)
        }
    },
    created () {
        this.categoryID = this.product.category._id;
        this.$axios.$get("/api/subcategories/categories/" + this.categoryID)
        .then(response => this.subcategories = response.subcategories);
        this.subcategoryID = this.product.subcategory._id;
        this.imageUrl = this.product.photo.url;  
        
        if(this.product.properties){
            let propertyNames = [
                'ingredients','storageConditions','consumtionWay','manufacturer',
                'calories','carbohydrates','sugars','fats','saturated','proteins',
                'salt','fibers','brand','origin'
            ]
            propertyNames.forEach(propertyName => {
                let name = propertyName
                if(this.product.properties[name]){
                    this.properties[name] = this.product.properties[name]
                }
            });
            // if(this.product[0].properties.expirationDate){
            //     var expirationDate = new Date(this.product[0].properties.expirationDate).toISOString().slice(0,10)
            // }
            // this.properties.expirationDate = expirationDate;
        } 
        this.unit = this.product.unit;
        this.suggested = this.product.suggested;  
        // this.oldPrice = this.product[0].oldPrice;
        // this.sale = this.product[0].sale                                                                                            
    },
    data(){
        return{
            subcategories: [],
            categoryID: null,
            subcategoryID: null,
            selected:'',
            title: null,
            suggested: null,
            productID: null,
            price: null,
            oldPrice: null,
            description: null,
            weight: null,
            unit: null,
            stockQuantity: null,
            sale: null,
            selectedFile: null,
            imageUrl: '',      
            properties:{
                ingredients:'',
                // storageConditions:'',
                // consumtionWay:'',
                manufacturer:'',
                calories: '',
                carbohydrates: '',
                sugars: '',
                fats: '',
                saturated: '',
                proteins: '',
                salt: '',
                // fibers: '',
                expirationDate: '',
                brand: '',
                origin: ''
            }  
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.selectedFile);
        },
        // show all subcategories of the selected category
        async onCategorySelected( {$axios} ){
            await this.$axios.$get("/api/subcategories/categories/" + this.categoryID)
            .then(response => this.subcategories = response.subcategories);
            this.subcategoryID = null;
        },
        async onUpdateProduct({ params, $router }){
            const data = new FormData();
            const productValues = ['title','price','weight','stockQuantity','description','unit', 'sale', 'oldPrice', 'suggested', 'productID'];
            productValues.forEach(value => {
                if(this[value]){
                    data.append(value , this[value]);
                }
            })
            if(this.categoryID){
                data.append("category", this.categoryID);
            }
            if(this.subcategoryID){
                data.append("subcategory", this.subcategoryID);
            }
            if(this.selectedFile){
                console.log(this.product.photo.key)
                data.append('key', this.product.photo.key);
                data.append("photo", this.selectedFile);
            }   
            let properties = {};
            let propertyNames = [
                'ingredients','storageConditions','consumtionWay','manufacturer',
                'calories','carbohydrates','sugars','fats','saturated','proteins',
                'salt','fibers','expirationDate','brand','origin'
            ]
            propertyNames.forEach(propertyName => {
                let name = propertyName
                if(this.properties[name]){
                    properties[name] = this.properties[name]
                }
            });
            data.append("properties",JSON.stringify(properties)); 
            await this.$axios.$patch('/api/products/'+ this.product._id, data);
            await this.$router.go();
        }
    }
}
</script>
