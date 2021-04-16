import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import styled from "styled-components";


function Pickup({ panTo, setFocus }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 45.421, lng: () => -75.697 },
      radius: 50 * 1000,
    },
  });

  return (
    <StyledCombobox>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            console.log(lat, lng);
            panTo({ lat, lng }, 'pickup');
          } catch (error) {
            console.log(error);
          }
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Pickup address"
          onFocus={() => setFocus("pickup")}
          onBlur={() => setFocus("")}
        />
          <div className="compo">
        <ComboboxPopover>
            <ComboboxList className="compo">
                {status === "OK" &&
                data.map(({ id, description }) => (
                    <ComboboxOption key={description} value={description} />
                ))}
            </ComboboxList>
        </ComboboxPopover>
          </div>
      </Combobox>
    </StyledCombobox>
  );
}

const StyledCombobox = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%
  max-width: 400px;
  z-index: 10;

  input {
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 100%;
  }

  compo {
    background-color: white;
  }

  h1 {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: #281414;
    z-index: 10;
    margin: 0;
    padding: 0;
  }
`;

export default Pickup;
