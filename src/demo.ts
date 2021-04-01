/**
 * Demo
 */

import booksComTwCollection from "./index";

const demoKeywordList: string[] = [
  "快速上手LINUX的九堂課", // It will get one result as expected.
  "春夏秋冬", // It will get more results on 24 ones per page as expected.
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
