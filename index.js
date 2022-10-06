const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const eventRoute = require("./routes/events");
const postRoute = require("./routes/posts");
const teamRoute = require("./routes/team");
const bloodRoute = require("./routes/blood");
const aksharsala= require("./routes/aksharshalafront");
const categoryRoute = require("./routes/categories");
const getInRoute = require("./routes/getin");
const joinRoute = require("./routes/join");
const testimonialRoute= require("./routes/testimonial")
const multer = require("multer");
const path = require("path");

// to access dotenv data++ to read json file++ to take static data 
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.urlencoded({extended:true}));

// connecting to the mongoDB database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/events", eventRoute);
app.use("/api/teams", teamRoute);
app.use("/api/getin", getInRoute);
app.use("/api/join", joinRoute);
app.use("/api/akshar", aksharsala);


app.use("/api/blood", bloodRoute);
app.use("/api/testimonial", testimonialRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
