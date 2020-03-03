import React, {useEffect, useState} from 'react';
import './App.css';
import {hentStasjoner} from "./api/stasjoner-api";
import Stasjontabell from "./components/stasjon-tabell";
import {Stasjoner, Stasjonsinformasjon} from "./types/types";

function App() {
  const [stasjoner, setStasjoner] = useState<Stasjoner>([]);
  const [feilmelding, setFeilmelding] = useState<string | undefined>(undefined);
  useEffect(() => {
    hentStasjoner()
        .then((respons: Stasjonsinformasjon) => {
          setStasjoner(respons.data.stations);
        }).catch((err) => {
          console.error("Det oppstod en feil under henting av bysykkel-stativer", err);
          setFeilmelding("Det oppstod en feil under henting av bysykkel-stativer");
        })
  });
  return (
    <div className="App">
      <h1>Bysykler</h1>
        {
          feilmelding ? <p>{feilmelding}</p> : <Stasjontabell stasjoner={stasjoner} />
        }
    </div>
  );
}

export default App;
