const request = require('postman-request')

const forecast =(latitude,longitude,callback)=>{
const urlf='http://api.weatherstack.com/current?access_key=1cdd3644074fcd3064cc56e28b50d739&query=' +latitude+ ',' +longitude+ '&units=f'

request({url:urlf,json:true},(error,response)=>{
if(error){
    callback('OOPS unable to connect weather server',undefined)
}else if(response.body.error){
    callback('OOPS unable to connect find searched location',undefined)
}else{
callback(undefined,response.body.current.weather_descriptions[0] + ' it is currently ' + response.body.current.temperature + ' degrees out.But it really feels like  ' +response.body.current.feelslike +' degrees out!')
}
})
}

module.exports= forecast