const TelegramApi = require('node-telegram-bot-api');

const token = '5759272430:AAExdcLNCiUBTsTZ8fo0WHdvDiS75jp8tJA';

const bot = new TelegramApi(token, { polling: true });

chats = {};

const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Текст кнопки', callback_data: '1' }],
      [{ text: 'Текст кнопки', callback_data: '2' }],
      [{ text: 'Текст кнопки', callback_data: '3' }],
      [{ text: 'Текст кнопки', callback_data: '4' }],
    ],
  }),
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
      bot.sendMessage(chatId, 'Сейчас я загадаю число от 1 до 9, а вы должны угадать его');
      const randomNumber = Math.floor(Math.random * 10);
      chats[chatId] = randomNumber;
      return bot.sendMessage(chatId, 'Начнём!', gameOptions);
    }

    return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте ещё раз');
  });
};

start();
