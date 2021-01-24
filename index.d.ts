export interface PriceField {
  discount: number | null;
  currentPrice: number | null;
}

export interface DetailType {
  title: string | null;
  author: string[] | null;
  publisher: string | null;
  publicationDate: string | null;
  imageUrl: string | null;
  introduction: string | null;
  price: PriceField;
  url: string | null;
}

export type BooksComTwCollectionFunction = (
  keyword: string,
  page?: number,
) => Promise<DetailType[] | null>;

declare const booksComTwCrawler: BooksComTwCollectionFunction;

export default booksComTwCrawler;
