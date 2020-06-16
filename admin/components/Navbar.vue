<template>
    <header>
        <div class="dark">
            <div class="container">
                <div class="row">
                    <b-navbar toggleable="lg" type="dark" variant="dark">

                        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                        <b-collapse id="nav-collapse" is-nav>
                            <b-navbar-nav>
                                <!-- Home button -->
                                <b-nav-item href="/admin">Начало</b-nav-item>
                                <!-- Product dropdown -->
                                <b-nav-item-dropdown text="Промени/Изтрий"> 
                                    <b-dropdown-item href="product/update-delete">Продукти</b-dropdown-item>
                                    <b-dropdown-item href='category/update-delete'>Категории</b-dropdown-item>
                                </b-nav-item-dropdown>
                                <!-- Category dropdown -->
                                <b-nav-item-dropdown text="Добави"> 
                                    <b-dropdown-item href="product/create">Продукти</b-dropdown-item>
                                    <b-dropdown-item href="category/create">Категории</b-dropdown-item>
                                    <b-dropdown-item href="subcategory/create">Подкатегории</b-dropdown-item>
                                    <b-dropdown-item href='timespan/create'>Дни за доставка</b-dropdown-item>
                                </b-nav-item-dropdown>
                                <b-nav-item href="orders">Доставки</b-nav-item>
                                <!-- Subcategory dropdown -->
                                <!-- <b-nav-item-dropdown text="Подкатегории"> 
                                    <b-dropdown-item href="/subcategory/create">Добави</b-dropdown-item>
                                    <b-dropdown-item href="/subcategory/update">Промени</b-dropdown-item>
                                    <b-dropdown-item href="/subcategory/delete">Изтрий</b-dropdown-item>
                                </b-nav-item-dropdown> -->

                                
                            </b-navbar-nav>

                            <!-- Right aligned nav items -->
                            <b-navbar-nav class="ml-auto">
                                <b-nav-form>
                                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                                </b-nav-form>


                                <b-nav-item-dropdown right> 
                                    <!-- Using 'button-content' slot -->
                                    <template v-slot:button-content>
                                        <em>User</em>
                                    </template>
                                    <b-dropdown-item href="#">Профил</b-dropdown-item>
                                    <b-dropdown-item href="#">Изход</b-dropdown-item>
                                </b-nav-item-dropdown>
                            </b-navbar-nav>
                        </b-collapse>
                    </b-navbar>
                </div>
            </div>
        </div>
    </header>
</template>
<style scoped>
    .dark{
        background-color:#343a40;
    }
    .row{
        display:block;
    }
</style>
<script>
export default {
    
}
</script>