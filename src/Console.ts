import { IO } from './IO'

// Adapted from https://github.com/purescript/purescript-console

/**
 * @function
 * @since 1.0.0
 */
export const log = (s: any): IO<void> => {
  return new IO(() => console.log(s))
}

/**
 * @function
 * @since 1.0.0
 */
export const warn = (s: any): IO<void> => {
  return new IO(() => console.warn(s))
}

/**
 * @function
 * @since 1.0.0
 */
export const error = (s: any): IO<void> => {
  return new IO(() => console.error(s))
}

/**
 * @function
 * @since 1.0.0
 */
export const info = (s: any): IO<void> => {
  return new IO(() => console.info(s))
}
