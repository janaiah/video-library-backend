const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user.model");
const UserRouter=require("./routes/users/user.route.js")

//Middleware======================================================================================
const app = express();
// CORS Middleware required to allow cross-origin requests to your server for POst, PUT, DELETE requests
app.use(cors());
// Body Parser Middleware to parse incoming request bodies into json in a middleware before your handlers, available under the req.body property
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME;

//Routes=================================================================================================

app.use("/api/users",UserRouter);

// API to get admin user details ************************************************************************************************
app.get("/get-admin", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    console.log("Connected");
    const database = connectionObject.db(dbName);
    database
      .collection("tbladmin")
      .find({})
      .toArray()
      .then((documents) => {
        console.log(documents);
        res.send(documents);
        res.end();
      });
  });
});

// API to get all users
app.get("/get-users", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    database = connectionObject.db(dbName);
    database
      .collection("tblusers")
      .find({})
      .toArray()
      .then((documents) => {
        console.log("Users");
        console.log(documents);
        res.send(documents);
        res.end();
      });
  });
});
//getUser by id
app.get("/get-user/:userid", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    database = connectionObject.db(dbName);
    database
      .collection("tblusers")
      .find({ UserId: req.params.userid })
      .toArray()
      .then((document) => {
        console.log(document);
        res.send(document);
        res.end();
      });
  });
});
//POST API to add user
app.post("/register-user", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const User = {
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
    };
    database
      .collection("tblusers")
      .insertOne(User)
      .then(() => {
        console.log(User);
        res.send(User);
        res.end();
      });
  });
});
//Put API to update user
app.put("/edit-user/:userid", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const User = {
      UserId: req.body.UserId,
      UserName: req.body.UserName,
      Password: req.body.Password,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
    };
    database
      .collection("tblusers")
      .updateOne({ UserId: req.params.userid }, { $set: User })
      .then(() => {
        console.log(User);
        res.send(User);
        res.end();
      });
  });
});
//DELETE API to delete user
app.delete("/delete-user/:userid", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const { userid } = req.params;
    database
      .collection("tblusers")
      .deleteOne({ UserId: userid })
      .then(() => {
        console.log(userid);
        res.send("User deleted");
        res.end();
      });
  });
});
// API to get all videos ************************************************************************************************
app.get("/get-videos", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    database = connectionObject.db(dbName);
    database
      .collection("tblvideos")
      .find({})
      .toArray()
      .then((documents) => {
        console.log("Videos");
        console.log(documents);
        res.send(documents);
        res.end();
      });
  });
});
// API to get  video by id
app.get("/get-video/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    var database = connectionObject.db(dbName);
    database
      .collection("tblvideos")
      .find({ VideoId: parseInt(req.params.id) })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
//add video
app.post("/add-video", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const Video = {
      VideoId: req.body.VideoId,
      Title: req.body.Title,
      Description: req.body.Description,
      Url: req.body.Url,
      Likes: req.body.Likes,
      DisLikes: req.body.DisLikes,
      CategoryId: req.body.CategoryId,
      Comments: req.body.Comments,
    };
    database
      .collection("tblvideos")
      .insertOne(Video)
      .then((video) => {
        console.log(video);
        res.send(video);
        res.end();
      });
  });
});
//Put API to update video
app.put("/edit-video/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const id = req.params.id;
    //console.log(id)
    const Video = {
      VideoId: parseInt(req.body.VideoId),
      Title: req.body.Title,
      Description: req.body.Description,
      Url: req.body.Url,
      Likes: parseInt(req.body.Likes),
      DisLikes: parseInt(req.body.DisLikes),
      CategoryId: parseInt(req.body.CategoryId),
      Comments: req.body.Comments,
    };
    database
      .collection("tblvideos")
      .updateOne({ VideoId: parseInt(id) }, { $set: Video })
      .then((video) => {
        console.log(video);
        res.send(video);
        res.end();
      });
  });
});

//DELETE API to delete video
app.delete("/delete-video/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const { id } = req.params;
    database
      .collection("tblvideos")
      .findbyIdAndDelete(id)
      .then(() => {
        res.send("Video deleted");
        res.end();
      });
  });
});
// API to get all categories ************************************************************************************************
app.get("/get-categories", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    database = connectionObject.db(dbName);
    database
      .collection("tblcategories")
      .find({})
      .toArray()
      .then((documents) => {
        console.log("Categories");
        console.log(documents);
        res.send(documents);
        res.end();
      });
  });
});
// API to get category by id
app.get("/get-category/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    var database = connectionObject.db(dbName);
    database
      .collection("tblcategories")
      .find({ CategoryId: parseInt(req.params.id) })
      .toArray()
      .then((document) => {
        console.log(document);
        res.send(document);
        res.end();
      });
  });
});
// add category
app.post("/add-category", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const Category = {
      CategoryId: parseInt(req.body.CategoryId),
      CategoryName: req.body.CategoryName,
    };

    database
      .collection("tblcategories")
      .insertOne(Category)
      .then((category) => {
        console.log(category);
        res.send("Category Added");
        res.end();
      });
  });
});
// API to update category
app.put("/edit-category/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    const id = parseInt(req.params.id);
    const Category = {
      CategoryId: parseInt(req.body.CategoryId),
      CategoryName: req.body.CategoryName,
    };
    database
      .collection("tblcategories")
      .updateOne({ CategoryId: id }, { $set: Category })
      .then((category) => {
        console.log(category);
        res.send(category);
        res.end();
      });
  });
});
//DELETE API to delete category
app.delete("/delete-category/:id", (req, res) => {
  mongoClient.connect(url).then((connectionObject) => {
    const database = connectionObject.db(dbName);
    database
      .collection("tblcategories")
      .deleteOne({ CategoryId: parseInt(req.params.id) })
      .then(() => {
        console.log("Category Deleted");
        res.send("Category Deleted");
        res.end();
      });
  });
});



//Sever =====================================================================================

mongoose
  .connect("mongodb://localhost:27017/VidoesDB")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });
