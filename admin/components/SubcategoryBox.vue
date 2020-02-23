<template>
        <b-row >
            <b-col class="subcategory_outer_box">
                <span class="subcategory_title_box">{{subcategory.title}}</span>
                <!-- <img :src="imageUrl" v-if="imageUrl"> -->
                <!-- <img :src="subcategory.photo.url" v-else alt=""> -->
                <input class="image_input" type="file" @change="onFileSelected">
                <n-link :to="{ name: 'subcategory-update-id', params: {id: subcategory._id} }"><b-button  size="sm" variant="outline-primary">Промени</b-button></n-link>
            </b-col>
        </b-row>
</template>
<script>
export default {
    props:['subcategory']
}
</script>