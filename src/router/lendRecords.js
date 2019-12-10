const express=require('express')
const router =new express.Router()
const auth=require('../middleware/auth')
const lendRecords=require('../models/lendRecords')
const Lb=require('../models/lendbooks')
const Books=require('../models/books')
const sendRecommendations=require('../utils/sendRecommendations')
router.get('/getBorrowingHistory/:borrowerId',async (req,res)=>{
    try{    console.log("Borrowing history requested by "+req.params.borrowerId)
            const lr=await lendRecords.find({borrowedBy:req.params.borrowerId})
            res.send(JSON.stringify(lr))
    }
    catch(e){
        console.log(e)
        res.send(e)

    }
})
router.get('/getLendingHistory/:lenderId',async (req,res)=>{
    try{    console.log("Lending history requested by "+ req.params.lenderId)
            const lr=await lendRecords.find({lendBy:req.params.lenderId})
            res.send(JSON.stringify(lr))
    }
    catch(e){
        console.log(e)
        res.send(e)

    }
})
router.post('/subReview',auth,async (req,res)=>{
    console.log(req.body)
    
        console.log(req.body)
    console.log("review submitted "+req.body)
    const lb=await Lb.findOne({title:req.body.title,lendBy:req.body.lendBy})
    const book=await Books.findById(lb.bookId)
    console.log(lb,book)
    var rating =parseInt(book.rating)
    var no=  parseInt(book.NumOfRating)
    var UserRating=parseInt(req.body.rating)
    rating=((rating*no)+UserRating)/(no+1)
    no++;
    book.rating=rating;
    book.NumOfRating=no
    await book.save()

    sendRecommendations(req.body.name,req.body.email,book.title,rating)
    
    res.send("Review Submitted")
})

module.exports=router