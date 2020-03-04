import React, { FunctionComponent, useState } from "react";
import classnames from "classnames";
import { Stasjon, Stasjoner } from "../../types/types";
import "./stasjonstabell.css";
import Feilstripe from "../feilstripe/feilstripe";

type onClick = () => void;

enum Sorteringsfelt {
  ANTALL = "antall",
  STASJON = "stasjon"
}

const Sorteringsknapp: FunctionComponent<{
  onClick: onClick;
  aktiv: boolean;
}> = props => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={classnames("stasjonstabell__sorter", {
        "stasjonstabell__sorter--aktiv": props.aktiv
      })}
    >
      {props.children}
    </button>
  );
};

const Stasjonstabell: FunctionComponent<{ stasjoner: Stasjoner }> = props => {
  const [sorteringsfelt, setSorteringsfelt] = useState<Sorteringsfelt>(
    Sorteringsfelt.STASJON
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

  const sorterStasjoner = (a: Stasjon, b: Stasjon) => {
    if (sorteringsfelt === Sorteringsfelt.STASJON) {
      if (a.address > b.address) {
        return asc ? 1 : -1;
      } else {
        return asc ? -1 : 1;
      }
    } else {
      if (a.capacity > b.capacity) {
        return asc ? 1 : -1;
      } else return asc ? -1 : 1;
    }
  };

  return props.stasjoner.length > 0 ? (
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
          <th
            className="stasjonstabell__th"
            aria-sort={getAriaSort(Sorteringsfelt.STASJON)}
          >
            <Sorteringsknapp
              aktiv={sorteringsfelt === Sorteringsfelt.STASJON}
              onClick={getOnClick(Sorteringsfelt.STASJON)}
            >
              Stativ
            </Sorteringsknapp>
          </th>
          <th
            className="stasjonstabell__th"
            aria-sort={getAriaSort(Sorteringsfelt.ANTALL)}
          >
            <Sorteringsknapp
              aktiv={sorteringsfelt === Sorteringsfelt.ANTALL}
              onClick={getOnClick(Sorteringsfelt.ANTALL)}
            >
              Tilgjengelige sykler
            </Sorteringsknapp>
          </th>
        </tr>
      </thead>
      <tbody className="stasjonstabell__tbody">
        {props.stasjoner.sort(sorterStasjoner).map((stasjon: Stasjon) => {
          return (
            <tr key={stasjon.station_id}>
              <th>{stasjon.address}</th>
              <td>{stasjon.capacity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Stasjonstabell;
