// import { createApp, h, provide } from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import * as apolloProvider from './apollo.provider'
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
// import { DefaultApolloClient } from '@vue/apollo-composable'
import router from './router'

// const httpLink = createHttpLink({
//   uri: 'http://localhost:8080/graphql'
// })

// const cache = new InMemoryCache()

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// })

// const app = createApp({
//   setup() {
//     provide(DefaultApolloClient, apolloClient)
//   },

//   render: () => h(App),
// })

// app.use(router).mount('#app')

const app = createApp(App)
app.use(apolloProvider.provider)
app.use(router)
app.mount('#app')
