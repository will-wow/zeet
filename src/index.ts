import "aframe-extras";
import "aframe-environment-component";
import "aframe-layout-component";
import "aframe-look-at-component";

const requireAll = (req: any) => {
  req.keys().forEach(req);
};

// Require all components.
requireAll(require.context("./components/", true, /\.ts$/));

import "./scene.html";
