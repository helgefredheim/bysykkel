import React, { FunctionComponent } from "react";
import { BeriketStasjon } from "../../types/types";
import "./stasjonsinfo.css";

const Stasjonsinfo: FunctionComponent<{ stasjon: BeriketStasjon }> = ({
  stasjon
}) => {
  return (
    <div className="stasjonsinfo">
      <h3 className="stasjonsinfo__tittel">{stasjon.name}</h3>
      {stasjon.name.toUpperCase().trim() !==
      stasjon.address.toUpperCase().trim() ? (
        <p className="stasjonsinfo__adresse">{stasjon.address}</p>
      ) : null}
      {stasjon.status ? (
        <div className="stasjonsinfo__status">
          <p className="stasjonsinfo__statusdetalj">
            <strong>Ledige sykler: </strong>
            {stasjon.status.num_bikes_available}
          </p>
          <p className="stasjonsinfo__statusdetalj">
            <strong>Ledige plasser: </strong>
            {stasjon.status.num_docks_available}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Stasjonsinfo;
