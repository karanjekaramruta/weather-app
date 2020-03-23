const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname +  "/index.html");
 })

app.post("/", function(req,res){

  //const cityName = "London";
  const cityName = req.body.cityName;
  console.log(req.body.cityName);
  const appId = ""; //not passing sensitive info on github
  const units = "metric";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid="+appId+"&units="+units+"";
  console.log(apiUrl);
  https.get(apiUrl, function(response){

    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const iconUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        console.log(temp);
        console.log(weatherDescription);
        console.log(iconUrl);
        res.write("<h1>Temperature in " + cityName + " is " + temp + " degree celcius</h1>");
        res.write("<p>Weather description in " + cityName + " is " + weatherDescription + "</p>");
        res.write("<img src ="+iconUrl+">");
        res.send();
   })
})
})

app.listen(3000, function(){
  console.log("sever is up and running o port 3000");
})
