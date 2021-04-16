import styled from "styled-components";

function Locate({ panTo }) {
  return (
    <StyledButton
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.log(error)
        );
      }}
    >
      <img
        src="https://freesvg.org/img/CompassRose.png"
        alt="compass locate me"
      />
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  z-index: 10;
  height: 50px;
  width: 50px;
  cursor: pointer;
  outline: none;

  img {
    width: 100%;
  }
`;

export default Locate;