var xhr = new XMLHttpRequest();

function getPlant() {
    const apiKey = 'https://cors-anywhere.herokuapp.com/https://apipost-no-v1.herokuapp.com/users';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var dataObject = JSON.parse(xhr.responseText);
            let len = dataObject.length;
            var t_Msg = dataObject[len-1].temp;
            var r_Msg = dataObject[len-1].rain;
            
            document.getElementById('tempMsg').innerHTML = t_Msg;
            document.getElementById('rainMsg').innerHTML = r_Msg;
            

        }
    };
    xhr.open("GET", apiKey, true);
    xhr.send();
}

getPlant();