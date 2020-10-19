import { BaseState } from "./base-state";
import { State } from "../machine";

export class IdleState extends BaseState {
  enter(timestamp: number): void {
    if (this.context.musicPlaying) {
      this.setState(State.dance, timestamp);
    }
  }
}
