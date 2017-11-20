const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const luno = require('./luno.js');

// When any new message is received
client.on("message", async message => {

  // Ignore other bots, self, and lines not starting with our prefix
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const entry = args.shift().toLowerCase();
  
  if (entry === "luno") {
    
    // Get ticker data from Luno.com
    console.log("Fetching ticker on request of: " + message.author.username + "#" + message.author.discriminator);
    
    // Default
    if (args.length == 0) args.push("zar");
    
    switch(args[0])
    {
      case "help":  
        message.channel.send({embed: {
          color: 0xF69222,
          description: "You can use the following commands: \n\n\
`.luno      - Default: Show the BTC/ZAR ticker`\n\
`.luno zar  - Show the BTC/ZAR ticker`\n\
`.luno ngn  - Show the BTC/NGN ticker`\n\
`.luno myr  - Show the BTC/MYR ticker`\n\
`.luno idr  - Show the BTC/IDR ticker`\n\
`.luno help - This help message`"
        }});
      break;
      case "zar":
        luno.getLunoTickerFull("XBTZAR", function(ticker){
          message.channel.send(luno.createEmbed(ticker));
        });
      break;
      case "ngn":   
        luno.getLunoTickerFull("XBTNGN", function(ticker){
          message.channel.send(luno.createEmbed(ticker));
        });
      break;
      case "myr":   
        luno.getLunoTickerFull("XBTMYR", function(ticker){
          message.channel.send(luno.createEmbed(ticker));
        });
      break;
      case "idr":   
        luno.getLunoTickerFull("XBTIDR", function(ticker){
          message.channel.send(luno.createEmbed(ticker));
        });
      break;
      default:
        message.channel.send({embed: {
          color: 0xFF0000,
          description: "Sorry, I don't know that command!"
        }});
      break;
    }
    
    
  }

});

// Perform the actual login
client.login(config.token);