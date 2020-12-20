const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        message: 'Weather is nice',
        name: 'PrecedentBrute'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        message: "This site was created by PrBr. It uses data from Mapbox and Openweathermap.",
        name: "PrecedentBrute"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is help",
        title: "Help",
        name: "PrecedentBrute"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address must be provided"
        });
    }

    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} ={}) => {
        if(error){
           return res.send({
               message: error
           })
        }
    
        forecast(longitude, latitude, (werror, {temperature, weather, feelsLike} = {}) => {
            if(werror){
                return res.send({

                    message: werror
                })
            }
            res.send({
                Place: location,
                temperature: temperature,
                Weather: weather,
                feelsLike: feelsLike
            });
        })
        
    })
});


//Comes last as we don't want to give false 404s
app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        title: "404",
        name: "Moriarty"
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: "Page not found",
        title: "404",
        name: "Moriarty"
    });
});


app.listen(port, () => {
    console.log("Server is up on port " + port);
});

