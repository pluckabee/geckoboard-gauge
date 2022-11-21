import { CurrencyCode } from "../../currencies";
import { normaliseGaugeRangeData } from "../helpers";
import { GaugeData } from "../../types";

describe("normaliseGaugeRangeData", () => {
  test.each([
    {
      validInput: { min: 0, value: 10, max: 100 },
      expectedOutput: { min: 0, value: 10, max: 100 },
    },
    {
      validInput: { min: 10, value: 20, max: 110 },
      expectedOutput: { min: 0, value: 10, max: 100 },
    },
    {
      validInput: {
        min: 50,
        value: 60,
        max: 110,
        format: "currency",
        unit: CurrencyCode.GBP,
      },
      expectedOutput: {
        min: 0,
        value: 10,
        max: 60,
        format: "currency",
        unit: CurrencyCode.GBP,
      },
    },
  ])(
    "adjust the range data to normalise on zero",
    ({ validInput, expectedOutput }) => {
      expect(normaliseGaugeRangeData(validInput as GaugeData)).toEqual(
        expectedOutput
      );
    }
  );
});
