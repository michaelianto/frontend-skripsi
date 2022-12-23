<template>
  <NavbarComponent />
  <div class="container-fluid pt-3">
    <div class="row">
      <div class="col-6">
        <h3 class="ml-4 text-left">All Application</h3>
      </div>
    </div>
    <table class="table m-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Course Name</th>
          <th scope="col" v-if="this.user.role_id == 1">Teacher Name</th>
          <th scope="col" v-else>Student Name</th>
          <th scope="col">Vacancy Description</th>
          <th scope="col">Status</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in applications" :key="application.jobVacancyId">
          <td>{{ application.jobVacancyId }}</td>
          <td>{{ application.jobVacancy.course.courseName }}</td>
          <td v-if="this.user.role_id == 1">{{ application.teacher.name }}</td>
          <td v-else>{{ application.jobVacancy.student.name }}</td>
          <td>{{ application.jobVacancy.description }}</td>
          <td v-if="application.approvalStatus == 'APPROVED'"><span class="badge badge-success">Approved</span></td>
          <td v-else-if="application.approvalStatus == 'PENDING'"><span class="badge badge-secondary">Pending</span></td>
          <td v-else-if="application.approvalStatus == 'CANCELLED_BY_TEACHER'"><span class="badge badge-warning">Canceled</span></td>
          <td v-else><span class="badge badge-danger">Rejected</span></td>
          
          <td v-if="application.approvalStatus == 'PENDING'">
            <button v-if="this.user.role_id == 1" class="btn action-button btn-success mr-3" @click="handleApprove(application)"><i class="fa fa-check" aria-hidden="true"></i>
            </button>
            <button class="btn action-button btn-danger" @click="handleCancel(application)"><i class="fa-solid fa-xmark"></i>
            </button>
          </td>
          <td v-else></td>
          
          <!-- Trigger button to cancel pending application -->


        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'
import gql from 'graphql-tag'

const GET_APPLICATIONS_TEACHER_QUERY = gql`
  query getJobApplicationsByTeacher($id: ID!){
    getJobApplicationsByTeacher(teacherId: $id){
      jobVacancyId
      jobVacancy{
        id
        course{
          courseName
          coursePrice
          courseDescription
        }
        student{
          id
          name
          username
          email
        }
        description
      }
      teacher{
        id
        name
        username
        email
      }
      approvalStatus
    }
  }
`

const GET_APPLICATIONS_STUDENT_QUERY = gql`
  query getJobApplicationsByStudent($id: ID!){
    getJobApplicationsByStudent(studentId: $id){
      jobVacancyId
      jobVacancy{
        id
        course{
          courseName
          coursePrice
          courseDescription
        }
        student{
          id
          name
          username
          email
        }
        description
      }
      teacher{
        id
        name
        username
        email
      }
      approvalStatus
    }
  }
`

const CANCEL_APPLICATION_MUTATION = gql`
  mutation withdrawJobApplication($request: WithdrawJobApplicationRequest!){
    withdrawJobApplication(request: $request)
  }
`

const REJECT_APPLICATION_MUTATION = gql`
  mutation rejectJobApplication($request: RejectJobApplicationRequest!){
    rejectJobApplication(request: $request)
  }
`

const APPROVED_APPLICATION_MUTATION = gql`
  mutation acceptJobApplication($request: AcceptJobApplicationRequest!){
    acceptJobApplication(request: $request)
  }
`


export default {
  components: {
    NavbarComponent
  },
  data(){
    return{
      user: JSON.parse(localStorage.getItem('user')),
      applications: []
    }
  },
  mounted(){
    // this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user.role_id == 1){
      // If student
      this.$apollo.query({
        query: GET_APPLICATIONS_STUDENT_QUERY,
        variables:{
          id: this.user.id
        },
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.applications = data.data.getJobApplicationsByStudent
        var temp = this.applications.filter(function (el) {
          return  el.approvalStatus == 'PENDING' ||
                  el.approvalStatus == 'APPROVED' || 
                  el.approvalStatus == 'REJECTED_BY_STUDENT'
        })
        this.applications = temp
      })
    }else{
      // If Teacher
      this.$apollo.query({
        query: GET_APPLICATIONS_TEACHER_QUERY,
        variables:{
          id: this.user.id
        },
        fetchPolicy: 'no-cache'
      }).then((data) => {
        this.applications = data.data.getJobApplicationsByTeacher
      })
    }
  },
  methods: {
    handleCancel(application){
      var request = '';
      if(confirm("Are you sure want to cancel this application?")){
        if(this.user.role_id == 1){
          request = {
            'jobVacancyId': application.jobVacancyId,
            'teacherId': application.teacher.id
          }
          this.$apollo.mutate({
            mutation: REJECT_APPLICATION_MUTATION,
            variables: {
              request: request
            }
          })
        }else{
          request = {
            'jobVacancyId': application.jobVacancyId,
            'teacherId': this.user.id
          }
          this.$apollo.mutate({
            mutation: CANCEL_APPLICATION_MUTATION,
            variables: {
              request: request
            }
          })
        }
        this.$router.go(0);
      }
    },
    handleApprove(application){
      if(confirm("Are you sure want to approve this application?")){
        var request = {
          'jobVacancyId': application.jobVacancyId,
          'teacherId': application.teacher.id
        }
        this.$apollo.mutate({
          mutation: APPROVED_APPLICATION_MUTATION,
          variables: {
            request: request
          }
        })
        this.$router.go(0);
      }
    }
  }
}
</script>

<style>
.action-button{
  width: 50px;
  height: 50px;
}

</style>