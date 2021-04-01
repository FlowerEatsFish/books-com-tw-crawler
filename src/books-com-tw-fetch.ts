/**
 * To fetch data via books.com.tw.
 */

import axios, { AxiosError, AxiosResponse } from "axios";

export interface FetchResult {
  data: string | null;
  url: string;
}

const removeLeftoverCode = (htmlCode: string): string => {
  let result: string = htmlCode.replace("\\t", "");
  result = result.replace("\\n", "");
  result = result.replace(/\s+/gi, " ");

  return result;
};

const setKeywordToInsertUrl = (keyword: string): string => {
  // To remove special characters
  let temp: string = keyword.replace(/[~!@#$%^&*()_+\-=}{[\]|"':;?/.,<>}\\]/gi, " ");
  // To remove two or more consequent spaces
  temp = temp.replace(/\s+/, " ");
  // To remove last space
  temp = temp.replace(/\s+$/, "");

  return encodeURI(temp);
};

const setPageToInsertUrl = (page: number): number => page;

const setUrl = (keyword: string, page: number): string => {
  const tempKeyword: string = setKeywordToInsertUrl(keyword);
  const tempPage: number = setPageToInsertUrl(page);

  return `https://search.books.com.tw/search/query/cat/all/sort/1/v/0/ms2/ms2_1/page/${tempPage}/key/${tempKeyword}`;
};

const fetchFullHtmlCode = async (url: string): Promise<string> => {
  return new Promise(
    (resolve: (data: string) => void, reject: (error: AxiosError) => void): void => {
      axios
        .get(url)
        .then((response: AxiosResponse): void => resolve(removeLeftoverCode(response.data)))
        .catch((error: AxiosError): void => reject(error));
    },
  );
};

const setUrlFollowParameter = (url: string | null, keyword: string, page: number): string => {
  if (url) {
    return url;
  }
  const combineUrl: string = setUrl(keyword, page);

  return combineUrl;
};

export const collectionFetch = async (
  url: string | null,
  keyword: string = "",
  page: number,
): Promise<FetchResult> => {
  const fullUrl: string = setUrlFollowParameter(url, keyword, page);

  let data: string | null;
  try {
    data = await fetchFullHtmlCode(fullUrl);
  } catch (error) {
    data = null;
  }

  return { data: data, url: fullUrl };
};
