/**
 * @since 2.0.0
 */
import { IO } from './IO'

/**
 * @since 2.0.0
 */
export function log(s: unknown): IO<void> {
  return () => console.log(s) // tslint:disable-line:no-console
}

/**
 * @since 2.0.0
 */
export function warn(s: unknown): IO<void> {
  return () => console.warn(s) // tslint:disable-line:no-console
}

/**
 * @since 2.0.0
 */
export function error(s: unknown): IO<void> {
  return () => console.error(s) // tslint:disable-line:no-console
}

/**
 * @since 2.0.0
 */
export function info(s: unknown): IO<void> {
  return () => console.info(s) // tslint:disable-line:no-console
}
