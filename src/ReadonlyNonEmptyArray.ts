/**
 * Data structure which represents non-empty arrays
 *
 * @since 2.5.0
 */
import { Alt1 } from './Alt'
import { Applicative1 } from './Applicative'
import { Apply1, apS as apS_ } from './Apply'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Extend1 } from './Extend'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Lazy, Predicate, Refinement } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { bind as bind_, Monad1 } from './Monad'
import { NonEmptyArray } from './NonEmptyArray'
import { none, Option, some } from './Option'
import { Ord } from './Ord'
import { Pointed1 } from './Pointed'
import * as RA from './ReadonlyArray'
import { ReadonlyRecord } from './ReadonlyRecord'
import * as Se from './Semigroup'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'
import { PipeableTraverseWithIndex1, TraversableWithIndex1 } from './TraversableWithIndex'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.5.0
 */
export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A
}

/**
 * Append an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(cons(1, [2, 3, 4]), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export const cons: <A>(head: A, tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = RA.cons

/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
export const snoc: <A>(init: ReadonlyArray<A>, end: A) => ReadonlyNonEmptyArray<A> = RA.snoc

/**
 * Builds a `ReadonlyNonEmptyArray` from an array returning `none` if `as` is an empty array
 *
 * @category constructors
 * @since 2.5.0
 */
export function fromReadonlyArray<A>(as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> {
  return RA.isNonEmpty(as) ? some(as) : none
}

/**
 * @category constructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
export function fromArray<A>(as: Array<A>): Option<ReadonlyNonEmptyArray<A>> {
  return fromReadonlyArray(RA.fromArray(as))
}

/**
 * Produces a couple of the first element of the array, and a new array of the remaining elements, if any
 *
 * @example
 * import { cons, uncons } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(uncons(cons(1, [2, 3, 4])), [1, [2, 3, 4]])
 *
 * @category destructors
 * @since 2.9.0
 */
export function uncons<A>(nea: ReadonlyNonEmptyArray<A>): readonly [A, ReadonlyArray<A>] {
  return [nea[0], nea.slice(1)]
}

/**
 * Produces a couple of a copy of the array without its last element, and that last element
 *
 * @example
 * import { snoc, unsnoc } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(unsnoc(snoc([1, 2, 3], 4)), [[1, 2, 3], 4])
 *
 * @category destructors
 * @since 2.9.0
 */
export function unsnoc<A>(nea: ReadonlyNonEmptyArray<A>): readonly [ReadonlyArray<A>, A] {
  const l = nea.length - 1
  return [nea.slice(0, l), nea[l]]
}

/**
 * @category instances
 * @since 2.5.0
 */
export const getShow: <A>(S: Show<A>) => Show<ReadonlyNonEmptyArray<A>> = RA.getShow

/**
 * @since 2.5.0
 */
export function head<A>(nea: ReadonlyNonEmptyArray<A>): A {
  return nea[0]
}

/**
 * @since 2.5.0
 */
export function tail<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> {
  return nea.slice(1)
}

/**
 * @category combinators
 * @since 2.5.0
 */
export const reverse: <A>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.reverse as any

/**
 * @since 2.5.0
 */
export function min<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A {
  const S = Se.min(ord)
  return (nea) => nea.reduce(S.concat)
}

/**
 * @since 2.5.0
 */
export function max<A>(ord: Ord<A>): (nea: ReadonlyNonEmptyArray<A>) => A {
  const S = Se.getJoinSemigroup(ord)
  return (nea) => nea.reduce(S.concat)
}

/**
 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
 *
 * @category instances
 * @since 2.5.0
 */
export function getSemigroup<A = never>(): Se.Semigroup<ReadonlyNonEmptyArray<A>> {
  return {
    concat: concat
  }
}

/**
 * @example
 * import { getEq, cons } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * const E = getEq(N.Eq)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 2]), true)
 * assert.strictEqual(E.equals(cons(1, [2]), [1, 3]), false)
 *
 * @category instances
 * @since 2.5.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<ReadonlyNonEmptyArray<A>> = RA.getEq

/**
 * Group equal, consecutive elements of an array into non empty arrays.
 *
 * @example
 * import { cons, group } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(group(N.Ord)([1, 2, 1, 1]), [
 *   cons(1, []),
 *   cons(2, []),
 *   cons(1, [1])
 * ])
 *
 * @category combinators
 * @since 2.5.0
 */
export function group<B>(
  E: Eq<B>
): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
export function group<A>(E: Eq<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  return (as) => {
    const len = as.length
    if (len === 0) {
      return RA.empty
    }
    // tslint:disable-next-line: readonly-array
    const r: Array<ReadonlyNonEmptyArray<A>> = []
    let head: A = as[0]
    let nea: NonEmptyArray<A> = [head]
    for (let i = 1; i < len; i++) {
      const x = as[i]
      if (E.equals(x, head)) {
        nea.push(x)
      } else {
        r.push(nea)
        head = x
        nea = [head]
      }
    }
    r.push(nea)
    return r
  }
}

/**
 * Sort and then group the elements of an array into non empty arrays.
 *
 * @example
 * import { cons, groupSort } from 'fp-ts/ReadonlyNonEmptyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(groupSort(N.Ord)([1, 2, 1, 1]), [cons(1, [1, 1]), cons(2, [])])
 *
 * @category combinators
 * @since 2.5.0
 */
export function groupSort<B>(
  O: Ord<B>
): {
  <A extends B>(as: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<ReadonlyNonEmptyArray<A>>
}
export function groupSort<A>(O: Ord<A>): (as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>> {
  const sortO = RA.sort(O)
  const groupO = group(O)
  return (as) => groupO(sortO(as))
}

/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @example
 * import { cons, groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['foo', 'bar', 'foobar']), {
 *   '3': cons('foo', ['bar']),
 *   '6': cons('foobar', [])
 * })
 *
 * @category constructors
 * @since 2.5.0
 */
export function groupBy<A>(
  f: (a: A) => string
): (as: ReadonlyArray<A>) => ReadonlyRecord<string, ReadonlyNonEmptyArray<A>> {
  return (as: ReadonlyArray<A>) => {
    const r: Record<string, NonEmptyArray<A>> = {}
    for (const a of as) {
      const k = f(a)
      if (r.hasOwnProperty(k)) {
        r[k].push(a)
      } else {
        r[k] = [a]
      }
    }
    return r
  }
}

/**
 * @since 2.5.0
 */
export function last<A>(nea: ReadonlyNonEmptyArray<A>): A {
  return nea[nea.length - 1]
}

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
 * assert.deepStrictEqual(init([1]), [])
 *
 * @since 2.5.0
 */
export function init<A>(nea: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> {
  return nea.slice(0, -1)
}

/**
 * @category combinators
 * @since 2.5.0
 */
export function sort<B>(O: Ord<B>): <A extends B>(nea: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> {
  return RA.sort(O) as any
}

/**
 * @since 2.5.0
 */
export function insertAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.insertAt(i, a) as any
}

/**
 * @since 2.5.0
 */
export function updateAt<A>(i: number, a: A): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.updateAt(i, a) as any
}

/**
 * @since 2.5.0
 */
export function modifyAt<A>(
  i: number,
  f: (a: A) => A
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return RA.modifyAt(i, f) as any
}

/**
 * @since 2.5.0
 */
export function filter<A, B extends A>(
  refinement: Refinement<A, B>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<B>>
export function filter<A>(predicate: Predicate<A>): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>>
export function filter<A>(
  predicate: Predicate<A>
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return filterWithIndex((_, a) => predicate(a))
}

/**
 * @since 2.5.0
 */
export function filterWithIndex<A>(
  predicate: (i: number, a: A) => boolean
): (nea: ReadonlyNonEmptyArray<A>) => Option<ReadonlyNonEmptyArray<A>> {
  return (nea) => fromReadonlyArray(nea.filter((a, i) => predicate(i, a)))
}

/**
 * @category Pointed
 * @since 2.5.0
 */
export const of: Pointed1<URI>['of'] = RA.of as any

/**
 * @category constructors
 * @since 2.5.0
 */
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyNonEmptyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyNonEmptyArray<A>, fy: ReadonlyArray<A>): ReadonlyNonEmptyArray<A>
export function concat<A>(fx: ReadonlyArray<A>, fy: ReadonlyArray<A>): ReadonlyArray<A> {
  return fx.concat(fy)
}

/**
 * @since 2.10.0
 */
export const concatAll = <A>(S: Se.Semigroup<A>) => (fa: ReadonlyNonEmptyArray<A>): A => fa.reduce(S.concat)

/**
 * @category combinators
 * @since 2.5.1
 */
export const zipWith: <A, B, C>(
  fa: ReadonlyNonEmptyArray<A>,
  fb: ReadonlyNonEmptyArray<B>,
  f: (a: A, b: B) => C
) => ReadonlyNonEmptyArray<C> = RA.zipWith as any

/**
 * @category combinators
 * @since 2.5.1
 */
export const zip: {
  <B>(bs: ReadonlyNonEmptyArray<B>): <A>(as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<readonly [A, B]>
  <A, B>(as: ReadonlyNonEmptyArray<A>, bs: ReadonlyNonEmptyArray<B>): ReadonlyNonEmptyArray<readonly [A, B]>
} = RA.zip as any

/**
 * @since 2.5.1
 */
export const unzip: <A, B>(
  as: ReadonlyNonEmptyArray<readonly [A, B]>
) => readonly [ReadonlyNonEmptyArray<A>, ReadonlyNonEmptyArray<B>] = RA.unzip as any

/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { cons, prependToAll } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)(cons(1, [2, 3, 4])), cons(9, [1, 9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export const prependToAll: <A>(
  e: A
) => (xs: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.prependToAll as any

/**
 * Places an element in between members of an array
 *
 * @example
 * import { cons, intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
 *
 * assert.deepStrictEqual(intersperse(9)(cons(1, [2, 3, 4])), cons(1, [9, 2, 9, 3, 9, 4]))
 *
 * @category combinators
 * @since 2.9.0
 */
export const intersperse: <A>(
  e: A
) => (as: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.intersperse as any

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = RA.Functor.map as any
const _mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = RA.FunctorWithIndex.mapWithIndex as any
const _ap: Apply1<URI>['ap'] = RA.Applicative.ap as any
const _chain: Monad1<URI>['chain'] = RA.Monad.chain as any
const _extend: Extend1<URI>['extend'] = RA.Extend.extend as any
const _reduce: Foldable1<URI>['reduce'] = RA.Foldable.reduce as any
const _foldMap: Foldable1<URI>['foldMap'] = RA.Foldable.foldMap as any
const _reduceRight: Foldable1<URI>['reduceRight'] = RA.Foldable.reduceRight as any
const _traverse: Traversable1<URI>['traverse'] = RA.Traversable.traverse as any
const _alt: Alt1<URI>['alt'] = RA.Alt.alt as any
const _reduceWithIndex: FoldableWithIndex1<URI, number>['reduceWithIndex'] = RA.FoldableWithIndex.reduceWithIndex as any
const _foldMapWithIndex: FoldableWithIndex1<URI, number>['foldMapWithIndex'] = RA.FoldableWithIndex
  .foldMapWithIndex as any
const _reduceRightWithIndex: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = RA.FoldableWithIndex
  .reduceRightWithIndex as any
const _traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'] = RA.TraversableWithIndex
  .traverseWithIndex as any

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const foldMapWithIndex = <S>(S: Se.Semigroup<S>) => <A>(f: (i: number, a: A) => S) => (
  fa: ReadonlyNonEmptyArray<A>
) => fa.slice(1).reduce((s, a, i) => S.concat(s, f(i + 1, a)), f(0, fa[0]))

/**
 * @category Foldable
 * @since 2.5.0
 */
export const foldMap = <S>(S: Se.Semigroup<S>) => <A>(f: (a: A) => S) => (fa: ReadonlyNonEmptyArray<A>) =>
  fa.slice(1).reduce((s, a) => S.concat(s, f(a)), f(fa[0]))

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
export const altW: <B>(
  that: Lazy<ReadonlyNonEmptyArray<B>>
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A | B> = RA.altW as any

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.6.2
 */
export const alt: <A>(
  that: Lazy<ReadonlyNonEmptyArray<A>>
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.alt as any

/**
 * @category Apply
 * @since 2.5.0
 */
export const ap: <A>(
  fa: ReadonlyNonEmptyArray<A>
) => <B>(fab: ReadonlyNonEmptyArray<(a: A) => B>) => ReadonlyNonEmptyArray<B> = RA.ap as any

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const apFirst: <B>(
  fb: ReadonlyNonEmptyArray<B>
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.apFirst as any

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const apSecond: <B>(
  fb: ReadonlyNonEmptyArray<B>
) => <A>(fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B> = RA.apSecond as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
export const chain: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B> = RA.chain as any

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => ReadonlyNonEmptyArray<B>
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A> = RA.chainFirst as any

/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const duplicate: <A>(
  ma: ReadonlyNonEmptyArray<A>
) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>> = RA.duplicate as any

/**
 * @category Extend
 * @since 2.5.0
 */
export const extend: <A, B>(
  f: (fa: ReadonlyNonEmptyArray<A>) => B
) => (ma: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B> = RA.extend as any

/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
export const flatten: <A>(
  mma: ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>>
) => ReadonlyNonEmptyArray<A> = RA.flatten as any

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B> = RA.map as any

/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
export const mapWithIndex: <A, B>(
  f: (i: number, a: A) => B
) => (fa: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<B> = RA.mapWithIndex as any

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B = RA.reduce

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceWithIndex: <A, B>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyNonEmptyArray<A>) => B =
  RA.reduceWithIndex

/**
 * @category Foldable
 * @since 2.5.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyNonEmptyArray<A>) => B = RA.reduceRight

/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
export const reduceRightWithIndex: <A, B>(
  b: B,
  f: (i: number, a: A, b: B) => B
) => (fa: ReadonlyNonEmptyArray<A>) => B = RA.reduceRightWithIndex

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = RA.traverse as any

/**
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = RA.sequence as any

/**
 * @since 2.6.3
 */
export const traverseWithIndex: PipeableTraverseWithIndex1<URI, number> = RA.traverseWithIndex as any

/**
 * @since 2.6.3
 */
export const extract: Comonad1<URI>['extract'] = head

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.5.0
 */
export const URI = 'ReadonlyNonEmptyArray'

/**
 * @category instances
 * @since 2.5.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: ReadonlyNonEmptyArray<A>
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
export const Do: ReadonlyNonEmptyArray<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 2.8.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 2.8.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Monad)

// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 2.8.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------

/**
 * Use `concatAll` instead.
 *
 * @since 2.5.0
 * @deprecated
 */
export const fold = concatAll

/**
 * Use small, specific instances instead.
 *
 * @category instances
 * @since 2.5.0
 * @deprecated
 */
export const readonlyNonEmptyArray: Monad1<URI> &
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
