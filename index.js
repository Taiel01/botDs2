
const { Client, Intents } = require('discord.js');

const discord = require('discord.js');

require("dotenv").config();

var users = [];

const embed_help = new discord.RichEmbed()
.setTitle('Comandos')
.setColor(0xFFFF00)
.setDescription('!create-wallet: Crea tu cuenta. \n !balance: Visualiza el dinero de tu cuenta.\n!daily: Recoge tu recompenza diaria.\n!shop: Visita la tienda.\n!store: Muestra tu inventario.\n!transfer Usuario: Transfiere 5 monedas al usuario que hayas escrito su nombre.\n!maneje: Podes hacer un maneje para ganar algo de plata cada 2hs.\n!rank: Visualiza el ranking de los mas pegados del server.\n');

const embed_shop = new discord.RichEmbed()
.setTitle('Tienda')
.setColor(0xFFF00)
.setDescription("$lemonHaze: Compra 1g de lemonHaze por 5 monedas, aumentara tus putnos en el ranking en +5.\n $rolex: Compra un rollex de platino por 200 monedas, aumetara tus puntos en el ranking en +250.")


const client = new discord.Client({
    intents: [0, 0, 0],
  });


client.on('message', message => {
    let userName = message.author.username
    let wallet = {};

    if(message.content == "!create-wallet"){
      let key = 0;
      users.forEach(user=>{
        
        if(user.name == userName){
          message.reply("Ya formas parte del capitalismo! Puedes ver tu balance con: !balance");
          key = 1;
        }
        
       })
       if(key == 0){

        wallet = {
          name: userName,
          money: 0,
          indorLvl: 0,
          rolex: 0,
          wedG: 0,
          rank: 0,
         };
   
         users.push(wallet);
   
         message.reply("Bienvenid@ al capitalismo!");
      }
    
     users.forEach(user=>{
      message.reply(user.name); //Dsp borrarlo
     });

    }else if(message.content.includes("!help")){//AYUDA
      message.reply("Estos comandos te van a servir!");
      message.channel.send(embed_help);

    }else if(message.content == "!balance"){

      users.forEach(user=>{
        if(user.name == userName){
          message.reply("Tu balance es de " + user.money);
        }
       });
    }else if(message.content == "!daily"){

      users.forEach(user=>{
        if(user.name == userName){
          if(user.name == userName){
            message.reply("Obtienes 5 monedas");
            user.money += 5;
            message.reply("Tu balance es de " + user.money);
          }
        }
       });
 }else if(message.content.includes("!transfer")){
    users.forEach(user=>{
      if(user.name == userName){
        user.money -= 5;
        userName = message.content.slice(10);
        users.forEach(user=>{
          if(user.name == userName){
            user.money += 5;
          }
        });
        
        message.reply("Le acaba de trasferir 5 monedas a un usuario"); 

      }
     });

  }else if(message.content.includes("!maneje")){
    let key = 0;

    users.forEach(user=>{
      if(user.name == userName){
        user.money += 2;
        message.reply("Hizo un maneje y gano 2 monedas");
        key = 1;
      }
    });

    if(key == 0){
      message.reply("Antes de hacer un maneje probá creando una cuenta con: !create-wallet");
    }

  } else if(message.content.includes("!shop")){
    
    message.reply("Bienvenido a la tienda!");
    message.channel.send(embed_shop);
  }
});




// Bot listenning messages
client.on('GUILDS', GUILD_MESSAGES => {

});

client.login(process.env.DSTOKEN);



