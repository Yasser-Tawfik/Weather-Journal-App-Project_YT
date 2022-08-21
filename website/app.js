/*Note: there is more explination of the code in the README file*/


/* Global Variables */

const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
// represents a date object for the current date
let d = new Date();
let currentDate = d.toLocaleDateString('en-GB' , {weekday : 'long', day: 'numeric', month: 'numeric', year: 'numeric'});


// Personal API Key for OpenWeatherMap API
const apiKey = ',us&appid=d64040f3c5fa5f885e057896a7f47d2e&units=imperial' ;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" ;









/* Function called by event listener */

const doItAllTogether = () =>{

    // select the user inputs for the zip code and the feeling to use it in the `destructAndSetData` function 
    // to select the entered zip code and use it in the URL with the API to get the data 
    const enteredZipCode = document.getElementById('zip').value ;
    const currentMood = document.getElementById('feelings').value ;
    
    /* the callbacks of all the functions */

    getWeatherInfo(baseURL, enteredZipCode, apiKey)
    
    // pass this returned 'info' from the api in the `destructAndSetData` function to choose what data we need 
    .then((info)=>{

        // pass to it the 'currentMood' to put it in the 'returnedInfo' objet --not the variable--
        const returnedInfo = destructAndSetData(info, currentMood);

        // this condition is for checking if the data is empty or not so it will not execute these lines if the data is empty --cuz we don't want it empty--
        if(info){
            destructAndSetData(info, currentMood);
            postWInfo("http://127.0.0.1:2525/addData", returnedInfo).then(()=>{
             updateUI();
            });
        };

    });

};


// Event listener to add function to existing HTML DOM element

button.addEventListener('click', doItAllTogether);





/* Function to GET Web API Data*/


/**we used the async function to not execute what after it and to wait until we get the data from the API according to the entered zip code.
 * so we used `fetch()` to fetch the data from the absolute URL (using the base URL from the website  + the entered zip code + the API key entered above as a prameter for this function).
 */

const getWeatherInfo = async (baseURL, zipCode, key)=>{
    const  response = await fetch(baseURL + zipCode + key);

    // and then if we got that data we turn it into JSON format
    try{
        const info = await response.json();
        return info;

      // and if the is any error we will console log that error 
    } catch(error){
        console.log("error", error);
    }
      
};



  /* function for choosing the wanted data */

 /* taking out the spacific data we want (the name of the city and the tempereture) from that big returned object from the API */

const destructAndSetData = (info, currentMood)=>{
    const {
        main : {temp},
        name : city , 
    } = info;


    /*and then put these (chosen data + current mood + the date) in another object */
    const returnedInfo = {
        city,
        currentDate,
        // to make the number integer not with decimal points
        temp : Math.round(temp),
        currentMood,
    };

    // and then return this object because when calling this function above --in `doItAllTogether` function--, we want to have the 'returnedInfo' object 
    return returnedInfo ;
};




/* Function to POST data */


/**we are creating async function to wait until we request the "addData" function in the server side
 *to post the `returnedInfo` object to it. -- that we passed the `returnedInfo` object to the callback of this function above --.
 *so we made a post request (by using `method: post`) to post this data to the `projectData` object in the server side code.
 */
const postWInfo = async(url = "", returnedData = {})=>{
    const response = await fetch(url, {
        method :'post',
        credentials : "same-origin",
        headers : {"Content-Type" : "application/json",},
        // to convert from JSON to string because we want the data that we are posting to the page to be in strig so we could see it properly on the page.
        body : JSON.stringify(returnedData),
    });
    try{
        const newInfo = await response.json();
        console.log(newInfo);
        return newInfo;

    }catch (error){
        console.log("error", error);
  }
};

/* Function to GET Project Data */
/*updating the UI*/


/**creating async() function to request the 'all' route to get the `projectData` object  
 * after we sat the data we want to it and then update the UI with it.
 * and set it to a variable called `allWeatherAndUserInfo` to access it inside this function. 
 */

const updateUI = async ()=>{
    const response = await fetch('http://127.0.0.1:2525/all');

    try {
        const allWeatherAndUserInfo = await response.json();
        console.log(allWeatherAndUserInfo);


        /**we want to access the data of the object by the dot notation and I added some text before and after this data to tell the user what the data is about, 
         * and then we want to access the HTML elements by using the `.getElementById()` method.
         */
        document.getElementById('location').innerHTML = ' 🏙️   ' + allWeatherAndUserInfo .city;
        document.getElementById('date').innerHTML = ' Weather of  📆' + allWeatherAndUserInfo .currentDate + `  \t   IS`;
        document.getElementById('temp').innerHTML = `  \t \t \t \t \t   TEMPERATURE 🌡️❄️ : ` + allWeatherAndUserInfo .temp + `°F \n`;
        document.getElementById('content').innerHTML = '  The MOOD😐 Of Today : \n ' + allWeatherAndUserInfo  .currentMood;

        //  and if there is an error we will catch it and console log it.
        // appropriately handle the error

    } catch (error){
        console.log("error", error);
    }
};



// To know the size of the div to know the size of the imeg to put
const div = document.getElementById('js').getBoundingClientRect() ;

console.log(div);




