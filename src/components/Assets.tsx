import React from "react";

const zeetAsset = `${process.env.PUBLIC_URL}/assets/zeet/zeet.glb`;

const Assets: React.FunctionComponent = () => {
  return (
    <a-assets>
      <a-asset-item id="zeet" src={zeetAsset}></a-asset-item>
    </a-assets>
  );
};

export default Assets;
