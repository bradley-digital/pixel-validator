import {
  defaultClear,
  defaultGet,
  defaultRemove,
  defaultSet,
} from "../services/storage";
import { UpdateInput } from "./store";

export type Storage<T> = {
  clear: () => Promise<void>;
  get: (key: string) => Promise<T>;
  remove: (key: string) => Promise<T>;
  set: (key: string, value: UpdateInput<T>) => Promise<T>;
};


type CreateStorageInput<T> = {
  clear: () => Promise<void>;
  get: (key: string) => Promise<T>;
  remove: (key: string) => Promise<T>;
  set: (key: string, value: UpdateInput<T>) => Promise<T>;
};

export function createStorage<T>(
  input?: CreateStorageInput<T>,
): Storage<T> {
  const defaultStorage: CreateStorageInput<T> = {
    clear: defaultClear<T>,
    get: defaultGet<T>,
    remove: defaultRemove<T>,
    set: defaultSet<T>,
  };

  if (typeof input === "undefined") {
    input = defaultStorage;
  } else {
    Object.assign(input, defaultStorage);
  }

  const {
    clear,
    get,
    remove,
    set,
  } = input;

  return {
    clear,
    get,
    remove,
    set,
  };
}
