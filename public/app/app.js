const searchForm= document.querySelector('.search-form');

const weatherTemplate= document.querySelector('.weather-template')

const getWeather= async function(searchedCity){
    const queryLink= `/weather?adress=${searchedCity}`;
    try{
        const response= await fetch(queryLink);
        const data= await response.json();

        return data;
    }catch{
        return 'unable to get weather';
    }
}

searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    let searchedCity= searchForm.search.value;

    getWeather(searchedCity).then(data=>{
        console.log(data)
        if(data.error){
            weatherTemplate.innerHTML=`<p class="err">${data.error}</p>`;
        }else if(data.err){
            weatherTemplate.innerHTML=`<p class="err">${data.err}</p>`;
        }else{
            weatherTemplate.innerHTML=`
            <p class="cityName">${data.cityName}</p>
            <p class="metricTemperature">${data.metricTemperature}°C</p>
            <p class="weatherText">${data.weatherText}</p>
        `;
        }
    });
});

