'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../common/helpers.js');
const constants = require('../constants/constants');

const mangaUrlSet = new Set();

const scrapMangahere = async (mangaJsonArray) => {
    console.log("Fetching from Mangahere...");
    await getChaptersFromMangahere(constants.MANGAHERE_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.MANGAHERE);
    console.log("...Done fetching Mangahere!");
}

const getChaptersFromMangahere = async (url) => {
    const res = await axios.get(url);
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $('.manga_updates').find('dl > dd > a').each((index, element) => {
            const mangaUrl = $(element).attr('href');
            if (mangaUrl.length > 1) {
                mangaUrlSet.add(mangaUrl);
            }
        });
    }
};

const convertMangaFetchedUrlIntoMangaArray = (urlSet) => {
    let mangaFetchedArray = [];
    const mangaUrlArray = [...urlSet];
    mangaUrlArray.map(manga => {
        const urlFields = manga.split('/');
        const title = urlFields[4];
        let chapter = title == 'noblesse' ? urlFields[6] : urlFields[5];
        chapter = chapter.split('c')[1];
        mangaFetchedArray.push({
            [title]: chapter
        });
    });
    return mangaFetchedArray;
}

module.exports = {
    scrapMangahere,
};