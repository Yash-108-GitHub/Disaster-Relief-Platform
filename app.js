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


//models
const User = require("./models/user.js"); 
const Requests = require("./models/Requests.js");

//web database atlas
const MONGO_URL = process.env.MONGO_URL;

// local db
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




// const store = MongoStore.create({
//     mongoUrl : MONGO_URL,
//     collectionName: "sessions",
//     crypto: {
//         secret: process.env.SECRET,
//     },
//     touchAfter :24 * 3600,
// });

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  collectionName: "sessions",
  crypto: { 
    secret: process.env.SECRET 
  },
  touchAfter: 24 * 3600,
});

// Better error handling
store.on('error', function(error) {
  console.log('SESSION STORE ERROR:', error);
});

store.on('connected', function() {
  console.log('MongoStore connected to MongoDB Atlas');
});



// app.use(session({
//   store,
//   resave : false,
//   saveUninitialized : false,

//   // secret : "mysecret",
//   secret : process.env.SECRET,

//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 1000 * 60 * 60 * 24,

//     httpOnly : true,
//     // secure: false,
//   },
// }));

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: 'lax'
    }
  })
);


// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware
app.use((req, res, next) => {
  console.log('=== SESSION DEBUG ===');
  console.log('Session ID:', req.sessionID);
  console.log('Session:', req.session);
  console.log('Passport in session:', req.session?.passport);
  console.log('User:', req.user);
  console.log('Is authenticated:', req.isAuthenticated());
  console.log('=== END DEBUG ===');
  next();
});

passport.use(new LocalStrategy(User.authenticate()));



// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// With explicit methods:
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Deserializing user:', user);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


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

// Add this route temporarily
app.get('/debug-users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log('=== ALL USERS IN DATABASE ===');
        users.forEach(user => {
            console.log(`Username: ${user.username}, Email: ${user.email}, Role: ${user.role}`);
        });
        console.log('=== END USERS LIST ===');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

//Implementing routers
app.use("/", victimRouter);
app.use("/", ngoRouter);
app.use("/", userRouter);

app.get("/helpVictim/:id", async (req,res)=>{
  res.send("hi");
});




app.listen("3000",()=>{
    console.log("app is listening on port 3000");
});