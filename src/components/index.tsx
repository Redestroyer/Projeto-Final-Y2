import { useState, type ComponentPropsWithoutRef } from "react";

export type GlobalAttributes = ComponentPropsWithoutRef<"p">;
export interface StateDispatch<T> {
  (): T;
  (newState: T): void;
}
export function useStateDispatch<T>(init: T | (() => T)): StateDispatch<T> {
  const [state, setState] = useState(init);
  return (newState => newState ? setState(newState) : state) as StateDispatch<T>;
}
