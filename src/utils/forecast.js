const request= require('request');

const forecast= (cityKey, callBack)=>{
    const APIKey='0Qx9NGNE6ArAwyuWGTPICEc66g8ETNgG';
    const weatherURL=`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIKey}`;

     request({url: weatherURL, json: true}, (err, response)=>{
        if(err){ 
            callBack('unable to connect to location sevices', undefined);
        }else if(response.body[0]===undefined){
            callBack('unable to find forecast, try another search', undefined);
        }else{
            callBack(null, {
                weatherText: response.body[0].WeatherText,
                weatherIcon: response.body[0].WeatherIcon,
                isDayTime: response.body[0].IsDayTime,
                metricTemperature: response.body[0].Temperature.Metric.Value,
                imperialTemperature: response.body[0].Temperature.Imperial.Value
            });
        }
     });
 }

 module.exports= forecast;