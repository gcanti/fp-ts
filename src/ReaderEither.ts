/**
 * @since 3.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C } from './Applicative'
import { apFirst as apFirst_, Apply3, apSecond as apSecond_, apS as apS_, apT as apT_, ap as ap_ } from './Apply'
import { Bifunctor3 } from './Bifunctor'
import { Compactable3C, Compactable2C, compact as compact_, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { Filterable3C, filter, filterMap, partition, partitionMap } from './Filterable'
import {
  filterOrElse as filterOrElse_,
  FromEither3,
  fromOption as fromOption_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { flow, identity, Predicate, Refinement } from './function'
import { bindTo as bindTo_, Functor2, Functor3, tupled as tupled_ } from './Functor'
import { bind as bind_, chainFirst as chainFirst_, Monad3 } from './Monad'
import { Monoid } from './Monoid'
import { Pointed3 } from './Pointed'
import * as R from './Reader'
import { Semigroup } from './Semigroup'

import Either = E.Either
import Reader = R.Reader

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, R, A = never>(e: E) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.left(R.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R, E = never>(a: A) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.right(R.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF(R.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF(R.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderEither<R, E, R> = () => E.right

/**
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderEither<R, E, A> = (f) => flow(f, E.right)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: FromEither3<URI>['fromEither'] = R.of

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const fold =
  /*#__PURE__*/
  ET.fold(R.Monad)

/**
 * Less strict version of [`fold`](#fold).
 *
 * @category destructors
 * @since 3.0.0
 */
export const foldW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => Reader<R2, B>,
  onRight: (a: A) => Reader<R3, C>
) => <R1>(ma: Reader<R1, E.Either<E, A>>) => Reader<R1 & R2 & R3, B | C> = fold as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse =
  /*#__PURE__*/
  ET.getOrElse(R.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, R2, B>(
  onLeft: (e: E) => Reader<R2, B>
) => <R1, A>(ma: ReaderEither<R1, E, A>) => Reader<R1 & R2, A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const toUnion =
  /*#__PURE__*/
  ET.toUnion(R.Functor)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse =
  /*#__PURE__*/
  ET.orElse(R.Monad)

/**
 * Less strict version of [`orElse`](#orElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderEither<R1, E2, B>
) => <R2, A>(ma: ReaderEither<R2, E1, A>) => ReaderEither<R1 & R2, E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap =
  /*#__PURE__*/
  ET.swap(R.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
): (<R>(...a: A) => ReaderEither<R, E, B>) => (...a) => fromEither(f(...a))

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderEither<R, E1, A>) => ReaderEither<R, E1 | E2, B> = (f) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> = chainEitherKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor3<URI>['map'] =
  /*#__PURE__*/
  ET.map(R.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor3<URI>['bimap'] =
  /*#__PURE__*/
  ET.bimap(R.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor3<URI>['mapLeft'] =
  /*#__PURE__*/
  ET.mapLeft(R.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply3<URI>['ap'] =
  /*#__PURE__*/
  ET.ap(R.Apply)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, E2, A>(
  fa: ReaderEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderEither<R1, E1, (a: A) => B>) => ReaderEither<R1 & R2, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed3<URI>['of'] = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad3<URI>['chain'] =
  /*#__PURE__*/
  ET.chain(R.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 3.0.0
 */
export const chainW: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, B> = chain as any

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt3<URI>['alt'] =
  /*#__PURE__*/
  ET.alt(R.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <R2, E2, B>(
  second: () => ReaderEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A | B> = alt as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReaderEither'

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderEither: ReaderEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeReaderValidation = <E>(S: Semigroup<E>): Applicative3C<URI, E> => ({
  map,
  ap: ap_(R.Apply, E.getApplicativeValidation(S)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getAltReaderValidation = <E>(S: Semigroup<E>): Alt3C<URI, E> => {
  return {
    map,
    alt: ET.altValidation(R.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C: Compactable2C<E.URI, E> & Functor2<E.URI> = { ...E.getCompactable(M), ...E.Functor }
  return {
    compact: compact_(R.Functor, C),
    separate: separate_(R.Functor, C)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable3C<URI, E> => {
  const F = E.getFilterable(M)
  return {
    filter: filter(R.Functor, F),
    filterMap: filterMap(R.Functor, F),
    partition: partition(R.Functor, F),
    partitionMap: partitionMap(R.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor3<URI> = {
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed3<URI> = {
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply3<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative3<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad3<URI> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(first: ReaderEither<R1, E1, A>) => ReaderEither<R1 & R2, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt3<URI> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither3<URI> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_<URI>({
    map,
    of,
    chain,
    fromEither
  })

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderEither<R, E1, A>
  ) => ReaderEither<R, E1 | E2, A>
} = filterOrElse

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderEither<unknown, never, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderEither<unknown, never, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <R2, E2, B>(
  fb: ReaderEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderEither<R1, E1, A>
) => ReaderEither<R1 & R2, E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderEither<R, E, B>
) => (as: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>> = (f) =>
  flow(R.traverseReadonlyArrayWithIndex(f), R.map(E.sequenceReadonlyArray))

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (as: ReadonlyArray<A>) => ReaderEither<R, E, ReadonlyArray<B>> = (f) =>
  traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  as: ReadonlyArray<ReaderEither<R, E, A>>
) => ReaderEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArray(identity)
