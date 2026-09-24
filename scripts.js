const apiKey = "b207b8b4aaea2e3873c9e54eb44ea1d6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "https://cdn.meteocons.com/3.0.0-next.10/svg/fill/cloudy.svg"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "https://cdn.meteocons.com/3.0.0-next.10/svg/fill/clear-day.svg"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "https://cdn.meteocons.com/3.0.0-next.10/svg/fill/rain.svg"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "https://cdn.meteocons.com/3.0.0-next.10/svg/fill/drizzle.svg"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "https://cdn.meteocons.com/3.0.0-next.10/svg/fill/mist.svg"
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }
    
};

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (searchBox.value.trim() === "") {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            searchBtn.click();
        }
    }
});

