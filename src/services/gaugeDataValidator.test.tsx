import { validateGaugeData } from "./gaugeDataValidator";

describe("gaugeDataValidator", () => {
    test.each([
        { min: 100, value: 2, max: 10 },
        { min: 100, value: 110, max: 10 },
      ])("should be invalid if max is lower than min value", (values) => {
        expect(validateGaugeData(values)).toBe(false);
      });

    test.each([
      { min: 10, value: 110, max: 100 },
      { min: 10, value: 1, max: 100 },
      { min: 10, value: 10, max: 10 },
    ])("should be invalid if value does not sit between the min/max range", (values) => {
      expect(validateGaugeData(values)).toBe(false);
    });

    test.each([
        { min: 0, value: 50, max: 100 },
        { min: 10, value: 150, max: 150 },
        { min: 10, value: 10, max: 150 },

      ])("should validate when value is within min/max values", (values) => {
        expect(validateGaugeData(values)).toBe(true);
      });
});
