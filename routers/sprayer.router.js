var express = require('express')
var router = express.Router();

//Controllers
const sprayerController = require("../controllers/sprayer.controller");

router.post("/",sprayerController.postSprayer)
router.get("/:sprayerID",sprayerController.getSprayer)
router.put("/:sprayerID",sprayerController.updateSprayer)
router.get("/",sprayerController.getSprayers)

module.exports = router;