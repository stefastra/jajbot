const fs = require('fs');
const Discord = require('discord.js');
const jimp = require('jimp');
const webp=require('webp-converter');
const download = require('image-downloader');
const { title } = require('process');
const client = new Discord.Client();
const token = JSON.parse(fs.readFileSync('token.json'));
const prntUrlBase = 'http://prntscr.com/';
const jajpath = __dirname;
var prntUrlVarCeiling = parseInt(JSON.parse(fs.readFileSync('runtime.json')));
var jajBotId = '693966110328094730';
var musicBotId = '234395307759108106';
var stefastraId = '181014405578883073';
var dmChannelId = '696483345760125058';
var enio4eDmChannelId = '803293894803456000';
var botCommandsChannelId = '487383328161267714';
var adminRoleId = '727647679026561117';
var isSending = false;

var mayo = true;
var rollEnabled = true;
var rollPrcEnabled = true;
var fortuneEnabled = true;
var rndMentionEnabled = true;


client.login(token);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

client.on('ready', ()=>{
    console.log('jaj is online, id: ' + client.user.tag + '. token is valid.');
    const chGeneral = client.channels.cache.find(ch => ch.name === '⌨general');
    //chGeneral.send('<:mamalis:778589167868968960>');
    //client.user.setStatus('invisible');
    
});

client.on('guildMemberUpdate', member=>{
    if(member.id=='225195171204038656'){
        message.member.setNickname("smeke");
    }
})

/*client.on('emojiDelete', emoji=>{
        const chGeneral = client.guilds.cache. .find(ch => ch.name === '⌨general');
        chGeneral.send(emoji,' was deleted.');
})*/

var flag = true; 
var flagK = false;
var delMsgNum = 1;

client.on('message', async message=>{
    const chGeneral = client.channels.cache.find(ch => ch.name === '⌨general');
    if(message.channel.id === dmChannelId && message.author != jajBotId){
        chGeneral.send(message.content);
    }
    let args = message.content.toLowerCase();
    //logging
    console.log("channel: " + "\"" + message.channel.name + "\"" + " author: " + "\"" + message.author.username + "\" " + Date(message.createdTimestamp));
    console.log(message.channel.id);
    if(message.content != ""){
        console.log(message.content);
    }else{
        console.log("message contains no text")
    }
    if(message.attachments.size > 0){
        message.attachments.forEach(el => {
            console.log(el.url);
        });
    }
    console.log("l1: " + args[0],"l2: " + args[1]);

    //smeke
    if(message.author.id == "225195171204038656"){
        var smikelist = [
            "smike","smik","sminem","scum","smeks","smixalis","shushi","spaghetti","schmeke","smeke","smikey smouse"
            ];
        message.member.setNickname(smikelist[Math.floor(Math.random() * smikelist.length)]);
    }

    //mayo
    if(message.content == 'https://tenor.com/view/manowar-courage-true-metal-mano-warrior-strong-gif-16851884' && message.author.id != jajBotId && mayo == true){
        message.channel.send('https://tenor.com/view/manowar-courage-true-metal-mano-warrior-strong-gif-16851884');
        mayo = false;
    }

    //crypto
    if(message.content.search(/doge/i) != -1 && message.author.id != jajBotId){
        //lol
    }

    //commands command
    if(message.content.search(/jaj commands|jaj help/i) != -1){
        const cmds = new Discord.MessageEmbed()

        .setColor('#0099ff')
        .setTitle('All jaj commands')
        .setURL('https://github.com/stefastra/jajbot')
        .setAuthor('jajbot', 'https://www.fruitlayer.com/media/k2/items/cache/2fa67f482133f1c934235b73c2a03954_XL.jpg', 'https://github.com/stefastra/jajbot')
        .setDescription('den xreiazetai ola ta commands na einai sthn arxh.\npx. jaj roll, jaj ?')
        .addFields(
            { name: 'jaj steile <number>', value: 'stelnei mia h perissoteres tixaies eikones apo to prntscr' },
            { name: 'jaj svise', value: 'svinei ta teleftaia 10 minimata' },
            { name: 'jaj help', value: 'auto pou diavazeis authn thn stigmi' },
            { name: 'jaj ?', value: 'apantaei se erwthseis typou nai h oxi'},
            { name: 'jaj @', value: 'mention kapoion stin tuxh (disabled logo spam)'},
            { name: 'jaj roll', value: 'rollarei 0-10' },
            { name: 'jaj roll%', value: 'rollarei 0-100%' },
            { name: 'pfp @mention', value: 'deixnei thn eikona tou tagarismenou xristi sto discord', },
            { name: '/christmashat @', value: 'vazei xristougenniatiko kapelo sthn eikona tou tagarismenou xristi', },
        )
        .setTimestamp()
        .setFooter('© stefastra 2021', 'https://raw.githubusercontent.com/stefastra/jajbot/master/assets/mandarine.png');

        message.channel.send(cmds);
    } 

    //christmas hat
    if(message.content.substring(0,13) == "/christmashat"){
        var user = message.content.author;
        var imgPath = "\\assets\\hats_cache\\";
        try{
            user = message.mentions.users.first();
            console.log(`using the picture of ${user.id}`);
        }
        catch(err){}

        const options = {
            url: user.avatarURL() + "?size=1024",
            dest: jajpath + imgPath + user.id + ".webp"
          }
            download.image(options)
            .then(({ filename }) => {
            console.log('Profile pic downloaded as ', filename)
            const result = webp.dwebp(jajpath + imgPath + user.id +".webp", jajpath + imgPath + user.id + ".png", "-o"); //convert webp to png
            result.then((response) => {
                console.log(response);
              });
        })
        .catch((err) => console.error(err))

        var hatSent = false;
        while(!hatSent){
            var images = [jajpath + imgPath + user + ".png", jajpath + "\\assets\\hat.png"];
            var jimps = [];
            for (var i = 0; i < images.length; i++){
                jimps.push(jimp.read(images[i]))
            }

            //creates a promise to handle the jimps
            await Promise.all(jimps).then(function(data) {
                return Promise.all(jimps)
            }).then(async function(data){
                data[0].composite(data[1], 0, 0);
                data[0].fisheye({ r: 2.2});
                data[0].write(jajpath + imgPath + user.id + "_hat" + ".png");
            })
            try{
                message.channel.send("", {files: [jajpath + imgPath + user.id + "_hat" + ".png"]});
                hatSent = true;
            }catch(err){
                console.log("error when sending hat pic");
            }
        }        
    }

    //roll command
    if(message.content.search(/jaj roll/i) != -1 && message.content.search(/jaj roll\%/i) == -1 && rollEnabled == true){
        message.channel.send("rolling 0-10: " + Math.floor(Math.random() * 10)); //needs improvement
    }

    //roll% command
    if(message.content.search(/jaj roll\%/i) != -1 && rollPrcEnabled == true){
        message.channel.send("rolling 0-100%: " + Math.floor(Math.random() * 100) +"%"); //needs improvement
    }

    //fortune command
    if(message.content.search(/jaj \?/i) != -1 && fortuneEnabled == true){
        var fortune = [
            "sigoura", "einai sigouro", "... nai", "nai", "mporeis na «vasisteis» se auto",
            "etsi pws to vlepw, nai", "arketa pithano", "ksekathara", "profanws", "ta simadia lene nai",
            "e...", "den eimai sigouros", "👉👈", "den gnorizw", "hmmmm...",
            "oxi", "h apanthsh einai oxi", "oi piges mou lene oxi", "apithano", "ela kai tepo"
            ];
            message.channel.send(fortune[Math.floor(Math.random() * fortune.length)]);
    }

    //random tag command
    if(message.content.search(/jaj @/i) != -1 && rndMentionEnabled == true){
            var userlist = [
                "181132923485945862","181134145198489600","700690140795895888","181133772983500800","181014405578883073",
                "267244513070809089","225195171204038656","273893282361114625","396653783804936202","693966110328094730",
                "641557334526787594","181092858273595392","239132499819626497","451747321622036480","181101011245596672",
                "395530692584407050", "354236714853728256", "236504980939341826", "185335103499665408", "185335103499665408",
                "367020830187716610", "187538910367318017"
                ];
            message.channel.send("<@" + userlist[Math.floor(Math.random() * userlist.length)] + ">");
    }

    //all channel moderation |1: bot-commands, 2: music, music exception is needed to avoid duplicate chat moderation rules
    if(((args[0]=='-' && args[1]=='f' && args[2]=='f') || (args[0]=='-' && args[1]=='p') || (args[0]=='-' && args[1]=='s') || (args[0]=='-' && args[1]=='q') || (args[0]=='-' && args[1]=='r') ||
        (args[0]=='-' && args[1]=='F' && args[2]=='F') || (args[0]=='-' && args[1]=='P') || (args[0]=='-' && args[1]=='S') || (args[0]=='-' && args[1]=='Q') || (args[0]=='-' && args[1]=='R'))
    && message.channel!='487383328161267714' && message.channel!='796105151810240564'){
        message.react("🍊");
        await sleep(3000);
        message.delete();
        /*if(flag){
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
        }*/
        console.log('misplaced bot command eliminated in ' + message.channel.name)
        const chBotCmds = client.channels.cache.find(ch => ch.name === '🤖bot-commands');
        chBotCmds.send("\"" + message.content + "\"" + " by " + message.author.username);
    }

    //groovy automatic message deletion
    if(message.author.id==musicBotId && message.channel.id!=botCommandsChannelId){
        await sleep(3000);
        message.delete();
    }
    
    //music channel moderation
    if(message.content.substring(0,32)!='https://www.youtube.com/watch?v=' && message.content.substring(0,17)!='https://youtu.be/' &&
    message.content.substring(0,33)!='https://www.youtube.com/playlist?' && message.content.substring(0,30)!='https://m.youtube.com/watch?v=' &&
    message.content.substring(0,25)!='https://open.spotify.com/' && message.content.search(/bandcamp.com\//)== -1 &&
    message.content.substring(0,31)!='https://tidal.com/browse/track/' &&
    message.channel=='487381111744233473' && message.author.id!=jajBotId){
        console.log('non-music link spotted in music channel');
        message.delete();
        if(message.author.id!='234395307759108106')
            message.reply(':man_police_officer: bruh den epitrepete auto, mono links gia mousiki')
            .then(msg =>{
                msg.delete({timeout:5000});
            });
    }

    //pfp command
    if(message.content.search('pfp') != -1){
        try{
            var user = message.mentions.users.first();
            console.log(user.displayAvatarURL({dynamic : true}) + '?size=1024');
            message.channel.send(user.displayAvatarURL({dynamic : true}) + '?size=1024');
        }
        catch(err){
            console.log("Unexpected Behaviour!");
        }
        if(user.id == '693966110328094730'){
            message.reply('nai eimai gamatos to kserw')
        }
        
    }

    //svise command
    if(message.content.search(/jaj svise/i) != -1){
        if(message.author.id == stefastraId){
            var delMsgNum = 20;
            console.log('o jaj esvise ', delMsgNum, ' minimata sto ', message.channel.name);
            //message.channel.bulkDelete(delMsgNum);
            message.reply('geia jaj edw, den esvisa ' + delMsgNum + ' minimata :^) (einai apenergopoihmeno to svisimo)')
            .then(msg =>{
                msg.delete({timeout:5000});
            })
        }
        else{
            message.reply('den exeis adeia gia auto bro..');
        }
    }

    //katharise command
    if(message.content.search(/jaj katharise/i) != -1){ //this feature is not yet implemented
        if(message.author.id == stefastraId){
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

    //jaj stop
    if(message.content.search(/jaj stamata/i) != -1){
        msgsToSend = 0;
        message.reply("ok");
    }

    //jaj steile command
    if(message.content.substring(0,10).toLowerCase() == 'jaj steile'){
        if(message.channel.id == '796105151810240564'){
            if(isSending == false){
            isSending = true;
            var msgsToSend = 1;
            if(message.content.search(/\d{1,}/) != -1){
                msgsToSend = message.content.match(/\d{1,}/);
                if(parseInt(msgsToSend) > 100){
                    msgsToSend = 100;
                }
            }
            while(msgsToSend > 0){
                msgsToSend--;
                console.log('Sending pic...');
                var prntUrlVarNum = Math.floor(Math.random() * prntUrlVarCeiling);
                message.channel.send(prntUrlBase + prntUrlVarNum.toString(36));
                await sleep(3000);
                console.log('Sent!');
                message.channel.send(msgsToSend)
                console.log("messages left:" + msgsToSend);
            }
            isSending = false;
        }else(message.channel.send("stelnw hdh re sourgelo, perimene"))
        }
        else{
            message.reply('den epitrepetai edw');
        }
    }

    //cat detection
    if(message.author.id == "181092858273595392"){
        const cats = /cat|cats|kitty|kitten|puss|pussy|meow/i;
        var n = message.content.search(cats);
        var currChannel = message.channel.id;
        if(n != -1){
            //message.delete(); disabled :)

            var trollfaces = [
            "https://tenor.com/view/troll-trollface-ragememe-rageface-trolling-gif-4929853",
            "https://tenor.com/view/troll-stick-figure-dancing-gif-5259835",
            "https://tenor.com/view/troll-lel-dance-funny-meme-gif-12438731",
            "https://tenor.com/view/troll-face-slap-smile-gif-15260095",
            "https://tenor.com/view/troll-trolled-trollface-smile-umad-gif-9568504",
            "https://tenor.com/view/rhino-pooping-enormous-gros-gif-gif-17044608",
            "https://tenor.com/view/uncle-dane-dope-meme-walking-troll-face-gif-17449904"
            ];

            message.author.send(trollfaces[Math.floor(Math.random() * trollfaces.length)]);
        }
    }

    //enio4e

    if(message.content.search(/jaj s4eile 4/i) != -1){
        if(message.author.id == '451747321622036480'){
            message.reply("T t Τ τ   :^)");
        }else{
            message.channel.send("https://tenor.com/view/jerma-jeremy-short-midget-boomer-gif-15554620");
        }
    }

    if(message.content.search(/ξαξ σ4ειλε 4/i) != -1){
        if(message.author.id == '451747321622036480'){
            message.reply("T t Τ τ   :^)");
        }else{
            message.channel.send("https://tenor.com/view/jerma-jeremy-short-midget-boomer-gif-15554620");
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
                    message.channel.send('ela');

                }
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
            case 'vges':
                const vc = message.guild.channels.cache.get('692402791011975249');
                vc.leave();
            break;
            case 'ti trws?':
                message.channel.send('https://cdn.discordapp.com/attachments/762014861956743171/778367100196618270/0buu83n7npw11.jpg');
            break;
        };
    })