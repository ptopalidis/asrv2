//Libraries
const path = require("path");
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

//Routers
const userRouter = require("./routers/user.router");
const customerRouter = require("./routers/customer.router")
const categoryRouter = require("./routers/category.router")
const sprayerRouter = require("./routers/sprayer.router")
const preInspectionRouter = require("./routers/preInspection.router")
const inspectionRouter = require("./routers/inspection.router")
const importsRouter = require("./routers/imports.router")

//Middlewares
const dbConnect = require('./middlewares/dbConnect');

//Initiallizing the app
const app = express();

//Configurations
dotenv.config();

//Static files

app.use(express.static("public"));

//Middleware configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload());

//Routing
app.use("/api/users",userRouter)
app.use("/api/customers",customerRouter)
app.use("/api/categories",categoryRouter);
app.use("/api/sprayers",sprayerRouter)
app.use("/api/preInspections",preInspectionRouter)
app.use("/api/inspections",inspectionRouter)
app.use("/api/imports",importsRouter)

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

//Initializing the server
app.listen(process.env.PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running on: " + process.env.PORT);
        dbConnect(process.env.DB_URI);
     
    }
})

