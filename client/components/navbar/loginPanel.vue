<template>
    <span class="nav-item">
        <b-button v-b-modal.login_panel style="display:contents; font-size:13px; font-weight:800">Вход / Регистрация</b-button>
            
            <b-modal id="login_panel" size="sm"  centered hide-footer hide-header>
                
                    <form class="mx-auto py-3" method="post">
                        <div class="form-group" >
                            <label for="email_login">Е-мейл</label>
                            <input v-model='email' type="email" class="form-control" id="email_login" placeholder="email@abv.bg">
                        </div>
                        <div class="form-group">
                            <label for="password_login">Парола</label>
                            <input v-model='password' type="password" class="form-control" id="password_login" placeholder="Парола">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="checkbox_login">
                            <label class="form-check-label" for="checkbox_login">
                            Запомни ме
                            </label>
                        </div>
                        <div class="d-flex justify-content-between mt-3">
                            <b-button pill variant="outline-success" @click="onSignin">Вход</b-button>
                            <nuxt-link to="/signup" ><b-button pill variant='outline-info' @click="onRegister">Регистрация</b-button></nuxt-link>
                        </div>
                        <a class="d-block mt-2" href="#">Забравена парола</a>
                    </form>
                
            </b-modal>
    </span>
</template>

<style scoped>
    .modal label,.modal a,.modal span{
        font-weight: 600;
        color: black;
    }
</style>

<script>
export default {
    middleware:'auth',
    auth:'guest',
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        onSignin(){
            try {
                this.$auth.loginWith('local', {
                    data:{
                        email: this.email,
                        password: this.password
                    }
                });
            } catch (err) {
                console.log(err)
            }
        },
        onRegister(){
            this.$root.$emit('bv::hide::modal','login_panel')
        }
        
    }
}
</script>