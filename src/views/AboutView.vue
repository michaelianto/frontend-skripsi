<template>
  <div class="about">
    <h1>This is an about page with list spring</h1>
    <ul>
      <li v-for="role in roles" :key="role.id">{{ role.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag'
import { computed } from 'vue';


const ALL_ROLES_QUERY = gql`
  query{
    getRoles{
      id
      name
    }
  }
`;

const { result } = useQuery(ALL_ROLES_QUERY)
const roles = computed(() => result.value?.getRoles ?? [])

// watchEffect(() => {
//   console.log(roles);
// })
</script>

<style>

</style>
