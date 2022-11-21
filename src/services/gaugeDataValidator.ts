import { GaugeData } from "../types";
export const validateGaugeData = (data: GaugeData) => {
  return (
    data.value >= data.min && data.value <= data.max && data.min < data.max
  );
};
