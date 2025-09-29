const express = require("express");
const app = express();

require('dotenv').config();

// const mongoose = require("mongoose");
const path = require("path");
// const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<body><div id="hamburger"></div></body>`);
const document = dom.window.document;

//router
const victimRouter = require("./routes/victim/request.js");
const ngoRouter = require("./routes/ngo/ngoRoutes.js");
const userRouter = require("./routes/user.js");

//web atlas
const MONGO_URL = process.env.MONGO_URL;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// app.use(express.urlencoded({extended:true}));
// app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));

// const MONGO_URL = "mongodb://127.0.0.1:27017/reliefSystem";


main()
 .then(()=>{
    console.log("connected to DB");
 })
 .catch((err)=>{
    console.log(err)
 })

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
  res.render("users/signup-login.ejs");
});

app.get("/home",(req,res)=>{
  res.render("index.ejs");
});

app.get("/showRequest",(req,res)=>{
  res.render("NgoGov/ngoAndGov.ejs");
});

//Implementing routers
app.use("/", victimRouter);
app.use("/", ngoRouter);
app.use("/", userRouter);


app.listen("3000",()=>{
    console.log("app is listening on port 3000");
});