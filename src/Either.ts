/**
 * ```ts
 * type Either<E, A> = Left<E> | Right<A>
 * ```
 *
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values. In this usage,
 * `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`. Convention
 * dictates that `Left` is used for failure and `Right` is used for success.
 *
 * @since 3.0.0
 */
import * as AltModule from './Alt'
import * as ApplicativeModule from './Applicative'
import * as ApplyModule from './Apply'
import * as BifunctorModule from './Bifunctor'
import * as ChainModule from './Chain'
import * as ChainRecModule from './ChainRec'
import * as CompactableModule from './Compactable'
import * as EqModule from './Eq'
import * as ExtendModule from './Extend'
import * as FilterableModule from './Filterable'
import * as FoldableModule from './Foldable'
import * as FromEitherModule from './FromEither'
import { flow, identity, Lazy, pipe } from './function'
import * as FunctorModule from './Functor'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import * as MonadModule from './Monad'
import type { Monoid } from './Monoid'
import type { NonEmptyArray } from './NonEmptyArray'
import type { Option } from './Option'
import * as PointedModule from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
import type { Show } from './Show'
import * as TraversableModule from './Traversable'
import * as WitherableModule from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * @category model
 * @since 3.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @category model
 * @since 3.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 3.0.0
 */
export const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E> = _.isLeft

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 3.0.0
 */
export const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A> = _.isRight

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, A = never>(e: E) => Either<E, A> = _.left

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, E = never>(a: A) => Either<E, A> = _.right

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const onLeft = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`
 *
 * const onRight = (value: number): string => `Ok: ${value}`
 *
 * assert.strictEqual(
 *   pipe(
 *     E.right(1),
 *     E.match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     E.left(['error 1', 'error 2']),
 *     E.match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const match = <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C) => (ma: Either<E, A>): B | C =>
  isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('error'),
 *     E.getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse = <E, B>(onLeft: (e: E) => B) => <A>(ma: Either<E, A>): A | B =>
  isLeft(ma) ? onLeft(ma.left) : ma.right

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const parse = E.fromNullable(() => 'nully')
 *
 * assert.deepStrictEqual(parse(1), E.right(1))
 * assert.deepStrictEqual(parse(null), E.left('nully'))
 *
 * @category interop
 * @since 3.0.0
 */
export const fromNullable = <E>(e: Lazy<E>) => <A>(a: A): Either<E, NonNullable<A>> =>
  a == null ? left(e()) : right(a as NonNullable<A>)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK = <E>(
  e: Lazy<E>
): (<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Either<E, NonNullable<B>>) => {
  const from = fromNullable(e)
  return (f) => flow(f, from)
}

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK = <E>(
  e: Lazy<E>
): (<A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>) =>
  flow(fromNullableK(e), chain)

/**
 * Constructs a new `Either` from a function that might throw.
 *
 * See also [`tryCatchK`](#tryCatchK).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const unsafeHead = <A>(as: ReadonlyArray<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: ReadonlyArray<A>): E.Either<unknown, A> =>
 *   E.tryCatch(() => unsafeHead(as))
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch = <A>(f: Lazy<A>): Either<unknown, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(e)
  }
}

/**
 * Converts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK = <A extends ReadonlyArray<unknown>, B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
): ((...a: A) => Either<E, B>) => (...a) =>
  pipe(
    tryCatch(() => f(...a)),
    mapLeft(onThrow)
  )

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion: <E, A>(fa: Either<E, A>) => E | A = /*#__PURE__*/ match(identity, identity)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 3.0.0
 */
export const swap = <E, A>(ma: Either<E, A>): Either<A, E> => (isLeft(ma) ? right(ma.left) : left(ma.right))

/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElse = <E1, E2, B>(onLeft: (e: E1) => Either<E2, B>) => <A>(ma: Either<E1, A>): Either<E2, A | B> =>
  isLeft(ma) ? onLeft(ma.left) : ma

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Either<E, A>) => Either<G, B> = (f, g) => (
  fa
) => (isLeft(fa) ? left(f(fa.left)) : right(g(fa.right)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(
  f: (e: E) => G
) => <A>(fea: Either<E, A>) => Either<G, A> = /*#__PURE__*/ BifunctorModule.mapLeftDefault<EitherF>(bimap)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E1 | E2, B> = (fa) => (
  fab
) => (isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right)))

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, E = never>(a: A) => Either<E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain = <A, E2, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>): Either<E1 | E2, B> =>
  isLeft(ma) ? ma : f(ma.right)

/**
 * @category ChainRec
 * @since 3.0.0
 */
export const chainRec: <A, E, B>(f: (a: A) => Either<E, Either<A, B>>) => (a: A) => Either<E, B> = (f) =>
  flow(
    f,
    ChainRecModule.tailRec((e) =>
      isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
    )
  )

/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Chain`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <E1, E2, A>(mma: Either<E1, Either<E2, A>>) => Either<E1 | E2, A> = /*#__PURE__*/ chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Either` returns the left-most non-`Left` value (or the right-most `Left` value if both values are `Left`).
 *
 * | x        | y        | pipe(x, alt(() => y) |
 * | -------- | -------- | -------------------- |
 * | left(a)  | left(b)  | left(b)              |
 * | left(a)  | right(2) | right(2)             |
 * | right(1) | left(b)  | right(1)             |
 * | right(1) | right(2) | right(1)             |
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.alt(() => E.left('b'))
 *   ),
 *   E.left('b')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.alt(() => E.right(2))
 *   ),
 *   E.right(2)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.alt(() => E.left('b'))
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.alt(() => E.right(2))
 *   ),
 *   E.right(1)
 * )
 *
 * @category instance operations
 * @since 3.0.0
 */
export const alt: <E2, B>(second: Lazy<Either<E2, B>>) => <E1, A>(first: Either<E1, A>) => Either<E2, A | B> = (
  that
) => (fa) => (isLeft(fa) ? that() : fa)

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B> = (f) => (wa) =>
  isLeft(wa) ? wa : right(f(wa))

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>> = /*#__PURE__*/ extend(identity)

/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix',
 * )
 *
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(b, fa.right)

/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import * as E from 'fp-ts/Either'
 * import { Monoid } from 'fp-ts/string'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(Monoid)(yell)),
 *   'a!',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(Monoid)(yell)),
 *   Monoid.empty,
 * )
 *
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <E>(fa: Either<E, A>) => M = (M) => (f) => (fa) =>
  isLeft(fa) ? M.empty : f(fa.right)

/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix',
 * )
 *
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(fa.right, b)

/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.Applicative)(RA.head)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none,
 * )
 *
 * @category Traversable
 * @since 3.0.0
 */
export const traverse = <F extends HKT>(F: ApplicativeModule.Applicative<F>) => <A, FS, FR, FW, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FW, FE, B>
) => <E>(ta: Either<E, A>): Kind<F, FS, FR, FW, FE, Either<E, B>> =>
  isLeft(ta) ? F.of(left(ta.left)) : pipe(f(ta.right), F.map(right))

/**
 * @category Traversable
 * @since 3.0.0
 */
export const sequence: <F extends HKT>(
  F: ApplicativeModule.Applicative<F>
) => <E, FS, FR, FW, FE, A>(
  fa: Either<E, Kind<F, FS, FR, FW, FE, A>>
) => Kind<F, FS, FR, FW, FE, Either<E, A>> = TraversableModule.sequenceDefault<EitherF>(traverse)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface EitherF extends HKT {
  readonly type: Either<this['Covariant2'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface EitherFFixedE<E> extends HKT {
  readonly type: Either<E, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> => ({
  show: (ma) => (isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq = <E, A>(EE: EqModule.Eq<E>, EA: EqModule.Eq<A>): EqModule.Eq<Either<E, A>> =>
  EqModule.fromEquals((second) => (first) =>
    isLeft(first)
      ? isLeft(second) && EE.equals(second.left)(first.left)
      : isRight(second) && EA.equals(second.right)(first.right)
  )

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = E.getSemigroup<number, string>(N.SemigroupSum)
 * assert.deepStrictEqual(pipe(E.left('a'), S.concat(E.left('b'))), E.left('a'))
 * assert.deepStrictEqual(pipe(E.left('a'), S.concat(E.right(2))), E.right(2))
 * assert.deepStrictEqual(pipe(E.right(1), S.concat(E.left('b'))), E.right(1))
 * assert.deepStrictEqual(pipe(E.right(1), S.concat(E.right(2))), E.right(3))
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A, E>(S: Semigroup<A>): Semigroup<Either<E, A>> => ({
  concat: (second) => (first) =>
    isLeft(second) ? first : isLeft(first) ? second : right(S.concat(second.right)(first.right))
})

/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): CompactableModule.Compactable<EitherFFixedE<E>> => {
  const empty = left(M.empty)

  const compact: <A>(foa: Either<E, Option<A>>) => Either<E, A> = (ma) =>
    isLeft(ma) ? ma : _.isNone(ma.right) ? empty : right(ma.right.value)

  const separate: <A, B>(fe: Either<E, Either<A, B>>) => Separated<Either<E, A>, Either<E, B>> = (ma) =>
    isLeft(ma)
      ? separated(ma, ma)
      : isLeft(ma.right)
      ? separated(right(ma.right.left), empty)
      : separated(empty, right(ma.right.right))

  return {
    compact,
    separate
  }
}

/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side.
 *
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): FilterableModule.Filterable<EitherFFixedE<E>> => {
  const empty = left(M.empty)

  const partitionMap = <A, B, C>(f: (a: A) => Either<B, C>) => (
    ma: Either<E, A>
  ): Separated<Either<E, B>, Either<E, C>> => {
    if (isLeft(ma)) {
      return separated(ma, ma)
    }
    const e = f(ma.right)
    return isLeft(e) ? separated(right(e.left), empty) : separated(empty, right(e.right))
  }

  const partition = <A>(p: Predicate<A>) => (ma: Either<E, A>): Separated<Either<E, A>, Either<E, A>> => {
    return isLeft(ma)
      ? separated(ma, ma)
      : p(ma.right)
      ? separated(empty, right(ma.right))
      : separated(right(ma.right), empty)
  }

  const filterMap = <A, B>(f: (a: A) => Option<B>) => (ma: Either<E, A>): Either<E, B> => {
    if (isLeft(ma)) {
      return ma
    }
    const ob = f(ma.right)
    return _.isNone(ob) ? empty : right(ob.value)
  }

  const filter = <A>(predicate: Predicate<A>) => (ma: Either<E, A>): Either<E, A> =>
    isLeft(ma) ? ma : predicate(ma.right) ? ma : empty

  return {
    filter,
    filterMap,
    partition,
    partitionMap
  }
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 3.0.0
 */
export const getWitherable = <E>(M: Monoid<E>): WitherableModule.Witherable<EitherFFixedE<E>> => {
  const C = getCompactable(M)
  const T: TraversableModule.Traversable<EitherFFixedE<E>> = { map, traverse, sequence }
  return {
    wither: WitherableModule.witherDefault(T, C),
    wilt: WitherableModule.wiltDefault(T, C)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: BifunctorModule.Bifunctor<EitherF> = {
  bimap,
  mapLeft
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(
  f: (a: A) => B
) => <E>(fa: Either<E, A>) => Either<E, B> = /*#__PURE__*/ BifunctorModule.mapDefault<EitherF>(bimap)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: FunctorModule.Functor<EitherF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Either<E, (a: A) => B>) => Either<E, B> = /*#__PURE__*/ FunctorModule.flap(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: PointedModule.Pointed<EitherF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: ApplyModule.Apply<EitherF> = {
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
export const apFirst: <E2, B>(
  second: Either<E2, B>
) => <E1, A>(first: Either<E1, A>) => Either<E1 | E2, A> = /*#__PURE__*/ ApplyModule.apFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <E2, B>(
  second: Either<E2, B>
) => <E1, A>(first: Either<E1, A>) => Either<E1 | E2, B> = /*#__PURE__*/ ApplyModule.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: ApplicativeModule.Applicative<EitherF> = {
  map,
  ap,
  of
}

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * @example
 * import * as A from 'fp-ts/Apply'
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const parsePerson = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     E.apS('name', parseString(input.name)),
 *     E.apS('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePerson({}), E.left('not a string')) // <= first error
 *
 * const Applicative = E.getApplicativeValidation(
 *   pipe(string.Semigroup, S.intercalate(', '))
 * )
 *
 * const apS = A.apS(Applicative)
 *
 * const parsePersonAll = (
 *   input: Record<string, unknown>
 * ): E.Either<string, Person> =>
 *   pipe(
 *     E.Do,
 *     apS('name', parseString(input.name)),
 *     apS('age', parseNumber(input.age))
 *   )
 *
 * assert.deepStrictEqual(parsePersonAll({}), E.left('not a string, not a number')) // <= all errors
 *
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeValidation = <E>(S: Semigroup<E>): ApplicativeModule.Applicative<EitherFFixedE<E>> => ({
  map,
  ap: (fa) => (fab) =>
    isLeft(fab) ? (isLeft(fa) ? left(S.concat(fa.left)(fab.left)) : fab) : isLeft(fa) ? fa : right(fab.right(fa.right)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: ChainModule.Chain<EitherF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: MonadModule.Monad<EitherF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(first: Either<E1, A>) => Either<E1 | E2, A> = /*#__PURE__*/ ChainModule.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ChainRec: ChainRecModule.ChainRec<EitherF> = {
  chainRec
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: FoldableModule.Foldable<EitherF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: TraversableModule.Traversable<EitherF> = {
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: AltModule.Alt<EitherF> = {
  map,
  alt
}

/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide an way to concatenate them via a `Semigroup`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as S from 'fp-ts/Semigroup'
 * import * as string from 'fp-ts/string'
 *
 * const parseString = (u: unknown): E.Either<string, string> =>
 *   typeof u === 'string' ? E.right(u) : E.left('not a string')
 *
 * const parseNumber = (u: unknown): E.Either<string, number> =>
 *   typeof u === 'number' ? E.right(u) : E.left('not a number')
 *
 * const parse = (u: unknown): E.Either<string, string | number> =>
 *   pipe(
 *     parseString(u),
 *     E.alt<string, string | number>(() => parseNumber(u))
 *   )
 *
 * assert.deepStrictEqual(parse(true), E.left('not a number')) // <= last error
 *
 * const Alt = E.getAltValidation(pipe(string.Semigroup, S.intercalate(', ')))
 *
 * const parseAll = (u: unknown): E.Either<string, string | number> =>
 *   pipe(parseString(u), Alt.alt(() => parseNumber(u) as E.Either<string, string | number>))
 *
 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
 *
 * @category instances
 * @since 3.0.0
 */
export const getAltValidation = <E>(S: Semigroup<E>): AltModule.Alt<EitherFFixedE<E>> => ({
  map,
  alt: (second) => (first) => {
    if (isRight(first)) {
      return first
    }
    const ea = second()
    return isLeft(ea) ? left(S.concat(ea.left)(first.left)) : ea
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Extend: ExtendModule.Extend<EitherF> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<EitherF> = {
  fromEither: identity
}

/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some(1),
 *     E.fromOption(() => 'error')
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     E.fromOption(() => 'error')
 *   ),
 *   E.left('error')
 * )
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <E>(
  onNone: Lazy<E>
) => <A>(fa: Option<A>) => Either<E, A> = /*#__PURE__*/ FromEitherModule.fromOption(FromEither)

/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     E.fromPredicate((n) => n > 0)
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     E.fromPredicate((n) => n > 0)
 *   ),
 *   E.left(-1)
 * )
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => Either<A, B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => Either<B, B>
  <A>(predicate: Predicate<A>): (a: A) => Either<A, A>
} = /*#__PURE__*/ FromEitherModule.fromPredicate(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => Either<E, B> = /*#__PURE__*/ FromEitherModule.fromOptionK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: Either<E, A>) => Either<E, B> = /*#__PURE__*/ FromEitherModule.chainOptionK(
  FromEither,
  Chain
)

/**
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.right(-1),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     E.left('a'),
 *     E.filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   E.left('a')
 * )
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(mb: Either<E1, B>) => Either<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E1 | E2, A>
} = /*#__PURE__*/ FromEitherModule.filterOrElse(FromEither, Chain)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Tests whether a value is a member of a `Either`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: EqModule.Eq<A>) => (a: A) => <E>(ma: Either<E, A>): boolean =>
  isLeft(ma) ? false : E.equals(ma.right)(a)

/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * const f = E.exists((n: number) => n > 2)
 *
 * assert.strictEqual(f(E.left('a')), false)
 * assert.strictEqual(f(E.right(1)), false)
 * assert.strictEqual(f(E.right(3)), true)
 *
 * @since 3.0.0
 */
export const exists = <A>(predicate: Predicate<A>) => <E>(ma: Either<E, A>): boolean =>
  isLeft(ma) ? false : predicate(ma.right)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: Either<never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <E, A>(fa: Either<E, A>) => Either<E, { readonly [K in N]: A }> = /*#__PURE__*/ FunctorModule.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(
  fa: Either<E, A>
) => Either<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ FunctorModule.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Either<E2, B>
) => <E1>(
  fa: Either<E1, A>
) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ ChainModule.bind(
  Chain
)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(
  fa: Either<E1, A>
) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ ApplyModule.apS(
  Apply
)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: Either<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <E, A>(fa: Either<E, A>) => Either<E, readonly [A]> = /*#__PURE__*/ FunctorModule.tupled(Functor)

/**
 * @since 3.0.0
 */
export const apT: <E2, B>(
  fb: Either<E2, B>
) => <E1, A extends ReadonlyArray<unknown>>(
  fas: Either<E1, A>
) => Either<E1 | E2, readonly [...A, B]> = /*#__PURE__*/ ApplyModule.apT(Apply)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, E, B>(f: (index: number, a: A) => Either<E, B>) => (
  as: ReadonlyNonEmptyArray<A>
): Either<E, ReadonlyNonEmptyArray<B>> => {
  const e = f(0, _.head(as))
  if (isLeft(e)) {
    return e
  }
  const out: NonEmptyArray<B> = [e.right]
  for (let i = 1; i < as.length; i++) {
    const e = f(i, as[i])
    if (isLeft(e)) {
      return e
    }
    out.push(e.right)
  }
  return right(out)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, E, B>(
  f: (a: A) => Either<E, B>
): ((as: ReadonlyNonEmptyArray<A>) => Either<E, ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, E, B>(
  f: (a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <E, A>(
  arr: ReadonlyArray<Either<E, A>>
) => Either<E, ReadonlyArray<A>> = /*#__PURE__*/ traverseReadonlyArray(identity)
