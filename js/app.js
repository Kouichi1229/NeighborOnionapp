var day;
var Today=new Date();
var year = Today.getFullYear();
var month = Today.getMonth();
var date = Today.getDate();


switch (new Date().getDay()) {
  case 0:
  day = "星期日";
  break;
  case 1:
  day = "星期一";
  break;
  case 2:
  day = "星期二";
  break;
  case 3:
  day = "星期三";
  break;
  case 4:
  day = "星期四";
  break;
  case 5:
  day = "星期五";
  break;
  case  6:
  day = "星期六";
}
document.getElementById("weekend").innerHTML = day;
document.getElementById('mounth').innerHTML = month+1 + "月" ;
document.getElementById('date').innerHTML = date;
document.getElementById('year').innerHTML ='栽種年份：'+ year;
document.getElementById('update').innerHTML ='更新日期：'+ year+'/'+ month+1 +'/'+ date;
//document.getElementById("lunar").innerHTML = moment().year(1995).month(2).date(9).lunar().format('YYYY-MM-DD');

function getOtherDate(days,lday){
  document.getElementById(lday).innerHTML = (month+1) +'/'+(date + days);  
}

getOtherDate(0,"day_1");
getOtherDate(1,"day_2");
getOtherDate(2,"day_3");
getOtherDate(3,"day_4");
getOtherDate(4,"day_5");
//getOtherDate(5,"day_6");
//getOtherDate(6,"day_7");
