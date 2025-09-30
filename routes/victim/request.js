const express = require("express");
const router = express.Router();
//controller
const victumController = require("../../controllers/victim.js");


router.route("/help-requests")
 .get(victumController.renderGetRequestForm)
  .post(victumController.submitRequestForm);

router.route("/victim/my-requests")
  .get(victumController.renderMyRequest);


router.route("/emergencyRequest")  
  .get(victumController.renderEmergencyRequest);

router.get("/test", (req, res) => {
  res.send("Router works!");
});


module.exports = router;