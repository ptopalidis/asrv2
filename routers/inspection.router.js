var express = require('express')
var router = express.Router();

//Controllers
const inspectionController = require("../controllers/inspection.controller")

router.post("/",inspectionController.postInspection)
router.get("/byInspectionNumber",inspectionController.getInspectionByInspectionNumber)
router.get("/:inspectionID",inspectionController.getInspection)
router.get("/",inspectionController.getInspections)
router.put("/:inspectionID",inspectionController.updateInspection)


router.get("/:inspectionID/region",inspectionController.getRegionByInspectionID)

module.exports = router;