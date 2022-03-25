const express = require("express")

const https = require("https")
const app = express()

app.get("/",function(req, res){
    const query = "Bhawanipatna";
    const apiKey = "c5dc6076313b974f371571d1e2cb6672";
    const urls = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(urls, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            console.log(temp);
            console.log(weatherDescription);
            res.write("<p> The weather is currently "+weatherDescription+"<img src="+imageUrl+"></p>")
            res.write("<h1>The temperature in "+query+" is "+temp+" celcious<h1>")
            res.send()
        })
    });
    // res.send("Server is up nad running.");
    
})




app.listen(3000, function(){
    console.log("Server is running on port 3000");
})