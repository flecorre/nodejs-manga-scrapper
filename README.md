# nodejs-manga-scrapper

A nodejs bot to notify you via emails when your new manga chapters are available.
Use cheerio to scrap new chapters from mangastream, mangahere and webtoons.

## Installing / Getting started

Install dependencies

```shell
npm install
```

Enter your email credentials in .env

```shell
GMAIL_USER=
GMAIL_PASSWORD=
GMAIL_DESTINATION_ADRESS=
```

Enter your mangas in mangas.json

```shell
{
    "bclover": "160",
    "one_piece": "907",
    "the-god-of-high-school": "363",
    "the_seven_deadly_sins": "271"
}
```

Set time interval for scrapping using cron expressions

```shell
new CronJob('*/10 * * * *', function() {
    startBot(mangaChaptersArray);
}, null, true, 'Europe/Paris');
```

```shell
https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm
```

Start script

```shell
node index.js
```

## Others

.gitignore found [here](https://github.com/wearehive/project-guidelines)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
