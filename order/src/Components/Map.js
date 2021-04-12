import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

const center = {
    lat: 45.421,
    lng: -75.697
}
const zoom = 10

function Map() {
  return (
    <GoogleMap 
        defaultZoom={zoom} 
        defaultCenter={center}
    >
        <Marker position={center} />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;