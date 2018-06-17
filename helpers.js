'use strict'
const fs = require('fs');
const newChapters = require('./newChapters');
const constants = require('./constants');

const writeJson = (json, newChapters) => {
    for (const key in newChapters) {
        if (newChapters.hasOwnProperty(key)) {
            newChapters[key].map(e => {
                json[Object.keys(e).toString()] = Object.values(e).toString();
            })
        }
    }
    json = JSON.stringify(json, null, 2);
    fs.writeFileSync('test.json', json);
};

const readJson = (file) => {
    let jsonContent;
    try {
        let rawContent = fs.readFileSync(file);
        jsonContent = JSON.parse(rawContent);
    } catch (error) {
        console.log('File not found');
    }
    return jsonContent;
};

const convertMangaJsonIntoArray = (json) => {
    const mangaJsonArray = Object.keys(json).map(function (key) {
        return {
            [key]: json[key]
        };
    });
    return mangaJsonArray;
};

const checkIfNewChapters = (jsonMangaArray, fetchedMangaArray, website) => {
    fetchedMangaArray.map(fetchedChapter => jsonMangaArray.map(jsonChapter => {
        if (Object.keys(fetchedChapter).toString() == Object.keys(jsonChapter).toString()) {
            if (Object.values(fetchedChapter).toString() > Object.values(jsonChapter).toString()) {
                newChapters.addNewManga(website, fetchedChapter);
            }
        }
    }));
};

module.exports = {
    readJson,
    writeJson,
    checkIfNewChapters,
    convertMangaJsonIntoArray,
};