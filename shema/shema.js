const qraphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = qraphql

const movies = [
  { id: '1', name: 'Alexey', genre: 'screamer', directorId: '1' },
  { id: '2', name: 'my life', genre: 'comedi', directorId: '2' },
  { id: '3', name: 'eards', genre: 'distruct', directorId: '3' },
  { id: '4', name: 'dom', genre: 'triler', directorId: '4' },
]
const directors = [
  { id: '1', name: 'Quntin tarantino', age: 70 },
  { id: '2', name: 'PUTIN', age: 1000 },
  { id: '3', name: 'Elizaveta', age: 40 },
  { id: '4', name: 'Malkolm', age: 14 },
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id === parent.directorId)
      },
    },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
})
