<template>
  <div class="col-6 mr-auto ml-auto p-2">
    <h1 class="p-3 text-center font-weight-bold">
      <i class="fa-solid fa-person-chalkboard fa-xl"></i>
      TUTOR PORTAL
    </h1>
    <form @submit.prevent="handleRegister" class="text-left">
      <h3 class="text-center">Sign Up</h3>
      <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" v-model="newUser.name">
      </div>
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="newUser.username">
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" v-model="newUser.email">
      </div>
      <div class="form-group">
        <label for="inputCountry">Country</label>
        <select class="form-control" id="inputCountry" v-model="newUser.countryId">
          <option disabled value="">Select your country</option>
          <option v-for="country in getCountries" :key="country.id" :value="country.id">{{ country.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inputRole">Role</label>
        <select class="form-control" id="inputRole" v-model="newUser.roleId">
          <option disabled value="">Select your role</option>
          <option v-for="role in getRoles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword" v-model="newUser.password">
      </div>
      <div class="form-group">
        <label for="inputConfirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="inputConfirmPassword" v-model="confirm_password">
      </div>
      <router-link to="login">
        <p class="text-center">
          Already have an account? Log in now
        </p>
      </router-link>
      <button class="btn btn-block btn-primary mt-4 p-2">Sign Up</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    getCountries: {
      query: gql`
        query{
          getCountries{
            id
            name
          }
        }
      `,
      fetchPolicy: "no-cache"
    },
    getRoles: {
      query: gql`
        query{
          getRoles{
            id
            name
          }
        }
      `,
      fetchPolicy: "no-cache"
    },
  },
  data(){
    return {
      newUser: {
        name: '',
        username: '',
        email: '',
        roleId: '',
        countryId: '',
        password: '',
      },
      confirm_password: '',
      getRoles: [],
      getCountries: []
    }
  },
  methods: {
    handleRegister(){
      if(this.newUser.password != this.confirm_password){
        alert('Password Confirmation does not match');
      }else{
        this.$apollo.mutate({
          mutation: gql`
            mutation insertUser($user: UserRequestDTO){
              insertUser(input: $user){
                id
                username
                email
              }
            }
          `,
          variables: {
            user: this.newUser
          }
        })
        alert('Sign up success for\n' + "Username: " + this.newUser.username + "\n" + "Email: " + this.newUser.email + "\n");
        this.$router.push({ name: 'login' })
      } 
    }
  },
  mounted(){
    let user = localStorage.getItem('user')
    if(user){
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<style>

</style>
