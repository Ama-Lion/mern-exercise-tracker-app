//inports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Connect DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//require files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

//use files
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
