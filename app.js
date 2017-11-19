const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const https = require('https');
const moment = require('moment');

function getLunoTicker(callback) {
  return https.get({
    host: 'api.mybitx.com',
    path: '/api/1/ticker?pair=XBTZAR'
  }, function(response) {
    var body = '';
    response.on('data', function(d) { body += d; });
    response.on('end', function() {
      var parsed = JSON.parse(body);
      var dateFormatted = moment(parsed.ticker.timestamp);
      var priceFormatted = parseFloat(parsed.ticker.bid).toFixed(0).replace(/./g, function(c, i, a) { return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; });
      callback({
        text: "`["+dateFormatted+"] BTC/ZAR "+priceFormatted+"`"
      });
    });
  });
}

// When any new message is received
client.on("message", async message => {

  // Ignore other bots, self, and lines not starting with our prefix
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "luno") {

    // Get ticker data from Luno.com
    console.log("Fetching ticker on request of: " + message.author.username + "#" + message.author.discriminator);

    // Send back as a message
    getLunoTicker(function(text){
      message.channel.send(text);
    });

  }

});

// Perform the actual login
client.login(config.token);
