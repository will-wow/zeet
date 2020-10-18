import React from "react";

const zeetAsset = `${process.env.PUBLIC_URL}/assets/zeet/zeet.glb`;
const happyRockAsset = `${process.env.PUBLIC_URL}/assets/music/happyrock.mp3`;

const Assets: React.FunctionComponent = () => {
  return (
    <a-assets>
      <a-asset-item id="zeet" src={zeetAsset}></a-asset-item>
      <audio id="happy-rock" src={happyRockAsset} preload="auto"></audio>
    </a-assets>
  );
};

export default Assets;
