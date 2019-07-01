const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('../utils/geocode')
const forecast=require('../utils/forecast')
const app=express()
const port=process.env.PORT || 3000
app.use(express.static(path.join(__dirname,'../public')))
// app.get('',(req,res)=>{
//     res.send('Hello express')
    
// })
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialpath)


app.set('view engine','hbs')
app.set('views',viewspath)


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'yash'
    })
    
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        helptext:'here for your help',
        name:'yash'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide address'})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitude,(error,foredata)=>{
            if(error){
                return res.send({error})
            }   
            res.send({
                forecast:foredata,
                location:location,
                address:req.query.address
            })
        })
    })
    
})

//sending json
// app.get('/about',(req,res)=>{
//     res.send([{
//         name:'Andreq',
//         age:22
//     },{name:'sarah', age:21}])
// })
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'yash'
    })
})
app.get('*',(req,res)=>{
    res.render('my404',{
        title:'About',
        name:'yash',
        errormsg:'So you got dump'
    })
})
app.listen(port,()=>{
    console.log('Server is up')
})
