'use strict'

let newMangaChapters = {};

const addNewMangaChapter = (website, manga) =>  {
    if (newMangaChapters[website]) {
        newMangaChapters[website].push(manga);
    } else {
        newMangaChapters[website] = [manga];
    }
}

const getNewMangaChapters = () => {
    return newMangaChapters;
}

module.exports = {
    addNewMangaChapter,
    getNewMangaChapters
}