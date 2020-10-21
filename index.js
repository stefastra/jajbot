const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const token = JSON.parse(fs.readFileSync('token.json'))
const prntUrlBase = 'http://prntscr.com/';
var prntUrlVarNum = parseInt(JSON.parse(fs.readFileSync('runtime.json')));
var msgFlag = true;
var jajBotId = '693966110328094730';
var musicBotId = '234395307759108106';
var stefastraId = '181014405578883073';
var dmChannelId = '696483345760125058';
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
        chGeneral.send('jupnisa, kalimera xalarwse!');
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
    console.log("msgId: " + "\"" + message.channel.id + "\"")
    if(message.channel.id === dmChannelId){
        chGeneral.send(message.content);
    }
    let args = message.content.toLowerCase();
    var logMsg = '';

    /*
        var i=0;
        args.forEach(element => {
            logMsg+='args['+i+']=';
            logMsg+=element+'\n';
            i++;
        });*/

    if(message.channel.id=='698142346931601421' && message.author.id!=jajBotId){
        //message.channel.send(logMsg);
    }

    //temp
    console.log(args);
    console.log("l1: " + args[0],"l2: " + args[1]);
    

    //all channel moderation |1: bot-commands, 2: music, music exception is needed to avoid duplicate chat moderation rules
    if(((args[0]=='-' && args[1]=='p') || (args[0]=='-' && args[1]=='s') || (args[0]='-' && args[1]=='q') || (args[0]=='-' && args[1]=='r')) && message.channel!='487383328161267714' && message.channel!='487381111744233473'){
        
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

    if(message.content.substring(0,9)=='jaj svise'){
        if(message.author.id == adminRoleId || message.author.id == stefastraId){
            if (args[11]>=0 && args[11]<=9){
                delMsgNum = parseInt(args[11]) * 10;
                console.log('jaj will delete ', delMsgNum, ' messages in', message.channel.name);
            }
            delMsgNum = 20;
            console.log('o jaj esvise ', delMsgNum, ' minimata sto ', message.channel.name);
            message.channel.bulkDelete(delMsgNum);
            message.reply('geia jaj edw, esvisa ' + toString(delMsgNum) + ' minimata :^)')
            .then(msg =>{
                msg.delete({timeout:5000});
            })
        }
        else{
            message.reply('den exeis adeia gia auto bro..');
        }
    }

    if(args[0]=='jaj' && args[1]=='steile' && message.channel.id=='696857160318976021'){
            console.log('Sending pic...');
            message.channel.send(prntUrlBase + prntUrlVarNum.toString(36));
            prntUrlVarNum++;
            await sleep(3000);
            console.log('Sent!');
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
                if(message.author.presence){
                    message.channel.send('pou re mlk');
                    message.channel.send('<:peepoNpc:536307730361745418>');
                }
                else{
                        const vc = message.guild.channels.cache.get('340526243743137813');
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
                message.channel.send('🍊🥪');
            break;
        };
    })