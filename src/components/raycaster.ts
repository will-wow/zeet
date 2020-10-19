import { Component, Entity } from "aframe";
import { Vector3, Intersection } from "three";

export interface RaycasterComponent extends Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intersectedEls: Entity[];
  intersections: {
    point: Vector3;
  }[];
  getIntersection(element: Entity): Intersection;
}
