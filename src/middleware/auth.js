const jwt=require('jsonwebtoken')
const Users=require('../models/user')
const auth=async(req,res,next)=>{
    console.log('auth tried  '+req)
    if(req.body.token==null){
        res.send('Unauthorized User')
    }
    else{
    try{    console.log(req.body)
        console.log(req.body.token)
        const token=req.body.token
        const decoded=jwt.verify(token,'this')
        const user=await Users.findOne({_id: decoded._id,'tokens.token':token  })
        req.user=user
        req.body.age=user.age
        req.body.city=user.city
        req.body.gender=user.gender
        req.body.state=user.state
        req.body.email=user.email
        req.body.lat=user.lat
        req.body.lng=user.lng

        req.body.address=user.address
        
        req.body.user_id=user._id
        req.body.pincode=user.pincode
        if(!user){
            throw new Error()

        }
        console.log(req.body)
        next()
    }
    catch(e){
        console.log(e)
       res.send('Unauthorized User')

    }}

}
module.exports=auth