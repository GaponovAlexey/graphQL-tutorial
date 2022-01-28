const monguse = require("mongoose");

const Shema = monguse.Schema;

const directorShema = new Shema({
  name: String,
  age: Number,
});

module.exports = monguse.model("Director", directorShema);
