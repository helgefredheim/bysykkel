import React, { FunctionComponent, useState } from "react";
import { BeriketStasjon } from "../../types/types";
import "./stasjonstabell.css";
import Feilstripe from "../feilstripe/feilstripe";
import Sorteringsknapp from "./sorteringsknapp";

export type onClick = () => void;

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
      if (a.address > b.address) {
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
      <p>Vi fant ingen bysykkelstativer</p>
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
              <tr key={stasjon.station_id}>
                <th>{stasjon.address}</th>
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
