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
      <Scene
        world-tracking-hack
        ar="worldSensing: true"
        raycaster-move="target:#mark"
      >
        <Assets />

        <Entity
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

        {/* <Entity
          position="0 -1 0"
          scale="0.05 0.05 0.05"
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></Entity> */}

        <a-camera>
          <a-text
            id="hud"
            align="center"
            wrap-count="800"
            position="0 -0.1 -0.25"
            value="heads up"
          ></a-text>
        </a-camera>
      </Scene>
    </>
  );
};

export default App;
