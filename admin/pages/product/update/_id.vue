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
                    <input class="width_100" id="title" type="text" v-model="title"  :placeholder="product[0].title">
                    <!-- Price -->
                    <label for="price">Цена</label>
                    <input id="price" type="number"  v-model="price" :placeholder="product[0].price.$numberDecimal"  step=".01">
                    <!-- Weight -->
                    <label for="weight">Количество на единица продукт <em>(в грамове)</em></label>
                    <input id="weight" type="number" v-model="weight" :placeholder="product[0].weight.$numberDecimal">
                    <!-- StockQuantity -->
                    <label for="stockQuantity">Наличност <em>(брой)</em></label>
                    <input id="stockQuantity" type="number" v-model="stockQuantity" :placeholder="product[0].stockQuantity">
                    <!-- Description -->
                    <label for="description">Описание</label>
                    <textarea id="description" cols="30" rows="10" v-model="description" :placeholder="product[0].description"></textarea>
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
                    <label for="storage_conditions">Условия за съхранение</label>
                    <textarea id="storage_conditions" rows="1" v-model="properties.storageConditions"></textarea>
                    <label for="consumation">Начин на употреба</label>
                    <textarea id="consumation" rows="1" v-model="properties.consumtionWay"></textarea>
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
                            <td>от които захари (г)</td>
                            <td><input type="text" v-model="properties.sugars"></td>
                        </tr>
                        <tr>
                            <td>Мазнини (г)</td>
                            <td><input type="text" v-model="properties.fats"></td>
                        </tr>
                        <tr>
                            <td>от които наситени (г)</td>
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
                        <tr>
                            <td>Фибри (г)</td>
                            <td><input type="text" v-model="properties.fibers"></td>
                        </tr>   
                    </tbody>      
                </table>
                <div style="width:100%; height:2rem;"></div>
                <table style="width:100%;">
                    <tbody>
                        <tr>
                            <td class="w-50">Срок на годност:</td>
                            <td><input type="date"  v-model="properties.expirationDate"></td>
                        </tr>
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
        //CategoryID SubcategoryID and img !!!!!!! ALLWAYS NEEDED !!!!!!
        this.categoryID = this.product[0].category._id;
        this.$axios.$get("/api/subcategories/categories/" + this.categoryID)
        .then(response => this.subcategories = response.subcategories);
        this.subcategoryID = this.product[0].subcategory._id;
        this.imageUrl = this.product[0].photo.url;  
        //CHECK IF PROPERTIES EXISTS and then checks every single one of them 
        if(this.product[0].properties){
            let propertyNames = [
                'ingredients','storageConditions','consumtionWay','manufacture',
                'calories','carbohydrates','sugars','fats','saturated','proteins',
                'salt','fibers','brand','origin'
            ]
            propertyNames.forEach(propertyName => {
                let name = propertyName
                if(this.product[0].properties[name]){
                    this.properties[name] = this.product[0].properties[name]
                }
            });
            if(this.product[0].properties.expirationDate){
                var expirationDate = new Date(this.product[0].properties.expirationDate).toISOString().slice(0,10)
            }
            this.properties.expirationDate = expirationDate;
        }                                                                                               
    },
    data(){
        return{
            subcategories: [],
            categoryID: null,
            subcategoryID: null,
            selected:'',
            title: null,
            price: null,
            description: null,
            weight: null,
            stockQuantity: null,
            selectedFile: null,
            imageUrl: '',      
            properties:{
                ingredients:'',
                storageConditions:'',
                consumtionWay:'',
                manufacturer:'',
                calories: '',
                carbohydrates: '',
                sugars: '',
                fats: '',
                saturated: '',
                proteins: '',
                salt: '',
                fibers: '',
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
            const productValues = ['title','price','weight','stockQuantity','description']
            productValues.forEach(value => {
                if(this[value]){
                    data.append(value,this[value]);
                }
            })
            if(this.categoryID){
                data.append("category", this.categoryID);
            }
            if(this.subcategoryID){
                data.append("subcategory", this.subcategoryID);
            }
            if(this.selectedFile){
                data.append("photo", this.selectedFile);
            }   
            let properties = {};
            let propertyNames = [
                'ingredients','storageConditions','consumtionWay','manufacture',
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

            await this.$axios.$patch('/api/products/'+ this.product[0]._id, data);
            await this.$router.go();
        }
    }
}
</script>
