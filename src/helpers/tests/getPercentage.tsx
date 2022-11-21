import { getPercentage } from "../helpers";

describe("getPercentage", () => {
  test.each([
  {value: 10, max: 100, expected: 10 },
  {value: 89, max: 568, expected: 16 },
  ])(
    "adjust the range data to normalise on zero",
    ({ value, max, expected }) => {
      expect(getPercentage(value, max)).toEqual(
        expected
      );
    }
  );
});
