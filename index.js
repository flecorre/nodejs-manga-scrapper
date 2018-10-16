'use strict'

require('dotenv').config();
const fs = require('fs');
const mangahere = require('./websites/mangahere');
const mangastream = require('./websites/mangastream');
const webtoons = require('./websites/webtoons');
const mangaChapters = require('./common/manga-chapters');
const helpers = require('./common/helpers');
const constants = require('./constants/constants');
const CronJob = require('cron').CronJob;
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

const mangaChaptersJson = helpers.readJson(constants.MANGAS_JSON);
const mangaChaptersObject = helpers.convertMangaJsonIntoObject(mangaChaptersJson);

const sendToTelegramChat = (chatId, text) => {
    bot.telegram.sendMessage(chatId, text);
}

const startBot = async (mangaArray) => {
    await Promise.all([
        mangastream.scrapMangastream(mangaArray),
        webtoons.scrapWebtoons(mangaArray),
        mangahere.scrapMangahere(mangaArray)
    ]);
    if (!helpers.isObjectEmpty(mangaChapters.getNewMangaChapters())) {
        sendToTelegramChat(chatId, helpers.transformToReadableList(mangaChapters.getNewMangaChapters()));
        //helpers.writeJson(mangaChaptersJson, mangaChapters.getNewMangaChapters());
    }
    mangaChapters.cleanMangaChapters();
}

bot.startPolling()

startBot(mangaChaptersObject);

// let runNumber = 1;
// new CronJob('*/15 * * * *', function () {
//     startBot(mangaChaptersArray);
//     console.log("job run: " + runNumber);
//     runNumber++;
// }, null, true, 'Europe/Paris');