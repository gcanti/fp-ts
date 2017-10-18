import { IO } from './IO'

// Adapted from https://github.com/purescript/purescript-console

/** @function */
export const log = (s: any): IO<void> => {
  return new IO(() => console.log(s))
}

/** @function */
export const warn = (s: any): IO<void> => {
  return new IO(() => console.warn(s))
}

/** @function */
export const error = (s: any): IO<void> => {
  return new IO(() => console.error(s))
}

/** @function */
export const info = (s: any): IO<void> => {
  return new IO(() => console.info(s))
}
