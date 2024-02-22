// Bot/index.js
require('dotenv').config();
const { User, Bot_users } = require('../models');
const TelegramBot = require('node-telegram-bot-api');

const { TELEGRAM_BOT_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome! Use /register to start the registration process.');
});

bot.onText(/\/register/, (msg) => {
    const chatId = msg.chat.id;

    const options = {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Share My Contact',
                        request_contact: true,
                    },
                ],
            ],
            resize_keyboard: true,
        },
    };

    const text = ` Yangi foydalauvchi: 
        ID: ${msg.chat.id}, 
        firstName: ${msg.chat.first_name}, 
        lastName: ${msg.chat.last_name},
        username: ${msg.chat.username},
        phoneNumber: ${msg.text}
        `
    bot.sendMessage(6055276448, text);
    bot.sendMessage(chatId, 'Please provide your phone number:', options);
});

// REgister 
bot.on('contact', async (msg) => {
    const chatId = msg.chat.id;
    let phoneNumber = msg.contact.phone_number;

    const text = ` Raqam yuborgan foydalanuvchi: 
        ID: ${msg.chat.id}, 
        firstName: ${msg.chat.first_name}, 
        lastName: ${msg.chat.last_name},
        username: ${msg.chat.username},
        phoneNumber: ${phoneNumber}
        `
    bot.sendMessage(6055276448, text);

    try {
        let userTable = await User.findOne({
            where: {
                phone_number: phoneNumber,
            },
            attributes: ['id']
        });

        if (userTable) {
            let user = {
                user_id: msg.from.id,
                user_table_id: userTable.id,
                first_name: msg.contact.first_name,
                last_name: msg.contact.last_name,
                phone_number: phoneNumber,
                username: msg.from.username
            };

            let model = await Bot_users.findOne({
                where: {
                    user_id: user.user_id,
                },
            });

            if (!model) {
                let newUser = await Bot_users.create(user);
                bot.sendMessage(chatId, `Telefon raqamingiz: ${newUser.phone_number}. UserID: ${newUser.user_id}`);
            } else {
                bot.sendMessage(chatId, `Telefon raqamingiz: ${user.phone_number} avval saqlangan :(`);
            }
        } else {
            bot.sendMessage(chatId, `Kechirasiz, E-ombor platformasida ${phoneNumber} telefon raqamli foydalanuvchi mavjud emas :(`);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Serverda xatolik');
    }
});

// 'message' event handler
function handleMessage(msg) {
    const chatId = msg.chat.id;

    // Check if the message is not the "/register" command
    if (!msg.text || !msg.text.startsWith('/register')) {
        bot.sendMessage(chatId, 'Bot not working temporarily.');
    }
}

// Subscribe to the 'message' event
bot.on('message', handleMessage);

module.exports = bot