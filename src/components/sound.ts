import { Component, Entity } from "aframe";

export interface SoundComponent extends Component {
  intersectedEls: Entity[];
  playSound: () => void;
  stopSound: () => void;
}
