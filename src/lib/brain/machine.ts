import { BaseState } from "./states/base-state";
import { BrainContext, BrainContextParams, makeContext } from "./brain-context";
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
  stateName: State;

  private context: BrainContext;
  private state: BaseState;
  private time = 0;
  private states: Record<State, BaseState>;

  constructor(
    context: BrainContextParams,
    private onStateChange: (state: State) => void
  ) {
    this.setState = this.setState.bind(this);

    this.context = makeContext(context);

    this.states = {
      [State.idle]: new IdleState(this.context, this.setState),
      [State.walk]: new IdleState(this.context, this.setState),
      [State.wave]: new WaveState(this.context, this.setState),
      [State.dance]: new DanceState(this.context, this.setState),
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

  onMusic(playing: boolean): void {
    this.context.musicPlaying = playing;
    this.state.onMusic(this.time);
  }

  onExpression(expression: string): void {
    this.context.expression = expression;
    this.state.onExpression(this.time);
  }

  setState(state: State, timestamp: number): void {
    // Exit old state.
    this.state?.exit(timestamp);

    // Update state.
    this.stateName = state;
    this.state = this.states[this.stateName];

    // Enter new state.
    this.state.enter(timestamp);

    this.onStateChange(this.stateName);
  }
}
