var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.AUTHTOKEN;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


// This stores sent messages, if the server restarts it is cleared:
var messages = {};

app.get("/", function (req, res) {
  res.status(200);
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint for sending messages
app.post("/send", function (req, res) {
  if (req.body.message && req.body.number) {
    var message = req.body.message;
    var toNumber = req.body.number;
    sendSMS(message, toNumber, callback);
    
    function callback(sent) {
      if (sent) {
        res.status(200);
        res.send("OK");
      } else {
        res.status(400);
        res.send("Error"); 
      }
    }
    
  } else {
    res.status(400);
    res.send("Error");    
  }
});

// Endpoint for logging replies
// This URL is entered in the Twilio dashboard
app.post("/reply", function (req, res) {
  // Add phone number as a property in
  // messages object if it's not there yet
  if (!messages[req.body["From"]]) {
    messages[req.body["From"]] = [];
  }
  var receivedMessage = {
    type: "sent",
    message: req.body["Body"]
  }
  messages[req.body["From"]].push(receivedMessage);
  
  res.status(200);
  res.send("OK");
});

// Endpoint for messages log
app.get("/messages", function (req, res) {
  res.status(200);
  res.json(messages); 
});



function sendSMS(message, toNumber, callback) {
  console.log("Message: " + message);
  console.log("Number: " + toNumber);
  console.log("Sending");
  client.messages.create({
      body: message,
      to: toNumber,  // Text this number
      from: process.env.FROM_TWILIO_NUMBER // From a valid Twilio number
  })
  .then(function(message) {
    toNumber = toNumber[0] === "+" ? toNumber : "+" + toNumber;
    if (!messages[toNumber]) {
      messages[toNumber] = [];
    }
    var sentMessage = {
      type: "sent",
      message: message.body
    }
    messages[toNumber].push(sentMessage);
    console.log("SUCCESS");
    console.log(messages);
    callback(true);
  })
  .catch(function(error) {
    console.log(error);
    console.log("FAIL");
    callback(false);
  });;
}

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
