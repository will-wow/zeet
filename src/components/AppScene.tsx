import React, { useState } from "react";
import { Scene, Entity } from "aframe-react";
import { createGlobalStyle } from "styled-components";

import { renderData } from "lib/entity";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

interface AssetLocation {
  asset: string;
  lat: number;
  long: number;
}

const locations: AssetLocation[] = [
  {
    asset: "tree",
    lat: "",
    long: "",
  },
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
        {locations.map((location) => (
          <a-entity
            key={location}
            gltf-model={`#${location.asset}`}
            gps-projected-entity-place={renderData({
              latitude: location.lat,
              longitude: location.long,
            })}
          ></a-entity>
        ))}

        {position && (
          <Entity
            gps-projected-entity-place={renderData({
              latitude: position.latitude,
              longitude: position.longitude,
            })}
          >
            <Entity
              geometry={{
                primitive: "box",
                height: 0.2,
                width: 0.2,
                depth: 0.2,
              }}
              material="color: red"
              position="0 0.25 -3"
            />

            <Entity
              text={{
                value: `Lat: ${position.latitude}, Long: ${position.longitude}`,
              }}
              lookAt="[gps-camera]"
              position="1 0.25 -3"
            />
          </Entity>
        )}

        <a-camera
          className="camera"
          gps-projected-camera={renderData({
            simulateLatitude: 34.05148,
            simulateLongitude: -118.44542,
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
