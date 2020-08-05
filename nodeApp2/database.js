const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const flatSchema = new Schema({
    newDate: Date,
    flag:[{
        count:Number
    }]   
});

const flat = mongoose.model("flat", flatSchema);

flatSchema.on('index', function(error) {
    console.log(error);
});


exports.getCount = async(date)=>{
    return flat.findOne({newDate:new Date(date)}).exec()
    .then(check=>check)
}


exports.insertData = (date)=>{
    var check = flat.find({newDate:new Date(date)}).exec();
    check.then(data=>{
        if(data.length){
            var increment = data[0].flag[data[0].flag.length-1].count;
            increment+=1;
            var result =  flat.updateOne(
                {
                    "newDate": {$eq:new Date(date)},
                },
                {
                $push:{
                     flag:{
                        count:increment,
                        }
                    } 
                })
                .exec();
        }
        else{ 
            const newData = new flat({
                newDate:date,
                    flag:[{
                    count:1
                }]
            });
            return newData.save();
        }
    })
}
    