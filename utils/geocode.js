const request=require('request')



const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoieWFzaGJhbnNhbDIzMSIsImEiOiJjanhqdjIxejUxcWRhM3ZsaWYzZjdkdHh6In0.2uTz4Vsh4RXGJglJvPaAQQ'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to laction services')
        }
        else if(response.body.features.length==0){
            callback('unable to find location')
        }
        else{
            callback(undefined, {latitude:response.body.features[0].center[1],longitude:response.body.features[0].center[0],location:response.body.features[0].place_name})
        

        }
    })
}


module.exports=geocode