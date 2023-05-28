import { DetailType } from "../index";
import booksComTwCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  test(
    "Should get one result as Array",
    async () => {
      const result: DetailType[] | null = await booksComTwCollection("快速上手LINUX的九堂課");

      expect(result).toBeInstanceOf(Array);
      expect((result as DetailType[]).length).toBe(1);
    },
    timeout,
  );

  test(
    "Should get results as Array and no more than 24",
    async () => {
      const result: DetailType[] | null = await booksComTwCollection("春夏秋冬");

      expect(result).toBeInstanceOf(Array);
      expect((result as DetailType[]).length).toBeLessThanOrEqual(24);
    },
    timeout,
  );

  test(
    "Should do not have any result as Null when the status code from XHR for data not found is 404",
    async () => {
      const result: DetailType[] | null = await booksComTwCollection(
        "blablablablablablablablablablablabla",
      );

      expect(result).toBeNull();
    },
    timeout,
  );
});
