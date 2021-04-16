import React, { useEffect, useState } from "react";
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
  const [fieldLocation, setFieldLocation] = useState("");

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  const panTo = ({ lat, lng }, field) => {
    if (field === 'pickup') {
      console.log(field)
      setPickup({ lat, lng })
      setFieldLocation(field)
    }
    if (field === 'dropoff') {
      console.log(field)
      setDropoff({ lat, lng })
      setFieldLocation(field)
    }
  };

  useEffect(() => {
    if (pickup && dropoff) {
      let lat1 = pickup.lat
      let lat2 = pickup.lng
      let lng1 = dropoff.lat
      let lng2 = dropoff.lng

      var dLng = (lng2 - lng1)
      dLng = (dLng * Math.PI) / 180
      //-- Convert to radians
      lat1 = (lat1 * Math.PI) / 180
      lat2 = (lat2 * Math.PI) / 180
      lng1 = (lng1 * Math.PI) / 180

      var bX = Math.cos(lat2) * Math.cos(dLng);
      var bY = Math.cos(lat2) * Math.sin(dLng);
      var lat3 = Math.atan2(
        Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY)
      );
      var lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);

      //-- Return result
      let lng = lng3 * (180 / Math.PI);
      let lat = lat3 * (180 / Math.PI);

      let midPoint = {
        lat,
        lng
      }

      setCenter(midPoint)

    } else {
      if (fieldLocation === 'pickup') {
        setCenter(pickup)
      }
      if (fieldLocation === 'dropoff') {
        setCenter(dropoff)
      }
    }
  }, [pickup, dropoff, fieldLocation])

  return (
    <StyledHMap>
      <StyledHeader>
        {focus === "dropoff" ? null : (
          <Pickup panTo={panTo} setFocus={setFocus} setPickup={setPickup} pickup={pickup} />
        )}
        {focus === "pickup" ? null : (
          <Dropoff panTo={panTo} setFocus={setFocus} />
        )}
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
`;

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
