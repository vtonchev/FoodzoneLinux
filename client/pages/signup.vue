<template>
    <div id="registration_box">
        <h3 style="text-align:center;color: #343A40;">Регистрация</h3>
        <b-form @submit="onSignup" >
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
            placeholder='0894127822'
            >
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Е-майл:" label-for="input-1">
              <b-form-input
              id="input-1"
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
</template>

<script>
  export default {
    middleware:'auth',
    auth:'guest',
    data() {
      return {
        
        name: {
          firstName: '',
          lastName: ''
        },
        phone:'',
        email: '',
        password: ''
  
      }
    },
    methods: {
      async onSignup(e) {
        e.preventDefault()
        try{
          const data = {
            phone: this.phone,
            email: this.email,
            password: this.password
          }
          data['name'] = JSON.stringify(this.name)
          console.log(data)
          const response = await this.$axios.$post('/api/auth/signup', data);
          console.log(response)
          console.log(response.success)
          if (response.success) {
            this.$auth.loginWith('local', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            this.$router.push('/')
          }

        } catch(err) {
          console.log(err)
        }
        
      },
    }
  }
</script>
<style>
#registration_box{
    margin:1rem auto;
    width:300px;
    color: #343A40;
}
@media screen and (max-width: 1199px){
    #registration_box{
      width:390px;
    }
}

@media screen and (max-width: 991px) {
    #registration_box{
      width:auto;
      margin:1rem 3rem;
    }
}
@media screen and (max-width: 767px) {
    #registration_box{
        width:auto;
        margin:1rem 10px;
    }
}
</style>