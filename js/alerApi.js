var xhttp = new XMLHttpRequest();

function getAler() {
    const apiKey = 'https://cors-anywhere.herokuapp.com/https://apipost-no-v1.herokuapp.com/rooms';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObject = JSON.parse(xhttp.responseText);
            let len = dataObject.length;
            var aler = dataObject[len-1].aler;
           
            document.getElementById('alerMsg').innerHTML = aler;
            

        }
    };
    xhttp.open("GET", apiKey, true);
    xhttp.send();
}


getAler();




