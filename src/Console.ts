import { IO } from './IO_'

// Adapted from https://github.com/purescript/purescript-console

/**
 * @since 1.0.0
 */
export const log = (s: any): IO<void> => {
  return new IO(() => console.log(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const warn = (s: any): IO<void> => {
  return new IO(() => console.warn(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const error = (s: any): IO<void> => {
  return new IO(() => console.error(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const info = (s: any): IO<void> => {
  return new IO(() => console.info(s)) // tslint:disable-line:no-console
}
