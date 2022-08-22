# Weather Journal App Project

Udacity_FWD Web Front End Nanodegree Content Resources

## Table of Contents

- [Usage](#usage)
- [Description](#description)
   - [server.js](#serverjs)
   - [app.js](#appjs)
- [Tools](#tools)
- [Creator](#creator)

---

## Usage
 Weather Journal app is kind of useful app. It makes you know the tempreture, humidity, possibility to rain and more important things. You will need it especially when you want to travel,
 because you should know the weather for the place you are travelling to.

<br>
<br>

 Even if there aren't many peaple will use it, I created it to practice on how I create GET and POST requests , get data from an API and crete a local server.

 I used it as a practice so, I have acquired alot of skills  and broken my fear and anxiety barrier of doing something like this while working at this project.

.

---

## Description

I created `server.js` file that represents the local server, and `app.js` to represent the client side.

### server.js

1. First things first we should install [express, body-parser, and cors] in the terminal 
and then include (require) them in the file. 

<br>

*  including --requiring-- express in the file to run server routes.

```javascript

 const express = require('express');

```

* including --requiring-- cors in the file as one of the dependencies.

```javascript

const cors = require('cors');

```

* including --requiring-- body parser in the file as a middleware.



```javascript

const bodyParser = require('body-parser');


```

<br>
<br>

2. Creating the app inctance that we are going to build in the server.js file.

```javascript

const app = express();

```

<br>
<br>

3. Here we are configuring express to use body-parser as middle-ware 
and by using the `.use()` method we can connect the "body-parser" middleware we have installed on the command line to our app.

<br>

and the second line : just to tell the body parser how we want our data to be dealt with and we want it to be in JSON format.


```javascript

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

```

<br>
<br>

4. we can connect the cors package we have installed on the command line to our app by using the `.use()`method.


     By using cors, it connects the server side code to the client side code without security interruptions.

```javascript

app.use(cors());


```

<br>
<br>


5. Setup empty JS object to act as endpoint for all routes to put all of the returned data from the user, server, and the API.

    and it is at the very top of the code.

```javascript

projectData = {};

```

6. Initialize the main project folder.
This line of code we are pointing to our app the folder that we want them to look at and this what makes the server side connects to the client side because the client side code (app.js) is in the folder 'website'.


```javascript

app.use(express.static('website'));

```

<br>
<br>


7. Set the port that the server will run on.


```javascript

const port = 2525;

```

<br>
<br>


8. By using the `.listen()` method we are creating the express server and it should take 2 arguments 
1- port to run on. 2- A callback function to execute it for debugging purposes and to know if the server is running or there is a problem.

```javascript

const server = app.listen(port, listening);


// Callback to debug

function listening(){
    console.log(`Server is running on port (localhost) : ${port}`);

};

```

<br>
<br>


9. Initialize 'all' route with a callback function.
Respond with JS object (projectData) when a GET request is made to the page.

GET request produces a request, which is the data provided by the GET request, and a response, which is the data returned to the GET request (projectData).


```javascript


app.get('/all', getAllData);

// Callback function to complete GET '/all'

function getAllData  (req,res){
    res.send(projectData);
    console.log(projectData);

};


```


10. Set the retutrned data from the POST request at the client side code by using (`req.body`) to the`projectData`object and then send it to the page and console log the object.

```javascript

// Post Route

app.post('/addData', addData);


// callback function to execute
function addData  (req,res){
  
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);

};

```

<br>
<br>

---




<br>
<br>

### app.js



1. creating global variabes to use it in the fuctions.

* Selecting the button 'generate' dynamically by using JS to add an event listener to it and execute all the functions.


```javascript

const button = document.getElementById('generate');

```


* Set the API key and the main URL to variables to use them in the functions.


```javascript

// Personal API Key for OpenWeatherMap API
const apiKey = ',us&appid=d64040f3c5fa5f885e057896a7f47d2e&units=imperial' ;
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" ;

```


<br>
<br>



2. we are using the `new Date()` to create a new date instance for the current date
and we create it in the british order.
`weekday : 'long'` is to make the day full name and I set to the rest of the properties (`day: `, `month:` and `year`) to `numeric`.



```javascript

let d = new Date();
let currentDate = d.toLocaleDateString('en-GB' , {weekday : 'long', day: 'numeric', month: 'numeric', year: 'numeric'});

```


<br>
<br>


3. We add an event listener to the button so when we click it. It executes the `doItAllTogether` function which will execute the callback functions which I will explain these functions next and in the comments.
The name `doItAllTogether` because it does all the work and puts together all the functions that will do the work.


<br>

This condition is for checking if the data is empty or not cause we don't want it empty so it will not execute these lines if the data is empty.

we want to post the `returnedInfo` into our `projectData` object (the  end point).


```javascript

/* Function called by event listener */

const doItAllTogether = () =>{

    const enteredZipCode = document.getElementById('zip').value ;
    const currentMood = document.getElementById('feelings').value ;
    
    getWeatherInfo(baseURL, enteredZipCode, apiKey)
    .then((info)=>{
        const returnedInfo = destructAndSetData(info, currentMood);

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

```


<br>
<br>


4. In the `getWeatherInfo` function we used the async function to not execute what after it and to wait until we get the data from the API according to the entered zip code.
 so we used `fetch()` to fetch the data from the absolute URL (using the base URL from the website  + the entered zip code + the API key entered above as a prameter for this function).

<br>

and then if we got that data we turn it into JSON format.

<br>

and if the is any error we will console log that error for debugging purposes.



```javascript

/* Function to GET Web API Data*/


const getWeatherInfo = async (baseURL, zipCode, key)=>{
    const  response = await fetch(baseURL + zipCode + key);

    try{
        const info = await response.json();
        return info;

    } catch(error){
        console.log("error", error);
    }
      

```


<br>
<br>


5. In the `destructAndSetData` function we are taking out the spacific data we want (the name of the city and the tempereture) from that big returned object from the API.

<br>

and then put these (chosen data + current mood + the date) in another object.

<br>

to make the number integer not with decimal points we used: 

`temp : Math.round(temp),`


```javascript

  /* function fo choosing the wanted data */


const destructAndSetData = (info, currentMood)=>{
    const {
        main : {temp},
        name : city , 
    } = info;


    const returnedInfo = {
        city,
        currentDate,
        temp : Math.round(temp),
        currentMood,
    };

    // and then return this object because when calling this function above we want to have the returnedInfo object 
    return returnedInfo ;
};

```


<br>
<br>

6. In this `postWInfo` function we are creating async function to wait until we request the "addData" function in the server side to post the `returnedData` object to it --because we passed the `returneInfo` object to the callback of that function above (`doItAllTogether`)--.

so we made a post request (by using `method: post`) to post this data object to the `projectData` object in the server side code.

<br>

and then if there is an error we will console log that error for debugging purposes.



```javascript

/* Function to POST data */


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

```


<br>
<br>


7. In this `updateUI` function we update the user interface (the page) by creating async() function to request the 'all' route to get the `projectData` object  after we sat the data we want to it and then update the UI with it.

and set it to a variable called `allWeatherAndUserInfo` to access it inside this function.

 now we want to select each of these data and put them inside HTML element to update the UI.

 * First we want to access the data of the object by the dot notation and I added some text before and after this data to tell the user what the data is about, 

 * and then we want to access the HTML elements by using the `.getElementById()` method.

 <br>

 and if there is an error we will catch it and console log it.

 It's like a get request.

 ```javascript


/*updating the UI*/

const updateUI = async ()=>{
    const response = await fetch('http://127.0.0.1:2525/all');

    try {
        const allWeatherAndUserInfo = await response.json();
        console.log(allWeatherAndUserInfo);


        document.getElementById('location').innerHTML = '                                  🏙️ CITY : ' + allWeatherAndUserInfo .city;
        document.getElementById('date').innerHTML = ' 📆 DATE : ' + allWeatherAndUserInfo .currentDate;
        document.getElementById('temp').innerHTML = ' 🌡️❄️ TEMPRETURE : ' + allWeatherAndUserInfo .temp + '°F';
        document.getElementById('content').innerHTML = ' 😐 MOOD : ' + allWeatherAndUserInfo  .currentMood;

    } catch (error){
        console.log("error", error);
    }
}


```

<br>
<br>

8. 

 ```javascript

// To know the size of the div to know the size of the imeg to put
const div = document.getElementById('js').getBoundingClientRect() ;

console.log(div);


```

<br>
<br>


9. hanged some styles of the page in `style.css` file.

<br>
<br>

10. Added elements `index.html` file.

<br>


11. After all of this, you should run the server in the terminal to be able to use the website correctly and to be able to see the results by typing in the terminal `node server.js` `node` + the name of the `server file`
you should go to [http://localhost:2525/](http://localhost:2525/) after cloning the project to use it

<br>

---

## Tools

The following is a list of tools used thoroughout the project.

- [Chrome Dev tools](http://labs.udacity.com/udacity-feedback-extension/)
- [The starter code HTML](https://github.com/udacity/fend/blob/refresh-2019/projects/weather-journal-app/website/index.html)
- [the starter code CSS](https://github.com/udacity/fend/blob/refresh-2019/projects/weather-journal-app/website/style.css)
- [JS comments for app.js & server.js](https://github.com/udacity/fend/tree/refresh-2019/projects/weather-journal-app/commentsOnlyJS)
- [Nanodegree Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/)
- [MDN Web Docs documentation](https://developer.mozilla.org/en-US/)
- [W3Schools](https://www.w3schools.com/)
- code editor : Visual Studio Code.

---

## Creator

**Yasser Tawfik**

