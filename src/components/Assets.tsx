import React from "react";

interface AssetsProps {}

const assets = ["boulder", "flower", "pond", "stall", "tree"];

const Assets: React.FunctionComponent<AssetsProps> = () => {
  return (
    <a-assets>
      <a-asset-item id="pom" src="assets/pom/pom.glb"></a-asset-item>

      {assets.map((asset) => (
        <a-asset-item
          key={asset}
          id={asset}
          src={`assets/${asset}/model.gltf`}
        ></a-asset-item>
      ))}
    </a-assets>
  );
};

export default Assets;
