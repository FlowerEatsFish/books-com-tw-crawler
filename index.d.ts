export interface PriceField {
  discount: number | null;
  currentPrice: number | null;
}

export interface DetailType {
  title: string;
  author: string[] | null;
  publisher: string | null;
  publicationDate: string | null;
  imageUrl: string | null;
  introduction: string | null;
  price: PriceField;
  url: string;
}

export type BooksComTwCollectionFunction =
  (keyword: string, page: number) => DetailType[] | null;

declare const booksComTwCollectionApi: BooksComTwCollectionFunction;

export default booksComTwCollectionApi;
