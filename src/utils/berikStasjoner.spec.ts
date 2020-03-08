import stationInformation from "../mock/station_information";
import stationStatus from "../mock/station_status";
import { BeriketStasjon } from "../types/types";
import berikStasjoner from "./berikStasjoner";

describe("berikStasjoner", () => {
  it("Skal berike stasjoner med stasjonsstatus", () => {
    const stasjoner = stationInformation.data.stations;
    const stasjonsstatusliste = stationStatus.data.stations;
    const berikedeStasjoner: BeriketStasjon[] = berikStasjoner(
      stasjoner,
      stasjonsstatusliste
    );

    expect(berikedeStasjoner[0]).toEqual({
      station_id: "1755",
      name: "Aker Brygge",
      address: "Aker Brygge",
      lat: 59.91118372188379,
      lon: 10.730034556850455,
      capacity: 33,
      status: {
        station_id: "1755",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 33
      }
    });

    expect(berikedeStasjoner[1]).toEqual({
      station_id: "1101",
      name: "Stortingstunellen",
      address: "R\u00e5dhusgata 34",
      lat: 59.91065301806209,
      lon: 10.737365277561025,
      capacity: 24,
      status: {
        station_id: "1101",
        is_installed: 1,
        is_renting: 1,
        is_returning: 1,
        last_reported: 1583516575,
        num_bikes_available: 0,
        num_docks_available: 24
      }
    });
  });

  it("Skal funke selv om en stasjon mangler stasjonsstatus", () => {
    const ID_STASJON_UTEN_STATUS: string = "1755";
    const stasjoner = stationInformation.data.stations;
    const stasjonsstatusliste = stationStatus.data.stations.filter(
      status => status.station_id !== ID_STASJON_UTEN_STATUS
    );
    const berikedeStasjoner: BeriketStasjon[] = berikStasjoner(
      stasjoner,
      stasjonsstatusliste
    );
    const beriketStasjonUtenStatus = berikedeStasjoner.find(
      (stasjon: BeriketStasjon) => stasjon.station_id === ID_STASJON_UTEN_STATUS
    ) as BeriketStasjon;
    expect(beriketStasjonUtenStatus.status).toEqual(null);
  });
});
