const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/library',{
useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false,
useUnifiedTopology: true
})

//const shop=new tasks({
//     discription:"shop",
//     completed:false
// })
// shop.save().then(()=>{
// console.log(shop)
// }).catch((err)=>{
//     console.log(err)
// })