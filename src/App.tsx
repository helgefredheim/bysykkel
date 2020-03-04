import React, { useEffect, useState } from "react";
import { hentStasjonsdata } from "./api/stasjoner-api";
import Stasjonstabell from "./components/stasjonstabell/stasjonstabell";
import {
  Stasjoner,
  Stasjonsinformasjon,
  Stasjonsstatus,
  StasjonsstatusElementliste
} from "./types/types";
import Feilstripe from "./components/feilstripe/feilstripe";
import Loader from "./components/loader/loader";
import berikStasjoner from "./utils/berikStasjoner";

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

  return (
    <div className="app">
      <h1 id="stativer-tittel">Bysykler i Oslo</h1>
      {henter ? (
        <Loader />
      ) : feilmelding ? (
        <Feilstripe>
          <p>{feilmelding}</p>
        </Feilstripe>
      ) : (
        <Stasjonstabell
          stasjoner={berikStasjoner(stasjoner, stasjonsstatusliste)}
        />
      )}
    </div>
  );
}

export default App;
