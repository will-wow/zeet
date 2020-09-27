import { Entity } from "aframe";

import { CompDefinition } from "./type";

interface MarkMoverData {
  mark: Entity;
  object: Entity;
  camera: Entity;
}

interface MarkMoverMethods {
  placeObject(): void;
}

export const PlaceOnClickComponent: CompDefinition<
  MarkMoverData,
  {},
  MarkMoverMethods
> = {
  schema: {
    mark: { type: "selector" },
    object: { type: "selector" },
    camera: { type: "selector" },
  },
  init() {
    window.addEventListener("click", () => this.placeObject());
  },
  placeObject() {
    const { x, y, z } = this.data.mark.getAttribute("position");
    this.data.object.object3D.position.set(x, y, z);

    const { x: cameraX, z: cameraZ } = this.data.camera.getAttribute(
      "position"
    );

    this.data.object.object3D.lookAt(cameraX, y, cameraZ);

    this.data.object.setAttribute("visible", true);
  },
};

AFRAME.registerComponent("place-on-click", PlaceOnClickComponent);
