import { Component, Entity } from "aframe";
import { Vector3 } from "three";

export interface RaycasterComponent extends Component {
  intersectedEls: any[];
  intersections: {
    point: Vector3;
  }[];
  getIntersection(element: Entity): any;
}
