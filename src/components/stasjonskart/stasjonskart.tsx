import React, { FunctionComponent } from "react";
import { renderToString } from "react-dom/server";
import { Loader } from "google-maps";
import MarkerClusterer from "@google/markerclustererplus";
import { BeriketStasjon } from "../../types/types";
import { GOOGLE_MAPS_API_KEY } from "../../config/config";
import "./stasjonskart.css";
import Stasjonsinfo from "./stasjonsinfo";
import Container from "../container/Container";

const STORTINGET_LAT_LNG = { lat: 59.913256, lng: 10.739784 };

const rendreKart = (stasjoner: BeriketStasjon[], google: any) => {
  const map = new google.maps.Map(document.getElementById("kart"), {
    center: STORTINGET_LAT_LNG,
    zoom: 11
  });
  const markers = stasjoner.map((stasjon: BeriketStasjon) => {
    const marker = new google.maps.Marker({
      position: { lat: stasjon.lat, lng: stasjon.lon },
      title: stasjon.name
    });
    const content = renderToString(<Stasjonsinfo stasjon={stasjon} />);
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    return marker;
  });
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });
};

const Stasjonskart: FunctionComponent<{ stasjoner: BeriketStasjon[] }> = ({
  stasjoner
}) => {
  const loader = new Loader(GOOGLE_MAPS_API_KEY);
  loader.load().then(google => {
    rendreKart(stasjoner, google);
  });
  return (
    <Container>
      <div id="kart" className="stasjonskart" />
    </Container>
  );
};

export default Stasjonskart;
