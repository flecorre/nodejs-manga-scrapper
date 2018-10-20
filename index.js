'use strict'

require('dotenv').config();
const jaimini = require('./websites/jaimini');
const mangahere = require('./websites/mangahere');
const mangastream = require('./websites/mangastream');
const mangareader = require('./websites/mangareader');
const webtoons = require('./websites/webtoons');
const mangaChapters = require('./common/manga-chapters');
const helpers = require('./common/helpers');
const constants = require('./constants/constants');
const CronJob = require('cron').CronJob;
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = process.env.CHAT_ID;

const sendToTelegramChat = (chatId, text) => {
    bot.telegram.sendMessage(chatId, text);
}

const startBot = async (mangaJson) => {
    const mangaChaptersJson = helpers.readJson(mangaJson);
    const mangaChaptersObject = helpers.convertMangaJsonIntoObject(mangaChaptersJson);
    await Promise.all([
        webtoons.scrapWebtoons(mangaChaptersObject),
        jaimini.scrapJaimini(mangaChaptersObject),
        mangastream.scrapMangastream(mangaChaptersObject),
        mangareader.scrapMangareader(mangaChaptersObject),
        mangahere.scrapMangahere(mangaChaptersObject),
    ]);
    if (!helpers.isObjectEmpty(mangaChapters.getNewMangaChapters())) {
        sendToTelegramChat(chatId, helpers.transformToReadableList(mangaChapters.getNewMangaChapters()));
        helpers.writeJson(mangaChaptersJson, mangaChapters.getNewMangaChapters());
    }
    mangaChapters.cleanMangaChapters();
}

new CronJob('*/15 * * * *', function () {
    startBot(constants.MANGAS_JSON);
}, null, true, 'Europe/Paris');
