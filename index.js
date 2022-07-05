const http = require('http');
const express = require('express');
const Twilio = require('twilio');
const { urlencoded } = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const slave1 = '+12694477392';
const slave2 = '+16203250013';
const MY_NUMBER = '+12694477392';
var participant2 = null;
var participant1 = null;
const app = express();
app.use(urlencoded({ extended: false }));

app.post('/sms', (req, res, callback) => {
 let twiml = new Twilio.twiml.MessagingResponse();

  if(req.body.From == slave2 ){
    twiml.message({ to: participant2 }, `${req.body.Body}`);
    console.log(`Incoming message from slave`);
  }
  else if(req.body.From == MY_NUMBER){
    twiml.message({ to: participant1 },{ to: MY_NUMBER }, `${req.body.Body}`);
    console.log(`Incoming message for costomer`);
  }
  else{
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  if (req.body.From == participant1) {
    twiml.message({ to: MY_NUMBER }, `${req.body.From}: ${req.body.Body}`);
    console.log(`Participent 1 convo: ${participant1}`);
} else if(req.body.From == participant2){
    twiml.message({ to: slave2 }, `${req.body.From}: ${req.body.Body}`);
    console.log(`Participent 2 convo: ${participant2}`);
}
 if (participant1 == null){
     participant1 = req.body.From;
     twiml.message({ to: MY_NUMBER }, `${req.body.From}: ${req.body.Body}`);
     twiml.message({ to: MY_NUMBER }, `This is the new participant 1`);
     console.log(`Participent 1 ${req.body.From}: ${participant1}`);
    
}   else if (participant2 ==  null) {
    participant2 = req.body.From;
    twiml.message({ to: slave2 }, `${req.body.From}: ${req.body.Body}`);
    twiml.message({ to: slave2 }, `This is the new participant 2`);
    console.log(`Participent 2 ${req.body.From}: ${participant2}`);
} else {
    participant1 = req.body.From;
    twiml.message({ to: MY_NUMBER }, `${req.body.From}: ${req.body.Body}`);
    twiml.message({ to: MY_NUMBER }, `This is the new participant 1`);
    console.log(`Participent 1 ${req.body.From}: ${participant1}`);
   
}
}


  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  callback(null, twiml);
});


http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});