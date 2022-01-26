
var wkhtmltopdf = require('wkhtmltopdf');

exports.renderPDF = async(req,res)=>{
    console.log(req.body.htmlString)
    wkhtmltopdf(req.body.htmlString)
    .pipe(res);
}