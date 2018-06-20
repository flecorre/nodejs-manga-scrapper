'use strict'

const fs = require('fs');
const mangaHere = require('./websites/mangahere');
const mangaStream = require('./websites/mangastream');
const webToons = require('./websites/webtoons');
const newChapters = require('./new-chapters');
const helpers = require('./helpers');
const constants = require('./constants');
const email = require('./email');

const mangaChaptersJson = helpers.readJson(constants.MANGAS_JSON);
const mangaChaptersArray = helpers.convertMangaJsonIntoArray(mangaChaptersJson);

const startBot = async (chapterArray) => {
    await Promise.all([
        mangaStream.scrapMangaStream(chapterArray),
        webToons.scrapWebtoons(chapterArray),
        mangaHere.scrapMangaHere(chapterArray),
    ]);
    if (!helpers.isObjectEmpty(newChapters.getNewMangaChapters())) {
        email.send(newChapters.getNewMangaChapters());
        helpers.writeJson(mangaChaptersJson, newChapters.getNewMangaChapters())
    }
}

startBot(mangaChaptersArray);