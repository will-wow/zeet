import { DetailEvent, Entity } from "aframe";

import { CompDefinition } from "./type";

interface MarkMoverData {
  mark: Entity;
}

export const MarkMoverComponent: CompDefinition<MarkMoverData> = {
  schema: {
    mark: { type: "selector" },
  },

  events: {
    "raycaster-intersection"(
      event: DetailEvent<{ el: Entity; intersections: any[] }>
    ) {
      this.data.mark.setAttribute("color", "green");
    },

    "raycaster-intersection-cleared"() {
      this.data.mark.setAttribute("color", "red");
    },
  },
};

AFRAME.registerComponent("mark-mover", MarkMoverComponent);
