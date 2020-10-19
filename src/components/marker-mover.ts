import { Entity } from "aframe";

import { CompDefinition } from "./type";

interface MarkMoverData {
  mark: Entity;
}

export const MarkMoverComponent: CompDefinition<MarkMoverData> = {
  schema: {
    mark: { type: "selector" },
  },

  events: {
    "raycaster-intersection"(): void {
      this.data.mark.setAttribute("color", "green");
    },

    "raycaster-intersection-cleared"(): void {
      this.data.mark.setAttribute("color", "red");
    },
  },
};

AFRAME.registerComponent("mark-mover", MarkMoverComponent);
