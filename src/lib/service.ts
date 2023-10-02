import { Emitter, Events, Listener, createEmitter } from "./events";

export type AttachService<T> = (listener: Listener<T>) => void;
export type RunService<T> = (listener?: Listener<T>) => void;
export type Plugin<T> = (...args: any[]) => any;
export type Use<T> = (...plugins: Plugin<T>[]) => void;

export type Service<T> = {
  start: RunService<T>;
  stop: RunService<T>;
  use: Use<T>;
};

type ServiceInput<T> = {
  start: AttachService<T>;
  stop: AttachService<T>;
  events?: Events<T>;
};

function defaultListener<T>(...args: T[]) {}

export function createService<T>({
  events,
  start: startService,
  stop: stopService,
}: ServiceInput<T>): Service<T> {
  const middleware: Plugin<T>[] = [];

  function interceptor(listener: Listener<T>): Listener<T> {
    return async function (...args: T[]) {
      for await (const plugin of middleware) {
        let result = await plugin(...args);
        if (!Array.isArray(result)) result = [result];
        args = result;
      }
      listener(...args);
    }
  }

  function start(listener?: Listener<T>) {
    if (!listener) listener = defaultListener;
    startService(interceptor(listener) as any);
  }

  function stop(listener?: Listener<T>) {
    if (!listener) listener = defaultListener;
    stopService(interceptor(listener));
  }

  function use(...plugin: Plugin<T>[]) {
    middleware.push(...plugin);
  }

  return {
    start,
    stop,
    use,
  };
}
