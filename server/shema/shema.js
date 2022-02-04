const qraphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = qraphql;

const Directors = require("../modules/director");
const Movies = require("../modules/movie");

// const movies = [
//   { id: "1", name: "Alexey", genre: "screamer", directorId: "1" },
//   { id: "2", name: "my life", genre: "comedi", directorId: "2" },
//   { id: "3", name: "eards", genre: "distruct", directorId: "3" },
//   { id: "4", name: "dom", genre: "triler", directorId: "3" },
//   { id: "5", name: "dogs", genre: "screamer", directorId: "1" },
//   { id: "6", name: "Bitcoin", genre: "screamer", directorId: "1" },
//   { id: "7", name: "Cardano", genre: "screamer", directorId: "1" },
//   { id: "8", name: "Ethirium", genre: "comedi", directorId: "2" },
//   { id: "9", name: "doms", genre: "distruct", directorId: "3" },
// ];

// const monsters = [
//   { id: "1", name: "chupakabra", weight: 10330 },
//   { id: "2", name: "putin", weight: 55 },
//   { id: "3", name: "apolon", weight: 10330 },
//   { id: "4", name: "kristiano", weight: 90 },
// ];
// const directors = [
//   { id: "1", name: "Quntin tarantino", age: 70 },
//   { id: "2", name: "PUTIN", age: 1000 },
//   { id: "3", name: "Elizaveta", age: 40 },
//   { id: "4", name: "Malkolm", age: 14 },
// ];

// const moviesJSON = [
//   { id: "1", name: "Alexey", genre: "screamer", "directorId": }, 61f4393dfd9a6b32c981ead8
//   { id: "2", name: "my life", genre: "comedi", "directorId": }, 61f43a09fd9a6b32c981ead9
//   { id: "3", name: "eards", genre: "distruct", "directorId": }, 61f43a7cfd9a6b32c981eadb
//   { id: "4", name: "dom", genre: "triler", "directorId": },
//   { id: "5", name: "dogs", genre: "screamer", "directorId": },
//   { id: "6", name: "Bitcoin", genre: "screamer", "directorId": },
//   { id: "7", name: "Cardano", genre: "screamer", "directorId": },
//   { id: "8", name: "Ethirium", genre: "comedi", "directorId": },
//   { id: "9", name: "doms", genre: "distruct", "directorId": },
// ];

// const directorsJSON = [
//   { name: "Quntin tarantino", age: 70 }, 61f438113f860cf9b295b1cf
//   { name: "PUTIN", age: 1000 }, 61f43aacfd9a6b32c981eadc
//   { name: "Elizaveta", age: 40 }, 61f43addfd9a6b32c981eadd
//   { name: "Malkolm", age: 14 },
// ];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLString },
    director: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors.find((director) => director.id === parent.directorId);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movie: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter((move) => move.directorId === parent.id);
        return Movies.find({});
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((movie) => movie.id == args.id)
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((director) => director.id == args.id)
        return Directors.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Directors.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,

});
