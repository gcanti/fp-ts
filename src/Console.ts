/**
 * @file Adapted from https://github.com/purescript/purescript-console
 */
import { IO } from './IO'

/**
 * @since 1.0.0
 */
export const log = (s: unknown): IO<void> => {
  return new IO(() => console.log(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const warn = (s: unknown): IO<void> => {
  return new IO(() => console.warn(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const error = (s: unknown): IO<void> => {
  return new IO(() => console.error(s)) // tslint:disable-line:no-console
}

/**
 * @since 1.0.0
 */
export const info = (s: unknown): IO<void> => {
  return new IO(() => console.info(s)) // tslint:disable-line:no-console
}
