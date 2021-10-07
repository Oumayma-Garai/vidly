const config = require("config");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const logger = require("./logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  family: 4, // Use IPv4, skip trying IPv6
  auto_reconnect: true,
};
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined.");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly", options)
  .then(() => console.log("connected to mongodb ..."))
  .catch((err) => console.error("could not connect to mongodb ...", err));
app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
