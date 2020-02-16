<template>
    <header>
        <div>
            <b-navbar toggleable="lg" type="dark" variant="info">

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <!-- Home button -->
                        <b-nav-item href="/">Начало</b-nav-item>
                        <!-- Product dropdown -->
                        <b-nav-item-dropdown text="Продукти"> 
                            <b-dropdown-item href="/product/create">Добави</b-dropdown-item>
                            <b-dropdown-item href="/product/update">Промени</b-dropdown-item>
                            <b-dropdown-item href="/product/delete">Изтрий</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <!-- Category dropdown -->
                        <b-nav-item-dropdown text="Категории"> 
                            <b-dropdown-item href="/category/create">Добави</b-dropdown-item>
                            <b-dropdown-item href="/category/update">Промени</b-dropdown-item>
                            <b-dropdown-item href="/category/delete">Изтрий</b-dropdown-item>
                        </b-nav-item-dropdown>

                        
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
    </header>
</template>

<script>
export default {
    
}
</script>