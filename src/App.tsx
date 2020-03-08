import React, { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hentStasjonsdata } from "./api/stasjoner-api";
import Stasjonstabell from "./components/stasjonstabell/stasjonstabell";
import {
  BeriketStasjon,
  Stasjoner,
  Stasjonsinformasjon,
  Stasjonsstatus,
  StasjonsstatusElementliste
} from "./types/types";
import Feilstripe from "./components/feilstripe/feilstripe";
import Loader from "./components/loader/loader";
import berikStasjoner from "./utils/berikStasjoner";
import Stasjonskart from "./components/stasjonskart/stasjonskart";
import Header from "./components/header/header";

const RendreComponent: FunctionComponent<{
  henter: boolean;
  stasjoner: BeriketStasjon[];
  Component: any;
}> = ({ henter, stasjoner, Component }) => {
  return henter ? <Loader /> : <Component stasjoner={stasjoner} />;
};

function App() {
  const [henter, setHenter] = useState<boolean>(true);
  const [stasjoner, setStasjoner] = useState<Stasjoner>([]);
  const [stasjonsstatusliste, setStasjonsstatusliste] = useState<
    StasjonsstatusElementliste
  >([]);
  const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
  useEffect(() => {
    hentStasjonsdata()
      .then(responser => {
        const stasjonsstatus: Stasjonsstatus = responser[0];
        const stasjonsinformasjon: Stasjonsinformasjon = responser[1];
        setStasjoner(stasjonsinformasjon.data.stations);
        setStasjonsstatusliste(stasjonsstatus.data.stations);
      })
      .catch(err => {
        console.error(
          "Det oppstod en feil under henting av bysykkel-stativer",
          err
        );
        setFeilmelding(
          "Det oppstod en feil under henting av bysykkel-stativer"
        );
      })
      .finally(() => {
        setHenter(false);
      });
  }, []);

  const props: any = {
    henter,
    stasjoner: berikStasjoner(stasjoner, stasjonsstatusliste)
  };

  const feilcomp = (
    <Feilstripe>
      <p>{feilmelding}</p>
    </Feilstripe>
  );

  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/kart">
            {feilmelding ? (
              feilcomp
            ) : (
              <RendreComponent Component={Stasjonskart} {...props} />
            )}
          </Route>
          <Route path="/">
            {feilmelding ? (
              feilcomp
            ) : (
              <RendreComponent Component={Stasjonstabell} {...props} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
