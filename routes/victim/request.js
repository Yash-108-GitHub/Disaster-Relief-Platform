const express = require("express");
const router = express.Router();
//controller
const victumController = require("../../controllers/victim.js");


router.route("/request")
 .get(victumController.renderRequestForm)
  .post(victumController.submitRequestForm);

router.route("/myRequest")
  .get(victumController.renderMyRequest);


router.route("/emergencyRequest")  
  .get(victumController.renderEmergencyRequest);

router.get("/test", (req, res) => {
  res.send("Router works!");
});


module.exports = router;