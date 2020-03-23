<template>
    <b-form id="page" @submit.prevent='onAddProduct'>
            <b-alert v-if="message" :show="5" dismissible variant="success">
                <p>{{message}}</p>
            </b-alert>
            <b-alert v-if="err" dismissible variant="danger">
                <p>{{err}}</p>
            </b-alert>
        <h1>Добавете нов продукт</h1>
        <div class="d-flex justify-content-between">
            <div class="w-30">
                <div id="form">
                    <!-- Category ID selection -->
                    <label for="category">Категория</label>
                    <select name="categoryID" id="category" v-model="categoryID" @change="onCategorySelected" required>
                        <option v-for="category in categories" :value="category._id" :key="category._id" >{{category.title}}</option>
                    </select>
                    <!-- Subcategory ID selection -->
                    <label for="subcategory">Подкатегория</label>
                    <select name="subcategoryID" id="subcategory" v-model="subcategoryID" required>
                        <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory._id">{{subcategory.title}}</option>
                    </select>
                    <!-- Title -->
                    <label for="title">Име</label>
                    <input class="width_100" id="title" type="text" name="title" v-model="title" required>
                    <!-- ProductID -->
                    <label for="productID">Продуктов код</label>
                    <input class="width_100" id="title" type="number" v-model="productID" required>
                    <!-- Price -->
                    <label for="price">Цена</label>
                    <input id="price" type="number" step=".01" v-model="price"  placeholder="0" required>
                    <!-- Suggested -->
                    <hr class="w-100 m-2">
                    <b-form-checkbox
                    v-model="suggested"
                    value = true
                    unchecked-value = false
                    >
                    добави в топ предложения
                    </b-form-checkbox>
                    <hr class="w-100 m-2">
                    <!-- Weight -->
                    <label for="weight">Количество на единица продукт</label>
                    <input id="weight" type="number" v-model="weight" placeholder="0" required>
                    <hr class="w-100 m-2">
                    <b-form-group label="Избери мерна единица">
                        <b-form-radio-group id="radio-group-2" v-model="unit">
                            <b-form-radio value="мл">мл</b-form-radio>
                            <b-form-radio value="л">л</b-form-radio>
                            <b-form-radio value="кг">кг</b-form-radio>
                            <b-form-radio value="г">г</b-form-radio>
                            <b-form-radio value="бр">бр</b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>
                    <hr class="w-100 m-2">
                    <!-- StockQuantity -->
                    <label for="stockQuantity">Наличност <em>(брой)</em></label>
                    <input id="stockQuantity" type="number" v-model="stockQuantity"  placeholder="0" required>
                    <!-- Description -->
                    <label for="description">Описание</label>
                    <textarea id="description" rows="2" v-model="description"></textarea>
                    <!-- Photo -->
                    <label for="photo">Изберете снимка</label>
                    <input id="photo" type="file"  @change="onFileSelected" />
                    <button class="btn btn-success" type="submit">Добави</button>
                </div>
            </div>

            <!-- Show the selected image -->
            <div class="mx-5 w-25">
                <div id="image_preview" style="border:solid 1px; border-style:dashed;">
                    <img v-if="imageUrl" :src="imageUrl" />
                    <div v-else style="width:100%; height:320px; margin:auto;"><p style="width:100%; text-align:center;">Добави снимка</p></div>
                </div>
                <div style="display:grid">
                    <label for="ingredients">Съставки</label>
                    <textarea id="ingriedients" rows="1" v-model="properties.ingriedients"></textarea>
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
                <table class="w-100">
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
                        </tr>      -->
                    </tbody>     
                </table>
                <div style="width:100%; height:2rem;"></div>
                    <table style="width:100%;">
                        <tbody>
                            <!-- <tr>
                                <td class="w-50">Срок на годност:</td>
                                <td><input type="date" v-model="properties.expirationDate"></td>
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
    </b-form>    
</template>

<style scoped>
    
    img  {
        width:100%;
        max-height:320px;
    }
    
</style>

<script>

export default {
    async asyncData({ $axios }){
        try {
            const response = await $axios.$get("/api/categories");
            return {
                categories: response.categories,
            }
        } catch(err) {
            console.log(err)
        }
    },
    
    data(){
        return {
            subcategories: [],
            categoryID: null,
            subcategoryID: null,
            title: null,
            price: null,
            description: null,
            weight: null,
            unit: null,
            suggested: null,
            stockQuantity: null,
            selectedFile: null,
            sale: null,
            oldPrice: null,
            imageUrl: null,
            message: null,
            err: null,
            productID: null,
            properties:{
                ingredients: null,
                // storageConditions: null,
                // consumtionWay: null,
                manufacturer: null,
                calories: null,
                carbohydrates: null,
                sugars: null,
                fats: null,
                saturated: null,
                proteins: null,
                salt: null,
                // fibers: null,
                // expirationDate: null,
                brand: null,
                origin: null
            }
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            this.imageUrl = URL.createObjectURL(this.selectedFile)
        },
        // show all subcategories of the selected category
        async onCategorySelected( {$axios} ){
            const response = await this.$axios.$get("/api/subcategories/categories/" + this.categoryID)
            this.subcategories = response.subcategories;
            this.subcategoryID = null
        },
        async onAddProduct(){
            let data = new FormData();
            data.append("categoryID", this.categoryID);
            data.append("subcategoryID", this.subcategoryID);
            data.append("title", this.title);
            data.append("productID", this.productID);
            data.append("sale", this.sale); 
            data.append("oldPrice", this.oldPrice);   
            data.append("price", this.price);    
            data.append("suggested", this.suggested);
            data.append("weight", this.weight);
            data.append('unit',this.unit);    
            data.append("stockQuantity", this.stockQuantity);    
            data.append("description", this.description);    
            data.append("photo", this.selectedFile);
            data.append("properties", JSON.stringify(this.properties));
            let result = await this.$axios.$post("/api/products", data);
            if (result) {
                this.message = "Успешно създадохте продукт"
            } else {
                this.err = 'Възникна грешка при създаването на продукта: '
            }
        }
    }
}
</script>