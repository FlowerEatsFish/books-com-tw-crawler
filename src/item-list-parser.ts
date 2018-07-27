/**
 * To parse the results when the fetcher got one or more data.
 */

export interface IPriceType {
  discount: number;
  currentPrice: number;
}

export interface IItemType {
  title: string;
  url: string;
  author: string[];
  publisher: string;
  publicationDate: string;
  imageUrl: string;
  price: IPriceType;
  introduction: string;
}

const removeAllHtmlTag: Function = (text: string): string => {
  let result: string = text.replace(/<\/?\w+[^>]*>/gi, '');
  // To remove beginning and end of spaces
  result = result.replace(/^\s+/, '');
  result = result.replace(/\s+$/, '');

  return result;
};

const setItemWithTag: Function = (text: string, tag: string): number => {
  try {
    if (text.includes(tag)) {
      const newRegExp: RegExp = new RegExp(`<strong>\\s*<b>\\d+<\\/b>\\s*${tag}<\\/strong>`, 'gi');
      const result: string = text.match(newRegExp)[0];

      return Number(result.replace(/\D/gi, ''));
    }

    return null;
  } catch (error) {
    return null;
  }
};

const getItemPrice: Function = (htmlCode: string): IPriceType => {
  try {
    const result: string = htmlCode.match(/<span class="price">[\w\W]*?<\/span>/gi)[0];

    return {
      discount: setItemWithTag(result, '折'),
      currentPrice: setItemWithTag(result, '元')
    };
  } catch (error) {
    return null;
  }
};

const getItemImageUrl: Function = (htmlCode: string): string => {
  try {
    let result: string = htmlCode.match(/<img [\w\W]*?>/gi)[0];
    result = result.match(/data-original="[\w\W]*?"/gi)[0];

    return result.replace(/data-original="https:\/\/im1\.book\.com\.tw\/image\/getImage\?i=([\w\W]*?)&[\w\W]*/gi, '$1');
  } catch (error) {
    return null;
  }
};

const getItemAuthor: Function = async (htmlCode: string): Promise<string[]> => {
  try {
    const result: string[] = htmlCode.match(/<a rel="go_author"[\w\W]*?>[\w\W]*?<\/a>/gi);
    // tslint:disable-next-line:no-unnecessary-local-variable
    const resultWithoutHtmlTag: string[] = await Promise.all(result.map((value: string) => removeAllHtmlTag(value)));

    return resultWithoutHtmlTag;
  } catch (error) {
    return null;
  }
};

const getItemPublisher: Function = (htmlCode: string): string => {
  try {
    let result: string;
    if (htmlCode.includes('target="_blank" rel="mid_publish"')) {
      // For Chinese books
      result = htmlCode.match(/<a target="_blank" rel="mid_publish"[\w\W]*?>[\w\W]*?<\/a>/gi)[0];
    } else {
      // For Western books
      result = htmlCode.match(/<a rel="mid_publish"[\w\W]*?>[\w\W]*?<\/a>/gi)[0];
    }

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItemPublicationDate: Function = (htmlCode: string): string => {
  try {
    const result: string = htmlCode.match(/出版日期: \d{4}-\d{2}-\d{2}/)[0];

    return result.replace('出版日期: ', '');
  } catch (error) {
    return null;
  }
};

const getItemUrl: Function = (htmlCode: string): string => {
  try {
    let result: string = htmlCode.match(/<h3>[\w\W]*?<\/h3>/gi)[0];
    result = result.match(/<a [\w\W]*?<\/a>/gi)[0];
    result = result.replace(/<a [\w\W]*?href="([\w\W]*?)"[\w\W]*/gi, 'http:$1');

    return result;
  } catch (error) {
    return null;
  }
};

const getItemTitle: Function = (htmlCode: string): string => {
  try {
    const result: string = htmlCode.match(/<h3>[\w\W]*?<\/h3>/gi)[0];

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItemIntroduction: Function = (htmlCode: string): string => {
  try {
    let result: string = htmlCode.match(/<p>[\w\W]*?<\/p>/gi)[0];
    // To remove useless texts like "更多資訊"
    result = result.replace(/<span>[\w\W]*?<\/span>/gi, '');

    return removeAllHtmlTag(result);
  } catch (error) {
    return null;
  }
};

const getItem: Function = async (htmlCode: string): Promise<IItemType> => {
  const author: string[] = await getItemAuthor(htmlCode);

  return {
    title: getItemTitle(htmlCode),
    url: getItemUrl(htmlCode),
    author,
    publisher: getItemPublisher(htmlCode),
    publicationDate: getItemPublicationDate(htmlCode),
    imageUrl: getItemImageUrl(htmlCode),
    price: getItemPrice(htmlCode),
    introduction: getItemIntroduction(htmlCode)
  };
};

const splitHtmlCode: Function = (htmlCode: string): string[] => htmlCode.match(/<li class="item">[\w\W]*?<\/li>/gi);

const getSpecificHtmlCode: Function = (htmlCode: string): string => htmlCode.match(/<ul class="searchbook">[\w\W]*?<\/ul>/gi)[0];

export const itemListParser: Function = async (htmlCode: string): Promise<IItemType[]> => {
  // To get specific html code containing data
  const targetHtmlCode: string = await getSpecificHtmlCode(htmlCode);
  // To split code from string into array by special tag
  const itemListWithCode: string[] = await splitHtmlCode(targetHtmlCode);
  if (itemListWithCode.length > 0) {
    // To build up data we want
    // tslint:disable-next-line:no-unnecessary-local-variable
    const itemList: IItemType[] = await Promise.all(itemListWithCode.map((value: string) => getItem(value)));

    return itemList;
  }

  return [];
};
