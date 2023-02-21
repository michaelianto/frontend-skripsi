<template>
  <NavbarComponent />
  <div class="col-6 mr-auto ml-auto p-3">
    <form @submit.prevent="handleAddVacancy" class="text-left">
      <h3 class="text-center mt-3">Add Vacancy</h3>
      <div class="form-group">
        <label for="inputRole">Course</label>
        <select class="form-control" id="inputRole" v-model="newVacancy.courseId">
          <option disabled value="">Select your course</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.courseName }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inputDescription">Vacancy Description</label>
        <textarea class="form-control" id="inputDescription" rows="5" v-model="newVacancy.description"></textarea>
      </div>
      <button class="btn btn-block btn-primary mt-4 p-2">Add Vacancy</button>
    </form>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import gql from 'graphql-tag'

const ADD_VACANCY_MUTATION = gql`
  mutation createJobVacancy($request: CreateJobVacancyRequest!){
    createJobVacancy(request: $request){
      id
      course{
        courseName
      }
      student{
        username
      }
      description
    }
  }
`

const GET_COURSES_QUERY = gql`
  query{
    getCourses{
      id
      courseName
      courseDescription
      coursePrice
      createdBy
    }
  }
`

export default{
  components: {
    NavbarComponent
  },
  apollo: {
    courses: {
      query: GET_COURSES_QUERY,
      update: data => data.getCourses
    }
  },
  data() {
    return {
      newVacancy: {
        courseId: '',
        studentId: '',
        description: ''
      },
      courses: []
    }
  },
  methods: {
    handleAddVacancy(){
      if(this.newVacancy.courseId == null || this.newVacancy.description == null
      || this.newVacancy.courseId == '' || this.newVacancy.description == ''
      || this.newVacancy.courseId == 0 || this.newVacancy.description == 0){
        alert("Please fill all input data")
      }else{
        this.newVacancy.studentId = JSON.parse(localStorage.getItem('user')).id
        this.$apollo.mutate({
          mutation: ADD_VACANCY_MUTATION,
          variables: {
            request: this.newVacancy
          }
        })
        alert("Successfully add vacancy");
        this.$router.push({ name: 'vacancy' })
      }      
    }
  }
}

</script>