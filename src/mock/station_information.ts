import { Stasjonsinformasjon } from "../types/types";

const stationInformation: Stasjonsinformasjon = {
  last_updated: 1583516593,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: "1755",
        name: "Aker Brygge",
        address: "Aker Brygge",
        lat: 59.91118372188379,
        lon: 10.730034556850455,
        capacity: 33
      },
      {
        station_id: "1101",
        name: "Stortingstunellen",
        address: "R\u00e5dhusgata 34",
        lat: 59.91065301806209,
        lon: 10.737365277561025,
        capacity: 24
      },
      {
        station_id: "1023",
        name: "Professor Aschehougs plass",
        address: "Professor Aschehougs plass",
        lat: 59.9147672,
        lon: 10.740971,
        capacity: 12
      },
      {
        station_id: "1009",
        name: "Borgenveien",
        address: "Slemsdalsveien 70B",
        lat: 59.942742106473666,
        lon: 10.703833031254021,
        capacity: 10
      }
    ]
  }
};

export default stationInformation;
