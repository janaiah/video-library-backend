const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config()
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user.model");
const UserRouter=require("./routes/users/user.route.js");
const CategoryRouter=require('./routes/category.router.js');
const VideoRouter=require('./routes/video.route.js');
const authRouter=require('./routes/auth.router.js');
const Category = require("./model/category.model.js");

const  dbConnect  = require("./config/dbconnect");

const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME;
//middleware===========================================================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes=================================================================================================
app.use("/api/users",UserRouter);
app.use('/api/categories',CategoryRouter);
app.use("/api/videos",VideoRouter);
app.use("/api/auth",authRouter);

// Star the Sever =====================================================================================

mongoose
  .connect("mongodb://localhost:27017/VidoesDB")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
      //dbConnect();
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });
