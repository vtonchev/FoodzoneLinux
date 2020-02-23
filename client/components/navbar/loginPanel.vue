<template>
    <span class="nav-item">
        <a href="#" type="button"  data-toggle="modal" data-target="#login_panel" aria-haspopup="true" aria-expanded="false">
            Вход / Регистрация
        </a>
        <div class="modal fade" id="login_panel" tabindex="-1" role="dialog" aria-labelledby="login_panel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <form class="mx-auto py-3" action="/login" method="post">
                <div class="form-group" >
                    <label for="email_login">Е-мейл</label>
                    <input name="email" type="email" class="form-control" id="email_login" placeholder="email@abv.bg">
                </div>
                <div class="form-group">
                    <label for="password_login">Парола</label>
                    <input name="password" type="password" class="form-control" id="password_login" placeholder="Парола">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="checkbox_login">
                    <label class="form-check-label" for="checkbox_login">
                    Запомни ме
                    </label>
                </div>
                    <button type="submit" class="btn btn-primary">Вход</button>
                <div class="mt-1">
                    <nuxt-link to="/signup" class="d-block">Регистрация</nuxt-link>
                    <a class="d-block" href="#">Забравена парола</a>
                </div>
                </form>
            </div>
            </div>
        </div>
    </span>
</template>

<style scoped>
    #login_panel, #login_panel a{
    color: #272727;
    }

</style>