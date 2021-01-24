/**
 * Demo
 */

import booksComTwCollection from "./index";

const demoKeywordList: string[] = [
  "春夏秋冬，日日食光。生活美學家的鑄鐵鍋料理手帖", // It will get one result as expected.
  "相對論，愛因斯坦教會我們什麼", // It will get more results on 12 ones per page as expected.
  "blablablablablablablablablablablabla", // It will be no result.
];

const demo = async (keywordList: typeof demoKeywordList): Promise<void> => {
  for (const keyword of keywordList) {
    console.log(`>>> You search data using keyword "${keyword}".`);
    const result = await booksComTwCollection(keyword);
    console.log(result);
  }
};

demo(demoKeywordList);
