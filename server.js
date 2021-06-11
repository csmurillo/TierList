const express=require('express');
const app=express();
const path=require('path');

var multer  = require('multer');
var dz= require('./static/js/server-side/dropZoneHelper');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/images')
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
dz.dropZoneHelper();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'./static')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,cache-control"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

const PORT = process.env.PORT||3000;

app.get('/',(req,res)=>{
    res.render('pages/index');
});


app.post('/uploadImages',upload.array('image',100),(req,res)=>{
    console.log(req.files);
    res.json({success:"success",files:req.files});
});


app.listen(3000,()=>{
    console.log(`server on ${PORT}`);
});


