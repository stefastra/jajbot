const fs = require('fs');
const Discord = require('discord.js');
const { exception } = require('console');
const client = new Discord.Client();
const token = JSON.parse(fs.readFileSync('token.json'))
const prntUrlBase = 'http://prntscr.com/';
var prntUrlVarNum = parseInt(JSON.parse(fs.readFileSync('runtime.json')));
var msgFlag = true;
var jajBotId = '693966110328094730';
var musicBotId = '234395307759108106';
var stefastraId = '181014405578883073';
var dmChannelId = '696483345760125058';
var botCommandsChannelId = '487383328161267714';
var adminRoleId = '727647679026561117';
var doStartupMessage = false;

client.login(token);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.on('ready', ()=>{
    console.log('jaj is online, id: ' + client.user.tag + '. token is valid.');
    const chGeneral = client.channels.cache.find(ch => ch.name === '⌨general');
    if(doStartupMessage)
        chGeneral.send('<:pepega:625376360306835471>');
    var Kavlet = client.guilds.cache.find(gl => gl.name === 'Kavlet');
});

client.on('guildMemberUpdate', member=>{
    if(member.id=='225195171204038656'){
        const chGeneral = member.guild.channels.cache.find(ch => ch.name === '⌨general');
        chGeneral.send('xaxa o mixalis allakse onoma');
    }
})

var flag = true; 
var flagK = false;
var isSending = false;
var delMsgNum = 1;

client.on('message', async message=>{
    const chGeneral = client.channels.cache.find(ch => ch.name === '⌨general');
    if(message.channel.id === dmChannelId){
        chGeneral.send(message.content);
    }
    let args = message.content.toLowerCase();
    //logging
    console.log("channel: " + "\"" + message.channel.name + "\"" + " author: " + "\"" + message.author.username + "\" " + Date(message.createdTimestamp));
    if(message.content != '')
        console.log(message.content);
    else
        console.log('an image was sent'); //todo make it show the image url
    console.log("l1: " + args[0],"l2: " + args[1]);

    /*
        var i=0;
        args.forEach(element => {
            logMsg+='args['+i+']=';
            logMsg+=element+'\n';
            i++;
        });
    */   
   //bot deletion
    if(message.author.id==musicBotId && message.channel.id!=botCommandsChannelId){
        message.delete();
    }


    //all channel moderation |1: bot-commands, 2: music, music exception is needed to avoid duplicate chat moderation rules
    if(((args[0]=='-' && args[1]=='f' && args[2]=='f') || (args[0]=='-' && args[1]=='p') || (args[0]=='-' && args[1]=='s') || (args[0]='-' && args[1]=='q') || (args[0]=='-' && args[1]=='r')) && message.channel!='487383328161267714' && message.channel!='487381111744233473'){
        //must fix -ff not working
        message.delete();
        if(flag){
            message.reply(':man_police_officer: haha bruh den epitrepete auto pou kaneis, mono sto <#487383328161267714>')
            .then(msg =>{
                msg.delete({timeout:5000});
            })
            flag=false
        }
        else{
            message.reply(':oncoming_police_car: iou iou iou, astynomos jaj edw, stamata, mono sto <#487383328161267714>')
            .then(msg =>{
                msg.delete({timeout:5000});
            })
            flag=true
        }
        console.log('misplaced bot command eliminated in ' + message.channel.name)
    }
    
    //music channel moderation
    if(message.content.substring(0,32)!='https://www.youtube.com/watch?v=' && message.content.substring(0,17)!='https://youtu.be/' && message.channel=='487381111744233473' && message.author.id!=jajBotId){
        console.log('non-youtube link spotted in music channel');
        message.delete();
        if(message.author.id!='234395307759108106')
            message.reply(':man_police_officer: bruh den epitrepete auto pou kaneis, mono youtube links')
            .then(msg =>{
                msg.delete({timeout:5000});
            });
    }

    //pfp command
    if(message.content.substring(0,3) == 'pfp'){
        try{
            var user = message.mentions.users.first();
            console.log(user.avatarURL() + '?size=1024');
            message.channel.send(user.avatarURL() + '?size=1024');
        }
        catch(err){
            console.log("Unexpected Behaviour!");
            message.channel.send("nai asteio malaka?");
        }
        if(user.id == '693966110328094730'){
            message.reply('nai eimai gamatos to kserw')
        }
        
    }

    //svisimo command
    if(message.content.substring(0,9) == 'jaj svise'){
        if(message.author.id == adminRoleId || message.author.id == stefastraId){
            if (Number(args[11]) != NaN){
                delMsgNum = Number(args[11]) * 10;
                console.log('jaj will delete ', delMsgNum, ' messages in', message.channel.name);
            }
            delMsgNum = 20;
            console.log('o jaj esvise ', delMsgNum, ' minimata sto ', message.channel.name);
            message.channel.bulkDelete(delMsgNum);
            message.reply('geia jaj edw, esvisa ', toString(delMsgNum), ' minimata :^)')
            .then(msg =>{
                msg.delete({timeout:5000});
            })
        }
        else{
            message.reply('den exeis adeia gia auto bro..');
        }
    }

    //katharise command
    if(message.content.substring(0,13) == 'jaj katharise'){
        if(message.author.id == adminRoleId || message.author.id == stefastraId){
            // const channel = message.channel;
            // const channel = client.channels.get('someID');

            message.channel.fetchMessages(50)
            .then(fetchedMessages => {
            const messagesToDelete = fetchedMessages.filter(msg => (msg.content.includes('-p')));
             return channel.bulkDelete(messagesToDelete, true);
        })
        .then(deletedMessages => channel.send(`Deleted **${deletedMessages.size}** message${deletedMessages.size !== 1 ? 's' : ''}.`))
        .catch(console.error);
        }
    }

    //jaj steile command
    if(message.content == 'jaj steile' && message.channel.id=='772129659194310727'){
        if(message.author.id == adminRoleId)
        message.reply('entaksei afentiko :^)')
        while(true){
            console.log('Sending pic...');
            message.channel.send(prntUrlBase + prntUrlVarNum.toString(36));
            prntUrlVarNum++;
            await sleep(3000);
            console.log('Sent!');
        }
    }

    //generic responses below
    if(args[0]=='geia' && message.author.id!=jajBotId){
        message.channel.send(args[0]);
        console.log('geia upothike');
    }

    switch(message.content){
            case 'geia':
                message.reply('geia');
                message.channel.send('<:peepoSmile:629010685095051264>');
            break;
            case 'jaj':
                message.channel.send('ela')
            break;
            case 'jaj?':
                if(message.author.id=='396653783804936202'){
                    if(flagK){
                        message.channel.send('malaka kargioli poustanio');
                        flagK=false;
                    }
                    else{
                        message.channel.send('voulose to malaka apotiximene paizeis rocket league olh mera kai thn exeis dei kapoios, apla vgale ton skasmo, malaka');
                        flagK=true;
                    }
                }else{
                    message.channel.send('geia xalarwse');

                }
            break;
            case 'info':
                message.channel.send('haha bruh: https://github.com/stefastra/jajbot');
            break;
            case 'mpes':
                if(false){
                    message.channel.send('pou re mlk');
                    message.channel.send('<:peepoNpc:536307730361745418>');
                }
                else{
                        const vc = message.guild.channels.cache.get('692402791011975249');
                        vc.join();
                }
            break;
            case 'mu lipis':
                message.channel.send(':point_right: :point_left:');
            break;
            case 'jaj malaka':
                message.channel.send(':point_left: :point_right:');
            break;
            case 'ti trws?':
                message.channel.send('https://cdn.discordapp.com/attachments/762014861956743171/778367100196618270/0buu83n7npw11.jpg');
            break;
        };
    })