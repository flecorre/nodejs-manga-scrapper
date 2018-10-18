'use strict'
const axios = require('axios');
const cheerio = require('cheerio');
const helpers = require('../common/helpers.js');
const constants = require('../constants/constants');

const mangaUrlSet = new Set();

const scrapMangareader = async (mangaJsonArray) => {
    console.log("Fetching from Mangahere...");
    await getChaptersFromMangareader(constants.MANGAREADER_URL);
    const mangaFetchedArray = convertMangaFetchedUrlIntoMangaArray(mangaUrlSet);
    helpers.checkIfChaptersAreNews(mangaJsonArray, mangaFetchedArray, constants.MANGAREADER);
    console.log("...Done fetching Mangahere!");
}

const getChaptersFromMangareader = async (url) => {
    const res = await axios.get(url);
    if (res.status === 200) {
        const html = res.data;
        const $ = cheerio.load(html);
        $('.chaptersrec').each((index, element) => {
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
        const title = convertTitle(urlFields[1]);
        const chapter = urlFields[2].padStart(3, '0');
        mangaFetchedArray.push({
            [title]: chapter
        });
    });
    return mangaFetchedArray;
}

const convertTitle = title => {
    switch(title) {
        case "edens-zero":
            return "edens_zero";
        case "fairy-tail-100-years-quest":
            return "to_exclude";
        case "nanatsu-no-taizai":
            return "the_seven_deadly_sins";
         case "black-clover":
            return "black_clover";
        case "dr-stone":
            return "dr_stone";
        case "dragon_ball_super":
            return "dragon-ball-super";
        case "hunter-x-hunter":
            return "hunter_x_hunter";
        case "boku-no-hero-academia":
            return "my_hero_academia";
        case "new-prince-of-tennis":
            return "new_prince_of_tennis";
         case "onepunch-man":
            return "onepunch_man";
        case "the-promised-neverland":
            return "the_promised_neverland";
        case "noblesse":
            return "to_exclude";
        default:
            return title;
    }
}

module.exports = {
    scrapMangareader,
};