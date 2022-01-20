var xhr = new XMLHttpRequest();
var date = document.querySelector('.date'); //日期
var tem = document.querySelector('.tem'); //溫度
var wx = document.querySelector('.wx'); //天氣描述

var tIcon_now = document.querySelector('#ticon');
var wIcon_now = document.querySelector('#wicon');
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



//串接台灣天氣api，將城市名稱代入html的選單中
function getWeather() {
    const apiKey ='https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-035?Authorization=CWB-1EF84EFB-3A18-45EE-AF0A-5BB8D44C13F1&format=JSON&elementName=T,Wx,WeatherDescription&sort=time';
    xhr.open('get',apiKey, true);
    xhr.send(null);
    xhr.onload = function() {
        showWeather();
    }
} //end of fun getWeather
getWeather();

// 選擇對應的日期
function showPic(temValue,wx_v){

        if (temValue >= 30 ) {
            tIcon.src ='images/30度以上.png' ;
        } else if (temValue >= 15 && temValue < 30 ) {
            tIcon.src = 'images/15-30度.png';
        } else  {
            tIcon.src = 'images/15度以下.png';
        }


     if (wx_v =='01' || wx_v =='02') {
            wIcon.src ='images/sun.png' ;
        } else if (wx_v =='04' || wx_v =='03' || wx_v =='05' || wx_v =='06' || wx_v =='07') {
            wIcon.src = 'images/02.svg';
        } else if (wx_v =='08'|| wx_v =='09' || wx_v =='10' || wx_v =='11' || wx_v =='12' || wx_v =='13') {
            wIcon.src = 'images/10mm.png';
        }else if (wx_v =='14' || wx_v =='15' ) {
            wIcon.src = 'images/10-25mm.png';
        }else {
            wIcon.src = 'images/25mm.png';
        }

}

//顯示相對應天氣狀況
function showWeather(e) {
    var dataObject = JSON.parse(xhr.responseText);
    var location_data = dataObject.records.locations[0].location[12].weatherElement;//車城鄉
    var dataT = location_data[0].time;//氣溫資料
    var datawx = location_data[1].time;//天氣狀況
    //取得一周資料
    var nowt = dataT[0].elementValue[0].value;
    tem.textContent = nowt + '℃';

    var nowwx = datawx[0].elementValue[0].value;
    wx.textContent = nowwx;
    var nowwx_v = datawx[0].elementValue[1].value;

    if (nowt >= 30 ) {
            tIcon.src ='images/30度以上.png' ;
        } else if (nowt >= 15 && nowt < 30 ) {
            //tIcon.src = 'images/15-30度.png';
        } else  {
            tIcon.src = 'images/15度以下.png';
        }


     if (nowwx_v =='01' || nowwx_v=='02') {
            wIcon.src ='images/sun.png' ;
        } else if (nowwx_v =='04' || nowwx_v=='03' || nowwx_v =='05' || nowwx_v =='06' || nowwx_v =='07') {
            //wIcon.src = 'images/02.svg';
        } else if (nowwx_v =='08'|| nowwx_v =='09' || nowwx_v =='10' || nowwx_v =='11' || nowwx_v =='12' || nowwx_v =='13') {
            wIcon.src = 'images/10mm.png';
        } else if (nowwx_v=='14' || nowwx_v =='15' ) {
            wIcon.src = 'images/10-25mm.png';
        }else {
            wIcon.src = 'images/25mm.png';
        }

}// end of fun showWeather

