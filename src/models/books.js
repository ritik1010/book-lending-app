const mongoose=require('mongoose');
const BooksSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    NumOfRating:{
        type:Number
    },
    author:{
        type:String
    },
    genre:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    }
},{timestamps:true});
BooksSchema.methods.toJSON= function(){
    const book=this
    const bookObject=book.toObject()
    delete bookObject.image
   
    
    return bookObject
}
const Book =mongoose.model('Books',BooksSchema)
module.exports=Book;