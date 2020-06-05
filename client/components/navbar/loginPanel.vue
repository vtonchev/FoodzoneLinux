<template>
    <span class="nav-item">
        <b-button v-b-modal.login_panel class="bg-transparent border text-dark" ><i class="fas fa-user fa-2x"></i></b-button>
            <b-modal id="login_panel" size="sm"  centered hide-footer hide-header>
                
                <b-alert 
                class="position-absolute w-100" 
                style="top:-3.3rem; left:0" 
                :show="dismissCountDown"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged" 
                fade 
                variant="danger"
                >Грешен потребител или парола</b-alert>
              
                <b-tabs 
                active-nav-item-class='font-weight-bold'
                nav-item-class
                justified>
                    <!-- SIGN IN -->
                    <b-tab active>
                        <template v-slot:title>
                            <p class="text-green">Вход</p>
                        </template>
                        <b-form class="mx-auto py-3" @submit.prevent="onSignin">
                            <div class="form-group" >
                                <label for="email_login">Е-мейл</label>
                                <b-input v-model='signin.email' type="email" required id="email_login" placeholder="email@abv.bg"/>
                            </div>
                            <div class="form-group">
                                <label for="password_login">Парола</label>
                                <b-input v-model='signin.password' type="password" required id="password_login" placeholder="Парола" />
                            </div>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkbox_login">
                                <label class="form-check-label" for="checkbox_login">
                                Запомни ме
                                </label>
                            </div>
                            <div class="d-flex justify-content-between mt-3">
                                <b-button pill variant="outline-success" type='submit' >Вход</b-button>
                            </div>
                            <a class="d-block mt-2" href="#">Забравена парола</a>
                        </b-form>
                    </b-tab>
                    <!-- REGISTRATION -->
                    <b-tab>
                        <template v-slot:title>
                            <p class="text-green">Регистрация</p>
                        </template>
                        <div id="registration_box">
                            <b-form @submit.prevent="onSignup" class="mx-auto py-3">
                                <b-form-group label="Име:">
                                    <b-form-input
                                    v-model='name.firstName'
                                    required 
                                    placeholder='Георги'
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label="Фамилия:">
                                    <b-form-input
                                    v-model='name.lastName'
                                    required 
                                    placeholder='Петков'
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label="Телефон:">
                                    <b-form-input
                                    v-model='phone'
                                    required 
                                    minlength=10
                                    maxlength=10
                                    placeholder='0894127822'
                                    >
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group label="Е-майл:">
                                    <b-form-input
                                    v-model="email"
                                    type= 'email'
                                    required
                                    placeholder="example@gmail.com"
                                    ></b-form-input>
                                    
                                </b-form-group>
                                <b-form-group id="input-group-2" label="Парола:" label-for="input-2">
                                    <b-form-input
                                    id="input-2"
                                    v-model="password"
                                    required
                                    type= 'password'
                                    placeholder="Парола"
                                    ></b-form-input>
                                </b-form-group>
                            <b-button  type='submit' variant="outline-success">Регистрация</b-button>
                            </b-form>
                        </div>
                    </b-tab>
                </b-tabs>    
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
            // SIGN IN
            signin: {
                email:'',
                password:'',
            },
            // REGISTER
            name: {
                firstName: '',
                lastName: ''
            },
            phone:'',
            email: '',
            password: '',
            // ALERT LOGIC
            responseData: '',
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    methods:{
        async onSignin(){
            try {
                const response = await this.$auth.loginWith('local', {
                    data:{
                        email: this.signin.email,
                        password: this.signin.password
                    },
                })
                
            } catch (err) {
                this.dismissCountDown = this.dismissSecs
            }
        },
        async onSignup() {
            try{
                const data = {
                    phone: this.phone,
                    email: this.email,
                    password: this.password
                }
                data['name'] = JSON.stringify(this.name)
                const response = await this.$axios.$post('/api/auth/signup', data);
                alert(response.message)
                await this.$router.go('/')
            } catch(err) {
                console.log(err)
            }
            
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        
    }
}
</script>