const axios = require('axios');

const Events = [];
const ID = "kE3KkG0cvvetoGPLicbW7";
const SERVER = "https://www.samserrels.com/jsonStore/data.php"

function GetEvents() {
    return Events;
}

function Sync() {
    //Clear cookies,   
    GetFromServer().then(function (response) {
        console.log(1, response);
    }).catch(function (error) {
        if (error.response && error.response.status == 404) {
            //Doesn't exist yet
            let newUser = { name: "Sam", events: [] };
            SendToServer(newUser).then(() => { }, (a) => { console.log(3, a) })
        } else {
            console.error(2, JSON.stringify(error));
        }

    });

}

function GetFromServer() {
    return axios.get(SERVER, { params: { uid: ID } });
}

function SendToServer(d) {
    var qs = require('qs');
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({
            uid: ID,
            data: d
        }),
        url: SERVER,
    };
    return axios(options);
}


function Login() {

}

function Logout() {

}

export default Sync