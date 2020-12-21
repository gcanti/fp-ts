/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 3.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { apFirst_, Apply2, apSecond_, apS_, apT_ } from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { Compactable2C } from './Compactable'
import * as E from './Either'
import {
  alt_,
  ap_,
  bimap_,
  chain_,
  fold_,
  getOrElse_,
  leftF_,
  left_,
  mapLeft_,
  map_,
  orElse_,
  rightF_,
  right_,
  swap_
} from './EitherT'
import { Filterable2C } from './Filterable'
import { FromEither2, fromOption_, fromPredicate_ } from './FromEither'
import { flow, identity, Lazy, pipe, Predicate, Refinement, tuple } from './function'
import { bindTo_, Functor2 } from './Functor'
import * as I from './IO'
import { bind_, chainFirst_, Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { Monoid } from './Monoid'
import { getLeft, getRight, Option } from './Option'
import { Pointed2 } from './Pointed'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either
import IO = I.IO

/**
 * @category model
 * @since 3.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => IOEither<E, A> =
  /*#__PURE__*/
  left_(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => IOEither<E, A> =
  /*#__PURE__*/
  right_(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, E = never>(ma: IO<A>) => IOEither<E, A> =
  /*#__PURE__*/
  rightF_(I.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, A = never>(me: IO<E>) => IOEither<E, A> =
  /*#__PURE__*/
  leftF_(I.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  E.fold(left, (a) => right(a))

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @category constructors
 * @since 3.0.0
 */
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> {
  return () => E.tryCatch(f, onError)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const fold: <E, B, A>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  fold_(I.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> =
  /*#__PURE__*/
  getOrElse_(I.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>) => IO<A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse: <E1, E2, A>(onLeft: (e: E1) => IOEither<E2, A>) => (ma: IOEither<E1, A>) => IOEither<E2, A> =
  /*#__PURE__*/
  orElse_(I.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> =
  /*#__PURE__*/
  swap_(I.Functor)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
} = <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): (<E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>) =>
  chainW((a) => (predicate(a) ? right(a) : left(onFalse(a))))

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} = filterOrElseW

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = (f) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, B> = chainEitherKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  map_(I.Functor)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor2<URI>['bimap'] =
  /*#__PURE__*/
  bimap_(I.Functor)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  mapLeft_(I.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply2<URI>['ap'] =
  /*#__PURE__*/
  ap_(I.Applicative)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E1 | E2, B> = ap as any

/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 3.0.0
 */
export const of: Pointed2<URI>['of'] = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 3.0.0
 */
export const chain: Monad2<URI>['chain'] =
  /*#__PURE__*/
  chain_(I.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 3.0.0
 */
export const chainW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, B> = chain as any

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt2<URI>['alt'] =
  /*#__PURE__*/
  alt_(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <E2, B>(
  second: Lazy<IOEither<E2, B>>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E1 | E2, A | B> = alt as any

/**
 * @category MonadIO
 * @since 3.0.0
 */
export const fromIO: MonadIO2<URI>['fromIO'] = rightIO

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const URI = 'IOEither'

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: IOEither<E, A>
  }
}

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 3.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return I.getSemigroup(E.getSemigroup(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 3.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return I.getSemigroup(E.getApplySemigroup(S))
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getApplicativeIOValidation<E>(SE: Semigroup<E>): Applicative2C<URI, E> {
  const AV = E.getApplicativeValidation(SE)
  const ap = <A>(fga: I.IO<E.Either<E, A>>): (<B>(fgab: I.IO<E.Either<E, (a: A) => B>>) => I.IO<E.Either<E, B>>) =>
    flow(
      I.map((gab) => (ga: E.Either<E, A>) => pipe(gab, AV.ap(ga))),
      I.ap(fga)
    )

  return {
    URI,
    map,
    ap,
    of
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getAltIOValidation<E>(SE: Semigroup<E>): Alt2C<URI, E> {
  const A = E.getAltValidation(SE)
  return {
    URI,
    map,
    alt: (second) => (first) => () =>
      pipe(
        first(),
        A.alt(() => second()())
      )
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getCompactable<E>(M: Monoid<E>): Compactable2C<URI, E> {
  const C = E.getCompactable(M)
  return {
    URI,
    compact: I.map(C.compact),
    separate: (fe) => ({
      left: pipe(
        fe,
        I.map(
          E.fold(
            E.left,
            E.fold(
              (a) => E.right(a),
              () => E.left(M.empty)
            )
          )
        )
      ),
      right: pipe(
        fe,
        I.map(
          E.fold(
            E.left,
            E.fold(
              () => E.left(M.empty),
              (b) => E.right(b)
            )
          )
        )
      )
    })
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getFilterable(M)

  const filter: <A>(predicate: Predicate<A>) => (fa: IOEither<E, A>) => IOEither<E, A> = (predicate) =>
    I.map(F.filter(predicate))
  const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: IOEither<E, A>) => IOEither<E, B> = (f) =>
    I.map(F.filterMap(f))

  return {
    URI,
    filter,
    filterMap,
    partition: <A>(predicate: Predicate<A>) => (fa: IOEither<E, A>) => {
      const left = pipe(
        fa,
        filter((a) => !predicate(a))
      )
      const right = pipe(fa, filter(predicate))
      return { left, right }
    },
    partitionMap: (f) => (fa) => {
      const left = pipe(
        fa,
        filterMap((a) => getLeft(f(a)))
      )
      const right = pipe(
        fa,
        filterMap((a) => getRight(f(a)))
      )
      return { left, right }
    }
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  map,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map,
  ap: (fa) => chain((f) => pipe(fa, map(f))),
  of
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  apFirst_(ApplicativePar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, B> =
  /*#__PURE__*/
  apSecond_(ApplicativePar)

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad2<URI> = {
  URI,
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
export const chainFirst: <A, E, B>(f: (a: A) => IOEither<E, B>) => (first: IOEither<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(first: IOEither<E1, A>) => IOEither<E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt2<URI> = {
  URI,
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MonadIO: MonadIO2<URI> = {
  URI,
  fromIO: fromIO
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A> =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
} =
  /*#__PURE__*/
  fromPredicate_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * @since 3.0.0
 */
export const bracket = <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> =>
  pipe(
    acquire,
    chain((a) =>
      pipe(
        pipe(use(a), I.map(E.right)),
        chain((e) =>
          pipe(
            release(a, e),
            chain(() => (E.isLeft(e) ? left(e.left) : of(e.right)))
          )
        )
      )
    )
  )

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IOEither<never, {}> = of({})

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }> =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  bind_(Monad)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/
  apS_(ApplicativePar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// pipeable sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IOEither<never, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(a: IOEither<E, A>) => IOEither<E, readonly [A]> = map(tuple)

/**
 * @since 3.0.0
 */
export const apT: <E, B>(
  fb: IOEither<E, B>
) => <A extends ReadonlyArray<unknown>>(fas: IOEither<E, A>) => IOEither<E, readonly [...A, B]> =
  /*#__PURE__*/
  apT_(ApplicativePar)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(fas: IOEither<E1, A>) => IOEither<E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) =>
  flow(I.traverseArrayWithIndex(f), I.map(E.sequenceArray))

/**
 * @since 3.0.0
 */
export const traverseArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 *
 * @since 3.0.0
 */
export const sequenceArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> = traverseArray(
  identity
)

/**
 * @since 3.0.0
 */
export const traverseSeqArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) => (arr) => () => {
  // tslint:disable-next-line: readonly-array
  const out = []
  for (let i = 0; i < arr.length; i++) {
    const b = f(i, arr[i])()
    if (E.isLeft(b)) {
      return b
    }
    out.push(b.right)
  }
  return E.right(out)
}

/**
 * @since 3.0.0
 */
export const traverseSeqArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) => traverseSeqArrayWithIndex((_, a) => f(a))

/**
 * @since 3.0.0
 */
export const sequenceSeqArray: <E, A>(
  arr: ReadonlyArray<IOEither<E, A>>
) => IOEither<E, ReadonlyArray<A>> = traverseSeqArray(identity)
