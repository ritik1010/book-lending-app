const request =require('request')
const weather=(data,callback)=>{
    const pos=[data.lng,data.lat]
    const url="https://api.darksky.net/forecast/d2dc00e73c9a127a61f4ee61c30a1f64/"+pos

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to reach network services",undefined)
        }
        else{
            callback(undefined,{location:data.placename,temp:response.body.currently.temperature})
        }


    })
}
module.exports=weather