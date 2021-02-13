/**
 * @since 2.0.0
 */
import { IO } from './IO'

/**
 * @since 2.0.0
 */
export const log = <A>(a: A): IO<void> => () => console.log(a) // tslint:disable-line:no-console

/**
 * @since 2.0.0
 */
export const warn = <A>(a: A): IO<void> => () => console.warn(a) // tslint:disable-line:no-console

/**
 * @since 2.0.0
 */
export const error = <A>(a: A): IO<void> => () => console.error(a) // tslint:disable-line:no-console

/**
 * @since 2.0.0
 */
export const info = <A>(a: A): IO<void> => () => console.info(a) // tslint:disable-line:no-console
