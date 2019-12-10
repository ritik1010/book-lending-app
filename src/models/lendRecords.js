const mongoose=require('mongoose')
const lendRecordSchema=new mongoose.Schema({
    borrowedBy:{
        type:String,
        required:true
    },
    lendBy:{
        type:String,
        required:true
    },
    dateOfIssue:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
    ,
    totalCost:{
        type:Number
    },
    status:{
        type:String,
        default:"Active"    //will become returned after retuerning the book
    },
    noOfDays:{
        type:Number,
        default:7
    },
    dateOfReturn:{
        type:String,


    },
    paid:{
        type:String,
        default:"Unpaid"
    }

},{timestamps:true})

const LendRecords=mongoose.model('LendRecords',lendRecordSchema);
module.exports=LendRecords;