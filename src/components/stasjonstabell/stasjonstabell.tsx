import React, { FunctionComponent, useState } from "react";
import { BeriketStasjon } from "../../types/types";
import "./stasjonstabell.css";
import Feilstripe from "../feilstripe/feilstripe";
import Sorteringsknapp from "./sorteringsknapp";
import Tekster from "../../tekster";

export type onClick = () => void;

const hentGoogleMapsUrl = (lat: number, lng: number): string => {
  return `https://maps.google.com/?q=${lat},${lng}`;
};

enum Sorteringsfelt {
  ANTALL_LEDIGE_LAASER = "ANTALL_LEDIGE_LAASER",
  ANTALL_LEDIGE_SYKLER = "ANTALL_LEDIGE_SYKLER",
  STASJONSNAVN = "STASJONSNAVN"
}

const hentSorterStasjoner = (sorteringsfelt: Sorteringsfelt, asc: boolean) => {
  const sorteringsfunksjoner = {
    [Sorteringsfelt.ANTALL_LEDIGE_LAASER]: (
      a: BeriketStasjon,
      b: BeriketStasjon
    ) => {
      return asc
        ? a.status.num_docks_available - b.status.num_docks_available
        : b.status.num_docks_available - a.status.num_docks_available;
    },
    [Sorteringsfelt.ANTALL_LEDIGE_SYKLER]: (
      a: BeriketStasjon,
      b: BeriketStasjon
    ) => {
      return asc
        ? a.status.num_bikes_available - b.status.num_bikes_available
        : b.status.num_bikes_available - a.status.num_bikes_available;
    },
    [Sorteringsfelt.STASJONSNAVN]: (a: BeriketStasjon, b: BeriketStasjon) => {
      if (a.name > b.name) {
        return asc ? 1 : -1;
      } else {
        return asc ? -1 : 1;
      }
    }
  };

  return sorteringsfunksjoner[sorteringsfelt];
};

const Stasjonstabell: FunctionComponent<{
  stasjoner: BeriketStasjon[];
}> = props => {
  const [sorteringsfelt, setSorteringsfelt] = useState<Sorteringsfelt>(
    Sorteringsfelt.STASJONSNAVN
  );
  const [asc, setAsc] = useState<boolean>(true);

  const getAriaSort = (
    sorteringsarg: Sorteringsfelt
  ): "ascending" | "descending" | undefined => {
    return sorteringsfelt === sorteringsarg
      ? asc
        ? "ascending"
        : "descending"
      : undefined;
  };

  const getOnClick = (felt: Sorteringsfelt): onClick => {
    return () => {
      setSorteringsfelt(felt);
      setAsc(!asc);
    };
  };

  const Th: FunctionComponent<{ felt: Sorteringsfelt }> = ({
    felt,
    children
  }) => {
    return (
      <th className="stasjonstabell__th" aria-sort={getAriaSort(felt)}>
        <Sorteringsknapp
          className={`js-sorter-${felt.toLowerCase()}`}
          aktiv={sorteringsfelt === felt}
          onClick={getOnClick(felt)}
        >
          {children}
        </Sorteringsknapp>
      </th>
    );
  };

  return props.stasjoner.length === 0 ? (
    <Feilstripe>
      <p>{Tekster.INGEN_BYSYKLER_MELDING}</p>
    </Feilstripe>
  ) : (
    <table
      className="stasjonstabell"
      cellPadding="0"
      cellSpacing="0"
      aria-labelledby="stativer-tittel"
    >
      <thead>
        <tr>
          <Th felt={Sorteringsfelt.STASJONSNAVN}>Stativ</Th>
          <Th felt={Sorteringsfelt.ANTALL_LEDIGE_LAASER}>Ledige låser</Th>
          <Th felt={Sorteringsfelt.ANTALL_LEDIGE_SYKLER}>Ledige sykler</Th>
        </tr>
      </thead>
      <tbody className="stasjonstabell__tbody">
        {props.stasjoner
          .sort(hentSorterStasjoner(sorteringsfelt, asc))
          .map((stasjon: BeriketStasjon) => {
            return (
              <tr
                key={stasjon.station_id}
                className="stasjonstabell__tr js-stasjonstabell__tr"
              >
                <th>
                  <a
                    className="lenke"
                    title="Se stativet på kart"
                    href={hentGoogleMapsUrl(stasjon.lat, stasjon.lon)}
                  >
                    {stasjon.name}
                  </a>
                </th>
                <td>{stasjon.status.num_docks_available}</td>
                <td>{stasjon.status.num_bikes_available}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Stasjonstabell;
