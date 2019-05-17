/**
 * @file Adapted from https://github.com/garyb/purescript-debug
 */

/**
 * @since 2.0.0
 */
export function spy<A>(a: A): A {
  console.log(a) // tslint:disable-line:no-console
  return a
}

/**
 * @since 2.0.0
 */
export function trace<A>(message: (a: A) => unknown): (a: A) => A {
  return a => {
    console.log(message(a)) // tslint:disable-line:no-console
    return a
  }
}
