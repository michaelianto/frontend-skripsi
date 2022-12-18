<template>
  <NavbarComponent />
  <div class="col-6 mr-auto ml-auto p-3">
    <form @submit.prevent="handleAddCourse" class="text-left">
      <h3 class="text-center mt-3">Add Course</h3>
      <div class="form-group">
        <label for="inputName">Course Name</label>
        <input type="text" class="form-control" id="inputName" v-model="newCourse.courseName">
      </div>
      <div class="form-group">
        <label for="inputDescription">Course Description</label>
        <textarea class="form-control" id="inputDescription" rows="5" v-model="newCourse.courseDescription"></textarea>
      </div>
      <div class="form-group">
        <label for="inputPrice">Course Price</label>
        <input type="number" class="form-control" id="inputPrice" v-model="newCourse.coursePrice">
      </div>
      <button class="btn btn-block btn-primary mt-4 p-2">Add Course</button>
    </form>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import gql from 'graphql-tag'

const ADD_COURSE_MUTATION = gql`
  mutation insertCourse($input: CourseInput){
    insertCourse(input: $input){
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
  data() {
    return {
      newCourse: {
        courseName: '',
        courseDescription: '',
        coursePrice: '',
        createdBy: ''
      }
    }
  },
  methods: {
    handleAddCourse(){
      if(this.newCourse.courseName == null || this.newCourse.courseDescription == null || this.newCourse.coursePrice == null
      || this.newCourse.courseName == '' || this.newCourse.courseDescription == '' || this.newCourse.coursePrice == ''
      || this.newCourse.courseName == 0 || this.newCourse.courseDescription == 0 || this.newCourse.coursePrice == 0){
        alert("Please fill all input data")
      }else{
        this.newCourse.createdBy = JSON.parse(localStorage.getItem('user')).id
        this.$apollo.mutate({
          mutation: ADD_COURSE_MUTATION,
          variables: {
            input: this.newCourse
          }
        })
        alert("Successfully add course");
        this.$router.push({ name: 'course' })
      }      
    }
  }
}

</script>