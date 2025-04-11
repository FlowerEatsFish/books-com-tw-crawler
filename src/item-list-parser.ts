/**
 * To parse the results when the fetcher got one or more data.
 */

import { DetailType, PriceField } from "../index";

const removeAllHtmlTag = (text: string): string => {
  let result: string = text.replace(/<\/?\w+[^>]*>/gi, "");
  // To remove beginning and end of spaces
  result = result.replace(/^\s+/, "");
  result = result.replace(/\s+$/, "");

  return result;
};

const setItemWithTag = (text: string, tag: string): number | null => {
  if (text.includes(tag)) {
    const newRegExp: RegExp = new RegExp(`<strong>\\d+<\\/strong>\\s*${tag}`, "gi");
    const result: string[] | null = text.match(newRegExp);

    if (result) {
      return Number(result[0].replace(/\D/gi, ""));
    }
    return null;
  }

  return null;
};

const getItemPrice = (htmlCode: string): PriceField => {
  const result: string[] | null = htmlCode.match(/<ul class="list-nav clearfix">[\w\W]*?<\/ul>/gi);

  if (result) {
    return {
      discount: setItemWithTag(result[0], "折"),
      currentPrice: setItemWithTag(result[0], "元"),
    };
  }

  return {
    discount: null,
    currentPrice: null,
  };
};

const getItemImageUrl = (htmlCode: string): string | null => {
  let result: string[] | null = htmlCode.match(/<img [\w\W]*?>/gi);

  if (result) {
    result = result[0].match(/srcset="[\w\W]*?"/gi);
  }

  if (result) {
    return result[0].replace(
      /srcset="https:\/\/im1\.book\.com\.tw\/image\/getImage\?i=([\w\W]*?)&[\w\W]*/gi,
      "$1",
    );
  }
  return null;
};

const getItemAuthor = (htmlCode: string): string[] | null => {
  const result: string[] | null = htmlCode.match(/<a rel='go_author'[\w\W]*?>[\w\W]*?<\/a>/gi);

  if (result && result.length > 0) {
    const resultWithoutHtmlTag: string[] = result.map((value: string): string =>
      removeAllHtmlTag(value),
    );

    return resultWithoutHtmlTag;
  }

  return null;
};

const getItemPublisher = (htmlCode: string): string | null => {
  let result: string[] | null;

  // For Chinese books
  result = htmlCode.match(/<a\s+[^>]*?href="[^"]*?mid_publish\/pubid[^"]*?"[^>]*?>[\s\S]*?<\/a>/gi);

  if (!result) {
    // For Western (or other foreign) books
    result = htmlCode.match(/<a\s+(?:target="_self"\s+)?rel="mid_publish"[^>]*?>[\s\S]*?<\/a>/gi);
  }

  if (result) {
    return removeAllHtmlTag(result[0]);
  }
  return null;
};

const getItemPublicationDate = (htmlCode: string): string | null => {
  const result: string[] | null = htmlCode.match(/出版日期: \d{4}-\d{2}-\d{2}/);

  if (result) {
    return result[0].replace("出版日期: ", "");
  }
  return null;
};

const getItemUrl = (htmlCode: string): string | null => {
  let result: string[] | null = htmlCode.match(/<h4>[\w\W]*?<\/h4>/gi);
  if (result) {
    result = result[0].match(/<a [\w\W]*?<\/a>/gi);
  }

  if (result) {
    return result[0].replace(/<a [\w\W]*?href="([\w\W]*?)"[\w\W]*/gi, "http:$1");
  }
  return null;
};

const getItemTitle = (htmlCode: string): string | null => {
  const result: string[] | null = htmlCode.match(/<h4>[\w\W]*?<\/h4>/gi);

  if (result) {
    return removeAllHtmlTag(result[0]);
  }
  return null;
};

const getItemIntroduction = (htmlCode: string): string | null => {
  const result: string[] | null = htmlCode.match(/<p>[\w\W]*?<\/p>/gi);

  if (result) {
    // To remove useless texts like "更多資訊"
    const filterResult = result[0].replace(/<span>[\w\W]*?<\/span>/gi, "");

    return removeAllHtmlTag(filterResult);
  }
  return null;
};

const getItem = (htmlCode: string): DetailType => {
  return {
    title: getItemTitle(htmlCode),
    url: getItemUrl(htmlCode),
    author: getItemAuthor(htmlCode),
    publisher: getItemPublisher(htmlCode),
    publicationDate: getItemPublicationDate(htmlCode),
    imageUrl: getItemImageUrl(htmlCode),
    price: getItemPrice(htmlCode),
    introduction: getItemIntroduction(htmlCode),
  };
};

const splitHtmlCode = (htmlCode: string): string[] | null =>
  htmlCode.match(/<tbody id="itemlist_[\w\d]+">[\w\W]*?<\/tbody>/gi);

const getSpecificHtmlCode = (htmlCode: string): string | null => {
  const result = htmlCode.match(
    /<table id="itemlist_table" class="table-searchlist clearfix">[\w\W]*?<\/table>/gi,
  );

  if (result) {
    return result[0];
  }
  return null;
};

export const itemListParser = (htmlCode: string): DetailType[] => {
  // To get specific html code containing data
  const targetHtmlCode: string | null = getSpecificHtmlCode(htmlCode);
  if (!targetHtmlCode) return [];

  // To split code from string into array by special tag
  const itemListWithCode: string[] | null = splitHtmlCode(targetHtmlCode);
  if (!Array.isArray(itemListWithCode) || itemListWithCode.length === 0) return [];

  // To build up data we want
  const itemList: DetailType[] = itemListWithCode.map(
    (value: string): DetailType => getItem(value),
  );
  return itemList;
};
