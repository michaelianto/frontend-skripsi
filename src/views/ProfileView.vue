<template>
    <NavbarComponent />
    <div class="col-6 mr-auto ml-auto p-2">
      <h3 class="text-center mt-4">Your Profile</h3>
      <form @submit.prevent="handleUpdate" class="text-left">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input type="text" class="form-control" id="inputName" v-model="updateUser.name">
        </div>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input type="text" class="form-control" id="inputUsername" v-model="updateUser.username">
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input type="text" class="form-control" id="inputEmail" v-model="updateUser.email">
        </div>
        <div class="form-group">
          <label for="inputCountry">Country</label>
          <select class="form-control" id="inputCountry" v-model="updateUser.country_id">
            <option disabled value="">Select your country</option>
            <option v-for="country in getCountries" :key="country.id" :value="country.id">{{ country.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputRole">Role</label>
          <select class="form-control" id="inputRole" disabled>
            <option value="{{ updateUser.role_id }}" selected>{{ updateUser.role_name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input type="password" class="form-control" id="inputPassword" v-model="updateUser.password">
        </div>
        <div class="form-group">
          <label for="inputConfirmPassword">Confirm Password</label>
          <input type="password" class="form-control" id="inputConfirmPassword" v-model="confirm_password">
        </div>
        <button class="btn btn-block btn-primary mt-4 p-2">Update Profile</button>
      </form>
    </div>
    
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue';
import gql from 'graphql-tag';

const GET_COUNTRIES_QUERY = gql`
  query getCountries{
    getCountries{
      id
      name
    }
  }
`

export default {
  apollo: {
    getCountries: {
      query: GET_COUNTRIES_QUERY,
    }
  },
  components: {
    NavbarComponent
  },
  data(){
    return {
      updateUser: '',
      confirm_password: '',
      getCountries: []
    }
  }, 
  methods: {
    handleUpdate(){
      if(this.updateUser.password != this.confirm_password){
        alert('Password Confirmation does not match');
      }else{
        // Modify User attributes
        this.updateUser.roleId = this.updateUser.role_id
        this.updateUser.countryId = this.updateUser.country_id

        delete this.updateUser.role_id
        delete this.updateUser.role_name
        delete this.updateUser.country_id
        delete this.updateUser.country_name

        this.$apollo.mutate({
          mutation: gql`
            mutation insertUser($user: UserRequestDTO){
              updateUser(input: $user){
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
            }
          `,
          variables: {
            user: this.updateUser
          }
        }).then((data) => {
          let userStr = localStorage.getItem('user')
          userStr = JSON.parse(userStr)
          userStr['name'] = data.data.updateUser.name
          userStr['username'] = data.data.updateUser.username
          userStr['email'] = data.data.updateUser.email
          userStr['role_id'] = data.data.updateUser.role.id
          userStr['role_name'] = data.data.updateUser.role.name
          userStr['country_id'] = data.data.updateUser.country.id
          userStr['country_name'] = data.data.updateUser.country.name
          userStr['password'] = data.data.updateUser.password

          localStorage.setItem('user', JSON.stringify(userStr))
          alert("Update success")
          this.$router.push({ name: 'home' })
        })
      }
    }
  },
  mounted(){
    let user = JSON.parse(localStorage.getItem('user'))
    this.updateUser = user
  }
}
</script>
