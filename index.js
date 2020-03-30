const Discord = require('discord.js');
const client = new Discord.Client();

/*const fs = require('fs') 
fs.readFile('token.txt', (err, data) => { 
    if (err) throw err; 

    return data.toString();
}) */
//inactive for now

const token = 'NjkzOTY2MTEwMzI4MDk0NzMw.XoIfSw.xfWtcPP3poBr6pAwlDyTzwX5jTA';
const prefix = '~';
var usePrefix = false;

client.on('ready', ()=>{
    console.log('jaj is online, id: ${client.user.tag}');

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
                        message.member.voiceChannel.join()
                        .then(connection =>{
                            message.channel.send("geia xalarwse")
                        })
                        
                }
        }
    }
    if(usePrefix){
        
    }
})

client.login(token);