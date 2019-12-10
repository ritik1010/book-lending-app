const express=require('express')
const Books=require('../models/books')
const router= new express.Router()
const multer=require('multer')
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
router.post('/addBook',async (req,res)=>{
    const book=new Books(req.body);
    try{
        await book.save();
        console.log("Book Added")
        res.send(JSON.stringify({book}));

    }
    catch(e){
        res.send(e);

    }

})
router.get('/getBookDetails/:bookName/:bookAuthor',async(req,res)=>{
    const book = await Books.findOne({name:req.query.bookName,author:req.query.author})
    if(book){
        res.send(JSON.stringify(book));

    }
    else{
        res.send({"error":"book not found"})
    }
})
router.post('/bookImage/:bookName/:bookAuthor',upload.single('image'),async(req,res)=>{
    console.log(req.params.bookName+req.params.bookAuthor)
    //const buffer= await sharp(req.file.buffer).resize({width:250,hieght:250}).png().toBuffer()
    const book= await Books.findOne({title:req.params.bookName.replace(/_/g," "),lendBy:req.params.lendBy})
    if(book){
        console.log("image req"+req.params.bookName.replace(/_/g," ")+" ")
        book.image=req.file.buffer
        await book.save()
        res.send("File Uploaded") 
    }
    else{
       
    res.status(404).send("File was not uploaded")}

})
router.get('/bookImage/:bookName/:bookAuthor',async(req,res)=>{
    console.log("book image requested for "+ req.params.bookName+ req.params.bookAuthor)
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

module.exports=router