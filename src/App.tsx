import React, { useEffect, useState } from "react";
import { hentStasjoner } from "./api/stasjoner-api";
import Stasjonstabell from "./components/stasjonstabell/stasjonstabell";
import { Stasjoner, Stasjonsinformasjon } from "./types/types";
import Feilstripe from "./components/feilstripe/feilstripe";
import Loader from "./components/loader/loader";

function App() {
  const [henter, setHenter] = useState<boolean>(true);
  const [stasjoner, setStasjoner] = useState<Stasjoner>([]);
  const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
  useEffect(() => {
    hentStasjoner()
      .then((respons: Stasjonsinformasjon) => {
        setHenter(false);
        setStasjoner(respons.data.stations);
      })
      .catch(err => {
        console.error(
          "Det oppstod en feil under henting av bysykkel-stativer",
          err
        );
        setFeilmelding(
          "Det oppstod en feil under henting av bysykkel-stativer"
        );
      });
  });
  return (
    <div className="App">
      <h1 id="stativer-tittel">Bysykkel-stativer i Oslo</h1>
      {henter ? (
        <Loader />
      ) : feilmelding ? (
        <Feilstripe>
          <p>{feilmelding}</p>
        </Feilstripe>
      ) : (
        <Stasjonstabell stasjoner={stasjoner} />
      )}
    </div>
  );
}

export default App;
