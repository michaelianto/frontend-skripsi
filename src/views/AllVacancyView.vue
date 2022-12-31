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
          <th scope="col" v-if="this.user.role_id == 1">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vacancy in vacancies" :key="vacancy.id">
          <td>{{ vacancy.id }}</td>
          <td>{{ vacancy.course.courseName }}</td>
          <td>{{ vacancy.course.coursePrice }}</td>
          <td>{{ vacancy.description }}</td>
          <td v-if="vacancy.isActive == true && this.user.role_id == 1"><span class="badge badge-success">Active</span></td>
          <td v-else-if="vacancy.isActive == false && this.user.role_id == 1"><span class="badge badge-secondary">Not Active</span></td>
          <td v-else><button class="btn btn-primary" @click="handleApply(vacancy)"><i class="fa-solid fa-plus"></i></button></td>
        
          <td v-if="vacancy.isActive == true && this.user.role_id == 1 && vacancy.student.id == this.user.id">
            <button class="btn btn-secondary mr-2" @click="updateVacancy(vacancy)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-danger" @click="deleteVacancy(vacancy)"><i class="fa fa-trash" aria-hidden="true"></i></button>          
          </td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import gql from 'graphql-tag'

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

const APPLY_VACANCY_MUTATION = gql`
  mutation createJobApplication($request: CreateJobApplicationRequest!){
    createJobApplication(request: $request){
      jobVacancyId
      approvalStatus
    }
  }
`

const DELETE_VACANCY_MUTATION = gql`
  mutation deleteJobVacancy($request: DeleteJobVacancyRequest!){
    deleteJobVacancy(request: $request)
  }
`

export default {
  components: {
    NavbarComponent
  },
  data(){
    return{
      user: JSON.parse(localStorage.getItem('user')),
      vacancies: []
    }
  },
  mounted(){
    if(this.user.role_id == 1){
      this.$apollo.query({
        query: GET_VACANCIES_QUERY_FOR_TEACHER,
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.vacancies = data.data.getJobVacancies
      })
    }else{
      this.$apollo.query({
        query: GET_VACANCIES_QUERY_FOR_TEACHER,
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.vacancies = data.data.getJobVacancies
      })
    }
  },
  methods: {
    handleApply(vacancy){
      var request = {
        'jobVacancyId': vacancy.id,
        'teacherId': this.user.id
      }
      if(confirm("Are you sure want to apply this vacancy?")){
        this.$apollo.mutate({
          mutation: APPLY_VACANCY_MUTATION,
          variables: {
            request: request
          }
        })
        alert("Apply vacancy success")
        this.$router.push({ name: 'application' })
      }
    },
    updateVacancy(vacancy){
      localStorage.setItem('vacancy', JSON.stringify(vacancy))
      this.$router.push({ name: 'updateVacancy'})
    },
    deleteVacancy(vacancy){
      var request = {
        'id': vacancy.id
      }
      if(confirm("Are you sure want to delete this vacancy?")){
        this.$apollo.mutate({
          mutation: DELETE_VACANCY_MUTATION,
          variables: {
            request: request
          }
        })
        alert("Delete vacancy success")
        this.$router.go(0);
      }
    }
  }
}
</script>