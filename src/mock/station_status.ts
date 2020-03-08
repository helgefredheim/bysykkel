import { Stasjonsstatus } from "../types/types";

const stationStatus: Stasjonsstatus = {
  last_updated: 1583516575,
  ttl: 10,
  data: {
    stations: [
      {
        station_id: "1755",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 33
      },
      {
        station_id: "1023",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 12
      },
      {
        station_id: "1009",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 10
      },
      {
        station_id: "1101",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 24
      }
    ]
  }
};

export default stationStatus;
