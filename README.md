# Books-com-tw Crawler

[![NPM version](https://img.shields.io/npm/v/books-com-tw-crawler.svg)](https://www.npmjs.com/package/books-com-tw-crawler)
[![Actions status](https://github.com/FlowerEatsFish/books-com-tw-crawler/workflows/build/badge.svg?branch=master)](https://github.com/FlowerEatsFish/books-com-tw-crawler/actions)
[![Codecov status](https://codecov.io/gh/FlowerEatsFish/books-com-tw-crawler/branch/master/graph/badge.svg)](https://codecov.io/gh/FlowerEatsFish/books-com-tw-crawler/commits)
[![Code style](https://img.shields.io/badge/code_style-biome-blue.svg)](https://biomejs.dev/)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

博客來資料爬蟲

- [Books-com-tw Crawler](#books-com-tw-crawler)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Demo](#demo)
    - [Commands](#commands)
    - [Results](#results)
  - [Documentation](#documentation)
    - [Input parameters](#input-parameters)
    - [Output results](#output-results)

## Installation

NPM

```shell
npm install books-com-tw-crawler --save
```

Yarn

```shell
yarn add books-com-tw-crawler
```

## Usage

```javascript
const booksComTwCrawler = require('books-com-tw-crawler');

// Option 1
booksComTwCrawler('The Clean Coder')
  .then(results => console.log(results));

// Option 2
async function run() {
  const results = await booksComTwCrawler('The Clean Coder')
  console.log(results);
}
run();
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

[ {...}, {...}, ... ] # Array.prototype.length <= 60
```

```shell
>>> You search data using keyword "blablablablablablablablablablablabla".

null
```

## Documentation

### Input parameters

```javascript
import booksComTwCrawler from 'books-com-tw-crawler';

const result = await booksComTwCrawler(
  keyword, // string. Necessary.
           // If you set it as null, it will get an error.
  page, // number. Positive integer. Default: 1.
        // Every page only shows maximum 60 results.
);
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
