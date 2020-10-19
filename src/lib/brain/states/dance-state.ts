import { State } from "../machine";

import { BaseState } from "./base-state";

export class DanceState extends BaseState {
  onMusic(timestamp: number): void {
    if (!this.context.musicPlaying) {
      this.setState(State.idle, timestamp);
    }
  }

  onExpression(timestamp: number): void {
    if (["sad", "disgust"].includes(this.context.expression)) {
      this.setState(State.idle, timestamp);
    }
  }
}
