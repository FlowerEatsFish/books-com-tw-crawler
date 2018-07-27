/**
 * Demo
 */

// tslint:disable-next-line:import-name
import bookCollection from './index';

const keywordList: string[] = [
  '相對論，愛因斯坦教會我們什麼'
];

const demo: Function = async (): Promise<void> => {
  for (const keyword of keywordList) {
    await console.log(`>>> You search data using keyword "${keyword}".`);
    await bookCollection(keyword);
  }
};

demo(keywordList);
