const monguse = require('mongoose')

const Shema = monguse.Schema;

const movieShema = new Shema({
  name: String,
  genre: String,
  directorId: String,
})

module.exports = monguse.model("Movie", movieShema)