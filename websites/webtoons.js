'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../common/helpers.js');
const constants = require('../constants/constants');

const mangaUrlSet = new Set();

const scrapWebtoons = async (mangaJsonArray) => {
    console.log("Fetching from Webtoons...");
    await getChaptersFromWebtoons(constants.WEBTOONS_GOH_URL);
    await getChaptersFromWebtoons(constants.WEBTOONS_NOBLESSE_URL);
    await getChaptersFromWebtoons(constants.WEBTOONS_THEGAMER_URL);
    await getChaptersFromWebtoons(constants.WEBTOONS_DICE_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.WEBTOONS);
    console.log("...Done fetching Webtoons!");
}

const getChaptersFromWebtoons = async (url) => {
    const res = await axios.get(url);
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        const mangaChapterUrl = $('#_listUl').find('li > a').first()[0].attribs.href;
        if (mangaChapterUrl.length > 1) {
            mangaUrlSet.add(mangaChapterUrl);
        }
    }
};

const convertMangaFetchedUrlIntoMangaArray = (url) => {
    let mangaArray = [];
    const mangaUrlArray = [...url];
    mangaUrlArray.map(manga => {
        const urlFields = manga.split('/');
        const title = urlFields[5];
        const chapter = urlFields[6].split('-')[1];
        mangaArray.push({
            [title]: chapter
        });
    });
    return mangaArray;
}

module.exports = {
    scrapWebtoons,
};
