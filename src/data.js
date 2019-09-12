const axios = require('axios');

let Data = {};
const ID = "kE3KkG0cvvetoGPLicbW7";
const SERVER = "https://www.samserrels.com/jsonStore/data.php"

let _updateCB = () => { };
function onUpdate(a) {
    _updateCB = a;
}

function GetEvents() {
    return Data.events;
}

function NewEvent() {
    Data.events.push({
        text: "New Event",
        catagory: "",
        allocated: false,
        startTime: 0,
        startDay: 0,
        duration: 1
    })
    Sync();
}

let _lastServerdata = "";
function Sync() {
    //Nothing from server yet
    if (_lastServerdata == "") {
        GetFromServer().then(function (response) {
            Data = JSON.parse(response.data.data);
            if(!Data.events){
                Data.events = [];
            }
            _lastServerdata = response.data.data;
            console.info("Got Data from server", Data);
            _updateCB();
        }).catch(function (error) {
            if (error.response && error.response.status == 404) {
                //Doesn't exist yet
                console.info("Creating new user on Server");
                let newUser = { name: "Sam", events: [] };
                SendToServer(newUser).then(() => {console.info("new user Created"); Sync(); }, (a) => { console.log(3, a) })
               
            } else {
                console.error(2, JSON.stringify(error),error);
            }
        });
    } else {
        //has events changed?  
        if (JSON.stringify(Data) !== _lastServerdata) {
            console.info("Updating Server",Data);
            SendToServer(Data).then(() => {console.info("Server Updated"); }, (a) => { console.log(5, a) })
            _updateCB();
        }
    }



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
            data: JSON.stringify(d)
        }),
        url: SERVER,
    };
    return axios(options);
}


function Login() {

}

function Logout() {

}

export { Sync, NewEvent, GetEvents, onUpdate }