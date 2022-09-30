/**
 * @since 2.0.0
 */
import { Applicative2C } from './Applicative'
import { Apply2C } from './Apply'
import { Chain2C } from './Chain'
import { pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Pointed2C } from './Pointed'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Appends a value to the accumulator
 *
 * @category constructors
 * @since 2.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = (w) => () => [undefined, w]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]> = (fa) => () => {
  const [a, w] = fa()
  return [[a, w], w]
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A> = (fa) => () => {
  const [[a, f], w] = fa()
  return [a, f(w)]
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export const listens: <W, B>(f: (w: W) => B) => <A>(fa: Writer<W, A>) => Writer<W, [A, B]> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [[a, f(w)], w]
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export const censor: <W>(f: (w: W) => W) => <A>(fa: Writer<W, A>) => Writer<W, A> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [a, f(w)]
}

/* istanbul ignore next */
const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B> = (f) => (fa) => () => {
  const [a, w] = fa()
  return [f(a), w]
}

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Writer'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Writer<E, A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const getPointed = <W>(M: Monoid<W>): Pointed2C<URI, W> => ({
  URI,
  _E: undefined as any,
  of: (a) => () => [a, M.empty]
})

/**
 * @category instances
 * @since 2.10.0
 */
export const getApply = <W>(S: Semigroup<W>): Apply2C<URI, W> => ({
  URI,
  _E: undefined as any,
  map: _map,
  ap: (fab, fa) => () => {
    const [f, w1] = fab()
    const [a, w2] = fa()
    return [f(a), S.concat(w1, w2)]
  }
})

/**
 * @category instances
 * @since 2.10.0
 */
export const getApplicative = <W>(M: Monoid<W>): Applicative2C<URI, W> => {
  const A = getApply(M)
  const P = getPointed(M)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    of: P.of
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export function getChain<W>(S: Semigroup<W>): Chain2C<URI, W> {
  const A = getApply(S)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    chain: (fa, f) => () => {
      const [a, w1] = fa()
      const [b, w2] = f(a)()
      return [b, S.concat(w1, w2)]
    }
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> {
  const A = getApplicative(M)
  const C = getChain(M)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    ap: A.ap,
    of: A.of,
    chain: C.chain
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const evaluate: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * @since 2.8.0
 */
export const execute: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`evaluate`](#evaluate) instead
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const evalWriter: <W, A>(fa: Writer<W, A>) => A = (fa) => fa()[0]

/**
 * Use [`execute`](#execute) instead
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const execWriter: <W, A>(fa: Writer<W, A>) => W = (fa) => fa()[1]

/**
 * Use [`Functor`](#functor) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const writer: Functor2<URI> = Functor
