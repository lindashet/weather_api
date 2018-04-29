var lat;
var lon;
var geo;
var date = document.getElementById('date');
var week = document.getElementById('week');
var city = document.getElementById('city');
var weather = document.getElementById('weather');
var temp = document.getElementById('temp');
var locat = document.getElementById('locat');


getLocation();

function getWeather() {
    //XMLHttpRequest 物件專門用來和伺服器做連線
    var req = new XMLHttpRequest();
    req.open(
        "get",
        "https://api.apixu.com/v1/forecast.json?key=9d91004f47c247c2a9d50535182703&q=" + geo + "&lang=zh_tw&days=4",
        true
    );
    req.onload = function() { //load事件，偵測連線狀態結束
        //連線完成
        // var content = document.getElementById('content');
        // content.innerHTML = this.responseText;
        var response = JSON.parse(this.responseText);
        var resWeather = response.current.condition.text;
        var resTemp = response.current.temp_c;
        var cuMax = response.forecast.forecastday[0].day.maxtemp_c;
        var cuMin = response.forecast.forecastday[0].day.mintemp_c;
        var iconRain = "<svg viewbox='-60 -20 100 100'><line class='rain' x1='-25' y1='15' x2='-25' y2='35'></line><line class='rain rain2' x1='-14' y1='5' x2='-14' y2='25'></line><line class='rain' x1='-5' y1='20' x2='-5' y2='45'></line><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>";
        var iconCloudsun = "<svg viewbox='-60 -40 100 100'><circle class='sun' cx='0' cy='0' r='22'></circle><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>";
        var iconClear = "<svg viewbox='-50 -40 100 100'><circle class='sun' cx='0' cy='0' r='27'></circle></svg>";
        var iconCloud = "<svg viewbox='-65 -20 100 100'><circle class='cloud' cx='0' cy='30' r='20'></circle><circle class='cloud' cx='-15' cy='30' r='20'></circle><circle class='cloud' cx='-30' cy='30' r='20'></circle><circle class='cloud' cx='-25' cy='10' r='15'></circle><circle class='cloud' cx='-7' cy='15' r='15'></circle></svg>"

        var weatherBoard = document.querySelector("#weather_board");
        var code = response.current.condition.code;
        response.forecast.forecastday[1].day.condition.code
        // function iconChg1(board) {
        // 		document.querySelector(board).innerHTML = iconClear;
        // }
        // function iconChg2(board) {
        // 		document.querySelector(board).innerHTML = iconCloud;
        // }
        // function iconChg3(board) {
        // 		document.querySelector(board).innerHTML = iconCloudsun;
        // }
        // function iconChg4(board) {
        // 		document.querySelector(board).innerHTML = iconRain;
        // }
        // iconSwitch(response.current.condition.code, iconChg1("#weather_board"), iconChg2("#weather_board"), iconChg3("#weather_board"), iconChg4("#weather_board"));
        // iconSwitch(response.forecast.forecastday[1].day.condition.code, iconChg1("#f_icon_1"), iconChg2("#f_icon_1"), iconChg3("#f_icon_1"), iconChg4("#f_icon_1"));
        // iconSwitch(response.forecast.forecastday[2].day.condition.code, iconChg1("#f_icon_2"), iconChg2("#f_icon_2"), iconChg3("#f_icon_2"), iconChg4("#f_icon_2"));
        // iconSwitch(response.forecast.forecastday[3].day.condition.code, iconChg1("#f_icon_3"), iconChg2("#f_icon_3"), iconChg3("#f_icon_3"), iconChg4("#f_icon_3"));
        // function iconSwitch(code, func1, func2, func3, func4) {
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
        iconSwitch(response.current.condition.code, "#weather_board");
        iconSwitch(response.forecast.forecastday[1].day.condition.code, "#f_icon_1");
        iconSwitch(response.forecast.forecastday[2].day.condition.code, "#f_icon_2");
        iconSwitch(response.forecast.forecastday[3].day.condition.code, "#f_icon_3");

          // }

        // .replace("Clouds", iconCloud)
        // .replace("Clear", iconClear);
        var d = new Date();
        var mon_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        date.innerHTML = mon_list[d.getMonth()] + '. ' + d.getDate();
        var day_list = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
        var gtd = d.getDay();
        week.innerHTML = day_list[gtd];

        weather.innerHTML = resWeather;
        // icon.innerHTML = weatherBoard;
        temp.innerHTML = Math.round(resTemp) + '<span>°Ｃ</span>';
        weather.innerHTML = resWeather;
        document.querySelector("#c_min").innerText = Math.round(cuMin);
        document.querySelector("#c_max").innerText = Math.round(cuMax);

        function getTemp(i) {
            document.querySelector("#f_min_" + i).innerText = Math.round(response.forecast.forecastday[i].day.mintemp_c);
            document.querySelector("#f_max_" + i).innerText = Math.round(response.forecast.forecastday[i].day.maxtemp_c);
            document.querySelector("#f_weather_" + i).innerText = response.forecast.forecastday[i].day.condition.text;
            // document.querySelector("#f" + i).innerText = 				
        }
        getTemp(1);
        getTemp(2);
        getTemp(3);

        function getTheDate(i) {
            let d = new Date();
            let dTime = 86400;
            let t = (mktime(0, 0, 0, d.getMonth() + 1, d.getDate(), d.getFullYear()) + dTime * i) * 1000;
            d.setTime(t);
            document.querySelector("#f_date_" + i).innerText = d.getDate();
            // if((d.getDay() + i) / 7) {
            // 	document.querySelector("#f_day_" + i).innerText = day_list[gtd+i];
            // } else {
            document.querySelector("#f_day_" + i).innerText = day_list[(gtd + i) % 7];

            // }
        }
        getTheDate(1);
        getTheDate(2);
        getTheDate(3);


    }
    req.send(); //送出連線
}

function getLocation() {
    //XMLHttpRequest 物件專門用來和伺服器做連線

    var req = new XMLHttpRequest();

    req.open("post", "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA9HZHTYPmZR1TUi4eXU4ILeF_1F37Flc4", true);

    req.onload = function() { //load事件，偵測連線狀態結束
        //連線完成，將取得的JSON資料轉為物件格式
        var response = JSON.parse(this.responseText);
        if (response) {
            console.log(response);
            lat = "&lat=" + response.location.lat;
            lon = "&lon=" + response.location.lng;
            geo = response.location.lat + ',' + response.location.lng;
            getCity();
            getWeather();
        } else {
            alert("無法定位");

        }



    }
    req.send(); //送出連線
}


function getCity() {
    //XMLHttpRequest 物件專門用來和伺服器做連線

    var req = new XMLHttpRequest();

    req.open("get", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geo + "&language=zh-TW&key=AIzaSyA9HZHTYPmZR1TUi4eXU4ILeF_1F37Flc4", true);

    req.onload = function() { //load事件，偵測連線狀態結束
        //連線完成
        var response = JSON.parse(this.responseText);
        if (response.status === "OK") {
            var resCity = response.results[0].address_components[4].short_name + response.results[0].address_components[3].short_name;
            city.innerHTML = resCity;
            // console.log(response.results[0].address_components[3]);

        } else {
            alert("找不到地區");
        }

    }
    req.send(); //送出連線
}

locat.addEventListener('click', getLocation);
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