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

var tIcon_6 = document.querySelector('#ticon_6');
var wIcon_6 = document.querySelector('#wicon_6');

var tIcon_7 = document.querySelector('#ticon_7');
var wIcon_7 = document.querySelector('#wicon_7');


//串接台灣天氣api，將城市名稱代入html的選單中
function getWeather() {
    const apiKey ='https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-035?Authorization=CWB-1EF84EFB-3A18-45EE-AF0A-5BB8D44C13F1&format=JSON&elementName=T,Wx,WeatherDescription&sort=time';
    xhr.open('get',apiKey, true);
    xhr.send(null);
    xhr.onload = function() {
        showWeather();
        showWeekweather(0,0,tIcon_1,wIcon_1);
        showWeekweather(2,2,tIcon_2,wIcon_2);
        showWeekweather(4,4,tIcon_3,wIcon_3);
        showWeekweather(6,6,tIcon_4,wIcon_4);
        showWeekweather(8,8,tIcon_5,wIcon_5);
        showWeekweather(10,10,tIcon_6,wIcon_6);
        showWeekweather(12,12,tIcon_7,wIcon_7);
    }
} //end of fun getWeather
getWeather();

// 選擇對應的日期
function imgChange(Tem,wx_value,t_Icon,w_Icon){
    let temPic = t_Icon;
    let wxPic = w_Icon;
    if (Tem >= 30 ) {
        temPic.src ='images/30度以上.png' ;
    } else if (Tem >= 15 && Tem < 30 ) {
        temPic.src = 'images/15-30度.png';
    } else  {
        temPic.src = 'images/15度以下.png';
    }

    if (wx_value =='01' || wx_value =='02') {
        wxPic.src ='images/sun.png' ;
    } else if (wx_value =='04' || wx_value=='03' || wx_value =='05' || wx_value =='06' || wx_value =='07') {
        wxPic.src = 'images/02.svg';
    } else if (wx_value =='08'|| wx_value =='09' || wx_value =='10' || wx_value =='11' || wx_value =='12' || wx_value =='13') {
        wxPic.src = 'images/10mm.png';
    }else if (wx_value =='14' ||wx_value =='15' ) {
        wxPic.src = 'images/10-25mm.png';
    }else {
        wxPic.src = 'images/25mm.png';
    }
}

function getTempatureId(tem,id){
    document.getElementById(id).innerHTML = tem + '℃';
}

//顯示相對應天氣狀況
function showWeather(e) {
    //今天的顯示
    var dataObject = JSON.parse(xhr.responseText);
    var location_data = dataObject.records.locations[0].location[12].weatherElement;
    var dataT = location_data[0].time;// 溫度
    var datawx = location_data[1].time;// 氣象      

    var nowT = dataT[0].elementValue[0].value;
    var nowwx = datawx[0].elementValue[0].value;
    var nowwx_v = datawx[0].elementValue[1].value;
    getTempatureId(nowT,"nowT");
    document.getElementById("nowwx").innerHTML = nowwx;
    imgChange(nowT,nowwx_v,tIcon,wIcon);
}// end of fun showWeather

function showWeekweather(data1,data2,ticon,wicon){
    var dataObject = JSON.parse(xhr.responseText);
    var location_data = dataObject.records.locations[0].location[12].weatherElement;
    var dataT = location_data[0].time;// 溫度
    var datawx = location_data[1].time;// 氣象      

    var nowT = dataT[data1].elementValue[0].value;
    var nowwx_v = datawx[data2].elementValue[1].value;
    imgChange(nowT,nowwx_v,ticon,wicon);

}

//document.getElementById("weekend").innerHTML = day