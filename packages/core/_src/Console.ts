/**
 * @since 3.0.0
 */
import type { Sync } from '@fp-ts/core/Sync'

/**
 * @since 3.0.0
 */
export const log = (...x: ReadonlyArray<unknown>): Sync<void> => () => console.log(...x)

/**
 * @since 3.0.0
 */
export const warn = (...x: ReadonlyArray<unknown>): Sync<void> => () => console.warn(...x)

/**
 * @since 3.0.0
 */
export const error = (...x: ReadonlyArray<unknown>): Sync<void> => () => console.error(...x)

/**
 * @since 3.0.0
 */
export const info = (...x: ReadonlyArray<unknown>): Sync<void> => () => console.info(...x)
