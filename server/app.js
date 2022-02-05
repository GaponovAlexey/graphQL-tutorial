const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const schema = require("./shema/shema");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;
app.use(cors());

mongoose.connect(
  `mongodb+srv://ALEXEY:123456654321@graphql-tutorial.9yv7x.mongodb.net/movies?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConection = mongoose.connection;

dbConection.on("error", (err) => console.log(`conecnte rror: ${err}`));
dbConection.once("open", () => console.log(`conecnted to db`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server started! + ${PORT}`);
});
