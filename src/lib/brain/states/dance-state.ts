import { State } from "../machine";

import { BaseState } from "./base-state";

const NEGATIVE_EXPRESSIONS = ["sad", "disgust"];

export class DanceState extends BaseState {
  onMusic(timestamp: number): void {
    if (!this.context.musicPlaying) {
      this.setState(State.idle, timestamp);
    }
  }

  onExpression(timestamp: number): void {
    if (NEGATIVE_EXPRESSIONS.includes(this.context.expression)) {
      this.setState(State.idle, timestamp);
    }
  }
}
