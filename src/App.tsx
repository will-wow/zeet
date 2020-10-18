import React from "react";
import { Scene, Entity } from "aframe-react";
import { createGlobalStyle } from "styled-components";

import Assets from "./components/Assets";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

const App: React.FunctionComponent = () => {
  return (
    <>
      <GlobalStyle />
      <video
        id="video"
        autoPlay
        muted
        playsInline
        style={{ position: "fixed", zIndex: -1 }}
      />
      <Scene
        world-tracking-hack
        ar="worldSensing: true"
        raycaster-move="target:#mark"
        place-on-click="mark: #mark; object: #object; shadowPlane: #shadow-plane; camera: #camera"
        face-api="object: #object; hud: #hud"
      >
        <Assets />

        <Entity
          id="raycaster"
          ar-raycaster=""
          raycaster="objects: none"
          mark-mover="mark: #mark"
        />

        <a-ring
          id="mark"
          rotation="-90 0 0"
          radius-inner="0.01"
          radius-outer="0.02"
        ></a-ring>

        <Entity
          id="object"
          position="0 0 -2"
          gltf-model="#zeet"
          animation-mixer="clip: Idle; crossFadeDuration: 0.1"
          shadow="receive: false; cast: true"
          visible="false"
        />

        <Entity
          id="shadow-plane"
          geometry="primitive: plane; height: 1; width: 1"
          rotation="-90 0 0"
          shadow="receive: true; cast: false"
          ar-shadows="opacity: 0.3"
          visible="false"
        />

        <Entity id="ambient-light" light="type: ambient; intensity: 0.5;" />

        <a-light
          id="directional-light"
          type="directional"
          light="castShadow: true;
                 shadowMapHeight: 1024;
                 shadowMapWidth: 1024;
                 shadowCameraLeft: -7;
                 shadowCameraRight: 5;
                 shadowCameraBottom: -5;
                 shadowCameraTop: 5;"
          target="dino"
          position="-5 3 1.5"
        />

        <Entity
          id="environment"
          environment="preset: forest; lighting: none; shadow: none; lightPosition: 0 2.15 0"
          hide-in-ar-mode
        />

        <a-camera id="camera">
          <a-text
            id="hud"
            align="center"
            wrap-count="800"
            position="0 -0.1 -0.25"
            value="loading..."
          ></a-text>
        </a-camera>
      </Scene>
    </>
  );
};

export default App;
