import React from "react";

interface AssetsProps {}

const assets = ["boulder", "flower", "pond", "stall", "tree"];

const Assets: React.FunctionComponent<AssetsProps> = () => {
  return (
    <a-assets>
      {assets.map((asset) => (
        <a-asset-item
          key={asset}
          id={asset}
          src={`assets/${asset}/model.gltf`}
        ></a-asset-item>
      ))}

      <a-mixin
        id="wheel"
        geometry="primitive: cylinder; height: 0.1; radius: 0.05"
        material="color: black"
      ></a-mixin>

      <a-mixin
        id="eye"
        geometry="primitive: cylinder; height: 0.1; radius: 0.075"
        material="color: white"
        rotation="90 0 0"
      ></a-mixin>
    </a-assets>
  );
};

export default Assets;
