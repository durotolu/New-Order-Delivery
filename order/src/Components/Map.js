import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import styled from "styled-components";
import "./Map.css";
import Locate from "./Locate";
import Pickup from "./Pickup";
import Dropoff from "./Dropoff";

const zoom = 10;

function Map() {
  const [center, setCenter] = useState({
    lat: 45.421,
    lng: -75.697,
  });
  const [focus, setFocus] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // function success(pos) {
  //   const latitude = parseFloat(pos.coords.latitude)
  //   const longitude = pos.coords.longitude
  //   console.log({ latitude, longitude})
  //   setCenter({ latitude, longitude})
  // }
  // navigator.geolocation.getCurrentPosition(success)

  const panTo = ({ lat, lng }) => {
    const locationPan = { lat, lng };

    // if (typeof Number.prototype.toRad === "undefined") {
    //   Number.prototype.toRad = function () {
    //     return (this * Math.PI) / 180;
    //   };
    // }

    // //-- Define degrees function
    // if (typeof Number.prototype.toDeg === "undefined") {
    //   Number.prototype.toDeg = function () {
    //     return this * (180 / Math.PI);
    //   };
    // }

    // //-- Define middle point function
    // function middlePoint(lat1, lng1, lat2, lng2) {
    //   //-- Longitude difference
    //   var dLng = (lng2 - lng1).toRad();

    //   //-- Convert to radians
    //   lat1 = lat1.toRad();
    //   lat2 = lat2.toRad();
    //   lng1 = lng1.toRad();

    //   var bX = Math.cos(lat2) * Math.cos(dLng);
    //   var bY = Math.cos(lat2) * Math.sin(dLng);
    //   var lat3 = Math.atan2(
    //     Math.sin(lat1) + Math.sin(lat2),
    //     Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
    //   );
    //   var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

    //   //-- Return result
    //   return [lng3.toDeg(), lat3.toDeg()];
    // }

    setCenter(locationPan);
  };

  return (
    <StyledHMap>
      <StyledHeader>
        {focus === "dropoff" ? null : <Pickup panTo={panTo} setFocus={setFocus} />}
        {focus === "pickup" ? null : <Dropoff panTo={panTo} setFocus={setFocus} />}
        <Locate panTo={panTo} />
      </StyledHeader>
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={center}
        center={center}
        options={options}
      >
        <Marker
          position={center}
          icon={{
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Size(0, 0),
            anchor: new window.google.maps.Size(15, 15),
          }}
        />
        <InfoWindow position={center}>
          <div>Your location</div>
        </InfoWindow>
      </GoogleMap>
    </StyledHMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const StyledHMap = styled.div`
  display: flex;
  justify-content: center;
`

const StyledHeader = styled.div`
  background-color: white;
  border: 2px solid blue;
  position: absolute;
  top: 0rem;
  // left: 50%;
  // transform: translateX(-50%);
  width: 95%;
  height: 170px;
  margin: 0 auto;
  // z-index: 10;
`;

export default WrappedMap;
