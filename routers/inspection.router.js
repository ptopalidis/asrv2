var express = require('express')
var router = express.Router();

//Controllers
const inspectionController = require("../controllers/inspection.controller")

router.post("/",inspectionController.postInspection)
router.post("/report/web",inspectionController.generateInspectionsReportWeb)
router.post("/report/csv",inspectionController.generateInspectionsReportCSV)
router.get("/byInspectionNumber",inspectionController.getInspectionByInspectionNumber)
router.get("/:inspectionID",inspectionController.getInspection)
router.get("/:inspectionID/withData",inspectionController.getInspectionWithData)
router.post("/filter",inspectionController.getInspections)
router.post("/filter/withData",inspectionController.getInspectionsWithData)
router.post("/number",inspectionController.getTotalInspectionsNumber)
router.put("/:inspectionID",inspectionController.updateInspection)


router.get("/:inspectionID/region",inspectionController.getRegionByInspectionID)

module.exports = router;