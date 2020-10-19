import { Component } from "aframe";

type AnyObject = Record<string, unknown>;

export type CompDefinition<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Data extends object = AnyObject,
  State = AnyObject,
  Methods = AnyObject
> = Partial<Component<Data>> &
  Methods &
  ThisType<Component<Data> & State & Methods>;
