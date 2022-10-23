const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
const token = '5759272430:AAExdcLNCiUBTsTZ8fo0WHdvDiS75jp8tJA';

const bot = new TelegramApi(token, { polling: true });

chats = {};

const startGame = async (chatId) => {
  bot.sendMessage(chatId, 'Сейчас я загадаю число от 1 до 9, а вы должны угадать его');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  bot.sendMessage(chatId, `${randomNumber}`);
  await bot.sendMessage(chatId, 'Начнём!', gameOptions);
};

start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветсвие' },
    { command: '/info', description: 'Получить инфоормацию о пользователе' },
    { command: '/game', description: 'Игра угадай цифру' },
  ]);

  bot.on('message', async (msg) => {
    const text = msg.text;

    const chatId = msg.chat.id;
    // bot.sendMessage(chatId, `${msg}`);
    console.log(msg);
    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/10.webp',
      );

      return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот');
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Вас зовут ${msg.chat.first_name} ${msg.chat.last_name}`);
    }

    if (text === '/game') {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте ещё раз');
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    console.log(data, chatId, chats);

    if (data === '/again') {
      return startGame(chatId);
    }

    if (data == chats[chatId]) {
      return bot.sendMessage(chatId, `Вы угадали это было число ${chats[chatId]}`, againOptions);
    } else {
      return bot.sendMessage(
        chatId,
        `Вы не угадали, я загадал число ${chats[chatId]}`,
        againOptions,
      );
    }

    // bot.sendMessage(chatId, `Вы выбрали кнопку ${data}`);
  });
};

start();
