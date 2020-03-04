import {
  BeriketStasjon,
  Stasjon,
  Stasjoner,
  StasjonsstatusElement,
  StasjonsstatusElementliste
} from "../types/types";

type StatusMap = Record<string, StasjonsstatusElement>;

const berikStasjoner = (
  stasjoner: Stasjoner,
  stasjonsstatusliste: StasjonsstatusElementliste
): BeriketStasjon[] => {
  const statusMap: StatusMap = stasjonsstatusliste.reduce(
    (acc: StatusMap, cur: StasjonsstatusElement) => {
      acc[cur.station_id] = cur;
      return acc;
    },
    {}
  );

  return stasjoner.map(
    (stasjon: Stasjon): BeriketStasjon => {
      return {
        ...stasjon,
        status: statusMap[stasjon.station_id]
      };
    }
  );
};

export default berikStasjoner;
