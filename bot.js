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
var chats = process.env.CHATS.split(' ');
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
bot.on('message', (msg) => {
  var data = msg;
  var message = data.text;
  var user = data.from;
  var chat_id = data.chat.id;
  var message_id = data.message_id;
  if (data.hasOwnProperty("text")) {
    if (data.chat.type == "private") {
      opts = {
        parse_mode: 'Markdown'
      };
      text_message = '[' + user.first_name + '](tg://user?id=' + user.id + ') написал:' + message;
      bot.sendMessage(-1001320202440, text_message, opts);
      console.log(data);
    return 1;
    }
    else {
      chats.forEach(function(chat){
        bot.forwardMessage(chat, chat_id, message_id);
      });
    }
  }
});
module.exports = bot;
