/**
 * Main control for this library.
 */

import { BooksComTwCollectionFunction, DetailType } from "../index";
import { FetchResult, collectionFetch } from "./books-com-tw-fetch";
import { itemListParser } from "./item-list-parser";

const booksComTwCollection: BooksComTwCollectionFunction = async (
  keyword: string,
  page: number = 1,
): Promise<DetailType[] | null> => {
  const htmlCodeAfterFetch: FetchResult = await collectionFetch(null, keyword, page);

  // To check whether data is got
  if (htmlCodeAfterFetch.data === null) {
    // To do here if html code is empty (no result is got from the HTML code) or status code is not 200
    return null;
  }

  const itemList: DetailType[] = itemListParser(htmlCodeAfterFetch.data);
  if (itemList.length > 0) {
    // To do here if the HTML code contains one or more result(s)
    return itemList;
  }
  // To do here if no result is got from the HTML code and status code is 200
  return null;
};

export default booksComTwCollection;
