const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
var request = require("request");
let bot;

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.URL + bot.token);
} else {
  bot = new Bot(token, {
    polling: true
  });
}
var opts;
var text_message;
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
bot.on('message', (msg) => {
  var data = msg;
  var message = data.text;
  var user = data.from;
  var chat_id = data.chat.id;
  var message_id = data.message_id;
  if (data.hasOwnProperty("text")) {
    console.log(data.chat);
        opts = {
          parse_mode: 'Markdown'
        };
      }
      text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') написал:'+'message'+JSON.stringify(data.chat) ;
      //bot.sendMessage(-1001320202440, text_message, opts);
      bot.sendMessage(chat_id, text_message, opts);
      return 1;
});
module.exports = bot;