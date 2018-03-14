import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative'
import { Lazy } from './function'
import { Monad, Monad1, Monad2, Monad3, Monad2C, Monad3C } from './Monad'

// Adapted from https://github.com/garyb/purescript-debug

/**
 * Log any value to the console for debugging purposes and then
 * return a value. This will log the value's underlying representation for
 * low-level debugging
 * @function
 * @since 1.0.0
 */
export const trace = <A>(message: any, out: Lazy<A>): A => {
  console.log(message)
  return out()
}

/**
 * Log any value and return it
 * @function
 * @since 1.0.0
 */
export const spy = <A>(a: A): A => {
  return trace(a, () => a)
}

/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 */
export function traceA<F extends URIS3>(F: Applicative3<F>): <U, L>(message: any) => Type3<F, U, L, void>
export function traceA<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): (message: any) => Type3<F, U, L, void>
export function traceA<F extends URIS2>(F: Applicative2<F>): <L>(message: any) => Type2<F, L, void>
export function traceA<F extends URIS2, L>(F: Applicative2C<F, L>): (message: any) => Type2<F, L, void>
export function traceA<F extends URIS>(F: Applicative1<F>): (message: any) => Type<F, void>
/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 * @function
 * @since 1.0.0
 */
export function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void> {
  return x => trace(x, () => F.of(undefined))
}

/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 */
export function traceM<F extends URIS3>(F: Monad3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>
export function traceM<F extends URIS3, U, L>(F: Monad3C<F, U, L>): <A>(a: A) => Type3<F, U, L, A>
export function traceM<F extends URIS2>(F: Monad2<F>): <L, A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS2, L>(F: Monad2C<F, L>): <A>(a: A) => Type2<F, L, A>
export function traceM<F extends URIS>(F: Monad1<F>): <A>(a: A) => Type<F, A>
/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 * @function
 * @since 1.0.0
 */
export function traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A> {
  return a => trace(a, () => F.of(a))
}
