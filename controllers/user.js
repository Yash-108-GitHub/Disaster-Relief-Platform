const User = require("../models/user.js");
const passport = require("passport");

module.exports.renderSignupForm = (req, res) => {
    res.redirect("/");
  }

  // Signup handler
module.exports.signup = async (req, res) => {
  console.log("req.body:", req.body); // check form data
  const { username, email, role, password } = req.body;

  try {
    // Create and register user in one step
    await User.register(new User({ username, email, role }), password);
    res.send("User created successfully!");
  } catch (err) {
    console.log("Error creating user:", err.message);
    res.send("Error creating user: " + err.message);
  }
};



// Login form
module.exports.renderLoginForm = (req, res) => {
  res.render("login.ejs"); // or res.redirect("/")
};

// module.exports.signup =  async(req,res)=>{
//   let {username , email , role , password} = req.body;
//   const newUser = new User({username,email,role,password});
//   await newUser.save();
//   res.send("User created successfully!");
//   }

// module.exports.renderLoginForm = (req, res) => {
//     res.redirect("/");
//   }

// module.exports.login =  passport.authenticate("local", {
//     failureRedirect: "/login",
// }),
//   async(req,res)=>{
//   const {Username} = req.body;

//   const user = await User.findOne({ username : Username });
  
//   console.log(user);
//     if(user.role==="Victim"){
//       res.render("victim/dashboard.ejs");
//     } else if((user.role === "Volunteer")){
//       res.render("volunteer/dashboard.ejs");
//     } else if(user.role === "NGO") {
//       res.render("NGO/dashboard.ejs");
//     } else if(user.role === "Government") {
//       res.render("Government/dashboard.ejs");
//     }
// }

// Login handler
module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login"); // login failed

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Redirect based on role
      if (user.role === "Victim") return res.render("victim/dashboard.ejs");
      if (user.role === "Volunteer") return res.render("volunteer/dashboard.ejs");
      if (user.role === "NGO") return res.render("NGO/dashboard.ejs");
      if (user.role === "Government") return res.render("Government/dashboard.ejs");
    });
  })(req, res, next);
};