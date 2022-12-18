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
          <th scope="col">Teacher Name</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar.vue'

export default {
  components: {
    NavbarComponent
  },

}
</script>