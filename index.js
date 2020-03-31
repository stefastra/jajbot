const fs = require('fs');
const Discord = require('discord.js');

let rawdata = fs.readFileSync('token.json');
let token = JSON.parse(rawdata);
console.log(token);

const client = new Discord.Client();
const prefix = '~';
var usePrefix = false;

client.on('ready', ()=>{
    console.log('jaj is online, id: ' + client.user.tag);

    client.user.setPresence({
        status: "online",
        game: {
            name: "mandarine sandwich",
            type: "im eating"
        }
    })
});

client.on('message', message=>{
    let args = message.content.substring(prefix.length).split(" ");

    if(!usePrefix){
        switch(args[0]){
            case 'geia':
                message.reply('geia');
            break;
            case 'jaj':
                message.channel.send('geia xalarwse')
            break;
            case 'info':
                message.channel.send('haha bruh: https://github.com/stefastra/jajbot')
            break;
            case 'mpes':
                if(!message.member.voice){
                    message.channel.send('pou re mlk')
                }
                else{
                    if(!message.guild.voice)
                        client.joinVoiceChannel()         
                }
        }
    }
    if(usePrefix){
        
    }
})

client.login(token);