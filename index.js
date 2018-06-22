'use strict'

const fs = require('fs');
const mangaHere = require('./websites/mangahere');
const mangaStream = require('./websites/mangastream');
const webToons = require('./websites/webtoons');
const newChapters = require('./new-chapters');
const helpers = require('./helpers');
const constants = require('./constants');
const email = require('./email');
const CronJob = require('cron').CronJob;

const startBot = async () => {
    const mangaChaptersJson = helpers.readJson(constants.MANGAS_JSON);
    const mangaChaptersArray = helpers.convertMangaJsonIntoArray(mangaChaptersJson);
    await Promise.all([
        mangaStream.scrapMangaStream(mangaChaptersArray),
        webToons.scrapWebtoons(mangaChaptersArray),
        mangaHere.scrapMangaHere(mangaChaptersArray)
    ]);
    if (!helpers.isObjectEmpty(newChapters.getNewMangaChapters())) {
        email.send(newChapters.getNewMangaChapters());
        helpers.writeJson(mangaChaptersJson, newChapters.getNewMangaChapters());
    }
    newChapters.cleanMangaChapters();
}

let runNumber = 1;
new CronJob('*/1 * * * *', function () {
    startBot();
    console.log("job run: " + runNumber);
    runNumber++;
}, null, true, 'Europe/Paris');