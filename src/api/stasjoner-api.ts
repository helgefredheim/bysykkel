import { STATIVER_URL } from "../config";
import apiHeaders from "./api-headers";

export const hentStasjoner = () => {
  return fetch(STATIVER_URL, { headers: apiHeaders }).then(res => res.json());
};
