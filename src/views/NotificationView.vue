<template>
    <NavbarComponent />
    <div class="container-fluid pt-3">
    <div class="row justify-content-between">
      <h3 class="ml-4">All Notifications</h3>
      <table class="table m-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getNotifications" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue';
import gql from 'graphql-tag';

export default{
  components: {
    NavbarComponent
  },
  apollo: {
    getNotifications: {
      query: gql`
        query($id: ID!){
          getNotifications(id: $id){
            id
            user{
              id
              username
            }
            content
            read
          }
        }
      `,
      variables() {
        return{
          id: this.id
        }
      }
    }
  },
  data(){
    return{
      getNotifications: [],
      id: JSON.parse(localStorage.getItem('user')).id
    }
  }
}

</script>
