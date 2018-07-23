import { IO } from './IO'
import { fromNullable, Option } from './Option'

/**
 * @function
 * @since 1.8.0
 */
export const clear: IO<void> = new IO(() => localStorage.clear())

/**
 * @function
 * @since 1.8.0
 */
export const getItem = (key: string): IO<Option<string>> => {
  return new IO(() => fromNullable(localStorage.getItem(key)))
}

/**
 * @function
 * @since 1.8.0
 */
export const key = (index: number): IO<Option<string>> => {
  return new IO(() => fromNullable(localStorage.key(index)))
}

/**
 * @function
 * @since 1.8.0
 */
export const length: IO<number> = new IO(() => localStorage.length)

/**
 * @function
 * @since 1.8.0
 */
export const removeItem = (key: string): IO<void> => {
  return new IO(() => localStorage.removeItem(key))
}

/**
 * @function
 * @since 1.8.0
 */
export const setItem = (key: string, value: string): IO<void> => {
  return new IO(() => localStorage.setItem(key, value))
}
