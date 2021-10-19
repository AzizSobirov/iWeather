let as_nav_h2 = "iWeather"
let as_nav_h3 = ""

let as_nav_list = [
    {
        name: 'Home',
        href: ""
    },
    {
        name: 'Home',
        href: ""
    },
    {
        name: 'Home',
        href: ""
    },
    {
        name: 'Home',
        href: ""
    },
    {
        name: 'Home',
        href: ""
    }
]


let inApp = document.getElementById('inApp')
let inAppList = [
    {
        img:'',
        title:'Detailed Hourly Forecast',
        description:'Get in - depth weather information.'
    },{
        img:'',
        title:'Real-Time Weather Map',
        description:'Watch the progress of the precipitation to stay informed'
    },{
        img:'',
        title:'Weather Around the World',
        description:'Add any location you want and swipe easily to chnage.'
    },{
        img:'',
        title:'Detailed Hourly Forecast',
        description:'Get in - depth weather information.'
    },
]

for(let i=0;i<inAppList.length;i++){
    inApp.innerHTML+=`
        <div class="services" id="service${i}">
            <h3 onclick="document.getElementById('service${i}').style.display='none'">Skip</h3>
            <img src="./img/icon${i+1}.png" alt="">
            <div class="content">
                <h2>${inAppList[i].title}</h2>
                <p>${inAppList[i].description}</p>
                <div class="content-btn">
                    <a href="#service${i+1}">
                        <i class="far fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `
}

if(inApp){
    inApp.innerHTML+=`
<div id="service4">
    <div class="app_logo">
        <img src="./img/icon5.png" alt="">
        <h2>Weather</h2>
        <h3>Forecast</h3>
    </div>
    <div class="app_login">
        <input type="search" id="as_input" placeholder="Enter your City">
        <div id="as_btn" onclick="login_city()">
            <a href="#">Continue with City</a>
        </div>
        <h4>or Using</h4>
        <div id="as_btn" onclick="login_detect()">
            <a href="#">Continue using Auto Detect</a>
        </div>
    </div>
</div>`
}


let appID = '1bb682d0718152402ef63f341f6ec943'

const urlLatLon = (lat,lon) => (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`);

const urlCity = (city) => (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}`)

function login_city(){
    let city = document.querySelector('#service4 #as_input')
    let url = urlCity(city.value)
    getWeather(url)
    inApp.style.display="none"
}
async function login_detect(){
    let res = await fetch('http://ip-api.com/json/')
    let data = await res.json()
    let url = urlLatLon(data.lat,data.lon)
    getWeather(url)
    inApp.style.display="none"
}

async function getWeather(url){
    let el = document.getElementById('data')
    let res = await fetch(url)
    let data = await res.json()
    console.log(data);   
    
    let d = new Date()
    let day = d.getDay()
    let days = ['Monday','Tuesday','Wednesday','Friday','Thursday','Saturday','Sunday']
    let date = d.getDate()
    let month = d.getMonth()
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    el.innerHTML=`
<div class="container">
    <ul>
        <li>
            <h3>${days[day-1]}, ${date}-${months[month]}</h3>
        </li>
        <li>
            <h3>The weather in ${data.name}</h3>
        </li>
        <li>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
            <span>
                <h2>${Math.floor(data.main.temp - 273.15)} °C</h2>
                <h3>${data.weather[0].description}</h3>
                <h4></h4>
            </span>
        </li>
        <li>
            <p>${Math.floor(data.main.temp_max - 273.15)}°/${Math.floor(data.main.temp_min - 273.15)}° | Feels Like <b>${Math.floor(data.main.feels_like - 273.15)}°</b></p>
        </li>
        <li>
            <p>Pressure: <b>${data.main.pressure} hPa</b></p>
        </li>
        <li>
            <p>Humidity: <b>${data.main.humidity} %</b></p>
        </li>
        <li>
            <p>Wind: <b>${data.wind.speed} meter/sec</b></p>
        </li>
        <li>
            <p>Clouds: <b>${data.clouds.all} %</b></p>
        </li>
    </ul>
</div>`
}















// let weather = document.getElementById("weather")


// async function getLocation(){
//     let res = await fetch('http://ip-api.com/json/')
//     let data = await res.json()
//     let url = weatherUrl(data.lat,data.lon)
//     getWeather(url)
// }getLocation()




// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// }


