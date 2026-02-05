require('dotenv').config();

const express = require("express");
const app = express();

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


//_________________________________________________________________________________________________________


//models
const User = require("./models/user.js"); 
const Requests = require("./models/Requests.js");


//_________________________________________________________________________________________________________

//web database atlas 
const MONGO_URL = process.env.MONGO_URL;


//_________________________________________________________________________________________________________

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


//_________________________________________________________________________________________________________


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
    collectionName: "sessions",
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter :24 * 3600,
});
// Better error handling
store.on('error', function(error) {
  console.log('SESSION STORE ERROR:', error);
});

store.on('connected', function() {
  console.log('MongoStore connected to MongoDB Atlas');
});



// _________________________________________________________________________________________________________



app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    }
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
  console.log('User:', req.user);
  next();
});

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//_________________________________________________________________________________________________________





app.get("/",(req,res)=>{
  res.render("users/signup.ejs");
});

app.get("/home",(req,res)=>{
  res.render("index.ejs");
});

app.get("/showRequest", async (req,res)=>{
  const allRequests = await Requests.find().populate("requester"); // returns an array of all documents
  console.log(allRequests);

  res.render("NgoGov/ngoAndGov.ejs", {allRequests});
});

// Implementing routers
app.use("/", victimRouter);
app.use("/", ngoRouter);
app.use("/", userRouter);


app.get("/helpVictim/:id", async (req,res)=>{
  const victimId = req.params.id;
  res.render("NgoGov/help", { victimId });
  
});

const Help = require("./models/help");

app.post("/helpVictim/:id",async(req, res)=>{
  const  victimId = req.params.id;
  const helps = [];

  const resources = [
    {type: "Food", qty: req.body.foodQty},
     { type: "Water", qty: req.body.waterQty },
    { type: "Shelter", qty: req.body.shelterQty },
    { type: "Medical", qty: req.body.medicalQty },
    { type: "Rescue", qty: req.body.rescueQty }
  ];

  resources.forEach(r => {
    if (r.qty && Number(r.qty) > 0) {
      helps.push({
        victim: victimId,
        helpType: r.type,
        Quantity: Number(r.qty)
      });
    }
  });

  if (helps.length === 0) {
        return res.send("No help provided");
  }
    await Help.insertMany(helps);
    res.send("Help assigned successfully");
    console.log(req.body);
});



app.listen("3000",()=>{
    console.log("app is listening on port 3000");
});