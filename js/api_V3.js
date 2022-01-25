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

const options ='https://premium-weather-api.weatherrisk.com/future-3t/168hr-township-model-forecast/%E5%B1%8F%E6%9D%B1%E7%B8%A3%E6%81%86%E6%98%A5%E9%8E%AE';
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

//串接台灣天氣api，將城市名稱代入html的選單中
function getWeather() {
    const apiKey ='https://cors-anywhere.herokuapp.com/https://premium-weather-api.weatherrisk.com/future-3t/168hr-township-model-forecast/%E5%B1%8F%E6%9D%B1%E7%B8%A3%E6%81%86%E6%98%A5%E9%8E%AE';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            showWeather();
            showWeekweather(tIcon_1,wIcon_1,30);
            showWeekweather(tIcon_2,wIcon_2,54);
            showWeekweather(tIcon_3,wIcon_3,78);
            showWeekweather(tIcon_4,wIcon_4,102);
            showWeekweather(tIcon_5,wIcon_5,126);
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
//提醒 週報
function TextColorChange(){
    var dataObject = JSON.parse(xhr.responseText);
    let len = dataObject.data.length;
    for(let i=30;i<len;i+=12){
        let temList = dataObject.data[i].tempture;
        let windList = dataObject.data[i].wind_dir;
        let popList = dataObject.data[i].pop;
        let dateList = dataObject.data[i].forecast_time.start;
        let dayList = new Date(dateList).getDate(); 

       if (temList >= 26 ) {
          document.getElementById('tempContent').innerHTML = '依據中央氣象局發布氣象資料，'+ dayList +'日車城鄉及恆春鄉天氣偏'+temList +
          '℃(熱)，提醒農友應留意防範農作暑害。';
      } else if (temList >= 15 && temList < 26 ) {
          document.getElementById('tempContent').innerHTML='本周氣溫皆在正常範圍，無需擔心。';
      } else  {
          document.getElementById('tempContent').innerHTML = '依據中央氣象局發布氣象資料，'+ dayList +'日車城鄉及恆春鄉天氣偏'+temList+
          '℃(冷)，提醒農友應留意防範農作寒害。';
      }

      if(popList > 60){
          document.getElementById('rainContent').innerHTML = dayList +'日。預估降雨機率大於60%，提醒農友應留意農田排水，以減少農作損失。'
      }else{
          document.getElementById('rainContent').innerHTML='本周皆在正常範圍，無需擔心。';
      }

      if (windList=='南風'){
          document.getElementById('windContent').innerHTML= dayList +'日。有改吹南風的機率。請農友們注意洋蔥保護，減少農作損傷。';
      }else{
          document.getElementById('windContent').innerHTML='本周並無吹向南風，無需擔心。';
      }

  }//end of for loop

}//end of TextColorChange

function stateTime(timeStr){
    let time='06:00';
    if(timeStr.match(time)){        
        document.getElementById('moningTime').style.color='red';
    }else{
        document.getElementById('eveningTime').style.color='red';
    }

}//更新時段

//顯示相對應天氣狀況
function showWeather(e) {
    //今天的顯示

    var dataObject = JSON.parse(xhr.responseText);
    var time = dataObject.data[30].forecast_time.start;
    var dataT = dataObject.data[30].tempture;// 溫度
    var datawx = dataObject.data[30].weather_condition;// 氣象      
    var pcpn = dataObject.data[30].pcpn;
    var dataWind = dataObject.data[30].wind_dir;//風向
    stateTime(time);
    getTempatureId(dataT,"nowT");
    document.getElementById("nowwx").innerHTML = datawx;
    imgChange(dataT,datawx,pcpn,tIcon,wIcon);
    TextColorChange();
}// end of fun showWeather


function showWeekweather(ticon,wicon,item){
    var dataObject = JSON.parse(xhr.responseText);
    var dataT = dataObject.data[item].tempture;// 溫度
    var datawx = dataObject.data[item].weather_condition;// 氣象      
    var pcpn = dataObject.data[item].pcpn;      
    imgChange(dataT,datawx,pcpn,ticon,wicon);

}

//document.getElementById("weekend").innerHTML = day