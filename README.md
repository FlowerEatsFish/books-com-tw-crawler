# Books-com-tw Crawler

[![NPM version](https://img.shields.io/npm/v/books-com-tw-crawler.svg)](https://www.npmjs.com/package/books-com-tw-crawler)
[![Actions status](https://github.com/FlowerEatsFish/books-com-tw-crawler/workflows/build/badge.svg?branch=master)](https://github.com/FlowerEatsFish/books-com-tw-crawler/actions)
[![Codecov status](https://codecov.io/gh/FlowerEatsFish/books-com-tw-crawler/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatsFish/books-com-tw-crawler/commits)
[![Scheduled status](https://travis-ci.com/FlowerEatsFish/books-com-tw-crawler.svg?branch=master)](https://travis-ci.com/FlowerEatsFish/books-com-tw-crawler/builds)
[![Dependencies status](https://github.com/FlowerEatsFish/books-com-tw-crawler/workflows/dependencies-status/badge.svg?branch=master)](https://github.com/FlowerEatsFish/books-com-tw-crawler/actions)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

博客來資料爬蟲

- [Books-com-tw Crawler](#Books-com-tw-Crawler)
  - [Requirements](#Requirements)
  - [Installations](#Installations)
  - [Usage](#Usage)
    - [Node.js version 8 or higher (with full Async/Await support)](#Nodejs-version-8-or-higher-with-full-AsyncAwait-support)
    - [Others](#Others)
  - [Demo](#Demo)
    - [Commands](#Commands)
    - [Results](#Results)
  - [API documentation](#API-documentation)
    - [Input parameters](#Input-parameters)
    - [Output results](#Output-results)

## Requirements

- This construct uses XHR such as [Axios.js](https://github.com/axios/axios), so you need to care about the Cross-Origin Requests (CORS) and [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) if you use this construct in web browsers rather than Node.js.

## Installations

- NPM

```shell
npm install books-com-tw-crawler --save
```

- Yarn

```shell
yarn add books-com-tw-crawler
```

## Usage

### Node.js version 8 or higher (with full Async/Await support)

```javascript
const booksComTwCrawler = require('books-com-tw-crawler');

const run = async () => {
  const results = await booksComTwCrawler('橡皮擦計畫');
  console.log(results);
};

run();
```

### Others

```javascript
const booksComTwCrawler = require('books-com-tw-crawler');

booksComTwCrawler('橡皮擦計畫')
  .then(results => console.log(results));
```

## Demo

### Commands

```shell
# To download the files and install packages.
$ git clone https://github.com/FlowerEatsFish/books-com-tw-crawler.git
$ cd books-com-tw-crawler
$ yarn install # npm install

# To run a demo.
$ yarn start # npm start
```

### Results

```shell
>>> You search data using keyword "快速上手LINUX的九堂課".

[
  {
    title: 'Linuxの繪本：快速上手LINUX的九堂課',
    url: 'http://search.books.com.tw/redirect/move/key/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8BLINUX%E7%9A%84%E4%B9%9D%E5%A0%82%E8%AA%B2/area/mid/item/0010875493/page/1/idx/1/cat/001/pdf/1',
    author: [ '株式会社アンク', '何蟬秀' ],
    publisher: '碁峰',
    publicationDate: '2020-11-12',
    imageUrl: 'https://www.books.com.tw/img/001/087/54/0010875493.jpg',
    price: { discount: 79, currentPrice: 300 },
    introduction: '日本當地累積銷售70萬冊的最佳入門圖解書 本書使用擬人化的漫畫人物與圖解針對Linux的基本觀念與操作進行淺顯易懂的解說，即使是未曾接觸過Linux的讀者，也能藉由本書了解何謂「作業系統」，並學會如何操作Linux系統。 本書特色......'
  }
]
```

```shell
>>> You search data using keyword "春夏秋冬".

[ {...}, {...}, ... ] # Array.prototype.length <= 24
```

```shell
>>> You search data using keyword "blablablablablablablablablablablabla".

null
```

## API documentation

### Input parameters

```javascript
import booksComTwCrawler from 'books-com-tw-crawler';

const result = booksComTwCrawler(
  keyword, // string. Necessary.
           // If you set it as null, it will get an error.
  page, // number. Positive integer. Default: 1.
        // Every page only shows maximum 24 results.
)
```

### Output results

```javascript
// If you get one or more result(s), it will return an "array".
result = [
  {
    title: string or null,
    author: string[] or null,
    publisher: string or null,
    publicationDate: string or null,
    imageUrl: string or null,
    introduction: string or null,
    price: {
      discount: number or null,
      currentPrice: number or null
    },
    url: string | null
  },
  { ... }, { ... }, ...
];

// If you have not got any result, it will return a "null".
result = null;
```
