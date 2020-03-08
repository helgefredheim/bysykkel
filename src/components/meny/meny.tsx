import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./meny.css";

const MenyLenke: FunctionComponent<{ to: string; aktiv: boolean }> = ({
  to,
  children,
  aktiv
}) => {
  return (
    <Link
      to={to}
      className={cn("meny__lenke", { "meny__lenke--aktiv": aktiv })}
    >
      {children}
    </Link>
  );
};

const Meny: FunctionComponent<RouteComponentProps> = props => {
  const { location } = props;
  return (
    <div className="meny" role="navigation">
      <MenyLenke to="/" aktiv={location.pathname === "/"}>
        Tabell
      </MenyLenke>
      <MenyLenke to="/kart" aktiv={location.pathname === "/kart"}>
        Kart
      </MenyLenke>
    </div>
  );
};

export default withRouter(Meny);
