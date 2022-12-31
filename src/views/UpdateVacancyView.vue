<template>
  <NavbarComponent />
  <div class="col-6 mr-auto ml-auto p-2">
    <form @submit.prevent="handleUpdateVacancy" class="text-left">
      <h3 class="text-center mt-3">Update Vacancy : {{  }}</h3>
      <div class="form-group">
        <label for="inputCourse">Course</label>
        <select class="form-control" id="inputCourse" v-model="vacancy.course.courseName" disabled>
          <option selected>{{ vacancy.course.courseName }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inputDescription">Vacancy Description</label>
        <textarea class="form-control" id="inputDescription" rows="5" v-model="vacancy.description"></textarea>
      </div>
      <button class="btn btn-block btn-primary mt-4 p-2">Update Vacancy</button>
    </form>
  </div>
  
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue';
import gql from 'graphql-tag';


const UPDATE_VACANCY_MUTATION = gql`
  mutation updateJobVacancy($request: UpdateJobVacancyRequest!){
    updateJobVacancy(request: $request){
      id
      course{
        courseName
        coursePrice
      }
      student{
        id
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
  data(){
    return {
      vacancy: JSON.parse(localStorage.getItem('vacancy'))
    }
  }, 
  methods: {
    handleUpdateVacancy(){
      console.log("PING PING PING")
      if(confirm("Are you sure want to update this vacancy?")){
        var request = {
          id: this.vacancy.id,
          description: this.vacancy.description,
          isActive: true
        }
        this.$apollo.mutate({
          mutation: UPDATE_VACANCY_MUTATION,
          variables: {
            request: request
          }
        }).then(() => {
          console.log("REDIRECT TO VACANCY")
          this.$router.push({ name: 'vacancy' })
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
