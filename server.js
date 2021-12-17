// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
// Initialize the main project folder
app.use(express.static('website'));
app.use(cors())
// Setup Server
app.listen(3000,startServer)
function startServer(){
    console.log("Server started")
}
app.get("/getData",(req,res)=>{
    console.log(projectData)
    res.send(projectData)
})
app.post("/postData",(req,res)=>{
    projectData={
        temp:req.body.temp,
        feeling:req.body.feeling,
        date:req.body.date
    }
    
})