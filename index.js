const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NjkzOTY2MTEwMzI4MDk0NzMw.XoEwwg.c0LDoDpvR-3S7cECxKd0YcGbS90';

client.on('ready', ()=>{console.log('jaj is online')})

client.on('message', msg=>{
    if(msg.content == "jaj?"){
        msg.channel.send('geia xalarwse');
    }
})

client.login(token);