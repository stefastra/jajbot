const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '~';
const token = JSON.parse(fs.readFileSync('token.json'))
var usePrefix = false;

client.login(token);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.on('ready', ()=>{
    console.log('jaj is online, id: ' + client.user.tag + '. token is valid.');

    /*let tempChannel = message.guild.channels.find('le-test')
    tempChannel.send('jupnisa, kalimera xalarwse')*/
});

var flag = true;
client.on('message', async message=>{
    let args = message.content.substring(prefix.length).split(" ");
    
    if(message.content[0] =='-' && message.content[1]=='p' && message.channel!='487383328161267714'){
        message.delete();
        if(flag){
            message.reply(':man_police_officer: haha bruh den epitrepete auto pou kaneis, mono sto <#487383328161267714>')
            .then(msg =>{
                msg.delete({timeout:3000});
            })
            flag=false
        }
        else{
            message.reply(':oncoming_police_car: iou iou iou, astynomos jaj edw, stamata, mono sto <#487383328161267714>')
            .then(msg =>{
                msg.delete({timeout:3000});
            })
            flag=true
        }
    }

        switch(message.content){
            case 'geia':
                message.reply('geia ' + message)
            break;
            case 'jaj?':
                message.channel.send('geia xalarwse')
            break;
            case 'info':
                message.channel.send('haha bruh: https://github.com/stefastra/jajbot')
            break;
            case 'mpes':
                if(false){
                    message.channel.send('pou re mlk')
                }
                else{
                    if(!message.guild.voice)
                        client.joinVoiceChannel();
                }
            break;
            case 'mu lipis':
                message.channel.send(':point_right: :point_left:')
            break;
            case 'jaj':
                message.channel.send(':point_left: :point_right:')
            break;
            case 'ti trws?':
                message.channel.send('🍊🥪')
            break;
        };
});