import { Entity } from "aframe";

import { makeContext, BrainContext } from "../lib/brain/brain-context";
import { Machine, State } from "../lib/brain/machine";

import { CompDefinition } from "./type";

interface ZeetBrainData {
  object: Entity;
}

interface ZeetBrainState {
  machine: Machine;
  context: BrainContext;
}

interface ZeetBrainMethods {
  setExpression(expression: string): void;
  onMusic(playing: boolean): void;
  onStateChange(state: State): void;
}

export const ZeetBrainComponent: CompDefinition<
  ZeetBrainData,
  ZeetBrainState,
  ZeetBrainMethods
> = {
  schema: {
    object: { type: "selector" },
  },

  init() {
    this.onStateChange = this.onStateChange.bind(this);

    this.machine = new Machine({ el: this.el }, this.onStateChange);
  },

  tick(_timestamp, delta) {
    this.machine.tick(delta);
  },

  onMusic(playing: boolean) {
    this.machine.onMusic(playing);
  },

  setExpression(expression) {
    this.machine.onExpression(expression);
  },

  onStateChange(clip) {
    this.el.setAttribute("animation-mixer", { clip });
  },
};

AFRAME.registerComponent("zeet-brain", ZeetBrainComponent);
