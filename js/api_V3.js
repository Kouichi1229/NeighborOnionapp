var xhr = new XMLHttpRequest();

var tIcon = document.querySelector('#ticon');
var wIcon = document.querySelector('#wicon');

var tIcon_1 = document.querySelector('#ticon_1');
var wIcon_1 = document.querySelector('#wicon_1');

var tIcon_2 = document.querySelector('#ticon_2');
var wIcon_2 = document.querySelector('#wicon_2');

var tIcon_3 = document.querySelector('#ticon_3');
var wIcon_3 = document.querySelector('#wicon_3');

var tIcon_4 = document.querySelector('#ticon_4');
var wIcon_4 = document.querySelector('#wicon_4');

var tIcon_5 = document.querySelector('#ticon_5');
var wIcon_5 = document.querySelector('#wicon_5');




//串接台灣天氣api，將城市名稱代入html的選單中
function getWeather() {
    //const xhr = new XMLHttpRequest();
    const apiKey ='https://cors-anywhere.herokuapp.com/https://premium-weather-api.weatherrisk.com/future-3t/168hr-township-model-forecast/%E5%B1%8F%E6%9D%B1%E7%B8%A3%E6%81%86%E6%98%A5%E9%8E%AE';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showWeather();
            let count = 0;
            let ticon = 'tIcon_';
            let wicon = 'wIcon_';
            showWeekweather(tIcon_1,wIcon_1,30);
            showWeekweather(tIcon_2,wIcon_2,54);
            showWeekweather(tIcon_3,wIcon_3,66);
            showWeekweather(tIcon_4,wIcon_4,78);
            showWeekweather(tIcon_5,wIcon_5,90);
        }//end of if 
    };
    xhr.open("GET", apiKey, true);
    xhr.send();
} //end of fun getWeather
getWeather();

// 選擇對應圖片
function imgChange(Tem,wx,pcpn,t_Icon,w_Icon){
    let temPic = t_Icon;
    let wxPic = w_Icon;
    if (Tem >= 30 ) {
        temPic.src ='images/30度以上.png' ;
    } else if (Tem >= 15 && Tem < 30 ) {
        temPic.src = 'images/15-30度.png';
    } else  {
        temPic.src = 'images/15度以下.png';
    }

    if (wx =='晴朗'&& pcpn ==0 ) {
        wxPic.src ='images/sun.png' ;
    } else if (wx =='陰' && pcpn ==0 ) {
        wxPic.src = 'images/05.svg';
    } else if (wx =='細雨'|| pcpn < 10) {
        wxPic.src = 'images/10mm.png';
    }else if (wx_value =='中雨' || (pcpn<25 && pcpn>=10)  ) {
        wxPic.src = 'images/10-25mm.png';
    }else {
        wxPic.src = 'images/25mm.png';
    }
}
// 溫度顯示
function getTempatureId(tem,id){
    document.getElementById(id).innerHTML = tem + '℃';
}

//顯示相對應天氣狀況
function showWeather(e) {
    //今天的顯示

    var dataObject = JSON.parse(xhr.responseText);
    var dataT = dataObject.data[30].tempture;// 溫度
    var datawx = dataObject.data[30].weather_condition;// 氣象      
    var pcpn = dataObject.data[30].pcpn;
    getTempatureId(dataT,"nowT");
    document.getElementById("nowwx").innerHTML = datawx;
    imgChange(dataT,datawx,pcpn,tIcon,wIcon);
}// end of fun showWeather

function showWeekweather(ticon,wicon,item){
    var dataObject = JSON.parse(xhr.responseText);
    var dataT = dataObject.data[item].tempture;// 溫度
    var datawx = dataObject.data[item].weather_condition;// 氣象      
    var pcpn = dataObject.data[item].pcpn;      

    imgChange(dataT,datawx,pcpn,ticon,wicon);

}

//document.getElementById("weekend").innerHTML = day