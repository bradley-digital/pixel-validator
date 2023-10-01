import { Listener, Emitter, createEmitter } from "./events";

export enum Event {
  Listen = "listen",
  Start = "start",
  Stop = "stop"
}

export type Events<T> = [string, (payload: T) => void];

export type ServiceListener<T> = (listener: Listener<T>) => void;

export type Service<T> = {
  emitter: Emitter<T>;
  listen: ServiceListener<T>;
  start: ServiceListener<T>;
  stop: ServiceListener<T>;
};

type ServiceInput<T> = {
  listener?: Listener<T>;
  start: ServiceListener<T>;
  stop: ServiceListener<T>;
  events?: Events<T>[];
};

function fallbackListener<T>(...args: T[]) {
  console.log("No listener registered: ", args);
}

export function createService<T>({
  listener: defaultListener = fallbackListener<T>,
  events,
  start: startService,
  stop: stopService,
}: ServiceInput<T>): Service<T> {
  const emitter = createEmitter<T>();

  function listen(listener: Listener<T> = defaultListener) {
    emitter.on(Event.Listen, listener);
    startService(listener);
    emitter.emit(Event.Listen);
  }

  function start(listener: Listener<T> = defaultListener) {
    emitter.on(Event.Start, listener);
    startService(listener);
    emitter.emit(Event.Start);
  }

  function stop(listener: Listener<T> = defaultListener) {
    emitter.off(Event.Stop, listener);
    stopService(listener);
    emitter.emit(Event.Stop);
  }

  events = events || [] as Events<T>[];

  for (const event of events) {
    const [eventName, listener] = event;
    emitter.on(eventName, listener);
  }

  return {
    emitter,
    listen,
    start,
    stop,
  };
}
