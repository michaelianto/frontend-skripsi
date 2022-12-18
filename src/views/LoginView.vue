<template>
  <div class="col-6 mr-auto ml-auto p-5">
    <h1 class="p-5 text-center font-weight-bold">
      <i class="fa-solid fa-person-chalkboard fa-xl"></i>
      TUTOR PORTAL
    </h1>
    <form class="text-left" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="inputUsername">Username</label>
        <input type="text" class="form-control" id="inputUsername" v-model="user.username">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword" v-model="user.password">
      </div>
      <router-link to="signup">
        <p class="text-center">
          Don't have any account? Sign up now
        </p>
      </router-link>
      <button class="btn btn-block btn-primary mt-4 p-2">Login</button>
    </form>
  </div>
</template>

<script>
import gql from 'graphql-tag';

const GET_USER_BY_USERNAME_QUERY = gql`
query($name: String!){
  getUserByUsername(username: $name){
    id
    name
    username
    email
    role{
      id
      name
    }
    country{
      id
      name
    }
  }
}`

export default {
  data(){
    return{
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin(){
      this.$apollo.query({
        query: gql`
          query login($user: UserLoginDTO!){
            checkUserLogin(user: $user)
          }
        `,
        variables: {
          user: this.user
        }
      }).then((data) => {
        const authenticated = data.data.checkUserLogin;
        // const savedData = { username: this.user.username }
        if(authenticated){
          this.$apollo.query({
            query: GET_USER_BY_USERNAME_QUERY,
            variables: {
              name: this.user.username
            }
          }).then((data) => {
            this.user['id'] = data.data.getUserByUsername.id
            this.user['name'] = data.data.getUserByUsername.name
            this.user['email'] = data.data.getUserByUsername.email
            this.user['role_id'] = data.data.getUserByUsername.role.id
            this.user['role_name'] = data.data.getUserByUsername.role.name
            this.user['country_id'] = data.data.getUserByUsername.country.id
            this.user['country_name'] = data.data.getUserByUsername.country.name
            localStorage.setItem('user', JSON.stringify(this.user))
            this.$router.push({ name: 'home'})
          })
        }
      })
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