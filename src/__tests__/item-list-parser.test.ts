import HtmlCode_CompleteItems from "./samples/complete-items";
import HtmlCode_IncompleteItem from "./samples/incomplete-item";
import HtmlCode_EmptyItem from "./samples/empty-item";

import { itemListParser } from "../item-list-parser";

describe("item-list-parser", () => {
  test("returns correct values when given complete items", async () => {
    const content = HtmlCode_CompleteItems;
    const output = await itemListParser(content);

    const expected = [
      {
        author: null,
        imageUrl: "https://www.books.com.tw/img/001/085/63/0010856354.jpg",
        introduction:
          "邁向大師之路 《The Pragmatic Programmer》是少數隨著歲月增長值得一讀再讀的經典書籍，無論您是新手還是實戰豐富的從業者，每次閱讀這本書，您都會得到新的領悟。 Dave Thomas和Andy Hunt於......",
        price: {
          currentPrice: 612,
          discount: 9,
        },
        publicationDate: "2020-04-30",
        publisher: null,
        title: "The Pragmatic Programmer 20週年紀念版",
        url:
          "http://search.books.com.tw/redirect/move/key/the+pragmatic+programmer/area/mid/item/0010856354/page/1/idx/1/cat/001/pdf/1/spell/3",
      },
      {
        author: null,
        imageUrl: "https://www.books.com.tw/img/F01/987/86/F019878686.jpg",
        introduction:
          "programming. In general, Ruby programmers tend to favor the the command line for running their code, and they tend to use text......",
        price: {
          currentPrice: null,
          discount: null,
        },
        publicationDate: "2023-10-24",
        publisher: "Ingram",
        title: "Programming Ruby 3.2: The Pragmatic Programmers’ Guide",
        url:
          "http://search.books.com.tw/redirect/move/key/the+pragmatic+programmer/area/mid/item/F019878686/page/1/idx/2/cat/F01/pdf/0/spell/3",
      },
    ];
    expect(output).toEqual(expected);
  });

  test("returns correct values when given an incomplete item", async () => {
    const content = HtmlCode_IncompleteItem;
    const output = await itemListParser(content);

    const expected = [
      {
        author: null,
        imageUrl: null,
        introduction: null,
        price: {
          currentPrice: null,
          discount: null,
        },
        publicationDate: null,
        publisher: null,
        title: "",
        url: null,
      },
      {
        author: null,
        imageUrl: null,
        introduction: null,
        price: {
          currentPrice: null,
          discount: null,
        },
        publicationDate: null,
        publisher: null,
        title: null,
        url: null,
      },
    ];
    expect(output).toEqual(expected);
  });

  test("returns correct values when given empty item", async () => {
    const content = HtmlCode_EmptyItem;
    const output = await itemListParser(content);

    expect(output).toEqual([]);
  });

  test("returns correct values when given invalid HTML code", async () => {
    const content = "<body></body>";
    const output = await itemListParser(content);

    expect(output).toEqual([]);
  });
});
