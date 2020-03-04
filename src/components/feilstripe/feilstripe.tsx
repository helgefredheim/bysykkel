import React, { FunctionComponent } from "react";
import "./feilstripe.css";

const Feilstripe: FunctionComponent = props => {
  return (
    <div className="feilstripe" role="alert" aria-live="polite">
      <div className="feilstripe__ikon" aria-hidden="true">
        <span className="ikon">!</span>
      </div>
      <div className="feilstripe__melding">{props.children}</div>
    </div>
  );
};

export default Feilstripe;
