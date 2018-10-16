"use strict";

const fs = require("fs");
const mangaChapters = require("./manga-chapters");
const constants = require("../constants/constants");

const writeJson = (mangaChaptersJson, newChaptersObject) => {
  for (let key in newChaptersObject) {
    if (newChaptersObject.hasOwnProperty(key)) {
      newChaptersObject[key].map(newChapter => {
        mangaChaptersJson[Object.keys(newChapter).toString()] = Object.values(
          newChapter
        ).toString();
      });
    }
  }
  mangaChaptersJson = JSON.stringify(mangaChaptersJson, null, 2);
  fs.writeFileSync(constants.MANGAS_JSON, mangaChaptersJson);
};

const readJson = file => {
  let jsonContent;
  try {
    let rawContent = fs.readFileSync(file);
    jsonContent = JSON.parse(rawContent);
  } catch (error) {
    console.log("File not found");
  }
  return jsonContent;
};

const convertMangaJsonIntoObject = json => {
  const mangaJsonObject = Object.keys(json).map(function(key) {
    return {
      [key]: json[key]
    };
  });
  return mangaJsonObject;
};

const checkIfChaptersAreNews = (jsonMangaArray, fetchedMangaArray, website) => {
  fetchedMangaArray.map(fetchedChapter =>
    jsonMangaArray.map(jsonChapter => {
      if (
        Object.keys(fetchedChapter).toString() ==
        Object.keys(jsonChapter).toString()
      ) {
        if (
          Object.values(fetchedChapter).toString() >
          Object.values(jsonChapter).toString()
        ) {
          mangaChapters.addNewMangaChapter(website, fetchedChapter);
        }
      }
    })
  );
};

const isObjectEmpty = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const transformObjectIntoString = obj => {
  let newString = "New chapters: ";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) newString = `${newString}\n\n-${key}- `;
    obj[key].map(e => {
      newString = `${newString}\n${removeUselessChars(JSON.stringify(e))}`;
    });
  }
  return newString;
};

const removeUselessChars = arg => {
  arg = arg.replace("{", "");
  arg = arg.replace(/"/g, "");
  arg = arg.replace("}", "");
  arg = arg.replace(":", ": ");
  return arg;
};

const transformToReadableList = (mangaObject) => {
  let readableList = "";
  if("mangastream" in mangaObject) {
    readableList += extractChaptersFromObject(mangaObject, "mangastream");
  }
  if("mangahere" in mangaObject) {
    readableList += extractChaptersFromObject(mangaObject, "mangahere");
  }
  if("webtoons" in mangaObject) {
    readableList += extractChaptersFromObject(mangaObject, "webtoons");
  }
  return readableList
}

const extractChaptersFromObject = (myObject, myKey) => {
  let list = "";
  if(myKey in myObject) {
    list += `${myKey}:\n`;
    myObject[myKey].map(m => list += `   ${Object.keys(m)} ${Object.values(m)}\n`);
  }
  return list;
}

module.exports = {
  readJson,
  writeJson,
  checkIfChaptersAreNews,
  convertMangaJsonIntoObject,
  isObjectEmpty,
  transformToReadableList
};
