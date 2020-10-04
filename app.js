const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const axios = require("axios");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  // var jsonData = JSON.stringify(data);

  // const url = "https://us10.api.mailchimp.com/3.0/lists/b6f3123cc9"
  //
  // const options = {
  //   method: "post",
  //   auth: "af49c64be87171d8b77bd187877119e3-us10"
  // }
  //
  // https.request(url, options, function(response){
  //
  //   if(response.statusCode === 200){
  //     res.sendFile(__dirname + "/success.html");
  //   }else{
  //     res.sendFile(__dirname + "/failure.html");
  //   }
  //   response.on("data", function(data){
  //     console.log(JSON.parse(data));
  //   });

      const options = {
        method: 'post',
        url: 'https://us10.api.mailchimp.com/3.0/lists/b6f3123cc9',
        auth: "af49c64be87171d8b77bd187877119e3-us10",
        data: {
          members: [
            {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: firstName,
                LNAME: lastName
              }
            }
          ]
        }
    };

    axios(options).catch(function(response) {
      if(response.status === 200){
          res.sendFile(__dirname + "/success.html");
        }else{
          res.sendFile(__dirname + "/failure.html");
          console.log(response.status);
        }
    });
  // request.write(jsonData);
  // request.end();
});

app.post("/failure.html", function(req,res){
  res.redirect("/");
});

app.listen("3000", function(){
  console.log("Server is running on port 3000");
});


// af49c64be87171d8b77bd187877119e3-us10
