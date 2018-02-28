var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

var messages = {
  
};

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post("/send", function (req, res) {
  if (req.body.message && req.body.number) {
    var message = req.body.message;
    var toNumber = req.body.number;
    sendTest(message, toNumber);
    res.status(200);
    res.sendFile(__dirname + "/views/sent.html");
  } else {
    res.status(400);
    res.send("Error");    
  }

});

app.post("/reply", function (req, res) {
  for (var i in req.body) {
    console.log(i + ": " + req.body[i]); 
  }
  
  if (!messages[req.body["From"]]) {
    messages[req.body["From"]] = [];
  }
  var receivedMessage = {
    type: "sent",
    message: req.body["Body"]
  }
  messages[req.body["From"]].push(receivedMessage);
  console.log(messages);
  
  res.status(200);
  res.send("OK");
});

app.get("/replies", function (req, res) {
 res.json(messages); 
});

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTHTOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

function sendTest(message, toNumber) {
  console.log("Sending");
  client.messages.create({
      body: message,
      to: toNumber,  // Text this number
      from: process.env.FROM_TWILIO_NUMBER // From a valid Twilio number
  })
  .then(function(message) {
    var to = "+" + toNumber;
    if (!messages[to]) {
      messages[to] = [];
    }
    var sentMessage = {
      type: "sent",
      message: message.body
    }
    messages[to].push(sentMessage);
  })
  .catch(function(error) {
    console.log(error);
  });;
}


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
