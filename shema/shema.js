const qraphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = qraphql

const movies = [
  { id: '1', name: 'Alexey', genre: 'screamer', directorId: '1' },
  { id: '2', name: 'my life', genre: 'comedi', directorId: '2' },
  { id: '3', name: 'eards', genre: 'distruct', directorId: '3' },
  { id: '4', name: 'dom', genre: 'triler', directorId: '3' },
  { id: '5', name: 'dogs', genre: 'screamer', directorId: '1' },
  { id: '6', name: 'Bitcoin', genre: 'screamer', directorId: '1' },
  { id: '7', name: 'Cardano', genre: 'screamer', directorId: '1' },
  { id: '8', name: 'Ethirium', genre: 'comedi', directorId: '2' },
  { id: '9', name: 'doms', genre: 'distruct', directorId: '3' },
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
    movie: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((move) => move.directorId === parent.id)
      },
    },
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
    movies: {
      type: new GraphQLList(MovieType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return directors;
      }
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
})
