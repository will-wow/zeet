import { Entity } from "aframe";

export interface BrainContextParams {
  el: Entity;
}

export interface BrainContext extends BrainContextParams {
  expression: string;
  musicPlaying: boolean;
}

export const makeContext = ({ el }: BrainContextParams): BrainContext => {
  return {
    el,
    expression: "none",
    musicPlaying: false,
  };
};
