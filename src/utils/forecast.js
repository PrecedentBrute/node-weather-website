const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid=48c287cf53a812024597258fe210d354&units=metric";
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback("Unable to connect to the weather service!", undefined);
        }else if(body.message){
            callback('Error occured : ' + body.message, undefined);
        }else{
            callback(undefined, {temperature: body.current.temp, weather: body.current.weather[0].main} )
        }

    })
}

module.exports = forecast;