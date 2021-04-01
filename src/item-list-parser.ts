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
  try {
    if (text.includes(tag)) {
      const newRegExp: RegExp = new RegExp(`<strong>\\d+<\\/strong>\\s*${tag}`, "gi");
      const result: string[] | null = text.match(newRegExp);

      return result ? Number(result[0].replace(/\D/gi, "")) : null;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getItemPrice = (htmlCode: string): PriceField => {
  try {
    const result: string[] | null = htmlCode.match(
      /<ul class="list-nav clearfix">[\w\W]*?<\/ul>/gi,
    );

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
  } catch (error) {
    return {
      discount: null,
      currentPrice: null,
    };
  }
};

const getItemImageUrl = (htmlCode: string): string | null => {
  try {
    let result: string[] | null = htmlCode.match(/<img [\w\W]*?>/gi);

    if (result) {
      result = result[0].match(/srcset="[\w\W]*?"/gi);
    }

    return result
      ? result[0].replace(
          /srcset="https:\/\/im1\.book\.com\.tw\/image\/getImage\?i=([\w\W]*?)&[\w\W]*/gi,
          "$1",
        )
      : null;
  } catch (error) {
    return null;
  }
};

const getItemAuthor = (htmlCode: string): string[] | null => {
  try {
    const result: string[] | null = htmlCode.match(/<a rel='go_author'[\w\W]*?>[\w\W]*?<\/a>/gi);

    if (result && result.length > 0) {
      const resultWithoutHtmlTag: string[] = result.map((value: string): string =>
        removeAllHtmlTag(value),
      );

      return resultWithoutHtmlTag;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getItemPublisher = (htmlCode: string): string | null => {
  try {
    let result: string[] | null;
    if (htmlCode.includes('target="_blank" rel="mid_publish"')) {
      // For Chinese books
      result = htmlCode.match(/<a target="_blank" rel="mid_publish"[\w\W]*?>[\w\W]*?<\/a>/gi);
    } else {
      // For Western books
      result = htmlCode.match(/<a rel="mid_publish"[\w\W]*?>[\w\W]*?<\/a>/gi);
    }

    return result ? removeAllHtmlTag(result[0]) : null;
  } catch (error) {
    return null;
  }
};

const getItemPublicationDate = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/出版日期: \d{4}-\d{2}-\d{2}/);

    return result ? result[0].replace("出版日期: ", "") : null;
  } catch (error) {
    return null;
  }
};

const getItemUrl = (htmlCode: string): string | null => {
  try {
    let result: string[] | null = htmlCode.match(/<h4>[\w\W]*?<\/h4>/gi);
    if (result) {
      result = result[0].match(/<a [\w\W]*?<\/a>/gi);
    }

    return result ? result[0].replace(/<a [\w\W]*?href="([\w\W]*?)"[\w\W]*/gi, "http:$1") : null;
  } catch (error) {
    return null;
  }
};

const getItemTitle = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<h4>[\w\W]*?<\/h4>/gi);

    return result ? removeAllHtmlTag(result[0]) : null;
  } catch (error) {
    return null;
  }
};

const getItemIntroduction = (htmlCode: string): string | null => {
  try {
    const result: string[] | null = htmlCode.match(/<p>[\w\W]*?<\/p>/gi);

    if (result) {
      // To remove useless texts like "更多資訊"
      const filterResult = result[0].replace(/<span>[\w\W]*?<\/span>/gi, "");

      return removeAllHtmlTag(filterResult);
    }
    return null;
  } catch (error) {
    return null;
  }
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

  return result ? result[0] : null;
};

export const itemListParser = async (htmlCode: string): Promise<DetailType[]> => {
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
