const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const stealthSchema = new Schema({
    newDate: {type:Date, default: Date.now},
    name:{type:String, required:true},
    age:{type:Number, required:true},
    file:{data:Buffer,type:String},
    // file:{ type: Buffer, required: true },
    fileName:{type:String, required:true}
        
});

const stealth = mongoose.model("stealth", stealthSchema);

stealthSchema.on('index', function(error) {
    console.log(error);
});


exports.insertData = (name,age,file)=>{
    const newData = new stealth({
        name:name,
        age:age,
        file:file.buffer,
        fileName:file.originalname
    });

    return newData.save();
}
                     

