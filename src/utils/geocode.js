const request=require('request')
const Users=require('../models/user')

 async function geocode(address,user,callback){
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoicml0aWswNyIsImEiOiJjanZvcG4yNHAwamg3NDVvMXhyMnVjMmhwIn0.u02BBKgTTzCH3kbog1QwOQ"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to services',undefined)}
        else if(response.body.features.length===0){
            callback('unable to find location try another search',undefined)
        }
        else{
            callback(undefined,{
                placename:response.body.features[0].place_name,
                lat:response.body.features[0].center[0],
                lng:response.body.features[0].center[1]

    
            },user)
        }
    })

}
module.exports=geocode