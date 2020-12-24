/**
 * @since 3.0.0
 */
import { IO } from './IO'

/**
 * @since 3.0.0
 */
export const log = (s: unknown): IO<void> => () => console.log(s) // tslint:disable-line:no-console

/**
 * @since 3.0.0
 */
export const warn = (s: unknown): IO<void> => () => console.warn(s) // tslint:disable-line:no-console

/**
 * @since 3.0.0
 */
export const error = (s: unknown): IO<void> => () => console.error(s) // tslint:disable-line:no-console

/**
 * @since 3.0.0
 */
export const info = (s: unknown): IO<void> => () => console.info(s) // tslint:disable-line:no-console
