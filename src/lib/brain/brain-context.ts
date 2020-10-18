import { Entity } from "aframe";

export interface BrainContextParams {
  el: Entity;
}

export interface BrainContext extends BrainContextParams {}

export const makeContext = ({ el }: BrainContextParams): BrainContext => {
  return {
    el,
  };
};
