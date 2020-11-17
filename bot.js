const Discord = require("discord.js")
const client = new Discord.Client()
const ytdl = require('ytdl-core');
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('Learning discord.js', { type: 'PLAYING' })
})
  //writeMessage();
const mysql = require('mysql');
const database = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'CoolBoy',
  charset : 'utf8mb4'
});
function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
}
database.connect( err => {
  if(err) throw err;
  console.log("Connected to database!");
});
setInterval(function() {
  var onlineCount = client.users.cache.filter(m => m.presence.status === 'online').size;
  database.query(`SELECT * FROM rekordOnline`, function(err, rows){
    if (err) throw err;
    if(rows.length < 1) {
      sql = `INSERT INTO rekordOnline (rekord) VALUES (${onlineCount})`;
      database.query(sql, console.log);
    } else if (onlineCount > rows[0].rekord) {
      sql = `UPDATE rekordOnline SET rekord = ${onlineCount}`;
      database.query(sql, console.log);
    }
  })
})
setInterval(function() {
  var guild = client.guilds.cache.get("774215367346225154");
  var userCount = guild.memberCount;
  var onlineCount = client.users.cache.filter(m => m.presence.status === 'online').size;
  database.query(`SELECT * FROM rekordOnline`, function(err, rows){
    if (err) throw err;
    if(rows.length < 1) {
      sql = `INSERT INTO rekordOnline (rekord) VALUES (${onlineCount})`;
      database.query(sql, console.log);
    } else if (onlineCount > rows[0].rekord) {
      sql = `UPDATE rekordOnline SET rekord = ${onlineCount}`;
      database.query(sql, console.log);
    }
    client.channels.cache.get("775648392453161001").setName(`👤┃ Użytkownicy: ${userCount}`);
    client.channels.cache.get("775648411290173460").setName(`🌐┃ Online: ${onlineCount}`);
    client.channels.cache.get("775648429619544067").setName(`💜┃ Rekord Online: ${rows[0].rekord}`);
  }
)}, 5000)
client.on("message", (msg) => {
  if(msg.author.id != 774313076580941844) {
    if(msg.content.includes("*yikes") || msg.content.includes("*changenick") || msg.content.includes("*xp")) {
      //msg.reply("Twoja wiadomosc zawiera yikes, changenick, xp");
    }else {
      database.query(`SELECT * FROM Members WHERE MemberID = '${msg.author.id}'`, function (err, rows) {
        if (err) throw err;
        let sql;
        let sql2;
        if(rows.length < 1) {
          if(msg.author.id != 234395307759108106) {
            sql = `INSERT INTO Members (MemberID, Member, Xp) VALUES ("${msg.author.id}", "${msg.author.username}", 0)`;
            database.query(sql, console.log);
          }
        } else {
          database.query(`Select * FROM Members WHERE MemberID = '${msg.author.id}'`, function(err, result, fields) {
            if(err) throw err;
            let xpp = result[0].Xp;
            xpp = xpp + Math.floor((Math.random() * 10) + 1);
            sql2 = `UPDATE Members SET Member = "${msg.author.username}", Xp = ${xpp} WHERE MemberID = "${msg.author.id}"`;
            database.query(sql2, console.log);
          })
        }
      })
    }
  }
  if(msg.content === "*xp") {
    database.query(`Select * FROM Members WHERE MemberID = '${msg.author.id}'`, function(err, result, fields) {
      if(err) throw err;
      if(result.length < 1) {
        if(msg.author.id != 234395307759108106) {
          sql = `INSERT INTO Members (MemberID, Member, Xp) VALUES ("${msg.author.id}", "${msg.author.username}", 0)`;
          database.query(sql, console.log);
          msg.reply("Posiadasz aktualnie 0 Punktow doswiadczenia");
        }
      } else {
        let xp = result[0].Xp;
        msg.reply("Posiadasz aktualnie " + xp + " Punktow doswiadczenia");
        sql = `UPDATE Members SET Member = "${msg.author.username}", Xp = ${xp} WHERE MemberID = "${msg.author.id}"`;
        database.query(sql, console.log);
      }
    })
  }
  if (msg.content === "*yikes") {
    let x = Math.floor(Math.random() * 101);
    msg.reply("Jestes yikes i cringe na " +x+ " %, Gratulacje 🤙😎 ");
  }
  if(msg.content === "*stats") {
    var userCount = msg.guild.memberCount;
    var onlineCount = msg.guild.members.cache.filter(m => m.presence.status === 'online').size;
    database.query(`SELECT * FROM rekordOnline`, function(err, rows){
      if (err) throw err;
      if(rows.length < 1) {
        sql = `INSERT INTO rekordOnline (rekord) VALUES (${onlineCount})`;
        database.query(sql, console.log);
        var recordOnline = rows[0].rekord;
        console.log(recordOnline);
      } else if (onlineCount > rows[0].rekord) {
        sql = `UPDATE rekordOnline SET rekord = ${onlineCount}`;
        database.query(sql, console.log);
        var recordOnline = rows[0].rekord;
        console.log(recordOnline);
      }
      var recordOnline2 = rows[0].rekord;
      const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
      .setColor("0xff0000")
      .setTitle(" ")
      .setTimestamp()
      .setDescription(msg.guild.name + " Statistics")
      .setFooter("IndustriesBOT v1.0.0")
      .setAuthor("Industries BOT Commands") //and this its profile pic)
      .addField("``Members``", "**" +userCount+ "**")
      .addField("``Online Members``", "**" +onlineCount+ "**")
      .addField("``Record Online``", "**" +recordOnline2+ "**")
      .setImage("https://i.imgur.com/2dLJNis.png")
      msg.channel.send(embed)
    })
    //let coderCount = client.roles.get('388102002695077888').members.size;
  }
  // if (msg.content === "*changenick") {
  //   msg.guild.member(client.user).setNickname('[*] Industries BOT')
  // }
  if(msg.content === "*plmp") {
    var voiceChannel = msg.member.voice.channel;
    voiceChannel.join().then(connection =>{
      connection.play('./halduju.mp3');
    }).catch(err => console.log(err));
  }
  if(msg.content === "*whoask") {
    let user = msg.guild.members.cache.random();
    msg.channel.send(`<@${user.id}>` + " Asked  😎");
  }
  if(msg.content === "*leave") {
    var voiceChannel = msg.member.voice.channel;
    voiceChannel.leave();
  }
  if(msg.content.startsWith("*play")) {
    const args = msg.content.split(' ').slice(1);
    const amount = args.join(" ");
    var voiceChannel = msg.member.voice.channel;
    voiceChannel.join().then(connection =>{
      connection.play(ytdl(amount));
    })
  }
  if(msg.content.startsWith("*clear")) {
    const args = msg.content.split(' ').slice(1);
    const amount = args.join(" ");
    if(!amount) {
      const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
      .setColor("0xff0000")
      .setTitle(" ")
      .setTimestamp()
      .setDescription("How many messages u want to delete?")
      .setFooter("IndustriesBOT v1.0.0")
      .setAuthor("Industries BOT Commands") //and this its profile pic)
      msg.channel.send(embed)
    } else {
      if (amount >= 0) {
        if(amount <= 100) {
          msg.channel.messages.fetch({ limit: amount }).then(messages => {
            msg.channel.bulkDelete(messages)
          });
          const embed = new Discord.MessageEmbed()
          .setColor("0xff0000")
          .setTitle(" ")
          .setTimestamp()
          .setDescription("Succesfully deleted " +amount+ " messages, :)")
          .addField("**Cleared by**", `${msg.author.username}`, inline=true)
          .setFooter("IndustriesBOT v1.0.0")
          .setAuthor("Industries BOT Commands") 
          msg.channel.send(embed)
            .then(msg => {
              msg.delete({ timeout: 4000 /*time unitl delete in milliseconds*/});
            })
            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
        } else {
          const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
          .setColor("0xff0000")
          .setTitle(" ")
          .setTimestamp()
          .setDescription("U can't delete more than 100 messages!")
          .setFooter("IndustriesBOT v1.0.0")
          .setAuthor("Industries BOT Commands") //and this its profile pic)
          msg.channel.send(embed)
        }
      } else {
        const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
        .setColor("0xff0000")
        .setTitle(" ")
        .setTimestamp()
        .setDescription("Argument must be an integer.")
        .setFooter("IndustriesBOT v1.0.0")
        .setAuthor("Industries BOT Commands") //and this its profile pic)
        msg.channel.send(embed)
      }
    }
  }
  if(msg.content === "*help") {
    const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
    .setColor("0xff0000")
    .setTitle(" ")
    .setTimestamp()
    .setDescription("Use ***help** + **category**.")
    .setFooter("IndustriesBOT v1.0.0")
    .setAuthor("Industries BOT Commands") //and this its profile pic)
    .addField("``levels``", "**1** Commands.", inline=true)
    .addField("``moderation``", "**2** Commands", inline=true)
    .addField("``fun``", "**2** Commands", inline=true)
    .addField("``music``", "**2** Commands", inline=true)
    .setImage("https://i.imgur.com/2dLJNis.png")
    msg.channel.send(embed)
  }
  if(msg.content === "*help levels") {
    const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
    .setColor("0xff0000")
    .setTitle(" ")
    .setTimestamp()
    .setDescription("Category: **Levels**")
    .setFooter("IndustriesBOT v1.0.0")
    .setAuthor("Industries BOT Commands") //and this its profile pic)
    .addField("``*xp``", "Informacje o poziomie doswiadczenia.", inline=true)
    .addField("``*command``", "Description", inline=true)
    .addField("``*command``", "Description", inline=true)
    .addField("``*command``", "Description", inline=true)
    .setImage("https://i.imgur.com/2dLJNis.png")
    msg.channel.send(embed)
  }
  if(msg.content === "*help moderation") {
    const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
    .setColor("0xff0000")
    .setTitle(" ")
    .setTimestamp()
    .setDescription("Category: **Moderation**")
    .setFooter("IndustriesBOT v1.0.0")
    .setAuthor("Industries BOT Commands") //and this its profile pic)
    .addField("``*clear``", "Clears messages.", inline=true)
    .addField("``*stats``", "Check server stats.", inline=true)
    .addField("``*command``", "Description", inline=true)
    .addField("``*command``", "Description", inline=true)
    .setImage("https://i.imgur.com/2dLJNis.png")
    msg.channel.send(embed)
  }
  if(msg.content === "*help fun") {
    const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
    .setColor("0xff0000")
    .setTitle(" ")
    .setTimestamp()
    .setDescription("Category: **Fun**")
    .setFooter("IndustriesBOT v1.0.0")
    .setAuthor("Industries BOT Commands") //and this its profile pic)
    .addField("``*yikes``", "Cring command.", inline=true)
    .addField("``*whoask``", "Shows who ask.", inline=true)
    .addField("``*command``", "Description", inline=true)
    .addField("``*command``", "Description", inline=true)
    .setImage("https://i.imgur.com/2dLJNis.png")
    msg.channel.send(embed)
  }
  if(msg.content === "*help music") {
    const embed = new Discord.MessageEmbed() // Ver 12.2.0 of Discord.js
    .setColor("0xff0000")
    .setTitle(" ")
    .setTimestamp()
    .setDescription("Category: **Fun**")
    .setFooter("IndustriesBOT v1.0.0")
    .setAuthor("Industries BOT Commands") //and this its profile pic)
    .addField("``*plmp``", "Bot joins channel and play music.", inline=true)
    .addField("``*leave``", "Bot leaves channel.", inline=true)
    .addField("``*command``", "Description", inline=true)
    .addField("``*command``", "Description", inline=true)
    .setImage("https://i.imgur.com/2dLJNis.png")
    msg.channel.send(embed)
  }
})
client.login("Nzc0MzEzMDc2NTgwOTQxODQ0.X6V9Pw.kBchDI_ZPFpRNl0DX28MfPvskJI")