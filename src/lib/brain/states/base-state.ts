import { BrainContext } from "../brain-context";
import { State } from "../machine";

export class BaseState {
  music = false;
  expression = "none";

  constructor(
    public context: BrainContext,
    public setState: (state: State, timestamp: number) => void
  ) {}

  enter(timestamp: number): void {}

  exit(timestamp: number): void {}

  tick(timestamp: number, delta: number): void {}

  onMusic(timestamp: number): void {
    if (this.context.musicPlaying) {
      this.setState(State.dance, timestamp);
    }
  }

  onExpression(timestamp: number): void {
    if (this.context.expression === "happy") {
      this.setState(State.wave, timestamp);
    }
  }
}
