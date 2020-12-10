/**
 * `IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
 * error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative2, Applicative2C } from './Applicative'
import { Bifunctor2 } from './Bifunctor'
import { Compactable2C } from './Compactable'
import * as E from './Either'
import { Filterable2C } from './Filterable'
import { bindTo_, bind_, flow, identity, Lazy, pipe, Predicate, Refinement, tuple } from './function'
import { Functor2 } from './Functor'
import * as I from './IO'
import { Monad2 } from './Monad'
import { MonadIO2 } from './MonadIO'
import { MonadThrow2 } from './MonadThrow'
import { Monoid } from './Monoid'
import { getLeft, getRight, Option } from './Option'
import { Semigroup } from './Semigroup'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either
import IO = I.IO

/**
 * @category model
 * @since 2.0.0
 */
export interface IOEither<E, A> extends IO<Either<E, A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.0.0
 */
export const left: <E = never, A = never>(l: E) => IOEither<E, A> =
  /*#__PURE__*/
  flow(E.left, I.of)

/**
 * @category constructors
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => IOEither<E, A> =
  /*#__PURE__*/
  flow(E.right, I.of)

/**
 * @category constructors
 * @since 2.0.0
 */
export const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A> =
  /*#__PURE__*/
  I.map(E.right)

/**
 * @category constructors
 * @since 2.0.0
 */
export const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A> =
  /*#__PURE__*/
  I.map(E.left)

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A> =
  /*#__PURE__*/
  E.fold(left, (a) => right(a))

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => (a: A) => (predicate(a) ? right(a) : left(onFalse(a)))

/**
 * Constructs a new `IOEither` from a function that performs a side effect and might throw
 *
 * @category constructors
 * @since 2.0.0
 */
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> {
  return () => E.tryCatch(f, onError)
}

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.0.0
 */
export const fold: <E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>) => (ma: IOEither<E, A>) => IO<B> =
  /*#__PURE__*/
  flow(E.fold, I.chain)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
export const getOrElseW = <E, B>(onLeft: (e: E) => IO<B>) => <A>(ma: IOEither<E, A>): IO<A | B> =>
  pipe(ma, I.chain(E.fold<E, A, I.IO<A | B>>(onLeft, I.of)))

/**
 * @category destructors
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => IO<A>) => (ma: IOEither<E, A>) => IO<A> = getOrElseW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.0.0
 */
export const orElse: <E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A> = (f) =>
  I.chain(E.fold(f, right))

/**
 * @category combinators
 * @since 2.0.0
 */
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> =
  /*#__PURE__*/
  I.map(E.swap)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>
} = <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): (<E1>(ma: IOEither<E1, A>) => IOEither<E1 | E2, A>) =>
  chainW((a) => (predicate(a) ? right(a) : left(onFalse(a))))

/**
 * Derivable from `MonadThrow`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
} = filterOrElseW

/**
 * @category combinators
 * @since 2.4.0
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
 * @since 2.6.1
 */
export const chainEitherKW: <E, A, B>(f: (a: A) => Either<E, B>) => <D>(ma: IOEither<D, A>) => IOEither<D | E, B> = (
  f
) => chainW(fromEitherK(f))

/**
 * @category combinators
 * @since 2.4.0
 */
export const chainEitherK: <E, A, B>(
  f: (a: A) => Either<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, B> = chainEitherKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B> = (f) => I.map(E.map(f))

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B> =
  /*#__PURE__*/
  flow(E.bimap, I.map)

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A> = (f) => I.map(E.mapLeft(f))

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
export const apW = <D, A>(fa: IOEither<D, A>): (<E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<D | E, B>) =>
  flow(
    I.map((gab) => (ga: E.Either<D, A>) => E.apW(ga)(gab)),
    I.ap(fa)
  )

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B> = apW

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A> = (fb) =>
  flow(
    map((a) => () => a),
    ap(fb)
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond = <E, B>(fb: IOEither<E, B>): (<A>(fa: IOEither<E, A>) => IOEither<E, B>) =>
  flow(
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @category Applicative
 * @since 2.8.5
 */
export const of: Applicative2<URI>['of'] = right

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
export const chainW = <D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>): IOEither<D | E, B> =>
  pipe(ma, I.chain(E.fold<E, A, IOEither<D | E, B>>(left, f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B> = chainW

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
export const chainFirstW: <D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<D | E, A> = (
  f
) =>
  chainW((a) =>
    pipe(
      f(a),
      map(() => a)
    )
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A> = chainFirstW

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW = <E2, B>(that: Lazy<IOEither<E2, B>>) => <E1, A>(fa: IOEither<E1, A>): IOEither<E1 | E2, A | B> =>
  pipe(fa, I.chain(E.fold<E1, A, IOEither<E1 | E2, A | B>>(that, right)))

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
export const alt: <E, A>(that: Lazy<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A> = altW

/**
 * @category MonadIO
 * @since 2.7.0
 */
export const fromIO: MonadIO2<URI>['fromIO'] = rightIO

/**
 * @category MonadThrow
 * @since 2.7.0
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'IOEither'

/**
 * @category instances
 * @since 2.0.0
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
 * @since 2.0.0
 */
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return I.getSemigroup(E.getSemigroup(S))
}

/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category instances
 * @since 2.0.0
 */
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> {
  return I.getSemigroup(E.getApplySemigroup(S))
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> {
  return {
    concat: getApplySemigroup<E, A>(M).concat,
    empty: right(M.empty)
  }
}

/**
 * @category instances
 * @since 2.7.0
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
 * @since 2.7.0
 */
export function getAltIOValidation<E>(SE: Semigroup<E>): Alt2C<URI, E> {
  const A = E.getAltValidation(SE)
  return {
    URI,
    map,
    alt: (that) => (me) => () =>
      pipe(
        me(),
        A.alt(() => that()())
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
 * @since 2.1.0
 */
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> {
  const F = E.getFilterable(M)

  const filter = <A>(fa: IOEither<E, A>, predicate: Predicate<A>): IOEither<E, A> =>
    pipe(
      fa,
      I.map((ga) => F.filter(ga, predicate))
    )
  const filterMap = <A, B>(fa: IOEither<E, A>, f: (a: A) => Option<B>) =>
    pipe(
      fa,
      I.map((ga) => F.filterMap(ga, f))
    )

  return {
    URI,
    filter,
    filterMap,
    partition: <A>(fa: IOEither<E, A>, predicate: Predicate<A>) => {
      const left = filter(fa, (a) => !predicate(a))
      const right = filter(fa, predicate)
      return { left, right }
    },
    partitionMap: (fa, f) => {
      const left = filterMap(fa, (a) => getLeft(f(a)))
      const right = filterMap(fa, (a) => getRight(f(a)))
      return { left, right }
    }
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 2.8.4
 */
export const ApplicativePar: Applicative2<URI> = {
  URI,
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 2.8.4
 */
export const ApplicativeSeq: Applicative2<URI> = {
  URI,
  map,
  ap: (fa) => chain((f) => pipe(fa, map(f))),
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt2<URI> = {
  URI,
  map,
  alt
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadIO: MonadIO2<URI> = {
  URI,
  fromIO: fromIO
}

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadThrow: MonadThrow2<URI> = {
  URI,
  throwError
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `MonadThrow`.
 *
 * @since 2.0.0
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
 * @since 2.9.0
 */
export const Do: IOEither<never, {}> = of({})

/**
 * @since 2.8.0
 */
export const bindTo = <N extends string>(name: N): (<E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }>) =>
  map(bindTo_(name))

/**
 * @since 2.8.0
 */
export const bindW = <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<D, B>
): (<E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  chainW((a) =>
    pipe(
      f(a),
      map((b) => bind_(a, name, b))
    )
  )

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bindW

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apSW = <A, N extends string, D, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<D, B>
): (<E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  flow(
    map((a) => (b: B) => bind_(a, name, b)),
    apW(fb)
  )

/**
 * @since 2.8.0
 */
export const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apSW

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
export const apTW = <E2, B>(fb: IOEither<E2, B>) => <E1, A extends ReadonlyArray<unknown>>(
  fas: IOEither<E1, A>
): IOEither<E1 | E2, readonly [...A, B]> =>
  pipe(
    fas,
    map((a) => (b: B): readonly [...A, B] => [...a, b]),
    apW(fb)
  )

/**
 * @since 3.0.0
 */
export const apT: <E, B>(
  fb: IOEither<E, B>
) => <A extends ReadonlyArray<unknown>>(fas: IOEither<E, A>) => IOEither<E, readonly [...A, B]> = apTW

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) =>
  flow(I.traverseArrayWithIndex(f), I.map(E.sequenceArray))

/**
 * @since 2.9.0
 */
export const traverseArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) => traverseArrayWithIndex((_, a) => f(a))

/**
 *
 * @since 2.9.0
 */
export const sequenceArray: <E, A>(arr: ReadonlyArray<IOEither<E, A>>) => IOEither<E, ReadonlyArray<A>> = traverseArray(
  identity
)

/**
 * @since 2.9.0
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
 * @since 2.9.0
 */
export const traverseSeqArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (arr: ReadonlyArray<A>) => IOEither<E, ReadonlyArray<B>> = (f) => traverseSeqArrayWithIndex((_, a) => f(a))

/**
 * @since 2.9.0
 */
export const sequenceSeqArray: <E, A>(
  arr: ReadonlyArray<IOEither<E, A>>
) => IOEither<E, ReadonlyArray<A>> = traverseSeqArray(identity)
