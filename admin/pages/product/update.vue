<template>
    <div id="page">
        <h1>Добавете нов продукт</h1>
        <form id="form">
            <!-- Category ID selection -->
            <label for="category">Категория</label>
            <select name="categoryID" id="category">
                <option value=""></option>
            </select>
            <!-- Title -->
            <label for="title">Име</label>
            <input class="width_100" id="title" type="text" name="title">
            <!-- Price -->
            <label for="price">Цена</label>
            <input id="price" type="number" name="price">
            <!-- Weight -->
            <label for="weight">Количество на единица продукт <em>(в грамове)</em></label>
            <input id="weight" type="number" name="weight">
            <!-- StockQuantity -->
            <label for="stockQuantity">Наличност <em>(брой)</em></label>
            <input id="stockQuantity" type="number" name="stockQuantity">
            <!-- Description -->
            <label for="description">Описание</label>
            <textarea id="description" name="description" cols="30" rows="10"></textarea>
            <!-- Photo -->
            <!-- <input class="photo" type="file" name="photo" > -->
            <button type="submit" class="btn btn-success">Добавете продукта</button>
        </form>
    </div>
</template>
<style>
button{
    margin:0.5rem 0;
}
</style>
