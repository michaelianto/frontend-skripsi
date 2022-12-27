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
          <tr v-for="item in getNotifications" :key="item.id" :class="{ 'font-weight-bold': item.read == false}">
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

const GET_NOTIFICATIONS_QUERY = gql`
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
`

const READ_NOTIFICATIONS_MUTATION = gql`
  mutation readNotifications($ids: [ID!]){
    readNotifications(ids: $ids)
  }
`

export default{
  components: {
    NavbarComponent
  },
  data(){
    return{
      getNotifications: [],
      id: JSON.parse(localStorage.getItem('user')).id
    }
  },
  mounted(){
    this.$apollo.query({
      query: GET_NOTIFICATIONS_QUERY,
      variables: {
        id: this.id
      },
      fetchPolicy: 'no-cache'
    }).then((data) => {
      this.getNotifications = data.data.getNotifications;

      let result = this.getNotifications.map(({ id }) => id)

      this.$apollo.mutate({
        mutation: READ_NOTIFICATIONS_MUTATION,
        variables: {
          ids: result
        }
      })
    })
  }
}

</script>
