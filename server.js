const express=require('express');
const app=express();
const path=require('path');
const fs = require('fs');

var multer  = require('multer');
var dz= require('./static/js/server-side/dropZoneImagesHelper');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/images')
    },
    filename: function (request, file, callback) {
        // console.log(file);
        callback(null, file.originalname)
    }
});
var upload = multer({ storage: storage });
dz.dropZoneHelper();

app.set('view engine', 'ejs');
app.use('/images', express.static(path.join(__dirname, 'images')))
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

app.delete('/deleteImages/:items',(req,res)=>{
    var queueDeleteLinkz=[];
    console.log('deletedeletedeletedeletedeletedeletedeletedeletedeletedelete');
    console.log(req.params.items);
    var collection=req.params.items.split('3000');
    console.log(collection);
    for(var i=0; i<collection.length;i++){
        // console.log(collection[i]);
        // console.log(collection[i].split('&').shift());
        queueDeleteLinkz.push(collection[i].split('&').shift());
    }
    console.log(queueDeleteLinkz);
    queueDeleteLinkz.shift();
    console.log(queueDeleteLinkz);
    

    res.send('Got a DELETE request at /user')
    for(var x=0; x<queueDeleteLinkz.length;x++){
        fs.unlink('.'+queueDeleteLinkz[x].replace('%20',' '), (err) => {
            if (err) {
              console.error(err)
              return
            }
          
            //file removed
          })
    }

});
app.post('/uploadImages',upload.array('image',100),(req,res)=>{
    // console.log(req.files);
    res.json({success:"success",files:req.files});
});
app.get('/images',(req,res)=>{
    let imagePathsArray=[];
    // wait for upload to be completed
    setTimeout(()=>{
        fs.readdir('./images', (err, files) => {
            files.forEach(file => {
              imagePathsArray.push('http://'+req.headers.host+'/images/'+file);
            });
            res.json({images: imagePathsArray});
        });
    },5000);
});


app.listen(3000,()=>{
    console.log(`server on ${PORT}`);
});


