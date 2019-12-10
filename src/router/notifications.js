const express=require('express')
const router= new express.Router()
const auth=require('../middleware/auth')
const Notifications=require('../models/notifiactions')
router.post('/getAllNotifications',auth,async(req,res)=>{
    console.log(req.body.email)
    const notfications= await Notifications.find({status:"Active",email:req.body.email})
    res.send(JSON.stringify(notfications))
})
router.post('/notificationSeen',async(req,res)=>{
    console.log("notification seen requested")
    const notification=await Notifications.findById(req.body.notificationId)
    notification.status="Inactive"
    notification.save()
    res.send("done")
})
router.post('/notificationPaid',async(req,res)=>{
    console.log("notification seen requested")
    const notification=await Notifications.findById(req.body.notificationId)
    notification.status="Inactive"
    notification.save()
    res.send("done")
})
router.post('/submitReview',async(req,res)=>{
    console.log(req)
    // console.log(req.params.bookName+req.params.bookAuthor)
    // //const buffer= await sharp(req.file.buffer).resize({width:250,hieght:250}).png().toBuffer()
    // const book= await Books.findOne({title:req.params.bookName.replace(/_/g," "),lendBy:req.params.lendBy})
    // if(book){
    //     console.log("image req"+req.params.bookName.replace(/_/g," ")+" ")
    //     book.image=req.file.buffer
    //     await book.save()
    //     res.send("File Uploaded") 
    // }
    // else{
       
    // res.status(404).send("File was not uploaded")}
res.send("done")
})
module.exports=router