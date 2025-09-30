const express = require("express");
const app = express();

require('dotenv').config();

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

//session
const session = require("express-session");

//passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


//models
const User = require("./models/user.js"); 
const Requests = require("./models/Requests.js");

//web atlas
const MONGO_URL = process.env.MONGO_URL;

//local db
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


//Q.pass session is part of website or backend?
// 
// A.👉 passport.session() is part of the backend, not the frontend (website).
// 🖥️ Backend (Node + Express)
// Runs express-session middleware.
// Stores a session ID in the user’s browser as a cookie.
// When the user makes a new request, the cookie is sent back.
// passport.session() uses that cookie’s session ID to find the logged-in user, and attaches them as req.user.

const store = MongoStore.create({
    mongoUrl : MONGO_URL,
    // crypto: {
    //     secret: process.env.SECRET,
    // },
    touchAfter :24 * 3600,
});


app.use(session({
  store,
  secret : "mysecret",
  resave : false,
  saveUninitialized : false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 60, // 1 day
    httpOnly : true
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  // console.log("req.sessionID:", req.sessionID);
  //   console.log("Session cookie:", req.session);
  //   console.log("req.session.passport:", req.session.passport);
  // console.log("Logged in user:", req.user);
    next();
});


app.get("/",(req,res)=>{
  res.render("users/signup-login.ejs");
});

app.get("/home",(req,res)=>{
  res.render("index.ejs");
});

app.get("/showRequest", async (req,res)=>{
  const allRequests = await Requests.find().populate("requester"); // returns an array of all documents
  console.log(allRequests);

  res.render("NgoGov/ngoAndGov.ejs", {allRequests});
});


app.get("/helpVictim/:id", async (req,res)=>{
  res.send("hi");
});

//Implementing routers
app.use("/", victimRouter);
app.use("/", ngoRouter);
app.use("/", userRouter);


app.listen("3000",()=>{
    console.log("app is listening on port 3000");
});