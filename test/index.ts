import { DetailType } from "../index";
import booksComTwCollection from "../src/index";

const timeout = 60 * 1000;

describe("Run demo", (): void => {
  it(
    "Should get one result as Array",
    async (): Promise<void> => {
      const result: DetailType[] | null = await booksComTwCollection("快速上手LINUX的九堂課");

      expect(result).toBeInstanceOf(Array);
      expect((result as DetailType[]).length).toBe(1);
    },
    timeout,
  );

  it(
    "Should get results as Array and no more than 24",
    async (): Promise<void> => {
      const result: DetailType[] | null = await booksComTwCollection("春夏秋冬");

      expect(result).toBeInstanceOf(Array);
      expect((result as DetailType[]).length).toBeLessThanOrEqual(24);
    },
    timeout,
  );

  it(
    "Should do not have any result as Null",
    async (): Promise<void> => {
      const result: DetailType[] | null = await booksComTwCollection(
        "blablablablablablablablablablablabla",
      );

      expect(result).toBeNull();
    },
    timeout,
  );
});
