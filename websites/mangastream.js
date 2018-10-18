'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../common/helpers.js');
const constants = require('../constants/constants');

let mangaUrlSet = new Set();

const scrapMangastream = async (mangaJsonArray) => {
    console.log("Fetching from Mangastream...");
    await getChaptersFromMangastream(constants.MANGASTREAM_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.MANGASTREAM);
    console.log("...Done fetching Mangastream!");
}

const getChaptersFromMangastream = async (url) => {
    const res = await axios.get(url);
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
        const title = convertTitle(urlFields[2]);
        const chapter = urlFields[3].padStart(3, '0');
        mangaFetchedArray.push({
            [title]: chapter
        });
    });
    return mangaFetchedArray;
}

const convertTitle = title => {
    switch(title) {
        case "neverland":
            return "the_promised_neverland";
        case "bclover":
            return "black_clover";
        default:
            return title;
    }
}

module.exports = {
    scrapMangastream,
};