import React, { FunctionComponent } from "react";
import classnames from "classnames";
import { onClick } from "./stasjonstabell";

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

export default Sorteringsknapp;
