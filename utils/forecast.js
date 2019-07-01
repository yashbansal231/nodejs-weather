const request=require('request')



const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/aaae93052fad310d21bd94b50e7079c3/37.8267,-122.4233'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to laction services')
        }
        else if(response.body.error){
            callback('unable to find location')
        }
        else{
            callback(undefined, response.body.daily.data[0].summary)
        

        }
    })
}

module.exports=forecast

