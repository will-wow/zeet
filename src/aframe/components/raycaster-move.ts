import { DetailEvent, Entity, ObjectMap } from "aframe";

import { RaycasterComponent } from "./raycaster";
import { CompDefinition } from "./type";

interface RaycasterMoveState {
  raycaster?: Entity<ObjectMap<RaycasterComponent>> | null;
}

interface RaycasterMoveData {
  target: Entity;
}

export const RaycasterMoveComponent: CompDefinition<
  RaycasterMoveData,
  RaycasterMoveState
> = {
  schema: {
    target: { type: "selector" },
  },
  events: {
    "raycaster-intersected"(
      event: DetailEvent<{
        el: Entity<ObjectMap<RaycasterComponent>>;
        intersections: any[];
      }>
    ) {
      console.log("move");
      this.raycaster = event.detail.el;
    },
    "raycaster-intersected-cleared"() {
      this.raycaster = null;
    },
  },
  init() {
    console.log("mark", this.data.target);
  },
  tick() {
    if (!this.raycaster) {
      return;
    } // Not intersecting.

    const intersection = this.raycaster.components.raycaster.getIntersection(
      this.el
    );
    if (!intersection) {
      return;
    }
    //console.log(intersection.point);
    this.data.target.setAttribute("position", intersection.point);
  },
};

AFRAME.registerComponent("raycaster-move", RaycasterMoveComponent);
