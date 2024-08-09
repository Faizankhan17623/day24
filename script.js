const API_key = "a6dba9ce1480493f93384806240508 "; 
const Loading  = document.querySelector('.loader')
async function api_call(query){
    Loading.style.display = "block";
    try{
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${query}&days=4&aqi=yes&alerts=yes`);
        const output = await data.json()
        // console.log(output)
        CurrenntData(output)
        First_day(output)

        // Second_day(output)
        // Third_day(output)
        // Fourth_day(output)
        // Searching(output)
        Loading.style.display = "none";
    }catch(error)
    {
        console.log('there is some lafda in the pi',error)
    }
}

function CurrentLoction(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat =  position.coords.latitude;
    let long = position.coords.longitude;
    api_call(`${lat},${long}`)
}


const CurrenntLocation = document.querySelector('[data-current-location]');
CurrenntLocation.addEventListener('click',CurrentLoction)
const input = document.querySelector('[data-input]');
const search = document.querySelector('[data-search]');


var Current_time = " ";
var Current_location = " ";
var Current_temperature = " ";
var Current_wind = " ";
var Current_humidity = " ";
var Current_image = " ";
var Current_description = " ";

function CurrenntData(data){
    Current_time = document.querySelector('[data-currentdaydate]')
    Current_location = document.querySelector('[data-current-location-name]')
    Current_temperature = document.querySelector('[data-currentlocation-temperature]')
    Current_wind = document.querySelector('[data-currentlocation-wind]')
    Current_humidity = document.querySelector('[data-current-location-humidity]');
    
    Current_image = document.querySelector('[data-image]')
    Current_description = document.querySelector('[data-imagedesc]')

    Current_time.textContent = data.location.localtime;
    Current_location.textContent = data.location.name;
    Current_temperature.textContent = data.current.temp_c;
    Current_wind.textContent  = data.current.wind_mph;
    Current_humidity.textContent = data.current.humidity;
    
    
    Current_image.src =data.current.condition.icon;
    Current_description.textContent = data.current.condition.text; 
    // some extra precutions for that we are printing all of them on the console
    // console.log("\n",time,"\n",Location_name,"\n",Location_temperature ,"\n",Current_Location_wind,"\n",Current_location_humidity)
}


// this is the code for the remmaining days 
function First_day(data){
    Current_time = document.querySelector('[data-date]')
    Current_image = document.querySelector('.images')
    Current_temperature = document.querySelector('[data-temp]')
    Current_wind = document.querySelector('[data-wind]')
    Current_humidity = document.querySelector('[data-humidity]');
    Current_description = document.querySelector('[data-name]');

    Current_time.innerText = "the time is"
    Current_time.textContent = data.forecast.forecastday[0].date;
    Current_temperature.textContent = data.forecast.forecastday[0].day.maxtemp_c;
    Current_wind.textContent= data.forecast.forecastday[0].day.maxwind_kph;
    Current_humidity.textContent= data.forecast.forecastday[0].day.avghumidity;
    
    Current_image.src = data.forecast.forecastday[0].day.condition.icon;
    Current_description.textContent = data.forecast.forecastday[0].day.condition.text;

    // second one
    
    Current_time = document.querySelector('[data-second-date]')
    Current_image = document.querySelector('[data-second-image]')
    Current_temperature = document.querySelector('[data-second-Temp]')
    Current_wind = document.querySelector('[data-second-wind]')
    Current_humidity = document.querySelector('[data-second-humidty]')
    Current_description = document.querySelector('[data-image-info]');
    Current_time.textContent = data.forecast.forecastday[1].date;
    Current_image.src =data.forecast.forecastday[1].day.condition.icon;
    Current_temperature.textContent = data.forecast.forecastday[1].day.maxtemp_c;
    Current_wind.textContent= data.forecast.forecastday[1].day.maxwind_kph;
    Current_humidity.textContent= data.forecast.forecastday[1].day.avghumidity;
    Current_description.textContent = data.forecast.forecastday[1].day.condition.text;


    // third one
    Current_time = document.querySelector('[data-third-date]')
    Current_image = document.querySelector('[data-third-image]')
    Current_temperature = document.querySelector('[data-third-Temp]')
    Current_wind = document.querySelector('[data-third-wind]')
    Current_humidity = document.querySelector('[third-humidty]')
    Current_description  = document.querySelector('[data-iages-info]');
    
    
    Current_time.textContent = data.forecast.forecastday[2].date;
    Current_image.src =data.forecast.forecastday[2].day.condition.icon;
    Current_temperature.textContent = data.forecast.forecastday[2].day.maxtemp_c;
    Current_wind.textContent= data.forecast.forecastday[2].day.maxwind_kph;
    Current_humidity.innerText= data.forecast.forecastday[2].day.avghumidity;
    Current_description.textContent = data.forecast.forecastday[2].day.condition.text;


    // fourth one
    Current_time = document.querySelector('[data-dourth-date]')
    Current_image = document.querySelector('[data-fourth-image]')
    Current_temperature = document.querySelector('[data-fourth-Temp]')
    Current_wind = document.querySelector('[data-fourth-wind]')
    Current_humidity = document.querySelector('[fourth-humidty]')
    Current_description = document.querySelector('[data-images-info]')
    
    Current_time.textContent =data.forecast.forecastday[0].date;
    Current_image.src =data.forecast.forecastday[0].day.condition.icon;
    Current_temperature.textContent = data.forecast.forecastday[0].day.maxtemp_c;
    Current_wind.textContent= data.forecast.forecastday[0].day.maxwind_kph;
    Current_humidity.textContent= data.forecast.forecastday[0].day.avghumidity;
    Current_description.textContent = data.forecast.forecastday[0].day.condition.text;
}

function Input_search() {
    const query = input.value.trim();
    if (query !== "") {
        api_call(query);
    }
}

search.addEventListener('click', Input_search);