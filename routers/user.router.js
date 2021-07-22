var express = require('express')
var router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/setAllPaid",userController.setAllUsersPaid);
router.post("/login",userController.postUserLogin)
router.get("/:userID",userController.getUser);
router.put("/:userID",userController.updateUser);


module.exports = router;