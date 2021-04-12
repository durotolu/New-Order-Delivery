import './App.css';
import WrappedMap from "./Components/Map";
import styled from 'styled-components';

const libraries = ["places"];
// const mapContainerStyle = {
//   width: "100vw",
//   height: "100vh",
// }

function App() {
  // const {isLoaded, loadError} = useLoadScript({
  //   googleMapsApiKey: ProcessingInstruction.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries
  // })

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps"

  return (
    <StyledWrappedMap className="App">
      <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
        loadingElement={<StyledWrappedMap style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </StyledWrappedMap>
  );
}

const StyledWrappedMap = styled.div`
  width: 100vw;
  height: 100vh;
`

export default App;
