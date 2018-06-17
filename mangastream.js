'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('./helpers.js');
const constants = require('./constants');

const mangaUrlSet = new Set();

const scrapMangaStream = async (mangaJsonArray) => {
    await fetchMangas();
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfNewChapters(mangaJsonArray, mangaFetchedArray, constants.MANGASTREAM);
}

const fetchMangas = async () => {
    const res = await axios.get('https://readms.net/');
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $('.active').find('a').each((index, element) => {
            const mangaUrl = $(element).attr('href');
            if (mangaUrl.length > 1) {
                mangaUrlSet.add(mangaUrl);
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