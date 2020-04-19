const path= require('path');
const express= require('express');
const hbs= require('hbs');

const geocode= require('./utils/geocode.js');
const forecast= require('./utils/forecast.js');

// paths to express config directories
const publicPath= path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const parcialsPath= path.join(__dirname, '../templates/parcials');

//setting app to express method for use
const app= express();

//set up public static directory to serve
app.use(express.static(publicPath));

//useing hbs and setting its path to templates/views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(parcialsPath);

//getting and rendering the hbs web pages
app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather",
        name: "AQ Baghi"
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'about',
        name: 'AQ Baghi'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'help',
        name: 'AQ Baghi'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'please provide an adress'
        });
    }

    geocode(req.query.adress, (err, geoData)=>{
        if(err){
            return res.send({ err });
        }
        
        const cityKey= geoData.cityKey;
        const cityName= geoData.cityName;

        forecast(cityKey, (err, forecastData)=>{
            if(err){
                return res.send({ err });
            }

            console.log(forecastData);
            res.send({
                cityKey,
                cityName,
                weatherText: forecastData.weatherText,
                weatherIcon: forecastData.weatherIcon,
                isDayTime: forecastData.isDayTime,
                metricTemperature: forecastData.metricTemperature,
                imperialTemperature: forecastData.imperialTemperature
            });
        });
    });

});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'can not find help page, try the following links...',
        name: 'AQ Baghi'
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'unable to find page, try the following links...',
        name: 'AQ Baghi'
    });
});

//listening to the server
app.listen(3000, ()=>{
    console.log('web server up and running...');
});