/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative1 } from './Applicative'
import { Apply1 } from './Apply'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Lazy, Predicate, Refinement } from './function'
import { flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { Monad1 } from './Monad'
import { Option } from './Option'
import { Ord } from './Ord'
import { Pointed1 } from './Pointed'
import * as RNEA from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'

/* tslint:disable:readonly-array */

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/* tslint:disable:readonly-keyword */
/**
 * @category model
 * @since 2.0.0
 */
export interface NonEmptyArray<A> extends Array<A> {
  0: A
}
/* tslint:enable:readonly-keyword */

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export const cons: <A>(head: A, tail: Array<A>) => NonEmptyArray<A> = RNEA.cons as any

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
export const snoc: <A>(init: Array<A>, end: A) => NonEmptyArray<A> = RNEA.snoc as any

/**
 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.0.0
 */
export const fromArray: <A>(as: Array<A>) => Option<NonEmptyArray<A>> = RNEA.fromArray as any

/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any
 *
 * @example
 * import { cons, uncons } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
export const uncons: <A>(nea: NonEmptyArray<A>) => readonly [A, Array<A>] = RNEA.uncons as any

/**
 * Produces a couple of a copy of the array without its last element, and that last element
 *
 * @example
 * import { snoc, unsnoc } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export const unsnoc: <A>(nea: NonEmptyArray<A>) => readonly [Array<A>, A] = RNEA.unsnoc as any

/**
 * @category instances
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<NonEmptyArray<A>> = RNEA.getShow

/**
 * @since 2.0.0
 */
export const head: <A>(nea: NonEmptyArray<A>) => A = RNEA.head

/**
 * @since 2.0.0
 */
export const tail: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.tail as any

/**
 * @category combinators
 * @since 2.0.0
 */
export const reverse: <A>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.reverse as any

/**
 * @since 2.0.0
 */
export const min: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.min

/**
 * @since 2.0.0
 */
export const max: <A>(ord: Ord<A>) => (nea: NonEmptyArray<A>) => A = RNEA.max

/**
 * Builds a `Semigroup` instance for `NonEmptyArray`
 *
 * @category instances
 * @since 2.0.0
 */
export const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>> = RNEA.getSemigroup as any

/**
 * @example
 * import { getEq, cons } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<NonEmptyArray<A>> = RNEA.getEq

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
export function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: Array<A>) => Array<NonEmptyArray<A>> {
  return RNEA.group(E) as any
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/NonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @category combinators
 * @since 2.0.0
 */
export const groupSort: <B>(
  O: Ord<B>
) => {
  <A extends B>(as: NonEmptyArray<A>): NonEmptyArray<NonEmptyArray<A>>
  <A extends B>(as: Array<A>): Array<NonEmptyArray<A>>
} = RNEA.groupSort as any

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @category constructors
 * @since 2.0.0
 */
export const groupBy: <A>(
  f: (a: A) => string
) => (as: Array<A>) => Record<string, NonEmptyArray<A>> = RNEA.groupBy as any

/**
 * @since 2.0.0
 */
export const last: <A>(nea: NonEmptyArray<A>) => A = RNEA.last

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.2.0
 */
export const init: <A>(nea: NonEmptyArray<A>) => Array<A> = RNEA.init as any

/**
 * @category combinators
 * @since 2.0.0
 */
export const sort: <B>(O: Ord<B>) => <A extends B>(nea: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.sort as any

/**
 * @since 2.0.0
 */
export const insertAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.insertAt as any

/**
 * @since 2.0.0
 */
export const updateAt: <A>(
  i: number,
  a: A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.updateAt as any

/**
 * @since 2.0.0
 */
export const modifyAt: <A>(
  i: number,
  f: (a: A) => A
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.modifyAt as any

/**
 * @category combinators
 * @since 2.0.0
 */
export function copy<A>(nea: NonEmptyArray<A>): NonEmptyArray<A> {
  const l = nea.length
  const as = Array(l)
  for (let i = 0; i < l; i++) {
    as[i] = nea[i]
  }
  return as as any
}

/**
 * @category combinators
 * @since 2.0.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<B>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>>
export function filter<A>(predicate: Predicate<A>): (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> {
  return RNEA.filter(predicate) as any
}

/**
 * @since 2.0.0
 */
export const filterWithIndex: <A>(
  predicate: (i: number, a: A) => boolean
) => (nea: NonEmptyArray<A>) => Option<NonEmptyArray<A>> = RNEA.filterWithIndex as any

/**
 * @category Pointed
 * @since 2.0.0
 */
export const of: Pointed1<URI>['of'] = RNEA.of as any

// TODO: curry in v3
/**
 * @category constructors
 * @since 2.2.0
 */
export function concat<A>(fx: Array<A>, fy: NonEmptyArray<A>): NonEmptyArray<A>
export function concat<A>(fx: NonEmptyArray<A>, fy: Array<A>): NonEmptyArray<A>
export function concat<A>(fx: Array<A>, fy: Array<A>): Array<A> {
  return RNEA.concat(fx as any, fy as any) as any
}

/**
 * @since 2.5.0
 */
export const fold: <A>(S: Semigroup<A>) => (fa: NonEmptyArray<A>) => A = RNEA.fold

/**
 * @category combinators
 * @since 2.5.1
 */
export const zipWith: <A, B, C>(
  fa: NonEmptyArray<A>,
  fb: NonEmptyArray<B>,
  f: (a: A, b: B) => C
) => NonEmptyArray<C> = RNEA.zipWith as any

/**
 * @category combinators
 * @since 2.5.1
 */
export const zip: {
  <B>(bs: NonEmptyArray<B>): <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, B]>
  <A, B>(as: NonEmptyArray<A>, bs: NonEmptyArray<B>): NonEmptyArray<[A, B]>
} = RNEA.zip as any

/**
 * @since 2.5.1
 */
export const unzip: <A, B>(as: NonEmptyArray<[A, B]>) => [NonEmptyArray<A>, NonEmptyArray<B>] = RNEA.unzip as any

/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { cons, prependToAll } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export const prependToAll: <A>(e: A) => (xs: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.prependToAll as any

/**
 * Places an element in between members of an array
 *
 * @example
 * import { cons, intersperse } from 'fp-ts/NonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export const intersperse: <A>(e: A) => (as: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.intersperse as any

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Monad1<URI>['map'] = RNEA.Functor.map as any
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = RNEA.FunctorWithIndex.mapWithIndex as any
const _ap: Monad1<URI>['ap'] = RNEA.Applicative.ap as any
const _chain: Monad1<URI>['chain'] = RNEA.Monad.chain as any
const _extend: Extend1<URI>['extend'] = RNEA.Comonad.extend as any
const _reduce: Foldable1<URI>['reduce'] = RNEA.Foldable.reduce as any
const _foldMap: Foldable1<URI>['foldMap'] = RNEA.Foldable.foldMap as any
const _reduceRight: Foldable1<URI>['reduceRight'] = RNEA.Foldable.reduceRight as any
const _traverse: Traversable1<URI>['traverse'] = RNEA.Traversable.traverse as any
const _alt: Alt1<URI>['alt'] = RNEA.Alt.alt as any
const _reduceWithIndex: FoldableWithIndex1<URI, number>['reduceWithIndex'] = RNEA.FoldableWithIndex
  .reduceWithIndex as any
const _foldMapWithIndex: FoldableWithIndex1<URI, number>['foldMapWithIndex'] = RNEA.FoldableWithIndex
  .foldMapWithIndex as any
const _reduceRightWithIndex: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = RNEA.FoldableWithIndex
  .reduceRightWithIndex as any
const _traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'] = RNEA.TraversableWithIndex
  .traverseWithIndex as any

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const foldMapWithIndex: <S>(S: Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (fa: NonEmptyArray<A>) => S =
  RNEA.foldMapWithIndex

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <S>(S: Semigroup<S>) => <A>(f: (a: A) => S) => (fa: NonEmptyArray<A>) => S = RNEA.foldMap

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <B>(
  that: Lazy<NonEmptyArray<B>>
) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A | B> = RNEA.altW as any

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <A>(that: Lazy<NonEmptyArray<A>>) => (fa: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.alt as any

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: NonEmptyArray<A>) => <B>(fab: NonEmptyArray<(a: A) => B>) => NonEmptyArray<B> = RNEA.ap as any

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apFirst: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const apSecond: <B>(fb: NonEmptyArray<B>) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.apSecond as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(
  f: (a: A) => NonEmptyArray<B>
) => (ma: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.chain as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => NonEmptyArray<B>
) => (ma: NonEmptyArray<A>) => NonEmptyArray<A> = RNEA.chainFirst as any

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const duplicate: <A>(ma: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>> = RNEA.duplicate as any

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <A, B>(
  f: (fa: NonEmptyArray<A>) => B
) => (ma: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.extend as any

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
export const flatten: <A>(mma: NonEmptyArray<NonEmptyArray<A>>) => NonEmptyArray<A> = RNEA.flatten as any

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.map as any

/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: NonEmptyArray<A>) => NonEmptyArray<B> = RNEA.mapWithIndex as any

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduce

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceWithIndex

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B = RNEA.reduceRight

/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
export const reduceRightWithIndex: <A, B>(b: B, f: (i: number, a: A, b: B) => B) => (fa: NonEmptyArray<A>) => B =
  RNEA.reduceRightWithIndex

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = RNEA.traverse as any

/**
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = RNEA.sequence as any

/**
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> = RNEA.traverseWithIndex as any

/**
 * @since 2.7.0
 */
export const extract: Comonad1<URI>['extract'] = head

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'NonEmptyArray'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: NonEmptyArray<A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  map: _map,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Foldable: Foldable1<URI> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight
}

/**
 * @category instances
 * @since 2.7.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
  URI,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Traversable: Traversable1<URI> = {
  URI,
  map: _map,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
  URI,
  map: _map,
  mapWithIndex: _mapWithIndex,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex,
  traverseWithIndex: _traverseWithIndex
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.7.0
 */
export const Comonad: Comonad1<URI> = {
  URI,
  map: _map,
  extend: _extend,
  extract
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 2.9.0
 */
export const Do: NonEmptyArray<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in N]: A }> = RNEA.bindTo as any

/**
 * @since 2.8.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => NonEmptyArray<B>
) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in keyof A | N]: K extends keyof A ? A[K] : B }> = RNEA.bind as any

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: NonEmptyArray<B>
) => (fa: NonEmptyArray<A>) => NonEmptyArray<{ [K in keyof A | N]: K extends keyof A ? A[K] : B }> = RNEA.apS as any

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const nonEmptyArray: Monad1<URI> &
  Comonad1<URI> &
  TraversableWithIndex1<URI, number> &
  FunctorWithIndex1<URI, number> &
  FoldableWithIndex1<URI, number> &
  Alt1<URI> = {
  URI,
  of,
  map: _map,
  mapWithIndex: _mapWithIndex,
  ap: _ap,
  chain: _chain,
  extend: _extend,
  extract: extract,
  reduce: _reduce,
  foldMap: _foldMap,
  reduceRight: _reduceRight,
  traverse: _traverse,
  sequence,
  reduceWithIndex: _reduceWithIndex,
  foldMapWithIndex: _foldMapWithIndex,
  reduceRightWithIndex: _reduceRightWithIndex,
  traverseWithIndex: _traverseWithIndex,
  alt: _alt
}
