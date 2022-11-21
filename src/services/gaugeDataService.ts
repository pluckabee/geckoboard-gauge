import axios from "axios";
import { GaugeDataResponse } from '../types'
import { validateGaugeData } from "./gaugeDataValidator";
export const fetchGaugeData = () => {
  return axios
  .get<GaugeDataResponse>("https://widgister.herokuapp.com/challenge/frontend").then((response) => {
      if(response.data.error) {
        throw new Error(response.data.error);
      }
      const valid = validateGaugeData(response.data)

      if(!valid) {
          throw new Error("Invalid values");
      }
      return response.data
  })
}