/**
 * @since 3.0.0
 */
import type { Applicative2C } from './Applicative'
import type { Apply2C } from './Apply'
import type { Chain2C } from './Chain'
import { flap as flap_, Functor2 } from './Functor'
import type { Monad2C } from './Monad'
import type { Monoid } from './Monoid'
import type { Pointed2C } from './Pointed'
import type { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Writer<W, A> {
  (): readonly [A, W]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 3.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = (w) => () => [undefined, w]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, readonly [A, W]> = (fa) => () => {
  const [a, w] = fa()
  return [[a, w], w]
}

/**
 * Applies the returned function to the accumulator
 *
 * @category combinators
 * @since 3.0.0
 */
export const pass: <W, A>(fa: Writer<W, readonly [A, (w: W) => W]>) => Writer<W, A> = (fa) => () => {
  const [[a, f], w] = fa()
  return [a, f(w)]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @category combinators
 * @since 3.0.0
 */
export const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, readonly [A, B]> = (f) => (
  fa
) => () => {
  const [a, w] = fa()
  return [[a, f(w)], w]
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @category combinators
 * @since 3.0.0
 */
export const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [a, f(w)]
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => (fa) => () => {
  const [a, w] = fa()
  return [f(a), w]
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Writer'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Writer: Writer<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed2C<URI, W> => ({
  of: (a) => () => [a, M.empty]
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply2C<URI, W> => ({
  map,
  ap: (fa) => (fab) => () => {
    const [f, w1] = fab()
    const [a, w2] = fa()
    return [f(a), S.concat(w2)(w1)]
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <W>(M: Monoid<W>): Applicative2C<URI, W> => {
  const A = getApply(M)
  const P = getPointed(M)
  return {
    map,
    ap: A.ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getChain = <W>(S: Semigroup<W>): Chain2C<URI, W> => {
  return {
    map,
    chain: (f) => (ma) => () => {
      const [a, w1] = ma()
      const [b, w2] = f(a)()
      return [b, S.concat(w2)(w1)]
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
  const P = getPointed(M)
  const C = getChain(M)
  return {
    map,
    of: P.of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const evaluate: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * @since 3.0.0
 */
export const execute: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]
