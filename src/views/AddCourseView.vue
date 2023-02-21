<template>
  <NavbarComponent />
  <div class="col-6 mr-auto ml-auto p-3">
    <form class="text-left">
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
      <div class="chapters">
        <div class="form-row" v-for="(chapter, index) in newChapters" :key="index">
          <div class="form-group col-md-6">
            <label>Chapter Name</label>
            <input v-model="newChapters[index].name" :name="`newChapters[${index}][name]`"  type="text" class="form-control" id="">
          </div>
          <div class="form-group col-md-6">
            <label>Chapter Detail</label>
            <textarea v-model="newChapters[index].detail" class="form-control" id="inputDescription" rows="5" :name="`newChapters[${index}][detail]`"></textarea>
          </div>
        </div>
      </div>
      <button class="btn btn-outline-secondary" @click="addChapter">Add Course's Chapter</button>
    </form>
    <button class="btn btn-block btn-primary mt-4 p-2" @click="handleAddCourse">Add Course</button>
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
      createdBy{
        id
        name
      }
    }
  }
`

const ADD_CHAPTER_MUTATION = gql`
  mutation createChapter($input: CreateChapter!){
    createChapter(input: $input){
      id
      name
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
      },
      newChapters: [],
    }
  },
  methods: {
    handleAddCourse(){
      console.log(this.newChapters);
      if(this.newCourse.courseName == null || this.newCourse.courseDescription == null || this.newCourse.coursePrice == null
      || this.newCourse.courseName == '' || this.newCourse.courseDescription == '' || this.newCourse.coursePrice == ''
      || this.newCourse.courseName == 0 || this.newCourse.courseDescription == 0 || this.newCourse.coursePrice == 0){
        alert("Please fill all input data")
      }else{
        this.newCourse.createdBy = Number(JSON.parse(localStorage.getItem('user')).id)
        console.log(this.newCourse)
        this.$apollo.mutate({
          mutation: ADD_COURSE_MUTATION,
          variables: {
            input: this.newCourse
          }
        }).then((data) => {
          this.newCourse['id'] = data.data.insertCourse.id
          console.log(this.newChapters.length)
          for(let i = 0 ; i < this.newChapters.length ; i++){
            var chapterInput = {
              name: this.newChapters[i].name,
              detail: this.newChapters[i].detail,
              courseId: this.newCourse.id
            }
            // console.log("Loop : " + i)
            // console.log(this.newChapters[i].name)
            // console.log(this.newChapters[i].detail)
            this.$apollo.mutate({
              mutation: ADD_CHAPTER_MUTATION,
              variables: {
                input: chapterInput
              }
            })
            console.log("Called in new chapters")
          }
          alert("Successfully add course");
          this.$router.push({ name: 'course' })
        })
      }      
    },
    addChapter(e){
      this.newChapters.push({
        name: '',
        detail: ''
      })
      e.preventDefault();
    }
  }
}

</script>