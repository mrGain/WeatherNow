const express = require("express")

const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html")
    // res.send("Server is up nad running.");
    
})


app.post("/",function(req, res){
    
    const query = req.body.cityname;
    const apiKey = "c5dc6076313b974f371571d1e2cb6672";
    const urls = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(urls, function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            // console.log(temp);
            // console.log(weatherDescription);
            res.write("<p> The weather is currently "+weatherDescription+"</p>")
            res.write("<h1>The temperature in "+query+" is "+temp+" celcious<h1>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
    });
    
})

// 


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})