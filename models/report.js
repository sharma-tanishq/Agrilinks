const mongoose=require('mongoose');
const { Schema } = mongoose;

const ReportSchema= new Schema({
    cmdtyID:{
        type:String,
        required:true,
    },
    cmdtyName:{
        type:String,
        required:true,
    },
    marketID:{
        type:String,
        required:true,
    },
    marketName:{
        type:String,
        required:true,
    },
    users:{
        type:[String],
        required:true,
    },
    priceUnit:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    timestamp:{
        type:Number,
    }
}
)
Report = mongoose.model('report',ReportSchema);
module.exports=Report;