var
    date = document.getElementById('date'),
    week = document.getElementById('week'),
    city = document.getElementById('city'),
    weather = document.getElementById('weather'),
    temp = document.getElementById('temp'),
    locat = document.getElementById('locat'),

    //Location info
    lat,
    lon,
    geo,

    // SVG icons
    iconRain = "<svg viewbox='-60 -20 100 100'><line class='rain' x1='-25' y1='15' x2='-25' y2='35'></line><line class='rain rain2' x1='-14' y1='5' x2='-14' y2='25'></line><line class='rain' x1='-5' y1='20' x2='-5' y2='45'></line><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>",
    iconCloudsun = "<svg viewbox='-60 -40 100 100'><circle class='sun' cx='0' cy='0' r='22'></circle><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>",
    iconClear = "<svg viewbox='-50 -40 100 100'><circle class='sun' cx='0' cy='0' r='27'></circle></svg>",
    iconCloud = "<svg viewbox='-65 -20 100 100'><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>",
    
    // Date settings 
    d = new Date(),
    mon_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    day_list = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'],
    gtd = d.getDay();


getData();

function getData() {
    getLocation();
}

function connectFn() {
    getCity();
    getWeather();
}

function getLocation() {
 if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(get)
 }
    }

    req.send(); //送出連線
}

function getCity() {
    var req = new XMLHttpRequest();

    req.open("get", 
             "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geo + "&language=zh-TW&key=AIzaSyA9HZHTYPmZR1TUi4eXU4ILeF_1F37Flc4", 
             true);

    req.onload = function() { 
        var response = JSON.parse(this.responseText);
        if (response.status === "OK") {
            var resCity = response.results[0].address_components[4].short_name + response.results[0].address_components[3].short_name;
            city.innerHTML = resCity;
            // console.log(response.results[0].address_components[3]);

        } else {
            alert("找不到地區");
        }

    }
    req.send();
}

function getWeather() {
    var req = new XMLHttpRequest();
    req.open(
        "get",
        "https://api.apixu.com/v1/forecast.json?key=9d91004f47c247c2a9d50535182703&q=" + geo + "&lang=zh_tw&days=4",
        true
    );
    req.onload = function() {
        let 
            response = JSON.parse(this.responseText),
            resWeather = response.current.condition.text,
            resTemp = response.current.temp_c,
            cuMax = response.forecast.forecastday[0].day.maxtemp_c,
            cuMin = response.forecast.forecastday[0].day.mintemp_c,
            code = response.current.condition.code;

        iconSwitch(response.current.condition.code, "#weather_board");
        iconSwitch(response.forecast.forecastday[1].day.condition.code, "#f_icon_1");
        iconSwitch(response.forecast.forecastday[2].day.condition.code, "#f_icon_2");
        iconSwitch(response.forecast.forecastday[3].day.condition.code, "#f_icon_3");

        showWeather(resWeather, resTemp, cuMin, cuMax);
        
        getTemp(1);
        getTemp(2);
        getTemp(3);

        getTheDate(1);
        getTheDate(2);
        getTheDate(3);

        function getTemp(i) {
            document.querySelector("#f_min_" + i).innerText = Math.round(response.forecast.forecastday[i].day.mintemp_c);
            document.querySelector("#f_max_" + i).innerText = Math.round(response.forecast.forecastday[i].day.maxtemp_c);
            document.querySelector("#f_weather_" + i).innerText = response.forecast.forecastday[i].day.condition.text;
        }
    }
    req.send();
}

function getTheDate(i) {
    let d = new Date();
    let dTime = 86400;
    let t = (mktime(0, 0, 0, d.getMonth() + 1, d.getDate(), d.getFullYear()) + dTime * i) * 1000;
    d.setTime(t);
    document.querySelector("#f_date_" + i).innerText = d.getDate();
    document.querySelector("#f_day_" + i).innerText = day_list[(gtd + i) % 7];
}

function showWeather(resWeather, resTemp, cuMin, cuMax) {
    date.innerHTML = mon_list[d.getMonth()] + '. ' + d.getDate();        
    week.innerHTML = day_list[gtd];
    weather.innerHTML = resWeather;
    temp.innerHTML = Math.round(resTemp) + '<span>°Ｃ</span>';
    weather.innerHTML = resWeather;
    document.querySelector("#c_min").innerText = Math.round(cuMin);
    document.querySelector("#c_max").innerText = Math.round(cuMax);

}

function iconSwitch(code, day) {
    switch (code) {
        case 1000:
            document.querySelector(day).innerHTML = iconClear;
            break;
        case 1135:
        case 1006:
        case 1030:
        case 1009:
        case 1147:
            document.querySelector(day).innerHTML = iconCloud;

            break;
        case 1003:
            document.querySelector(day).innerHTML = iconCloudsun;
            break;
        case 1063:
        case 1069:
        case 1150:
        case 1180:
        case 1183:
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1240:
        case 1243:
        case 1246:
            document.querySelector(day).innerHTML = iconRain;
            break;
        default:

            break;
    }
}

//轉換日期為秒
function mktime(h, m, s, month, day, year) {
    var d = new Date();
    d.setDate(parseInt(day, 10));
    d.setMonth(parseInt(month, 10) - 1);
    d.setFullYear(parseInt(year, 10));
    d.setHours(parseInt(h, 10));
    d.setMinutes(parseInt(m, 10));
    d.setSeconds(parseInt(s, 10));
    d.setMilliseconds(0);
    return parseInt(d.getTime() / 1000); //秒  
}

locat.addEventListener('click', getLocation);