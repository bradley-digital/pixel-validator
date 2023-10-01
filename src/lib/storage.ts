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
  input = Object.assign({
    clear: defaultClear<T>,
    get: defaultGet<T>,
    remove: defaultRemove<T>,
    set: defaultSet<T>,
  } as CreateStorageInput<T>, input);

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
