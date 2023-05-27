import axios from "axios";
import { DetailType } from "../index";
import booksComTwCollection from "../src/index";

jest.mock("axios");

describe("Run demo under mocked response", (): void => {
  test("Should do not have any result as Null when the status code from XHR for data not found is 200", async () => {
    type Response = {
      status: number;
      data: string;
    };
    (axios.get as jest.Mock<Promise<Response>>).mockResolvedValueOnce({
      status: 200,
      data: "<html></html>",
    });

    const result: DetailType[] | null = await booksComTwCollection("");
    expect(result).toBeNull();
  });
});
