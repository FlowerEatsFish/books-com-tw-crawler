# Unofficial Books-com-tw Collection API

[![Travis-CI status](https://travis-ci.com/FlowerEatFish/books-com-tw-api.svg?branch=master)](https://travis-ci.com/FlowerEatFish/books-com-tw-api/builds)
[![AppVeyor status](https://ci.appveyor.com/api/projects/status/tg20it4v5621vv3y/branch/master?svg=true)](https://ci.appveyor.com/project/FlowerEatFish/books-com-tw-api/history)
[![Dependencies status](https://david-dm.org/FlowerEatFish/books-com-tw-api/status.svg)](https://david-dm.org/FlowerEatFish/books-com-tw-api)
[![Code style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Requirements

- This construct uses Async/Await methods, so you need to run [polyfill.js](https://polyfill.io/v2/docs/) first.

- This construct uses [Axios.js](https://github.com/axios/axios), so you need to care the Cross-Origin Requests (CORS).

## Demo

- Commands:

  ```shell
  # To download the files and install packages.
  $ git clone https://github.com/FlowerEatFish/books-com-tw-api.git
  $ cd books-com-tw-api
  $ npm install

  # To run a demo.
  $ npm start
  ```

- Results:

  ```shell
  >>> You search data using keyword "春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖".

  [
    {
      title: '春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖',
      url: 'http://search.books.com.tw/redirect/move/key/%E6%98%A5%E5%A4%8F%E7%A7%8B%E5%86%AC%EF%BC%8C%E6%97%A5%E6%97%A5%E9%A3%9F%E5%85%89%E3%80%82%E7%94%9F%E6%B4%BB%E7%BE%8E%E5%AD%B8%E5%AE%B6%E7%9A%84%E9%91%84%E9%90%B5%E9%8D%8B%E6%96%99%E
  7%90%86%E6%89%8B%E5%B8%96/area/mid/item/0010706739/page/1/idx/1/cat/001/pdf/1',
      author: [ '渡邊有子', '游韻馨' ],
      publisher: '臉譜',
      publicationDate: '2016-02-27',
      imageUrl: 'https://www.books.com.tw/img/001/070/67/0010706739.jpg',
      price: { discount: null, currentPrice: null },
      introduction: '， 在日本已分享了許多對於簡單生活的想法和實行秘訣， ' +
        '尤其在飲食方面，更提出許多同時注重美味、美感和健康的料理，因此廣受大眾歡迎。 在出版過許多料理食譜書後，她認為， ' +
        '使用春、夏、秋、冬的當令食材，搭配鑄鐵鍋，最能引出食材的天然風味......'
    }
  ]
  ```

  ```shell
  >>> You search data using keyword "相對論，愛因斯坦教會我們什麼".

  [ {...}, {...}, ... ] # Array.length <= 20
  ```

  ```shell
  >>> You search data using keyword "blablablablablablablablablablablabla".

  null
  ```

## API documentation

### Input parameters you want to search for information

  ```js
  import BooksComTwCollectionApi from 'books-com-tw-collection-api.development'; // Here uses development mode as an example

  const result = BooksComTwCollectionApi(
    keyword, // string. Necessary.
             //If you configs it as null, it will get an error.
    page, // number. Positive integer. Default: 1.
          // Every page only shows maximum 20 results.
  )
  ```

### Output results you get from input parameters

  ```js
  // If you get one or more result(s), it will return an "array".
  result = [
    {
      title: string,
      author: string[] or null,
      publisher: string or null,
      publicationDate: string or null,
      imageUrl: string or null,
      introduction: string or null,
      price: {
        discount: number or null,
        currentPrice: number or null
      },
      url: string
    },
    { ... }, { ... }, ...
  ];

  // If you have not got any result, it will return a "null".
  result = null;
  ```
