const express= require('express')
const path =require('path')
const hbs= require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()
const port = process.env.PORT || 3000
//define paths for Express config
const publicDir= path.join(__dirname,"../public")
const viewspath=path.join(__dirname,"../templates/views")
const partialPath=path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialPath)

//setup  static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{

    res.render('index',{
        title:"Weather App",
        name :"Rajat Raj Kaushik",
    })
})
app.get("/about",(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:"Rajat Raj Kaushik"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Rajat Raj Kaushik"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }
    geoCode(req.query.address,(error,gdata)=>{
        if(error){
            return res.send({error})
        }
        forecast(gdata.longitude,gdata.latitude,(error,fdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: fdata,
                location:gdata.location,
                address: req.query.address
            })
        })
    })
    
    
    
        // res.send({
        //     forecast: 'ITS RAINY  TODAY',
        //     location: 'MURADNAGAR',
        //     address:req.query.address
        // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            errorMessage:'you must provide search term'
    })
    
}
console.log(req.query.search)
res.send({
    products:[]
})

})

app.get('/help/*',(req,res)=>{
res.render('404',{
    title: "404 Page",
        name :"Rajat Raj Kaushik",
        errorMessage:"Help Article Not Found"
})
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: "404 Page",
        name :"Rajat Raj Kaushik",
        errorMessage:"Page Not Found"
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})