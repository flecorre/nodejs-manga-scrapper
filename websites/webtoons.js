'use strict'

'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../helpers.js');
const constants = require('../constants');

const scrapWebtoons = async (mangaJsonArray) => {
    const godOfHighschoolChapterUrl = await fetchGOH();
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(godOfHighschoolChapterUrl);
    helpers.checkIfNewChapters(mangaJsonArray, mangaFetchedArray, constants.WEBTOONS);
}

const fetchGOH = async () => {
    const res = await axios.get('https://www.webtoons.com/en/action/the-god-of-high-school/list?title_no=66');
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        const godOfHighschoolChapterUrl = $('#_listUl').find('li > a').first()[0].attribs.href;
        return godOfHighschoolChapterUrl;
    }
};

const convertMangaFetchedUrlIntoMangaArray = (url) => {
    let mangaFetchedArray = [];
    const urlFields = url.split('/');
    const title = urlFields[5];
    const chapter = urlFields[6].split('-')[1];
    mangaFetchedArray.push({
        [title]: chapter
    });
    return mangaFetchedArray;
}

module.exports = {
    scrapWebtoons,
};