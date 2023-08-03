const express = require('express')
const app = express()

const port = process.env.PORT || 3000

    
const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.set('view engine', 'hbs')

const viewsDirectory=path.join(__dirname,'../temp/views')
app.set("views", viewsDirectory )


var hbs=require("hbs")
const partialsPath= path.join(__dirname,'../temp/partials')
hbs.registerPartials(partialsPath)


app.get('/',(req,res)=>{
    res.render('index',{
        message : "Welcome to our website"
    })
})

app.get('/check_weather',(req,res)=>{
    res.render('check_weather',{
        country : "egypt",
        latitude : "27.56574543",
        longitude : "29.42038543",
        weather : "sunny",
        temp : "38"
    })
})

app.get('/weather',(req,res)=>{
    res.render('weather',{
        message : "Welcome to weather page"
    })
})

/////////////////////////////////////////////////////////////
const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/hello',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            
            return res.send({error})
        }

        forecast(data.lat,data.lon,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast :forecastData,
                location :req.query.address,
                lat: data.lat,
                lon: data.lon
            
            })
        })
    })
})

// ///////////////////////////////////////////////////////////////////////


app.get('*',(req,res)=>{
    res.send("404 page not found")
})

app.listen(port,()=>{
    console.log(`u r connected to port ${port}`)
})





