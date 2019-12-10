const mongoose =require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age Must be positive Number')

            }
        }

    },

    password:{
        type:String,
        required:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
                
            }
        },
        minlength:7,
        trim:true
    },
    address:{
        type:String,
        required:true
    },
    
    city:{
        type:String,
        required:true},
    pincode:{
        type:Number,
        required:true},
    state:{
        type:String},
    gender:{
        type:String},
    lastDateToReturn:{
        type:Date,
        default:null
    },
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }
    ,
    
    tokens:[{
      token:{
       type:String,
        required:true
     }

}]
},{timestamp:true})

userSchema.pre('save', async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()

})

userSchema.methods.toJSON= function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject._id
    
    delete userObject.avatar
    return userObject
}
userSchema.statics.findByCredentials=async(email,password)=>{
    const user= await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error("Unable to Login ")

    }
    else{
    
        const isMatch=await bcrypt.compare(password,user.password)
        
        if(!isMatch){
        
            throw new Error("Unable to Login")


        }
        
        return user
    }


}
userSchema.methods.generateAuthToken= async function(){
    const user= this
    const token=jwt.sign({_id:user._id},'this')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
    

}
const User=mongoose.model('User',userSchema)
module.exports=User