module.exports = {
  client: {
    service: {
      name: 'frontend-graphql-apollo',
      url: 'http://localhost:8080/graphql'
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  }
}