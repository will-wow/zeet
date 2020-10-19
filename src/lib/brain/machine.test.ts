import { Entity } from "aframe";
import { Machine, State } from "./machine";

describe("", () => {
  let machine: Machine;
  let onStateChange: (state: State) => void;

  beforeEach(() => {
    onStateChange = jest.fn();

    machine = new Machine(
      {
        el: {} as Entity,
      },
      onStateChange
    );
  });
  it("starts as idle", () => {
    expect(machine.stateName).toBe("idle");
  });

  it("switches to dance when there is music", () => {
    machine.onMusic(true);
    expect(machine.stateName).toBe("dance");
  });

  it("switches to waving when the user smiles", () => {
    machine.onExpression("happy");
    expect(machine.stateName).toBe("wave");
  });

  it("switches to waving when the zeet is dancing", () => {
    machine.setState(State.dance, 0);

    machine.onExpression("happy");
    expect(machine.stateName).toBe("dance");
  });
});
