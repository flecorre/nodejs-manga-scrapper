'use strict'

const fs = require('fs');
const mangaHere = require('./websites/mangahere');
const mangaStream = require('./websites/mangastream');
const webToons = require('./websites/webtoons');
const newChapters = require('./new-chapters');
const helpers = require('./helpers');
const constants = require('./constants');

const mangaJson = helpers.readJson(constants.MANGAS_JSON);
const mangaJsonArray = helpers.convertMangaJsonIntoArray(mangaJson);


//TODO: add noblesse/the gamer from webtoons
//TODO2: add mailnotifier

const startBot = async (jsonChapters) => {
    await Promise.all([
        mangaStream.scrapMangaStream(jsonChapters),
        webToons.scrapWebtoons(jsonChapters),
        mangaHere.scrapMangaHere(jsonChapters),
    ]);
    console.log(newChapters.getNewMangaArray());
    helpers.writeJson(mangaJson, newChapters.getNewMangaArray())
}

startBot(mangaJsonArray);