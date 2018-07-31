// This loads the environment variables from the .env file
// require('dotenv-extended').load();
const https = require("https"),
fs = require("fs");

const builder = require('botbuilder');
const restify = require('restify');

var https_options = {
  key: fs.readFileSync('/home/shalice/certs/root_ca.key'),
  certificate: fs.readFileSync('/home/shalice/certs/root_ca.pem')
};

// var server = restify.createServer();
var https_server = restify.createServer(https_options);
console.log(https_server);

// const server = restify.createServer();
https_server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', https_server.name, https_server.url);
});

// server.listen(process.env.port || process.env.PORT || 3978, function () {
//     console.log('%s listening to %s', server.name, server.url);
// });



const connector = new builder.ChatConnector({
    appId: '8feb10fb-5cf3-4adc-b681-0f5aac9ae13a',
    appPassword: 'naflDEI550#+vjfQGJN95=@'
});

https_server.post('/api/messages', connector.listen());

// Bot Storage: Here we register the state storage for your bot. 
// Default store: volatile in-memory store - Only for prototyping!
// We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
var inMemoryStorage = new builder.MemoryBotStorage();

const bot = new builder.UniversalBot(connector, (session) => {
    session.send("This is a simple bot.");
}).set('storage', inMemoryStorage); // Register in memory storage

const logUserConversation = (event) => {
	console.log(event,"event");
    console.log('message: ' + event.text + ', user: ' + event.address.user.name);
};

// Middleware for logging
bot.use({
    receive: function (event, next) {
        logUserConversation(event);
        next();
    },
    send: function (event, next) {
        logUserConversation(event);
        next();
    }
});