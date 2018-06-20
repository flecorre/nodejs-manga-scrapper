'use strict'

const fs = require('fs');
const mangaHere = require('./websites/mangahere');
const mangaStream = require('./websites/mangastream');
const webToons = require('./websites/webtoons');
const newChapters = require('./new-chapters');
const helpers = require('./helpers');
const constants = require('./constants');

const mangaChaptersJson = helpers.readJson(constants.MANGAS_JSON);
const mangaChaptersArray = helpers.convertMangaJsonIntoArray(mangaChaptersJson);


//TODO: add noblesse/the gamer from webtoons
//TODO2: add mailnotifier

const startBot = async (chapterArray) => {
    await webToons.scrapWebtoons(chapterArray)
    console.log(newChapters.getNewMangaArray());
    // await Promise.all([
    //     mangaStream.scrapMangaStream(jsonChapters),
    //     webToons.scrapWebtoons(jsonChapters),
    //     mangaHere.scrapMangaHere(jsonChapters),
    // ]);
    // console.log(newChapters.getNewMangaArray());
    // helpers.writeJson(mangaJson, newChapters.getNewMangaArray())
}

startBot(mangaChaptersArray);