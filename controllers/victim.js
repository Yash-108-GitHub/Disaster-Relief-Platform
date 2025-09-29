module.exports.renderRequestForm = (req, res) => {
    res.render("request.ejs");
}

module.exports.submitRequestForm = (req,res)=>{
  res.send("h")
}

module.exports.renderMyRequest = (req,res)=>{
   res.render("my_request.ejs");
}

module.exports.renderEmergencyRequest = (req,res)=>{
  res.render("emergencyRequest.ejs");
}