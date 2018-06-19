'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('./helpers.js');
const constants = require('./constants');

const mangaUrlSet = new Set();

const scrapMangaHere = async (mangaJsonArray) => {
    await fetchMangas();
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfNewChapters(mangaJsonArray, mangaFetchedArray, constants.MANGAHERE);
}

const fetchMangas = async () => {
    const res = await axios.get('https://mangahere.cc');
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

const convertMangaFetchedUrlIntoMangaArray = (mangaUrlSet) => {
    let mangaFetchedArray = [];
    const mangaUrlArray = [...mangaUrlSet];
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
    scrapMangaHere,
};