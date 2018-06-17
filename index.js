'use strict'

const fs = require('fs');
const mangaStream = require('./mangastream');
const webToons = require('./webtoons');
const newChapters = require('./newChapters');
const helpers = require('./helpers');
const constants = require('./constants');

const mangaJson = helpers.readJson(constants.MANGAS_JSON);
const mangaJsonArray = helpers.convertMangaJsonIntoArray(mangaJson);

const startBot = async () => {
    await Promise.all([mangaStream.scrapMangaStream(mangaJsonArray), webToons.scrapWebtoons(mangaJsonArray)])
    helpers.writeJson(mangaJson, newChapters.getNewMangaArray())
}

startBot();