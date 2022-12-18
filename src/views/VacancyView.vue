<template>
  <NavbarComponent />
  <div class="container-fluid pt-3">
    <div class="row">
      <div class="col-6">
        <h3 class="ml-4 text-left">All Vacancy</h3>
      </div>
      <div class="col-6 text-right" v-if="this.user.role_id == 1">
        <router-link to="add-vacancy" class="btn btn-primary mr-4"><i class="fa-solid fa-plus"></i> Add Vacancy</router-link>
      </div>
    </div>
    <table class="table m-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Course Name</th>
          <th scope="col">Course Price</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vacancy in vacancies" :key="vacancy.id">
          <td>{{ vacancy.id }}</td>
          <td>{{ vacancy.course.courseName }}</td>
          <td>{{ vacancy.course.coursePrice }}</td>
          <td>{{ vacancy.description }}</td>
          <td v-if="vacancy.isActive == true"><span class="badge badge-success">Active</span></td>
          <td v-else><span class="badge badge-secondary">Not Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import gql from 'graphql-tag'

const GET_VACANCIES_QUERY_FOR_STUDENT = gql`
  query($id: ID!){
    getJobVacancyByUser(id: $id){
      id
      course{
        id
        courseName
        courseDescription
        coursePrice
      }
      student{
        id
        username	
        email
      }
      description
      isActive
    }
  }
`

const GET_VACANCIES_QUERY_FOR_TEACHER = gql`
  query getJobVacancies{
    getJobVacancies{
      id
      course{
        id
        courseName
        courseDescription
        coursePrice
      }
      student{
        id
        username	
        email
      }
      description
      isActive
    }
  }
`

export default {
  components: {
    NavbarComponent
  },
  // apollo: {
  //   vacancies: {
  //     query: GET_VACANCIES_QUERY,
  //     variables() {
  //       return{
  //         id: this.user.id
  //       }
  //     },
  //     update: data => data.getJobVacancyByUser,
  //     fetchPolicy: 'no-cache'
  //   }
  // },
  data(){
    return{
      user: JSON.parse(localStorage.getItem('user')),
      vacancies: []
    }
  },
  mounted(){
    if(this.user.role_id == 1){
      this.$apollo.query({
        query: GET_VACANCIES_QUERY_FOR_STUDENT,
        variables: {
          id: this.user.id
        },
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.vacancies = data.data.getJobVacancyByUser
      })
    }else{
      this.$apollo.query({
        query: GET_VACANCIES_QUERY_FOR_TEACHER,
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.vacancies = data.data.getJobVacancies
      })
    }
  }
}
</script>