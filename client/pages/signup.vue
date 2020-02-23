<template>
    <div id="registration_box">
        <b-form>
          <b-form-group label="Име и фамилия">
            <b-form-input
            v-model='name'
            required 
            placeholder='Георги Петков'
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="input-group-1" label="Е-майл:" label-for="input-1">
              <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              required
              placeholder="example@gmail.com"
              ></b-form-input>
              
          </b-form-group>

          <b-form-group id="input-group-2" label="Парола:" label-for="input-2">
              <b-form-input
              id="input-2"
              v-model="password"
              required
              type="password"
              placeholder="Парола"
              ></b-form-input>
          </b-form-group>

            <b-button @click="onSignup" variant="primary">Регистрация</b-button>
        </b-form>
        
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
        name: '',
        email: '',
        password: ''
  
      }
    },
    methods: {
      async onSignup() {
        try{
          const data = {
            name: this.name,
            email: this.email,
            password: this.password
          }
          const response = await this.$axios.$post('/api/auth/signup', data);
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
    width:500px;
    color: black;
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