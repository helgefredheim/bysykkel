import { STASJONSINFORMASJON_URL, STASJONSSTATUS_URL } from "../config";
import apiHeaders from "./api-headers";

const init = { headers: apiHeaders };

export const hentStasjoner = () => {
  return fetch(STASJONSINFORMASJON_URL, init).then(res => res.json());
};

export const hentStasjonsstatus = () => {
  return fetch(STASJONSSTATUS_URL, init).then(res => res.json());
};

export const hentStasjonsdata = () => {
  return Promise.all([hentStasjonsstatus(), hentStasjoner()]);
};
