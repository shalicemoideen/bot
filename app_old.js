

var restify = require('restify');
var builder = require('botbuilder');


// Setup Restify Server
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '8feb10fb-5cf3-4adc-b681-0f5aac9ae13a',
    appPassword: 'naflDEI550#+vjfQGJN95=@'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});
console.log(connector);
console.log(bot);