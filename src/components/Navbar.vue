<template>
  <!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!-- Navbar brand -->
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <i class="fa-solid fa-person-chalkboard"></i>
      </a>
      <!-- Left links -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="user.role_id == 1">
          <router-link to="course" class="nav-link">Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link to="vacancy" class="nav-link">Vacancy</router-link>
        </li>
        <li class="nav-item">
          <router-link to="application" class="nav-link" href="#">Applications</router-link>
        </li>
      </ul>
    </div>
    <!-- Collapsible wrapper -->

    <!-- Right elements -->
    <div class="d-flex align-items-center mr-5">
      <!-- Avatar -->
      <div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
          {{ user.username }}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="profile" class="dropdown-item"><i class="fa-solid fa-user"></i>  Profile</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="notification" class="dropdown-item"><i class="fa-solid fa-bell"></i>  Notifications <span class="badge badge-danger">8</span></router-link>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" @click="logout"><i class="fa-solid fa-right-from-bracket"></i>  Log Out </button>
        </div>
      </div>
    </div>
    <!-- Right elements -->
  </div>
  <!-- Container wrapper -->
</nav>
<!-- Navbar -->
</template>

<script>
export default{
  name: "NavbarComponent",
  data() {
    return{
      user: ''
    }
  },
  mounted(){
    let user = localStorage.getItem('user')
    this.user = JSON.parse(user)
  },
  methods: {
    logout(){
      console.log("TESTING")
      localStorage.clear();
      this.$router.push({ name: 'login' })
    }
  }
}
</script>


<style>

</style>