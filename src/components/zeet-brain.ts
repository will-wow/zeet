import { Entity } from "aframe";

import { makeContext, BrainContext } from "../lib/brain/brain-context";
import { Machine } from "../lib/brain/machine";

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
    this.context = makeContext({ el: this.el });
    this.machine = new Machine(this.context);
  },

  tick(_timestamp, delta) {
    const oldAnimation = this.machine.stateName;
    this.machine.tick(delta);

    const newAnimation = this.machine.stateName;

    if (oldAnimation !== newAnimation) {
      this.el.setAttribute("animation-mixer", { clip: newAnimation });
    }
  },

  onMusic(playing: boolean) {
    this.context.musicPlaying = playing;
    this.machine.onMusic();

    this.el.setAttribute("animation-mixer", { clip: this.machine.stateName });
  },

  setExpression(expression) {
    this.context.expression = expression;
    this.machine.onExpression();

    this.el.setAttribute("animation-mixer", { clip: this.machine.stateName });
  },
};

AFRAME.registerComponent("zeet-brain", ZeetBrainComponent);
