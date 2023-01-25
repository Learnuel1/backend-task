const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const cookieparser=require('cookie-parser');
const {urlencoded} = require('express');
const { getFrontendOrigin } = require('./config/env');
const CONFIG = require('./config');
const ORIGIN = getFrontendOrigin();
const app = express();
app.use(cors({
    origin:ORIGIN,
    methods:['GET','PUT','POST','DELETE','PATCH'],
    credentials:true
}));
 app.set("trust proxy",1)
app.use(morgan('dev'));
app.use(cookieparser());
app.disable('etag'); 
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use("/api/v1/status",(req,res)=>{
    res.send({msg:`Yes!... Welcome to ${CONFIG.APP_NAME} API`});
})

module.exports=app;