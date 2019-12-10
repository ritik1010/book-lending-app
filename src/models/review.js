const mongoose=require('mongoose')
const ReviewSchema= new mongoose.Schema({
    userId:{
        type:String
    }
    ,
    bookid:{
        type:String
        },
        rating:{
            type:Number
        }
})
const Reviews= mongoose.model('reviews',ReviewSchema)
module.exports=ReviewSchema