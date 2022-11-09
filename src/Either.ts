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
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 *
 * export const imperative = (as: ReadonlyArray<number>): string => {
 *   const head = (as: ReadonlyArray<number>): number => {
 *     if (as.length === 0) {
 *       throw new Error('empty array')
 *     }
 *     return as[0]
 *   }
 *   const inverse = (n: number): number => {
 *     if (n === 0) {
 *       throw new Error('cannot divide by zero')
 *     }
 *     return 1 / n
 *   }
 *   try {
 *     return `Result is ${inverse(double(head(as)))}`
 *   } catch (err: any) {
 *     return `Error is ${err.message}`
 *   }
 * }
 *
 * export const functional = (as: ReadonlyArray<number>): string => {
 *   const head = <A>(as: ReadonlyArray<A>): E.Either<string, A> =>
 *     as.length === 0 ? E.left('empty array') : E.right(as[0])
 *   const inverse = (n: number): E.Either<string, number> =>
 *     n === 0 ? E.left('cannot divide by zero') : E.right(1 / n)
 *   return pipe(
 *     as,
 *     head,
 *     E.map(double),
 *     E.chain(inverse),
 *     E.match(
 *       (err) => `Error is ${err}`, // onLeft handler
 *       (head) => `Result is ${head}` // onRight handler
 *     )
 *   )
 * }
 *
 * assert.deepStrictEqual(imperative([1, 2, 3]), functional([1, 2, 3]))
 * assert.deepStrictEqual(imperative([]), functional([]))
 * assert.deepStrictEqual(imperative([0]), functional([0]))
 *
 * @since 2.0.0
 */
import { Alt2, Alt2C } from './Alt'
import { Applicative as ApplicativeHKT, Applicative2, Applicative2C, getApplicativeMonoid } from './Applicative'
import {
  apFirst as apFirst_,
  Apply2,
  apS as apS_,
  apSecond as apSecond_,
  getApplySemigroup as getApplySemigroup_
} from './Apply'
import { Bifunctor2 } from './Bifunctor'
import { bind as bind_, Chain2, chainFirst as chainFirst_ } from './Chain'
import { ChainRec2, ChainRec2C, tailRec } from './ChainRec'
import { Compactable2C } from './Compactable'
import { Eq } from './Eq'
import { Extend2 } from './Extend'
import { Filterable2C } from './Filterable'
import { Foldable2 } from './Foldable'
import {
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither2,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { flow, identity, Lazy, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor2, let as let__ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import { Monad2, Monad2C } from './Monad'
import { MonadThrow2, MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { NonEmptyArray } from './NonEmptyArray'
import { Option } from './Option'
import { Pointed2 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import { Separated, separated } from './Separated'
import { Show } from './Show'
import { PipeableTraverse2, Traversable2 } from './Traversable'
import { wiltDefault, Witherable2C, witherDefault } from './Witherable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.0.0
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * @category model
 * @since 2.0.0
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * @category model
 * @since 2.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export const left: <E = never, A = never>(e: E) => Either<E, A> = _.left

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
export const right: <E = never, A = never>(a: A) => Either<E, A> = _.right

const _map: Monad2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _ap: Monad2<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad2<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _reduce: Foldable2<URI>['reduce'] = (fa, b, f) => pipe(fa, reduce(b, f))
/* istanbul ignore next */
const _foldMap: Foldable2<URI>['foldMap'] = (M) => (fa, f) => {
  const foldMapM = foldMap(M)
  return pipe(fa, foldMapM(f))
}
/* istanbul ignore next */
const _reduceRight: Foldable2<URI>['reduceRight'] = (fa, b, f) => pipe(fa, reduceRight(b, f))
const _traverse = <F>(
  F: ApplicativeHKT<F>
): (<E, A, B>(ta: Either<E, A>, f: (a: A) => HKT<F, B>) => HKT<F, Either<E, B>>) => {
  const traverseF = traverse(F)
  return (ta, f) => pipe(ta, traverseF(f))
}
const _bimap: Bifunctor2<URI>['bimap'] = (fa, f, g) => pipe(fa, bimap(f, g))
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
/* istanbul ignore next */
const _alt: Alt2<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _extend: Extend2<URI>['extend'] = (wa, f) => pipe(wa, extend(f))
const _chainRec: ChainRec2<URI>['chainRec'] = (a, f) =>
  tailRec(f(a), (e) =>
    isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right))
  )

/**
 * @category type lambdas
 * @since 2.0.0
 */
export const URI = 'Either'

/**
 * @category type lambdas
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Either<E, A>
  }
}

/**
 * @category instances
 * @since 2.0.0
 */
export const getShow = <E, A>(SE: Show<E>, SA: Show<A>): Show<Either<E, A>> => ({
  show: (ma) => (isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`)
})

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq = <E, A>(EL: Eq<E>, EA: Eq<A>): Eq<Either<E, A>> => ({
  equals: (x, y) =>
    x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right))
})

/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { SemigroupSum } from 'fp-ts/number'
 *
 * const S = getSemigroup<string, number>(SemigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup = <E, A>(S: Semigroup<A>): Semigroup<Either<E, A>> => ({
  concat: (x, y) => (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right)))
})

/**
 * Builds a `Compactable` instance for `Either` given `Monoid` for the left side.
 *
 * @category filtering
 * @since 2.10.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable2C<URI, E> => {
  const empty = left(M.empty)
  return {
    URI,
    _E: undefined as any,
    compact: (ma) => (isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value)),
    separate: (ma) =>
      isLeft(ma)
        ? separated(ma, ma)
        : isLeft(ma.right)
        ? separated(right(ma.right.left), empty)
        : separated(empty, right(ma.right.right))
  }
}

/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.10.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable2C<URI, E> => {
  const empty = left(M.empty)

  const { compact, separate } = getCompactable(M)

  const filter = <A>(ma: Either<E, A>, predicate: Predicate<A>): Either<E, A> =>
    isLeft(ma) ? ma : predicate(ma.right) ? ma : empty

  const partition = <A>(ma: Either<E, A>, p: Predicate<A>): Separated<Either<E, A>, Either<E, A>> => {
    return isLeft(ma)
      ? separated(ma, ma)
      : p(ma.right)
      ? separated(empty, right(ma.right))
      : separated(right(ma.right), empty)
  }

  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact,
    separate,
    filter,
    filterMap: (ma, f) => {
      if (isLeft(ma)) {
        return ma
      }
      const ob = f(ma.right)
      return ob._tag === 'None' ? empty : right(ob.value)
    },
    partition,
    partitionMap: (ma, f) => {
      if (isLeft(ma)) {
        return separated(ma, ma)
      }
      const e = f(ma.right)
      return isLeft(e) ? separated(right(e.left), empty) : separated(empty, right(e.right))
    }
  }
}

/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category filtering
 * @since 2.0.0
 */
export const getWitherable = <E>(M: Monoid<E>): Witherable2C<URI, E> => {
  const F_ = getFilterable(M)
  const C = getCompactable(M)
  return {
    URI,
    _E: undefined as any,
    map: _map,
    compact: F_.compact,
    separate: F_.separate,
    filter: F_.filter,
    filterMap: F_.filterMap,
    partition: F_.partition,
    partitionMap: F_.partitionMap,
    traverse: _traverse,
    sequence,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    wither: witherDefault(Traversable, C),
    wilt: wiltDefault(Traversable, C)
  }
}

/**
 * The default [`Applicative`](#applicative) instance returns the first error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
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
 * @category error handling
 * @since 2.7.0
 */
export const getApplicativeValidation = <E>(SE: Semigroup<E>): Applicative2C<URI, E> => ({
  URI,
  _E: undefined as any,
  map: _map,
  ap: (fab, fa) =>
    isLeft(fab)
      ? isLeft(fa)
        ? left(SE.concat(fab.left, fa.left))
        : fab
      : isLeft(fa)
      ? fa
      : right(fab.right(fa.right)),
  of
})

/**
 * The default [`Alt`](#alt) instance returns the last error, if you want to
 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
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
 *   Alt.alt<string | number>(parseString(u), () => parseNumber(u))
 *
 * assert.deepStrictEqual(parseAll(true), E.left('not a string, not a number')) // <= all errors
 *
 * @category error handling
 * @since 2.7.0
 */
export const getAltValidation = <E>(SE: Semigroup<E>): Alt2C<URI, E> => ({
  URI,
  _E: undefined as any,
  map: _map,
  alt: (me, that) => {
    if (isRight(me)) {
      return me
    }
    const ea = that()
    return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea
  }
})

/**
 * @category mapping
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Either<E, A>) => Either<E, B> = (f) => (fa) =>
  isLeft(fa) ? fa : right(f(fa.right))

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * @category constructors
 * @since 2.7.0
 */
export const of: <E = never, A = never>(a: A) => Either<E, A> = right

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = {
  URI,
  of
}

/**
 * Less strict version of [`ap`](#ap).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.8.0
 */
export const apW: <E2, A>(fa: Either<E2, A>) => <E1, B>(fab: Either<E1, (a: A) => B>) => Either<E1 | E2, B> =
  (fa) => (fab) =>
    isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right))

/**
 * @since 2.0.0
 */
export const ap: <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>) => Either<E, B> = apW

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply2<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * Less strict version of [`chain`](#chain).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * const e1: E.Either<string, number> = E.right(1)
 * const e2: E.Either<number, number> = E.right(2)
 *
 * export const result1 = pipe(
 *   // @ts-expect-error
 *   e1,
 *   E.chain(() => e2)
 * )
 *
 * // merged error types -----v-------------v
 * // const result2: E.Either<string | number, number>
 * export const result2 = pipe(
 *   e1, // no error
 *   E.chainW(() => e2)
 * )
 *
 * @category sequencing
 * @since 2.6.0
 */
export const chainW =
  <E2, A, B>(f: (a: A) => Either<E2, B>) =>
  <E1>(ma: Either<E1, A>): Either<E1 | E2, B> =>
    isLeft(ma) ? ma : f(ma.right)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category sequencing
 * @since 2.0.0
 */
export const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B> = chainW

/**
 * @category instances
 * @since 2.10.0
 */
export const Chain: Chain2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

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
 *   'prefix:a'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix'
 * )
 *
 * @category folding
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(b, fa.right)

/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as S from 'fp-ts/string'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(S.Monoid)(yell)),
 *   'a!'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(S.Monoid)(yell)),
 *   S.Monoid.empty
 * )
 *
 * @category folding
 * @since 2.0.0
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
 *   'a:postfix'
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix'
 * )
 *
 * @category folding
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <E>(fa: Either<E, A>) => B = (b, f) => (fa) =>
  isLeft(fa) ? b : f(fa.right, b)

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable2<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}

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
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.Applicative)(RA.head)),
 *   O.none
 * )
 *
 * @category traversing
 * @since 2.6.3
 */
export const traverse: PipeableTraverse2<URI> =
  <F>(F: ApplicativeHKT<F>) =>
  <A, B>(f: (a: A) => HKT<F, B>) =>
  <E>(ta: Either<E, A>): HKT<F, Either<E, B>> =>
    isLeft(ta) ? F.of(left(ta.left)) : F.map<B, Either<E, B>>(f(ta.right), right)

/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.Applicative)),
 *   O.some(E.right('a'))
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.Applicative)),
 *   O.none
 * )
 *
 * @category traversing
 * @since 2.6.3
 */
export const sequence: Traversable2<URI>['sequence'] =
  <F>(F: ApplicativeHKT<F>) =>
  <E, A>(ma: Either<E, HKT<F, A>>): HKT<F, Either<E, A>> => {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map<A, Either<E, A>>(ma.right, right)
  }

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable2<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category mapping
 * @since 2.0.0
 */
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Either<E, A>) => Either<G, B> =
  (f, g) => (fa) =>
    isLeft(fa) ? left(f(fa.left)) : right(g(fa.right))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category error handling
 * @since 2.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Either<E, A>) => Either<G, A> = (f) => (fa) =>
  isLeft(fa) ? left(f(fa.left)) : fa

/**
 * @category instances
 * @since 2.7.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  bimap: _bimap,
  mapLeft: _mapLeft
}

/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
 *
 * @category error handling
 * @since 2.9.0
 */
export const altW: <E2, B>(that: Lazy<Either<E2, B>>) => <E1, A>(fa: Either<E1, A>) => Either<E2, A | B> =
  (that) => (fa) =>
    isLeft(fa) ? that() : fa

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
 * @category error handling
 * @since 2.0.0
 */
export const alt: <E, A>(that: Lazy<Either<E, A>>) => (fa: Either<E, A>) => Either<E, A> = altW

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt2<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @since 2.0.0
 */
export const extend: <E, A, B>(f: (wa: Either<E, A>) => B) => (wa: Either<E, A>) => Either<E, B> = (f) => (wa) =>
  isLeft(wa) ? wa : right(f(wa))

/**
 * @category instances
 * @since 2.7.0
 */
export const Extend: Extend2<URI> = {
  URI,
  map: _map,
  extend: _extend
}

/**
 * @category instances
 * @since 2.7.0
 */
export const ChainRec: ChainRec2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain,
  chainRec: _chainRec
}

/**
 * @since 2.6.3
 */
export const throwError: MonadThrow2<URI>['throwError'] = left

/**
 * @category instances
 * @since 2.7.0
 */
export const MonadThrow: MonadThrow2<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  throwError
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromEither: FromEither2<URI> = {
  URI,
  fromEither: identity
}

/**
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
 * @category lifting
 * @since 2.0.0
 */
export const fromPredicate: {
  <A, B extends A, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): <B extends A>(b: B) => Either<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Either<E, A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

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
 * @category conversions
 * @since 2.0.0
 */
export const fromOption: <E>(onNone: Lazy<E>) => <A>(fa: Option<A>) => Either<E, A> =
  /*#__PURE__*/ fromOption_(FromEither)

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
export const isLeft: <E>(ma: Either<E, unknown>) => ma is Left<E> = _.isLeft

/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category refinements
 * @since 2.0.0
 */
export const isRight: <A>(ma: Either<unknown, A>) => ma is Right<A> = _.isRight

/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.10.0
 */
export const matchW =
  <E, B, A, C>(onLeft: (e: E) => B, onRight: (a: A) => C) =>
  (ma: Either<E, A>): B | C =>
    isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)

/**
 * Alias of [`matchW`](#matchw).
 *
 * @category pattern matching
 * @since 2.10.0
 */
export const foldW = matchW

/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { match, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     match(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     match(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category pattern matching
 * @since 2.10.0
 */
export const match: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B = matchW

/**
 * Alias of [`match`](#match).
 *
 * @category pattern matching
 * @since 2.0.0
 */
export const fold: <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>) => B = match

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.6.0
 */
export const getOrElseW =
  <E, B>(onLeft: (e: E) => B) =>
  <A>(ma: Either<E, A>): A | B =>
    isLeft(ma) ? onLeft(ma.left) : ma.right

/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category error handling
 * @since 2.0.0
 */
export const getOrElse: <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>) => A = getOrElseW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category mapping
 * @since 2.10.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.0.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(Apply)

/**
 * Less strict version of [`apFirst`](#apfirst)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
export const apFirstW: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E1 | E2, A> =
  apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.0.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(Apply)

/**
 * Less strict version of [`apSecond`](#apsecond)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @since 2.12.0
 */
export const apSecondW: <E2, B>(second: Either<E2, B>) => <E1, A>(first: Either<E1, A>) => Either<E1 | E2, B> =
  apSecond as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.0.0
 */
export const chainFirst: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, A> =
  /*#__PURE__*/ chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainfirst)
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.8.0
 */
export const chainFirstW: <E2, A, B>(f: (a: A) => Either<E2, B>) => <E1>(ma: Either<E1, A>) => Either<E1 | E2, A> =
  chainFirst as any

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category sequencing
 * @since 2.11.0
 */
export const flattenW: <E1, E2, A>(mma: Either<E1, Either<E2, A>>) => Either<E1 | E2, A> =
  /*#__PURE__*/ chainW(identity)

/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category sequencing
 * @since 2.0.0
 */
export const flatten: <E, A>(mma: Either<E, Either<E, A>>) => Either<E, A> = flattenW

/**
 * @since 2.0.0
 */
export const duplicate: <E, A>(ma: Either<E, A>) => Either<E, Either<E, A>> = /*#__PURE__*/ extend(identity)

/**
 * @category lifting
 * @since 2.10.0
 */
export const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => Either<E, B> =
  /*#__PURE__*/ fromOptionK_(FromEither)

/**
 * @category sequencing
 * @since 2.11.0
 */
export const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: Either<E, A>) => Either<E, B> = /*#__PURE__*/ chainOptionK_(
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
 * @category filtering
 * @since 2.0.0
 */
export const filterOrElse = /*#__PURE__*/ filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterorelse).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category filtering
 * @since 2.9.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: Either<E1, A>
  ) => Either<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1, B extends A>(mb: Either<E1, B>) => Either<E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: Either<E1, A>) => Either<E1 | E2, A>
} = filterOrElse

/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @since 2.0.0
 */
export const swap = <E, A>(ma: Either<E, A>): Either<A, E> => (isLeft(ma) ? right(ma.left) : left(ma.right))

/**
 * Less strict version of [`orElse`](#orelse).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.10.0
 */
export const orElseW =
  <E1, E2, B>(onLeft: (e: E1) => Either<E2, B>) =>
  <A>(ma: Either<E1, A>): Either<E2, A | B> =>
    isLeft(ma) ? onLeft(ma.left) : ma

/**
 * Useful for recovering from errors.
 *
 * @category error handling
 * @since 2.0.0
 */
export const orElse: <E1, A, E2>(onLeft: (e: E1) => Either<E2, A>) => (ma: Either<E1, A>) => Either<E2, A> = orElseW

/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category conversions
 * @since 2.0.0
 */
export const fromNullable =
  <E>(e: E) =>
  <A>(a: A): Either<E, NonNullable<A>> =>
    a == null ? left(e) : right(a as NonNullable<A>)

/**
 * Constructs a new `Either` from a function that might throw.
 *
 * See also [`tryCatchK`](#trycatchk).
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
 * const head = <A>(as: ReadonlyArray<A>): E.Either<Error, A> =>
 *   E.tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 *
 * assert.deepStrictEqual(head([]), E.left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), E.right(1))
 *
 * @category interop
 * @since 2.0.0
 */
export const tryCatch = <E, A>(f: Lazy<A>, onThrow: (e: unknown) => E): Either<E, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onThrow(e))
  }
}

/**
 * Converts a function that may throw to one returning a `Either`.
 *
 * @category interop
 * @since 2.10.0
 */
export const tryCatchK =
  <A extends ReadonlyArray<unknown>, B, E>(
    f: (...a: A) => B,
    onThrow: (error: unknown) => E
  ): ((...a: A) => Either<E, B>) =>
  (...a) =>
    tryCatch(() => f(...a), onThrow)

/**
 * @category lifting
 * @since 2.9.0
 */
export const fromNullableK = <E>(
  e: E
): (<A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Either<E, NonNullable<B>>) => {
  const from = fromNullable(e)
  return (f) => flow(f, from)
}

/**
 * @category sequencing
 * @since 2.9.0
 */
export const chainNullableK = <E>(
  e: E
): (<A, B>(f: (a: A) => B | null | undefined) => (ma: Either<E, A>) => Either<E, NonNullable<B>>) => {
  const from = fromNullableK(e)
  return (f) => chain(from(f))
}

/**
 * @category conversions
 * @since 2.10.0
 */
export const toUnion: <E, A>(fa: Either<E, A>) => E | A = /*#__PURE__*/ foldW(identity, identity)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
export function toError(e: unknown): Error {
  return e instanceof Error ? e : new Error(String(e))
}

/**
 * @since 2.0.0
 */
export function elem<A>(E: Eq<A>): {
  (a: A): <E>(ma: Either<E, A>) => boolean
  <E>(a: A, ma: Either<E, A>): boolean
}
export function elem<A>(E: Eq<A>): <E>(a: A, ma?: Either<E, A>) => boolean | ((ma: Either<E, A>) => boolean) {
  return (a, ma?) => {
    if (ma === undefined) {
      const elemE = elem(E)
      return (ma) => elemE(a, ma)
    }
    return isLeft(ma) ? false : E.equals(a, ma.right)
  }
}

/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
export const exists =
  <A>(predicate: Predicate<A>) =>
  (ma: Either<unknown, A>): boolean =>
    isLeft(ma) ? false : predicate(ma.right)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 2.9.0
 */
export const Do: Either<never, {}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 2.8.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @category do notation
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 2.8.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

/**
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  bind as any

/**
 * @category do notation
 * @since 2.8.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

/**
 * Less strict version of [`apS`](#aps).
 *
 * The `W` suffix (short for **W**idening) means that the error types will be merged.
 *
 * @category do notation
 * @since 2.8.0
 */
export const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Either<E2, B>
) => <E1>(fa: Either<E1, A>) => Either<E1 | E2, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> =
  apS as any

/**
 * @since 2.11.0
 */
export const ApT: Either<never, readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex =
  <A, E, B>(f: (index: number, a: A) => Either<E, B>) =>
  (as: ReadonlyNonEmptyArray<A>): Either<E, ReadonlyNonEmptyArray<B>> => {
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
 * @category traversing
 * @since 2.11.0
 */
export const traverseReadonlyArrayWithIndex = <A, E, B>(
  f: (index: number, a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArrayWithIndex: <E, A, B>(
  f: (index: number, a: A) => Either<E, B>
) => (as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>> = traverseReadonlyArrayWithIndex

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const traverseArray = <E, A, B>(
  f: (a: A) => Either<E, B>
): ((as: ReadonlyArray<A>) => Either<E, ReadonlyArray<B>>) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @category traversing
 * @since 2.9.0
 */
export const sequenceArray: <E, A>(as: ReadonlyArray<Either<E, A>>) => Either<E, ReadonlyArray<A>> =
  /*#__PURE__*/ traverseArray(identity)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use [`Json`](./Json.ts.html) module instead.
 *
 * @category zone of death
 * @since 2.6.7
 * @deprecated
 */
export type Json = boolean | number | string | null | JsonArray | JsonRecord

/**
 * Use [`Json`](./Json.ts.html) module instead.
 *
 * @category zone of death
 * @since 2.6.7
 * @deprecated
 */
export interface JsonRecord {
  readonly [key: string]: Json
}

/**
 * Use [`Json`](./Json.ts.html) module instead.
 *
 * @category zone of death
 * @since 2.6.7
 * @deprecated
 */
export interface JsonArray extends ReadonlyArray<Json> {}

/**
 * Use [`parse`](./Json.ts.html#parse) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function parseJSON<E>(s: string, onError: (reason: unknown) => E): Either<E, Json> {
  return tryCatch(() => JSON.parse(s), onError)
}

/**
 * Use [`stringify`](./Json.ts.html#stringify) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const stringifyJSON = <E>(u: unknown, onError: (reason: unknown) => E): Either<E, string> =>
  tryCatch(() => {
    const s = JSON.stringify(u)
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON')
    }
    return s
  }, onError)

/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `E.Functor` instead of `E.either`
 * (where `E` is from `import E from 'fp-ts/Either'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const either: Monad2<URI> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> &
  MonadThrow2<URI> = {
  URI,
  map: _map,
  of,
  ap: _ap,
  chain: _chain,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence,
  bimap: _bimap,
  mapLeft: _mapLeft,
  alt: _alt,
  extend: _extend,
  chainRec: _chainRec,
  throwError: throwError
}

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>> =
  /*#__PURE__*/ getApplySemigroup_(Apply)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<Either<E, A>> =
  /*#__PURE__*/ getApplicativeMonoid(Applicative)

/**
 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getValidationSemigroup = <E, A>(SE: Semigroup<E>, SA: Semigroup<A>): Semigroup<Either<E, A>> =>
  getApplySemigroup_(getApplicativeValidation(SE))(SA)

/**
 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export const getValidationMonoid = <E, A>(SE: Semigroup<E>, MA: Monoid<A>): Monoid<Either<E, A>> =>
  getApplicativeMonoid(getApplicativeValidation(SE))(MA)

/**
 * Use [`getApplicativeValidation`](#getapplicativevalidation) and [`getAltValidation`](#getaltvalidation) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
export function getValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> &
  Foldable2<URI> &
  Traversable2<URI> &
  Bifunctor2<URI> &
  Alt2C<URI, E> &
  Extend2<URI> &
  ChainRec2C<URI, E> &
  MonadThrow2C<URI, E> {
  const ap = getApplicativeValidation(SE).ap
  const alt = getAltValidation(SE).alt
  return {
    URI,
    _E: undefined as any,
    map: _map,
    of,
    chain: _chain,
    bimap: _bimap,
    mapLeft: _mapLeft,
    reduce: _reduce,
    foldMap: _foldMap,
    reduceRight: _reduceRight,
    extend: _extend,
    traverse: _traverse,
    sequence,
    chainRec: _chainRec,
    throwError,
    ap,
    alt
  }
}
