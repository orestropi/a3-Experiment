// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const Data = require('./model/Data');


// make all the files in 'views' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("img"));
app.use(express.static("dev"));
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("js"));
dotenv.config();

//Connecting to db
mongoose.connect(
  process.env.DB_CON,
  () => console.log('succefully connected to db!')
);

// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use( express.urlencoded({ extended:true }) )
app.use(express.static('./'))

//Middleware
app.use(express.json());
var bodyParser = require('body-parser')




// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});



//Route Middleware
//app.use('/api/user', app);

// // send the default array of dreams to the webpage
// app.get("/dreams", (request, response) => {
//   // express helps us take JS objects and send them as JSON
//   response.json(dreams);
// });
app.post("/newData", async (req, res) => {
  // express helps us take JS objects and send them as JSON
  console.log(req.body)

  const data = new Data({
    participantID: req.body.participantID,
    trialN: req.body.trialN,
    chartType: req.body.chartType,
    actualPercent: req.body.actualPercent,
    enteredPercent: req.body.enteredPercent,
    error: req.body.error
});
    const dataUser = await data.save();
    console.log("User data created!");
//Check what contacts user has} 
res.send({error: req.body.error})
});


// listen for requests :)
app.listen(process.env.port || 3000)

