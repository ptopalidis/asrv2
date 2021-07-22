var express = require('express')
var router = express.Router();
const importsController = require("../controllers/imports.controller");

router.get("/:IDNumber/customers",importsController.getOldCustomers)
router.post("/:IDNumber/customers",importsController.importCustomers)
router.delete("/:IDNumber/customers",importsController.deleteAllCustomers)

module.exports = router;