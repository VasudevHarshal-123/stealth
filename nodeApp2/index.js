const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const flat = require('./database'); 
const amqp = require('amqplib/callback_api');
let url = 'amqp://cffclshw:ebQfe-yTKh4OKcKRYAVrVOf8llSQfzm0@lionfish.rmq.cloudamqp.com/cffclshw';

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

var ch=null;

app.get('/',(req,res)=>{
    
    let date = new Date(Date.now());
    date.setHours(0,0,0,0); 
    date=date.toISOString();
    let count=flat.getCount(date);
    count.then(data=>{
        res.send(JSON.stringify(data));
        res.end();
    })
 });


amqp.connect(url, (err, conn)=> {
    conn.createChannel((err, ch)=> {
        // ch = channel;
        let queue = 'CloudQueue';
        ch.assertQueue(queue,{durable:false})
        ch.consume(queue,(message)=>{
            console.log("msg received:",message.content.toString());
            let date = new Date(Date.now());
            date.setHours(0,0,0,0); 
            date=date.toISOString();
            flat.insertData(date);
        },{noAck:true});
    });
});

app.listen(8080,()=>console.log("listening to 8080..."));

