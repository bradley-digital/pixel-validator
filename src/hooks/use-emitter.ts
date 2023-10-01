import { Emitter } from "../lib/events";

export type UseEmitter<T> = {
  [event: string]: (payload: T) => boolean;
};

export function useEmitter<T>(emitter: Emitter<T>): UseEmitter<T> {
  const customEmitter: UseEmitter<T> = {};

  const events = emitter.eventNames();

  for (const event of events) {
    if (typeof event !== "string") continue;
    customEmitter[event] = (payload: T) => emitter.emit(event, payload);
  }

  return customEmitter;
}
