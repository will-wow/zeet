import React, { useState } from "react";
import { Scene, Entity } from "aframe-react";
import { createGlobalStyle } from "styled-components";

import { renderData } from "lib/entity";
import Assets from "./Assets";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

interface AssetLocation {
  asset: string;
  latLong: string;
}

const locations: AssetLocation[] = [
  { asset: "tree", latLong: "34.051257, -118.445527" },
  { asset: "tree", latLong: "34.051364, -118.445611" },
  { asset: "tree", latLong: "34.051387, -118.445581" },
  { asset: "tree", latLong: "34.051470, -118.445717" },
  { asset: "tree", latLong: "34.051498, -118.445672" },
  // { asset: "pond", latLong: "34.051431, -118.445647" },
];

const AppScene: React.FunctionComponent = () => {
  const position = usePosition();

  console.log(position);

  return (
    <>
      <GlobalStyle />
      <Scene
        vr-mode-ui={{ enabled: false }}
        embedded=""
        arjs={renderData({
          sourceType: "webcam",
          debugUIEnabled: false,
        })}
      >
        <Assets />

        {locations.map((location) => {
          const [lat, long] = location.latLong.split(", ");
          return (
            <Entity
              key={location.latLong}
              // gltf-model={`#${location.asset}`}
              geometry="primitive: box; height: 10; width: 0.3; depth: 0.3"
              material="color: brown"
              gps-projected-entity-place={`latitude: ${lat}; longitude: ${long}`}
            ></Entity>
          );
        })}

        <a-camera
          className="camera"
          gps-projected-camera={renderData({
            // simulateLatitude: 34.05148,
            // simulateLongitude: -118.44542,
          })}
          rotation-reader=""
        ></a-camera>
      </Scene>
    </>
  );
};

export default AppScene;

const usePosition = (): Coordinates | null => {
  const [position, setPosition] = useState<Coordinates | null>(null);

  React.useEffect(() => {
    // const id = navigator.geolocation.watchPosition((position) =>
    navigator.geolocation.getCurrentPosition((position) =>
      setPosition(position.coords)
    );

    // return () => navigator.geolocation.clearWatch(id);
  }, []);

  return position;
};
