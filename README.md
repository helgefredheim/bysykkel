# Bysykkel

Dette prosjektet ble startet opp med [Create React App](https://github.com/facebook/create-react-app).

## Kjøre lokalt

Du må ha `node >= 10.13.0` installert. 

Kjør følgende fra prosjektroten for å kjøre prosjektet lokalt

```
npm install
npm start
```

Åpne [http://localhost:3000](http://localhost:3000) for å vise i nettleseren.

## Google Maps API-key

For å kunne se kart, sett inn din google maps api-key i `GOOGLE_MAPS_API_KEY` i `src/config/config.ts`

--

Applikasjonen kan foreløpig kun kjøres lokalt, da det mangler en proxy for å kunne hente bysykkel-stasjoner uten å bli stoppet av CORS-begrensninger.
