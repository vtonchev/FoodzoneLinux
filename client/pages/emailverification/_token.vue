<template>
<div class="container-fluid container_fluid_width p-0 position-relative">
    <b-row class="m-0">
        <div class="col-12 text-center">{{responseData.message}}</div>
        <b-form class="mx-auto py-3" @submit.prevent="onSignin" v-show="responseData.success">
            <h4 class="text-green text-center">Вход</h4>
            <div class="form-group" >
                <label for="email_login">Е-мейл</label>
                <b-input v-model='email' type="email" required id="email_login" placeholder="email@abv.bg"/>
            </div>
            <div class="form-group">
                <label for="password_login">Парола</label>
                <b-input v-model='password' type="password" required id="password_login" placeholder="Парола" />
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="checkbox_login">
                <label class="form-check-label" for="checkbox_login">
                Запомни ме
                </label>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <b-button pill variant="outline-success" type='submit'>Вход</b-button>
            </div>
            <a class="d-block mt-2" href="#">Забравена парола</a>
        </b-form>        
    </b-row>
</div>
</template>
<script>
export default {
    mounted () {
        this.onLoad()
    },
    data(){
        return{
            responseData: {},
            email:'',
            password:''
        }
    },
    methods:{
        async onLoad(){
                const data = {
                    token: this.$route.params.token
                }
                const response = await this.$axios.post('api/auth/verify/email', data)
                this.responseData = response.data
        },
        async onSignin(){
            try {
                const response = await this.$auth.loginWith('local', {
                    data:{
                        email: this.email,
                        password: this.password
                    }
                })
            } catch (err) {
                this.dismissCountDown = this.dismissSecs
            }
        },
    }
}
</script>
