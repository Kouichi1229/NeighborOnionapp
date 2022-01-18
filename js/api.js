var xhr = new XMLHttpRequest();
var date = document.querySelector('.date'); //日期
var tem = document.querySelector('.tem'); //溫度
var wx = document.querySelector('.wx'); //天氣描述
var tIcon = document.querySelector('#ticon');
var wIcon = document.querySelector('#wicon');

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
function compareDate(x){
    return new Date(x.startTime).getDate() == new Date(x.endTime).getDate();
}

//顯示相對應天氣狀況
function showWeather(e) {
    var dataObject = JSON.parse(xhr.responseText);
    
    var location_data = dataObject.records.locations[0].location[12].weatherElement;
    var dataT = location_data[0].time;
    //var T = dataT.filter(x=>x.elementName ==='T')[0].time;

    var datawx = location_data[1].time;
    //var Wx = datawx.filter(x=>x.elementName ==='Wx')[0].time;
    
    var t_len = dataT.length;
    var wx_len = datawx.length;

    for (var i = 0; i < t_len; i++) {
        var temList = dataT[i].elementValue[0].value;   
        tem.textContent = temList + '℃';
        if (temList >= 30 ) {
            tIcon.src ='images/30度以上.png' ;
        } else if (temList >= 15 && temList < 30 ) {
            tIcon.src = 'images/15-30度.png';
        } else  {
            tIcon.src = 'images/15度以下.png';
        }

    }//end of for temList


    for (var i = 0; i < wx_len; i++) {
        var wxList = datawx[i].elementValue[0].value;
        var wzValue = datawx[i].elementValue[1].value;
        wx.textContent = wxList;

        if (wzValue =='01' || wzValue =='02') {
            wIcon.src ='images/sun.png' ;
        } else if (wzValue =='04' || wzValue =='03' || wzValue =='05' || wzValue =='06' || wzValue =='07') {
            wIcon.src = 'images/02.svg';
        } else if (wzValue =='08'|| wzValue =='09' || wzValue =='10' || wzValue =='11' || wzValue =='12' || wzValue =='13') {
            wIcon.src = 'images/10mm.png';
        }else if (wzValue =='14' ||wzValue =='15' ) {
            wIcon.src = 'images/10-25mm.png';
        }else {
            wIcon.src = 'images/25mm.png';
        }

    }//end of for wxList

}// end of fun showWeather

