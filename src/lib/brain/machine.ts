import { BaseState } from "./states/base-state";
import { BrainContext } from "./brain-context";
import { IdleState } from "./states/idle-state";
import { DanceState } from "./states/dance-state";
import { WaveState } from "./states/wave-state";

export enum State {
  idle = "idle",
  walk = "walk",
  wave = "wave",
  dance = "dance",
}

export class Machine {
  time = 0;
  stateName: State;
  state: BaseState;

  private states: Record<State, BaseState>;

  constructor(context: BrainContext) {
    this.setState = this.setState.bind(this);

    this.states = {
      [State.idle]: new IdleState(context, this.setState),
      [State.walk]: new IdleState(context, this.setState),
      [State.wave]: new WaveState(context, this.setState),
      [State.dance]: new DanceState(context, this.setState),
    };

    // Initialize state.
    this.stateName = State.idle;
    this.state = this.states[this.stateName];
    this.state.enter(this.time);
  }

  tick(delta: number): void {
    // Cap delta to avoid large changes from pausing.
    const cappedDelta = Math.min(delta, 1000);

    this.time += cappedDelta;

    this.state.tick(this.time, cappedDelta);
  }

  onMusic(): void {
    this.state.onMusic(this.time);
  }

  onExpression(): void {
    this.state.onExpression(this.time);
  }

  private setState(state: State, timestamp: number): void {
    // Exit old state.
    this.state?.exit(timestamp);

    // Update state.
    this.stateName = state;
    this.state = this.states[this.stateName];

    // Enter new state.
    this.state.enter(timestamp);
  }
}
