var express = require('express')
var router = express.Router();
const customerController = require("../controllers/customer.controller");



router.post("/",customerController.postCustomer);
router.get("/all",customerController.getAllCustomers);
router.get("/",customerController.getCustomers);
router.post("/exports/csv",customerController.createCustomersCSV)
router.get("/:customerID",customerController.getCustomer)
router.put("/:customerID",customerController.updateCustomer)



module.exports = router;