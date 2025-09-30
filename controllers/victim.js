const Requests = require("../models/Requests.js");


module.exports.renderGetRequestForm = (req, res) => {
  res.render("victim/getHelpRequestForm.ejs");
}

module.exports.submitRequestForm = async (req,res)=>{
  let id = req.user._id; //****** passport has info about all collection.
  console.log("Session ID:", id);

  const resourcesNeeded = {
      food: req.body.resourcesNeeded?.food || "No",
      water: req.body.resourcesNeeded?.water || "No",
      shelter: req.body.resourcesNeeded?.shelter || "No",
      medical: req.body.resourcesNeeded?.medical || "No",
      rescue: req.body.resourcesNeeded?.rescue || "No"    
      //If req.body.resourcesNeeded exists → it accesses .food.
      //If req.body.resourcesNeeded does NOT exist → it simply returns undefined
      
      //Case 1: Checkbox checked
           // req.body.resourcesNeeded.food = "Yes"
          // "Yes" || "No" → "Yes" (because "Yes" is truthy)
      // Case 2: Checkbox unchecked
          // req.body.resourcesNeeded.food = undefined
          // undefined || "No" → "No" (because undefined is falsy)
    };

  let allData = { ...req.body, resourcesNeeded, requester: req.user._id };
  let requestData = new Requests(allData);
  let savedData = await requestData.save();
  console.log(savedData);
  res.render("victim/successReqeust.ejs" , id);
}

module.exports.renderMyRequest = (req,res)=>{
   res.render("my_request.ejs");
}

module.exports.renderEmergencyRequest = (req,res)=>{
  res.render("emergencyRequest.ejs");
}