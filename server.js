
// Setup empty JS object to act as endpoint for all routes

projectData = {};



// Express to run server and routes
 const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */

const cors = require('cors');

/* Middleware*/

const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));

// to tell the body parser how we want our data to be dealt with and we want it to be in JSON format.
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Spin up the server

// set the port that it will run on.
const port = 2525;


const server = app.listen(port, listening);


// Callback to debug

function listening(){
    console.log(`Server is running on port (localhost) : ${port}`);

};


// Initialize all route with a callback function

app.get('/all', getAllData);

// Callback function to complete GET '/all'

function getAllData  (req,res){
    res.send(projectData);
    console.log(projectData);

};



// Post Route


app.post('/addData', addData);


// callback function to execute

/**set the retutrned data from the client side code from to the`projectData`object 
 * and then send it to the page and console log the object.
 */
function addData  (req,res){
  
    projectData = req.body;
    res.send(projectData);
    console.log(projectData);



};



