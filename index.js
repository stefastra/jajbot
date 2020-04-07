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
    const chGeneral = client.channels.cache.find(ch => ch.name === '⌨general');
    chGeneral.send('jupnisa, kalimera xalarwse!')
});

client.on('guildMemberUpdate', member=>{
    if(member.id=='225195171204038656'){
        const chGeneral = member.guild.channels.cache.find(ch => ch.name === '⌨general');
        chGeneral.send('xaxa o mixalis allakse onoma');
    }
})

const prntUrlBase = 'http://prntscr.com/';
var prntUrlVarStr = 'rus';
var prntUrlVarNum = 999;

var flag = true;
var flagK = false;
var isSending = false;

client.on('message', async message=>{
    let args = message.content.substring(prefix.length).split(" ");
    let ytlink = message.content.substring(0,32);
    let ytlinkalt = message.content.substring(0,17);
    let mCon = message.content.toLowerCase();

    //1: bot-commands, 2: music, music exception is needed to avoid duplicate chat moderation rules
    if(((mCon[0]=='-' && mCon[1]=='p') || (mCon[0]=='-' && mCon[1]=='s') || (mCon[0]=='-' && mCon[1]=='r')) && message.channel!='487383328161267714' && message.channel!='487381111744233473'){
        
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
        console.log('misplaced bot command eliminated, in ' + message.channel.name)
    }
    
    if(ytlink!='https://www.youtube.com/watch?v=' && ytlinkalt!='https://youtu.be/' && message.channel=='487381111744233473' && message.author.id!='693966110328094730'){
        console.log('non-youtube link spotted in music channel');
        message.delete();
        if(message.author.id!='234395307759108106')
            message.reply(':man_police_officer: bruh den epitrepete auto pou kaneis, mono youtube links')
            .then(msg =>{
                msg.delete({timeout:5000});
            });
    }

    if(mCon=='jaj svise'){
        if(message.member.roles.cache.has('340521348260429824')){
            console.log('o jaj esvise 10 minimata sto ', message.channel.name);
            message.channel.bulkDelete(10);
        }
        else{
            message.reply('den exeis adeia gia auto bro..');
        }
    }

    if(mCon=='jaj steile' && message.channel.id=='696857160318976021'){
        while(true){
            console.log('Sending pic...');
            message.channel.send(prntUrlBase + prntUrlVarStr + prntUrlVarNum.toString());
            prntUrlVarNum--;
            await sleep(3000);
            console.log('Sent!');
        }
    }

//generic responses
        switch(mCon){
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
                if(true){
                    message.channel.send('pou re mlk');
                    message.channel.send('<:peepoNpc:536307730361745418>');
                }
                else{
                    if(!message.guild.voice)
                        client.joinVoiceChannel();
                }
            break;
            case 'mu lipis':
                message.channel.send(':point_right: :point_left:');
            break;
            case 'jaj':
                message.channel.send(':point_left: :point_right:');
            break;
            case 'ti trws?':
                message.channel.send('🍊🥪');
            break;
        };
    })