const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose'); 
const stealth  = require('./database'); 
// mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})
mongoose.connect('mongodb+srv://Vasudev_Harshal:fJKVwVfCrVghYJfI@cluster0-7ljo4.azure.mongodb.net/stealth?retryWrites=true&w=majority',{useNewUrlParser: true})
    .then(()=>console.log("connected to database..."))
    .catch(err=>console.log("cannot connect",err));
 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');                                 
    res.setHeader('Access-Control-Allow-Method','GET,PUT,POST,PATCH,DELETE');         
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');                                                                                          
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: true}));




app.post('/inputReceived',upload.single('file'),(req,res,next)=>{
    let file = req.file;
    let name = req.body.name;
    let age = req.body.age;
    // console.log(name,age);

    stealth.insertData(name,age,file)
    .then(value=>{console.log("Saved")})
    .catch(err=>console.log(err))

    res.send('received');
});




app.listen(8081,()=>console.log("listening to 8080..."));


















// const storage = multer.diskStorage({
//     destination: './',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + 
//     path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage
// }).single('featuredImage');




// const upload = multer({storage: storage});




// let data = req.body;
    // data = JSON.parse(data);
    // console.log(data);