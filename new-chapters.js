'use strict'

let newMangaArray = {};

const addNewManga = (website, manga) =>  {
    if (newMangaArray[website]) {
        newMangaArray[website].push(manga);
    } else {
        newMangaArray[website] = [manga];
    }
}

const getNewMangaArray = () => {
    return newMangaArray;
}

module.exports = {
    addNewManga,
    getNewMangaArray
}