var express = require('express')
var router = express.Router();

//Controllers
const preInspectionController = require("../controllers/preInspection.controller")

router.post("/",preInspectionController.postPreInspection)
router.get("/:preInspectionID",preInspectionController.getPreInspection)
router.get("/",preInspectionController.getPreInspections)
router.put("/:preInspectionID",preInspectionController.updatePreInspection)

module.exports = router;