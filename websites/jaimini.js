'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../common/helpers.js');
const constants = require('../constants/constants');

const mangaUrlSet = new Set();

const scrapJaimini = async mangaJsonArray => {
    console.log("Fetching from Jaimini...");
    await getChaptersFromJaimini(constants.JAIMINI_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.JAIMINI);
    console.log("...Done fetching Jaimini!");
}

const getChaptersFromJaimini = async url => {
    const res = await axios.get(url);
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $('.group').find('div > div > a').each((index, element) => {
            if($(element).attr('href').includes("read/")) {
                const mangaChapterUrl = $(element).attr('href');
                if (mangaChapterUrl.length > 1) {
                    mangaUrlSet.add(mangaChapterUrl);
                }
            }
        });
    }
};

const convertMangaFetchedUrlIntoMangaArray = urlSet => {
    let mangaFetchedArray = [];
    const mangaUrlArray = [...urlSet];
    mangaUrlArray.map(manga => {
        const urlFields = manga.split('/');
        const title = convertTitle(urlFields[5]);
        let chapter = urlFields[8].padStart(3, '0');
        mangaFetchedArray.push({
            [title]: chapter
        });
    });
    return mangaFetchedArray;
}

const convertTitle = title => {
    switch(title) {
        case "dr-stone":
            return "dr_stone";
        case "boruto-naruto-next-generations":
            return "boruto";
        case "the-promised-neverland":
            return "the_promised_neverland";
         case "hungry-marie":
            return "hungry_marie";
        case "eden-s-zero":
            return "edens_zero";
        case "hunter-x-hunter":
            return "hunter_x_hunter";
        default:
            return title;
    }
}

module.exports = {
    scrapJaimini,
};