const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// On bot authentication
client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
});

// When joining a new server
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// When being removed from a server
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// When any new message is received
client.on("message", async message => {

  // Ignore other bots, self, and lines not starting with our prefix
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "luno") {
    
    // Get ticker data from Luno.com
    
    // Send back as a message
    var sayMessage = "Fetching prices from Luno...";
    
    message.channel.send(sayMessage);

  }
  
});

// Perform the actual login
client.login(config.token);