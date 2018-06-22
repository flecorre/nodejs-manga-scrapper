'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../helpers.js');
const constants = require('../constants');

let mangaUrlSet = new Set();

const scrapMangaStream = async (mangaJsonArray) => {
    await fetchMangas();
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.MANGASTREAM);
}

const fetchMangas = async () => {
    const res = await axios.get('https://readms.net/');
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $('.new-list').find('li > a').each((index, element) => {
            const mangaChapterUrl = $(element).attr('href');
            if (mangaChapterUrl.length > 1) {
                mangaUrlSet.add(mangaChapterUrl);
            }
        });
    }
};

const convertMangaFetchedUrlIntoMangaArray = (mangaUrlSet) => {
    let mangaFetchedArray = [];
    const mangaUrlArray = [...mangaUrlSet];
    mangaUrlArray.map(manga => {
        const urlFields = manga.split('/');
        const title = urlFields[2];
        const chapter = urlFields[3];
        mangaFetchedArray.push({
            [title]: chapter
        });
    });
    return mangaFetchedArray;
}

module.exports = {
    scrapMangaStream,
};