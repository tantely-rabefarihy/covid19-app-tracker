import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { WorldDataContext } from "./WorldDataContext";
import { displayCountryNum } from "../helpers/MapHelpers";

function GoToPosition() {
  const { coordinates, zoomScale, country } = useContext(WorldDataContext);
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, zoomScale);
  }, [country, coordinates, zoomScale, map]);
  return null;
}

const WorldMap = ({ data }) => {
  const currentPosition = [45.508888, -73.561668];
  const defaultScaling = 2;

  return (
    <Mapping>
      <MapContainer
        style={{ height: "100%", borderRadius: "5px" }}
        center={currentPosition}
        zoom={defaultScaling}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentPosition}>
          <Popup>This is my home.</Popup>
        </Marker>
        <GoToPosition />
        {data && displayCountryNum(data)}
      </MapContainer>
    </Mapping>
  );
};

const Mapping = styled.div`
  height: 100%;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 8px;
`;

export default WorldMap;
