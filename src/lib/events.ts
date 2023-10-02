import EventEmitter from "events";

export type Events<T> = {
  [event: string]: (payload: T) => void;
};

export type Listener<T> = (...args: T[]) => void;
export type Emit<T> = (event: string, ...args: T[]) => boolean;
export type Event<T> = (event: string, listener: Listener<T>) => EventEmitter;

export type Emitter<T> = {
  eventNames: () => Array<string | symbol>;
  emit: Emit<T>;
  on: Event<T>;
  once: Event<T>;
  off: Event<T>;
};

export function createEmitter<T>(events: Events<T>): Emitter<T> {

  const emitter = new EventEmitter();

  events = events || {} as Events<T>;

  for (const event in events) {
    emitter.on(event, events[event]);
  }

  function emit(event: string, ...args: T[]) {
    return emitter.emit(event, args);
  }

  function eventNames() {
    return emitter.eventNames();
  }

  function on(event: string, listener: Listener<T>) {
    return emitter.on(event, listener);
  }

  function once(event: string, listener: Listener<T>) {
    return emitter.once(event, listener);
  }

  function off(event: string, listener: Listener<T>) {
    return emitter.off(event, listener);
  }

  return {
    emit,
    eventNames,
    on,
    once,
    off,
  };
}
