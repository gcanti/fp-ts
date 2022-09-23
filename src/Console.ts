/**
 * @since 3.0.0
 */
import type { IO } from './IO'

/**
 * @since 3.0.0
 */
export const log =
  (...x: ReadonlyArray<unknown>): IO<void> =>
  () =>
    console.log(...x)

/**
 * @since 3.0.0
 */
export const warn =
  (...x: ReadonlyArray<unknown>): IO<void> =>
  () =>
    console.warn(...x)

/**
 * @since 3.0.0
 */
export const error =
  (...x: ReadonlyArray<unknown>): IO<void> =>
  () =>
    console.error(...x)

/**
 * @since 3.0.0
 */
export const info =
  (...x: ReadonlyArray<unknown>): IO<void> =>
  () =>
    console.info(...x)
