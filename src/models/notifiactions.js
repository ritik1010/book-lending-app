const moongoose=require('mongoose')
const Notifications= new moongoose.Schema({
    email:{
        type:String
    },
    borrowedBy:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Active"
    },
    message:{
        type:String
    },
    title:{
        type:String
    },
    lendBy:{
        type:String
    },
    bookId:{
        type:String
    }

},{timestamps:true});
const Notification=moongoose.model('Notifications',Notifications)
module.exports=Notification;
