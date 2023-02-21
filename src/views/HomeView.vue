<template>
  <NavbarComponent />
  <div class="container-fluid pt-3">
    <!-- <div class="row"> -->
    <h3 class="ml-4 text-left">All Orders</h3>
    <table class="table m-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Course</th>
          <th scope="col" v-if="this.user.role_id == 1">Teacher</th>
          <th scope="col" v-else>Student</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.course.courseName }}</td>
          <td v-if="this.user.role_id == 1">{{ order.teacher.name }}</td>
          <td v-else>{{ order.student.name }}</td>
          <td v-if="order.isActive == true"><span class="badge badge-success">Active</span></td>
          <td v-else><span class="badge badge-secondary">Not Active</span></td>
        </tr>
      </tbody>
    </table>
    <!-- </div> -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import NavbarComponent from '@/components/Navbar.vue'

const GET_ORDERS_QUERY = gql`
  query getAllOrder($id: Int!, $size: Int, $page: Int){
    viewOwnOrder(userId: $id, size: $size, page: $page){
      id
      teacher{
        id
        name
        username
        email
        country{
          id
        }
      }
      student{
        id
        name
        username
        email
        country{
          id
        }
      }
      course{
        id
        courseName
        courseDescription
        coursePrice
      }
      isActive
    }
  }`

export default {
  components: {
    NavbarComponent
  },
  apollo: {
    orders: {
      query: GET_ORDERS_QUERY,
      update: data => data.viewOwnOrder,
      variables(){
        return{
          id: parseInt(this.user.id),
          page: 0,
          size: 50
        }
      }
    }
  },
  data(){
    return{
      id: '',
      user: '',
      orders: []
    }
  },
  mounted(){
    let userStr = localStorage.getItem('user')
    userStr = JSON.parse(userStr)
    this.user = userStr
    if(!userStr){
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
