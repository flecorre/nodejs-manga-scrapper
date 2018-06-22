'use strict'
const fs = require('fs');
const newChapters = require('./new-chapters');
const constants = require('./constants');

const writeJson = (mangaChaptersJson, newChaptersArray) => {
    for (let key in newChaptersArray) {
        if (newChaptersArray.hasOwnProperty(key)) {
            newChaptersArray[key].map(newChapter => {
                mangaChaptersJson[Object.keys(newChapter).toString()] = Object.values(newChapter).toString();
            });
        }
    }
    mangaChaptersJson = JSON.stringify(mangaChaptersJson, null, 2);
    fs.writeFileSync(constants.MANGAS_JSON, mangaChaptersJson);
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

const checkIfChaptersAreNews = (jsonMangaArray, fetchedMangaArray, website) => {
    fetchedMangaArray.map(fetchedChapter => jsonMangaArray.map(jsonChapter => {
        if (Object.keys(fetchedChapter).toString() == Object.keys(jsonChapter).toString()) {
            if (Object.values(fetchedChapter).toString() > Object.values(jsonChapter).toString()) {
                newChapters.addNewMangaChapter(website, fetchedChapter);
            }
        }
    }));
};

const isObjectEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const transformObjectIntoString = (obj) => {
    let newString = 'New chapters: ';
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            newString = `${newString}\n\n-${key}- `;
        obj[key].map(e => {
            newString = `${newString}\n${removeUselessChars(JSON.stringify(e))}`
        });
    }
    return newString;
}

const removeUselessChars = (arg) => {
    arg = arg.replace('{', '');
    arg = arg.replace(/"/g, '');
    arg = arg.replace('}', '');
    arg = arg.replace(':', ': ');
    return arg;
}

module.exports = {
    readJson,
    writeJson,
    checkIfChaptersAreNews,
    convertMangaJsonIntoArray,
    isObjectEmpty,
    transformObjectIntoString
};