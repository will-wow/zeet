import { State } from "../machine";

import { BaseState } from "./base-state";

export class WaveState extends BaseState {
  onMusic(_timestamp: number): void {}

  onExpression(timestamp: number): void {
    if (this.context.expression !== "happy") {
      this.setState(State.idle, timestamp);
    }
  }
}
