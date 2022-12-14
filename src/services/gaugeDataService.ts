import axios from "axios";
import { GaugeDataResponse } from '../types/GaugeDataTypes'
import { validateGaugeData } from "../helpers/helpers";
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