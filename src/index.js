const express =require('express')
const userRouter=require('../src/router/user')
const auth=require('../src/middleware/auth')
const bodyparser=require('body-parser')
const host="";
const port= process.env.PORT||3000
const path = require('path')
const multer=require('multer')
const lendBooksRouter=require('../src/router/lendbooks');
const notificationsRouter=require('./router/notifications')
const lendRecordsRouter=require('./router/lendRecords')
const bookRouter=require('./router/books')
const reviewRouter=require('./router/review')

//require('../src/utils/scheduleMails')
const hbs=require('hbs')
const nodemailer=require('nodemailer')

// const passport=require('../src/config/passport')
const pubdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'/templates/views')
require('./config/mongo');
const app=express()
const partialspath=path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs');
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// })
app.use(express.static(pubdir))
app.use(reviewRouter)
app.set('views',viewspath)

app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(bodyparser.json())
app.use(notificationsRouter)
app.use(userRouter);
app.use(lendBooksRouter);
app.use(lendRecordsRouter)
app.use(bookRouter)
app.get('/login',async(req,res)=>{
    res.render('login',{host:"localhost:3000"})
})
app.get('/home',async(req,res)=>{
    res.render('home',{host:"localhost:3000"})
})
app.get('/lendingBookDetails/:lbId',async(req,res)=>{
    res.render("aboutBook",{lbId:req.params.lbId,host:"localhost:3000"})
})
app.get('/lendingHistory',async(req,res)=>{
    res.render('lending history')
})
app.get('/borrowingHistory',async(req,res)=>{
    res.render('borrowing history')
})
app.get('/seeNotifications',async(req,res)=>{
    res.render("notification")
})
app.get('/submitReviewPage' ,async(req,res)=>{
res.render("rating")
})
app.get('/updateLendingBook',)
app.listen(port,()=>{
    console.log('server is up on port '+port)

})
 