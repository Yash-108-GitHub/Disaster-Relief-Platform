const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.redirect("/");
  }

module.exports.signup =  async(req,res)=>{
  let {username , email , role , Password} = req.body;
  const newUser = new User({username,email,role,Password});
  await newUser.save();
  res.send("User created successfully!");
  }

module.exports.renderLoginForm = (req, res) => {
    res.redirect("/");
  }

module.exports.login =  async(req,res)=>{
  const {Username} = req.body;

  const user = await User.findOne({ username : Username });
  
  console.log(user);
    if(user.role==="Victim"){
      res.render("victim/dashboard.ejs");
    } else if((user.role === "Volunteer")){
      res.render("volunteer/dashboard.ejs");
    } else if(user.role === "NGO") {
      res.render("NGO/dashboard.ejs");
    } else if(user.role === "Government") {
      res.render("Government/dashboard.ejs");
    }
}