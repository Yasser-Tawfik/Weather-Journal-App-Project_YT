
 
/* Global Variables */

// Create a new date instance dynamically with JS


/*
let d = new Date();
let currentDate = d.toLocaleDateString('en-GB' , {weekday : 'long', day: 'numeric', month: 'numeric', year: 'numeric'});


const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" ;

//const apiKey = '<d64040f3c5fa5f885e057896a7f47d2e>&units=imperial' ;

const apiKey = ',appid=d64040f3c5fa5f885e057896a7f47d2e&units=imperial' ;

*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Global Variables */

const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.toLocaleDateString('en-GB' , {weekday : 'long', day: 'numeric', month: 'numeric', year: 'numeric'});


// Personal API Key for OpenWeatherMap API
const apiKey = ',appid=d64040f3c5fa5f885e057896a7f47d2e&units=imperial' ;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" ;

// Event listener to add function to existing HTML DOM element

const server = "http://127.0.0.1:2525";







/* Function called by event listener */

const doItAllTogether = () =>{

    const enteredZipCode = document.getElementById('zip').value ;
    const currentMood = document.getElementById('feelings').value ;

    getWeatherInfo(baseURL, enteredZipCode, apiKey)
    .then((info)=>{
        if(info){
            destructAndSetData(info);
            postData("http://127.0.0.1:2525/addData", returnedInfo);
            updateUI();

        };

    });

};

button.addEventListener('click', doItAllTogether);





/* Function to GET Web API Data*/

const getWeatherInfo = async (baseURL, zipCode, key)=>{
    const  response = await fetch(baseURL + zipCode + key);

    try{
        const info = await response.json();
        return info;
    } catch(error){
        console.log("error", error);
    }
      
};


////////////////


const destructAndSetData = (info)=>{
    const {
        main : {temp},
        name : city , 
    } = info;


    const returnedInfo = {
        currentDate,
        city,
        temp : Math.round(temp),
        currentMood,
    };
};




/* Function to POST data */

const postWInfo = async(url = "", returnedData = {})=>{
    const response = await fetch(url, {
        method :'post',
        credentials : "same-origin",
        headers : {"Content-Type" : "application/json",},
        body : JSON.stringify(returnedData),
    });
    try{
        const newInfo = await response.json();
        console.log(newInfo);
        return newInfo;

    } catch (error){
        console.log("error", error);
    };
};

/* Function to GET Project Data */


/*updating the UI*/

const updateUI = async ()=>{
    const response = await fetch('http://127.0.0.1:2525/all');

    try {
        const allWeatherAndUserInfo = await response.json();
        console.log(allWeatherAndUserInfo);


        document.getElementById('location').innerHTML = allWeatherAndUserInfo.city;
        document.getElementById('date').innerHTML = allWeatherAndUserInfo.currentDate;
        document.getElementById('temp').innerHTML = allWeatherAndUserInfo.temp + '°F';
        document.getElementById('content').innerHTML = allWeatherAndUserInfo.currentMood;
    } catch (error){
        console.log("error", error);
    }
}

