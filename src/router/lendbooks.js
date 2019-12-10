const Lb=require('../models/lendbooks')
const LendRecords=require('../models/lendRecords')
const express=require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
const diffInDates=require('../utils/diffInDates')
const date_ob=new Date()
const Books=require('../models/books')
const Geo=require('geo-nearby')
const Notifications=require('../models/notifiactions')
const multer=require('multer')
const sendEmail=require('../utils/sendEmail')

const upload=multer({
    limits:{
        fileSize:1000000,

    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('Please upload images'))

        }
        // cb(new Error('Please upload only image'))
         cb(undefined,true)
        // cb(undefined,false)
    }
})
// route to upload books to lend
router.post('/addlendingbook',auth,async (req,res)=>{
    console.log("book adding to lend")
    console.log(req)
    req.body.lendBy=req.body.email
    
    


    try{
        const book =await Books.findOne({title:req.body.title,author:req.body.author})
        
        
        
    if(book){
            console.log("here2"+book.title)
            req.body.bookId=book._id;
            console.log(req.body.bookId)
            const lb=new Lb(req.body);
            await lb.save()
        res.status(201).send("book uploaded for lending")
        console.log("response send")
        }
        else{
            console.log("here3")
            const book1=new Books(req.body);
            console.log("here4")
            await book1.save();
            req.body.bookId=book1._id;
            const lb=new Lb(req.body);
            await lb.save()
        res.status(201).send("book uploaded for lending")
            

        }
        
        
    }
    catch(e){
        console.log(e)
        res.sendStatus(400).send("Unable to upload book for lending")
    }

})
//route to request borrowing of book
router.post('/reqBorrow',auth,async(req,res)=>{
    const lb= await Lb.findOne({lendBy:req.body.lendBy,title:req.body.title,status:"Available"})
    if(lb){
        console.log("book requested for lending found")
        req.body.bookId=lb._id
        req.body.borrowedBy=req.body.email
        req.body.email=req.body.lendBy
        
        req.body.message=req.body.borrowedBy+" Has requested to lend your book "+req.body.title+". Would you like to lend the book tommorow";
        const notifiactions=new Notifications(req.body);
        await notifiactions.save();
        
        res.send("Borrow Request Sent")
        sendEmail(req.body.lendBy,"Your book "+req.body.title+" has been requested for lending",req.body.email +"has requested to borrow your book ",undefined)
    }
    else{
    res.send("Already Borrowed")
    }
})
router.post('/acceptBorrow',auth,async(req,res)=>{
    console.log(req.body.notificationId)
    const notification= await Notifications.findById(req.body.notificationId)
    console.log(notification)
    if(req.body.accepted=='true'){const notification1 =new Notifications({email:notification.borrowedBy,lendBy:notification.lendBy,borrowedBy:notification.borrowedBy,bookId:notification.bookId,
        email:notification.borrowedBy,message:"Congrats! your borrow request has been accepted, you can collect the book tommorow ",
    title:notification.title})
    await notification1.save()
    const lb=await Lb.findById(notification.bookId)
    req.body.dateOfIssue= new Date();
    notification.status="Inactive"
    await notification.save()
    req.body.borrowedBy=notification.borrowedBy
    req.body.lendBy=notification.lendBy
    lb.status="Borrowed"
    var db1=Date.now();
    var db2=new Date(db1+604800000)
    lb.nextAvail=db2
    req.body.dateOfReturn=db2
    await lb.save()
    req.body.title=notification.title
    const lendRecords=new LendRecords(req.body)
    await lendRecords.save()
    console.log("Made changed for accept lending")
    res.send("borrowed")}
    else{
        const notification1= new Notifications({email:notification.borrowedBy,title:notification.title,lendBy:notification.lendBy,borrowedBy:notification.borrowedBy,
        message:"Sorry, you borrow request has been rejected",bookId:notification.bookId})
        await notification1.save()
        notification.status="Inactive"
    await notification.save()
    res.send("Done")
    }
    

    


})
// route when user returns a book  it will return the charge and fine leived on the user
router.post('/reqReturn',auth,async(req,res)=>{
    const lb=await Lb.findOne({lendBy:req.body.lendBy,title:req.body.title})
    console.log(lb)
    const LendRecord= await LendRecords.findOne({borrowedBy:req.body.email,title:req.body.title,status:"Active",lendBy:req.body.lendBy})
    
    if(lb){
        
            const notification=new Notifications({title:LendRecord.title, email:lb.lendBy,lendBy:lb.lendBy,borrowedBy:LendRecord.borrowedBy,message:req.body.email+" would like to return your book  "+LendRecord.title,bookId:lb._id})
            await notification.save()
            
            
            await LendRecord.save()
            await lb.save()
            res.send("return request sent")
            
        
    }
    else{
    res.send("Invalid Request(Book is not borrowed");
    }
})
router.post('/acceptReturnRequest',auth,async (req,res)=>{
    const notification=await Notifications.findById(req.body.notificationId)
    console.log(notification)
    if(notification==null){
        res.send("Invalid Notification id")
    }
    else{req.body.borrowedBy=notification.borrowedBy
    
        notification.status="Inactive"
        
        
        const lb= await Lb.findById(notification.bookId)
        const lendRecords= await LendRecords.findOne({lendBy:notification.lendBy,borrowedBy:notification.borrowedBy,title:notification.title,status:"Active"})
        console.log(lendRecords)
        lendRecords.status="Returned"
        lendRecords.dateOfReturn= new Date()
        lendRecords.noOfDays=diffInDates(new Date(lendRecords.dateOfIssue),new Date(lendRecords.dateOfReturn))
        if(lendRecords.noOfDays<7){
            const notification1=new Notifications({email:notification.borrowedBy,borrowedBy:notification.borrowedBy,lendBy:notification.lendBy,
                title:notification.title,message:"Your Book has been returned. Total charge is Rs. 100.Please pay"})
                await notification1.save()
        }
        else{
            const notification1=new Notifications({email:notification.borrowedBy,borrowedBy:notification.borrowedBy,lendBy:notification.lendBy,
                title:notification.title,message:"Your Book has been returned. Total charge is Rs. 100 ,plus 500 fine.Please pay"})
                await notification1.save()
        }
        await lendRecords.save()
        lb.status="Available"
        await lb.save()
        await notification.save()
        
        res.send('Return compelete')}
    
})
router.post('/getNearbyBooks',auth,async(req,res)=>{
    console.log("getting nearby book requested")
    const lb= await Lb.find({lendBy:{$ne:req.body.email}})
    console.log(JSON.stringify(lb))

    const dataSet=Geo.createCompactSet(JSON.stringify(lb),{id:'_id',lat:'lat',lon:'lon'})

    console.log(dataSet)
    // const geo=new Geo(dataset)
    // console.log(geo.nearBy(lat=,lon=23.206819))
    
      
      const geo = new Geo(dataSet, { sorted: true });
    const result=[]
      const resDs=geo.nearBy(parseFloat(req.body.lat), parseFloat(req.body.lng), 50000000);
    //   resDs.forEach(async element => {
    //     const lb=await Lb.findById(element.i)
    //     const book=await Books.findById(lb.bookId) 
    //     result.push({book,lb})
    //     console.log(result)
    //     send(result)
    //   });
    for(let i=0;i<resDs.length;i++){
        var element=resDs[i]
        const lb=await Lb.findById(element.i)
        console.log(lb.bookId)
         const book=await Books.findById(lb.bookId) 
         result.push({book,lb})

    }

          res.send(JSON.stringify(result))
      
      

    

})
router.post('/bookLbImage/:bookName/:lendBy',upload.single('image'),async(req,res)=>{
    //const buffer= await sharp(req.file.buffer).resize({width:250,hieght:250}).png().toBuffer()
    const lb= await Lb.findOne({title:req.params.bookName.replace(/_/g," "),lendBy:req.params.lendBy})
    if(book){
        console.log("image req"+req.params.bookName.replace(/_/g," ")+" ")
        lb.image=req.file.buffer
        await lb.save()
        res.send("File Uploaded") 
    }
    else{
       
    res.status(404).send("File was not uploaded")}

})
router.get('/bookLbImage/:bookName/:bookAuthor',async(req,res)=>{
    console.log("book image requested")
    try{
    const book= await Books.findOne({title:req.params.bookName.replace(/_/g," "),author:req.params.bookAuthor.replace(/_/g," ")})
    if(!book||!book.image){
        throw new Error("No image Found")
    }
    res.set('Content-Type','image/jpeg')
    res.send(book.image)

    }
    catch(e){

    }

})
router.get('/getBookDetails/:lbid',async(req,res)=>{
    const lb=await Lb.findById(req.params.lbid)
    const book=await Books.findById(lb.bookId)
    res.send(JSON.stringify({lb,book}))
})
module.exports=router