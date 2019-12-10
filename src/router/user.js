const express=require('express')
const Users=require('../models/user')
const router =new express.Router()
const auth=require('../middleware/auth');
const geocode=require('../utils/geocode')

router.post('/users',async(req,res)=>{
   
    const user=new Users(req.body)
    
    try{
        
        
        geocode(user.address+" "+user.city+" "+user.state+" "+"India",user,async (err,resp,user)=>{
            if(err){
                
                console.log(err)
        res.sendStatus(400).send("Unable to sign up")
            }
            else{
                console.log("Lat Lng found Saving user")
            user.lat=resp.lat;
            user.lng=resp.lng;
            await user.save();
            const token=await user.generateAuthToken()
        res.status(201).send(JSON.stringify({user:user,token:token}))}
            
        })
        

    }
    catch(e){
        console.log(e)
        res.sendStatus(400).send("Unable to sign up")
    } 
})
// require('../config/passport')
router.post('/users/login',async(req,res)=>{

    try{console.log(req.body)
        const user=await Users.findByCredentials(req.body.email,req.body.password)
        
        const token=await user.generateAuthToken()

        res.status(200).send(JSON.stringify({user:user,token:token}))


    }
    catch(e){
        
        console.log(e)
        res.status(200).send("Invalid password or username")
    }    
})
router.post('/users/logout',auth,async(req,res)=>{
    console.log("log req")
    try{
        console.log(req.user.token)
        req.user.tokens= req.user.tokens.filter((token)=>{
                return token.token!==req.body.token
        })
        await req.user.save()
        res.send("logged out")
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})
router.post('/users/checkEmail',async(req,res)=>{
    try{
    
        const user=await Users.findOne({email:req.body.email})
        if(user==null){
            res.send("true")
        }
        else{
            res.send("false")
        }
    }
    catch(e){
        res.send(e)}
    
})
router.post('/checkToken',auth,(req,res)=>{
try{
res.send("true")
}
catch(e){
res.send("false")
}
})


module.exports=router