# nodejs-manga-scrapper

A nodejs bot to notify you via emails when your new manga chapters are available.
Use cheerio to scrap new chapters from mangastream, mangahere and webtoons.

## Installing / Getting started

* Install dependencies

```shell
npm install
```

* Create a telegram token
Open a chatroom with the telegram BotFather and get your Telegram token by typing:
```shell
/newbot
```

* Get your chat id
Once you get your token, create a small js script to get your chat id:
```shell
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(ctx.chat.id));
bot.startPolling();
```
Launch this JS script, open a chatroom with your bot and type /start

* Create a .env file in root folder and add both token and chat id:

```shell
BOT_TOKEN="abcde"
CHAT_ID=12345
```

* Enter your mangas in mangas.json

```shell
{
    "bclover": "160",
    "one_piece": "907",
    "the-god-of-high-school": "363",
    "the_seven_deadly_sins": "271"
}
```

* Set time interval for scrapping using cron expressions

```shell
new CronJob('*/10 * * * *', function() {
    startBot(mangaChaptersArray);
}, null, true, 'Europe/Paris');
```

```shell
https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm
```

* Start script

```shell
node index.js
```

## Others

.gitignore found [here](https://github.com/wearehive/project-guidelines)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
