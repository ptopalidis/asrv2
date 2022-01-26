var express = require('express')
var router = express.Router();

//Controllers
const pdfController = require("../controllers/pdf.controller")

router.post("/render",pdfController.renderPDF)



module.exports = router;