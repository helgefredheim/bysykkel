import React, {useEffect, useState} from 'react';
import './styles/App.css';
import {hentStasjoner} from "./api/stasjoner-api";
import Stasjonstabell from "./components/stasjonstabell/stasjonstabell";
import {Stasjoner, Stasjonsinformasjon} from "./types/types";
import Feilstripe from './components/feilstripe/feilstripe';

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
      <h1>Bysykler i Oslo</h1>
      {feilmelding ? <Feilstripe><p>{feilmelding}</p></Feilstripe> : <Stasjonstabell stasjoner={stasjoner}/>}
    </div>
  );
}

export default App;
