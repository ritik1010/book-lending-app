const path=require('path')
const express=require('express')
 const hbs=require('hbs')
const app=express()
const weather=require('./utils/weather')
const geocode=require('./utils/geocode')
const request=require('request')
const viewspath=path.join(__dirname,'../templates/views')
const pubdir=path.join(__dirname,'../public')
const partialspath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)



app.use(express.static(pubdir))
app.get('',(req,res)=>{
    res.render('index',{title:"Weather ",content:"this is it"})
})

app.get('/about',(req,res)=>{
    res.render('about',{name:"ritik",title:'About'})
})
app.get('/help',(req,res)=>{
    res.render('help',{example:"  this is greagt",title:"HELP"})
})
app.get('/weather',(req,res)=>{
    const address=req.query.address
    geocode(address,(error,data)=>{
     
        const weather=require('./utils/weather')
    if(error){return res.send({error})}
        
    else{     
    }
        weather(data,(error,data)=>{
             return res.send(data)
        })
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        content:"help page not found"
    })

})

app.get('*',(req,res)=>{
    res.render('error',{content:"page not found"})
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
