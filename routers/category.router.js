var express = require('express')
var router = express.Router();

//Controllers
const categoryController = require("../controllers/category.controller");


router.get("/all",categoryController.getAllCategories)
router.get("/:categoryID",categoryController.getCategory)


module.exports = router;