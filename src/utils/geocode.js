const request= require('request');

const geocode= (cityName, callBack)=>{
    const APIKey='0Qx9NGNE6ArAwyuWGTPICEc66g8ETNgG';
    const cityURL= `http://dataservice.accuweather.com/locations/v1/search?apikey=${APIKey}&q=${encodeURIComponent(cityName)}`;

    request({url: cityURL, json: true}, (err, response)=>{
        if(err){
            callBack('unable to connect to location sevices', undefined);
        }else if(response.body[0]===undefined){
            callBack('unable to find location, try another search', undefined)
        }else{
            callBack(null, {
                cityKey: response.body[0].Key,
                cityName: response.body[0].EnglishName
            });
        }
    });
}

module.exports= geocode;