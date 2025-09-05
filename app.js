const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const path = require("path");
// const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<body><div id="hamburger"></div></body>`);
const document = dom.window.document;


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// app.use(express.urlencoded({extended:true}));
// app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/w";

// main()
//  .then(()=>{
//     console.log("connected to DB");
//  })
//  .catch((err)=>{
//     console.log(err)
//  })

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// app.get("/home",(req,res)=>{
//     res.render("test.ejs");
// });

app.get("/",(req,res)=>{
  res.render("index.ejs");
});

// app.use("/listings", listings);

app.listen("3000",()=>{
    console.log("app is listening on port 3000");
});