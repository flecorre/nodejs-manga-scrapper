'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../helpers.js');
const constants = require('../constants');

const mangaUrlSet = new Set();

const scrapWebtoons = async (mangaJsonArray) => {
    await fetchMangas(constants.WEBTOONS_GOH_URL);
    await fetchMangas(constants.WEBTOONS_NOBLESSE_URL);
    await fetchMangas(constants.WEBTOONS_THEGAMER_URL);
    await fetchMangas(constants.WEBTOONS_DICE_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.WEBTOONS);
}

const fetchMangas = async (mangaUrl) => {
    const res = await axios.get(mangaUrl);
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        const mangaChapterUrl = $('#_listUl').find('li > a').first()[0].attribs.href;
        if (mangaChapterUrl.length > 1) {
            mangaUrlSet.add(mangaChapterUrl);
        }
    }
};

const convertMangaFetchedUrlIntoMangaArray = (mangaUrlSet) => {
    let mangaArray = [];
    const mangaUrlArray = [...mangaUrlSet];
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