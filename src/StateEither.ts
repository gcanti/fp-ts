/**
 * @since 2.12.0
 */
import { Alt3 } from './Alt'
import { Applicative3 } from './Applicative'
import { apFirst as apFirst_, Apply3, apS as apS_, apSecond as apSecond_ } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import { bind as bind_, Chain3, chainFirst as chainFirst_ } from './Chain'
import * as E from './Either'
import { Endomorphism } from './Endomorphism'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither3,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import {
  chainStateK as chainStateK_,
  FromState3,
  fromStateK as fromStateK_,
  get as get_,
  gets as gets_,
  modify as modify_,
  put as put_
} from './FromState'
import { bindTo as bindTo_, flap as flap_, Functor3 } from './Functor'
import { Monad3 } from './Monad'
import { MonadThrow3 } from './MonadThrow'
import { NaturalTransformation13C } from './NaturalTransformation'
import { NonEmptyArray } from './NonEmptyArray'
import { URI as OURI } from './Option'
import { Pointed3 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { State } from './State'
import * as ST from './StateT'
import { flow, identity, Lazy, pipe } from './function'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either

/**
 * @category model
 * @since 2.12.0
 */
export interface StateEither<S, E, A> {
  (s: S): Either<E, [A, S]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.12.0
 */
export const left: <S, E = never, A = never>(e: E) => StateEither<S, E, A> = (e) => () => E.left(e)

/**
 * @category constructors
 * @since 2.12.0
 */
export const right: <S, E = never, A = never>(a: A) => StateEither<S, E, A> =
  /*#__PURE__*/
  ST.of(E.Pointed)

/**
 * @category constructors
 * @since 2.12.0
 */
export const rightState: <S, E = never, A = never>(ma: State<S, A>) => StateEither<S, E, A> = (sa) => flow(sa, E.right)

/**
 * @category constructors
 * @since 2.12.0
 */
export const leftState: <S, E = never, A = never>(me: State<S, E>) => StateEither<S, E, A> = (me) => (s) =>
  E.left(me(s)[0])

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromEither: FromEither3<URI>['fromEither'] =
  /*#__PURE__*/
  E.match((e) => left(e), right)

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromState: FromState3<URI>['fromState'] =
  /*#__PURE__*/
  ST.fromState(E.Pointed)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

/* istanbul ignore next */
const _map: Monad3<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Monad3<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad3<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: <S, E, A>(fa: StateEither<S, E, A>, that: Lazy<StateEither<S, E, A>>) => StateEither<S, E, A> = (
  fa,
  that
) => (s) =>
  pipe(
    fa(s),
    E.alt(() => that()(s))
  )
const _bimap: <S, E, A, G, B>(fea: StateEither<S, E, A>, f: (e: E) => G, g: (a: A) => B) => StateEither<S, G, B> = (
  fea,
  f,
  g
) => (s) =>
  pipe(
    fea(s),
    E.bimap(f, ([a, sb]) => [g(a), sb])
  )
const _mapLeft: <S, E, A, G>(fea: StateEither<S, E, A>, f: (e: E) => G) => StateEither<S, G, A> = (fea, f) => (s) =>
  pipe(fea(s), E.mapLeft(f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.12.0
 */
export const map: <A, B>(f: (a: A) => B) => <S, E>(fa: StateEither<S, E, A>) => StateEither<S, E, B> =
  /*#__PURE__*/
  ST.map(E.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.12.0
 */
export const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S>(fa: StateEither<S, E, A>) => StateEither<S, G, B> = (f, g) => (fa) => _bimap(fa, f, g)

/**
 * Map a function over the third type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.12.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <S, A>(fa: StateEither<S, E, A>) => StateEither<S, G, A> = (f) => (
  fa
) => _mapLeft(fa, f)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.12.0
 */
export const ap: <S, E, A>(
  fa: StateEither<S, E, A>
) => <B>(fab: StateEither<S, E, (a: A) => B>) => StateEither<S, E, B> =
  /*#__PURE__*/
  ST.ap(E.Chain)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.12.0
 */
export const apW: <S, E2, A>(
  fa: StateEither<S, E2, A>
) => <E1, B>(fab: StateEither<S, E1, (a: A) => B>) => StateEither<S, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 2.12.0
 */
export const of: <S, E = never, A = never>(a: A) => StateEither<S, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.12.0
 */
export const chain: <S, E, A, B>(
  f: (a: A) => StateEither<S, E, B>
) => (ma: StateEither<S, E, A>) => StateEither<S, E, B> =
  /*#__PURE__*/
  ST.chain(E.Chain)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.12.0
 */
export const chainW: <S, E2, A, B>(
  f: (a: A) => StateEither<S, E2, B>
) => <E1>(ma: StateEither<S, E1, A>) => StateEither<S, E1 | E2, B> = chain as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category combinators
 * @since 2.12.0
 */
export const flattenW: <S, E1, E2, A>(mma: StateEither<S, E1, StateEither<S, E2, A>>) => StateEither<S, E1 | E2, A> =
  /*#__PURE__*/
  chainW(identity)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const flatten: <S, E, A>(mma: StateEither<S, E, StateEither<S, E, A>>) => StateEither<S, E, A> = flattenW

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.12.0
 */
export const altW = <S, E2, B>(that: () => StateEither<S, E2, B>) => <E1, A>(
  fa: StateEither<S, E1, A>
): StateEither<S, E2, A | B> => (r) =>
  pipe(
    fa(r),
    E.altW(() => that()(r))
  )

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.12.0
 */
export const alt: <S, E, A>(
  that: Lazy<StateEither<S, E, A>>
) => (fa: StateEither<S, E, A>) => StateEither<S, E, A> = altW

/**
 * @category MonadThrow
 * @since 2.12.0
 */
export const throwError: MonadThrow3<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.12.0
 */
export const URI = 'StateEither'

/**
 * @category instances
 * @since 2.12.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly [URI]: StateEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.12.0
 */
export const Pointed: Pointed3<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Apply: Apply3<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 2.12.0
 */
export const Applicative: Applicative3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Chain: Chain3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * @category instances
 * @since 2.12.0
 */
export const FromState: FromState3<URI> = {
  URI,
  fromState
}

/**
 * Get the current state
 *
 * @category constructors
 * @since 2.12.0
 */
export const get: <S, E = never>() => StateEither<S, E, S> =
  /*#__PURE__*/
  get_(FromState)

/**
 * Set the state
 *
 * @category constructors
 * @since 2.12.0
 */
export const put: <S, E = never>(s: S) => StateEither<S, E, void> =
  /*#__PURE__*/
  put_(FromState)

/**
 * Modify the state by applying a function to the current state
 *
 * @category constructors
 * @since 2.12.0
 */
export const modify: <S, E = never>(f: Endomorphism<S>) => StateEither<S, E, void> =
  /*#__PURE__*/
  modify_(FromState)

/**
 * Get a value which depends on the current state
 *
 * @category constructors
 * @since 2.12.0
 */
export const gets: <S, E = never, A = never>(f: (s: S) => A) => StateEither<S, E, A> =
  /*#__PURE__*/
  gets_(FromState)

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromStateK: <A extends ReadonlyArray<unknown>, S, B>(
  f: (...a: A) => State<S, B>
) => <E = never>(...a: A) => StateEither<S, E, B> =
  /*#__PURE__*/
  fromStateK_(FromState)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainStateK: <A, S, B>(
  f: (a: A) => State<S, B>
) => <E = never>(ma: StateEither<S, E, A>) => StateEither<S, E, B> =
  /*#__PURE__*/
  chainStateK_(FromState, Chain)

/**
 * @category instances
 * @since 2.12.0
 */
export const Monad: Monad3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * @category instances
 * @since 2.12.0
 */
export const MonadThrow: MonadThrow3<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  throwError
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainFirst: <S, E, A, B>(
  f: (a: A) => StateEither<S, E, B>
) => (ma: StateEither<S, E, A>) => StateEither<S, E, A> =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainFirstW: <S, E2, A, B>(
  f: (a: A) => StateEither<S, E2, B>
) => <E1>(ma: StateEither<S, E1, A>) => StateEither<S, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 2.12.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Alt: Alt3<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.12.0
 */
export const FromEither: FromEither3<URI> = {
  URI,
  fromEither
}

/**
 * @category natural transformations
 * @since 2.12.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => NaturalTransformation13C<OURI, URI, E> =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain)

/**
 * @category combinators
 * @since 2.12.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B> =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chaineitherk).
 *
 * @category combinators
 * @since 2.12.0
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <S, E1>(ma: StateEither<S, E1, A>) => StateEither<S, E1 | E2, B> = chainEitherK as any

/**
 * @category constructors
 * @since 2.12.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S>(a: A) => StateEither<S, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, B extends A>(b: B) => StateEither<S, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S>(a: A) => StateEither<S, E, A>
} =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 2.12.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <S>(
    ma: StateEither<S, E, A>
  ) => StateEither<S, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S, B extends A>(
    mb: StateEither<S, E, B>
  ) => StateEither<S, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <S>(ma: StateEither<S, E, A>) => StateEither<S, E, A>
} =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * @category combinators
 * @since 2.12.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <S, E1>(
    ma: StateEither<S, E1, A>
  ) => StateEither<S, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, E1, B extends A>(
    mb: StateEither<S, E1, B>
  ) => StateEither<S, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <S, E1>(
    ma: StateEither<S, E1, A>
  ) => StateEither<S, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 2.12.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
) => <S>(...a: A) => StateEither<S, E, B> =
  /*#__PURE__*/
  fromEitherK_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Run a computation in the `StateEither` monad, discarding the final state
 *
 * @since 2.12.0
 */
export const evaluate: <S>(s: S) => <E, A>(ma: StateEither<S, E, A>) => Either<E, A> =
  /*#__PURE__*/
  ST.evaluate(E.Functor)

/**
 * Run a computation in the `StateEither` monad discarding the result
 *
 * @since 2.12.0
 */
export const execute: <S>(s: S) => <E, A>(ma: StateEither<S, E, A>) => Either<E, S> =
  /*#__PURE__*/
  ST.execute(E.Functor)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.12.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * @since 2.12.0
 */
export const bindW: <N extends string, A, S, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateEither<S, E2, B>
) => <E1>(
  fa: StateEither<S, E1, A>
) => StateEither<S, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.12.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * @since 2.12.0
 */
export const apSW: <A, N extends string, S, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateEither<S, E2, B>
) => <E1>(
  fa: StateEither<S, E1, A>
) => StateEither<S, E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.12.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, S, E, B>(
  f: (index: number, a: A) => StateEither<S, E, B>
) => (as: ReadonlyNonEmptyArray<A>): StateEither<S, E, ReadonlyNonEmptyArray<B>> => (s) =>
  _.tail(as).reduce<Either<E, [NonEmptyArray<B>, S]>>(
    (acc, a, i) =>
      _.isLeft(acc)
        ? acc
        : pipe(
            f(i + 1, a)(acc.right[1]), //
            (eb) => {
              if (_.isLeft(eb)) {
                return eb
              }
              const [b, s] = eb.right
              acc.right[0].push(b)
              acc.right[1] = s
              return acc
            }
          ),
    pipe(
      f(0, _.head(as))(s), //
      E.map(([b, s]) => [[b], s])
    )
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 2.12.0
 */
export const traverseReadonlyArrayWithIndex = <A, S, E, B>(
  f: (index: number, a: A) => StateEither<S, E, B>
): ((as: ReadonlyArray<A>) => StateEither<S, E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : of(_.emptyReadonlyArray))
}

/**
 * @since 2.12.0
 */
export const traverseArrayWithIndex: <S, E, A, B>(
  f: (index: number, a: A) => StateEither<S, E, B>
) => (as: ReadonlyArray<A>) => StateEither<S, E, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * @since 2.12.0
 */
export const traverseArray = <S, E, A, B>(
  f: (a: A) => StateEither<S, E, B>
): ((as: ReadonlyArray<A>) => StateEither<S, E, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * @since 2.12.0
 */
export const sequenceArray: <S, E, A>(arr: ReadonlyArray<StateEither<S, E, A>>) => StateEither<S, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

// tslint:disable: deprecation

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.12.0
 * @deprecated
 */
export const stateEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  bimap: _bimap,
  mapLeft: _mapLeft,
  alt: _alt,
  throwError
}

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.12.0
 * @deprecated
 */

export const stateEitherSeq: typeof stateEither = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  bimap: _bimap,
  mapLeft: _mapLeft,
  alt: _alt,
  throwError
}

/**
 * Use [`evaluate`](#evaluate) instead
 *
 * @since 2.12.0
 * @deprecated
 */
/* istanbul ignore next */
export const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => Either<E, A> = (fsa, s) =>
  pipe(
    fsa(s),
    E.map(([a]) => a)
  )

/**
 * Use [`execute`](#execute) instead
 *
 * @since 2.12.0
 * @deprecated
 */
/* istanbul ignore next */
export const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => Either<E, S> = (fsa, s) =>
  pipe(
    fsa(s),
    E.map(([_, s]) => s)
  )

/**
 * @since 2.12.0
 * @deprecated
 */
/* istanbul ignore next */
export function run<S, E, A>(ma: StateEither<S, E, A>, s: S): Either<E, [A, S]> {
  return ma(s)
}
