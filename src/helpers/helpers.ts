import { GaugeData } from "../types";

export const validateGaugeData = (data: GaugeData) => {
  return (
    data.value >= data.min && data.value <= data.max && data.min < data.max
  );
};

export const normaliseGaugeRangeData = (data: GaugeData) => {
  const newValues = {
    min: data.min - data.min,
    max: data.max - data.min,
    value: data.value - data.min,
  };
  return { ...data, ...newValues };
};

export const getPercentage = (value: number, max: number) => {
  return Math.round((value / max) * 100);
};

export const getAngleFromPercentage = (percentage: number) => 1.8 * percentage;

export const getGaugeAngle = ({ max, min, value }: GaugeData) => {
  const normalisedValues = normaliseGaugeRangeData({ max, min, value });
  const valuePer = getPercentage(normalisedValues.value, normalisedValues.max);
  return getAngleFromPercentage(valuePer);
};
