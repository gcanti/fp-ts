import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Compactable1, Separated } from './Compactable'
import { Either } from './Either'
import { FilterableWithIndex1 } from './FilterableWithIndex'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Foldable2v1 } from './Foldable2v'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Predicate, Refinement, tuple } from './function'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Option } from './Option'
import * as R from './Record'
import { getDictionarySemigroup, getLastSemigroup, Semigroup } from './Semigroup'
import { Setoid, fromEquals } from './Setoid'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

// https://github.com/purescript/purescript-maps

declare module './HKT' {
  interface URI2HKT<A> {
    StrMap: StrMap<A>
  }
}

export const URI = 'StrMap'

export type URI = typeof URI

const liftSeparated = <L, R>({
  left,
  right
}: Separated<Record<string, L>, Record<string, R>>): Separated<StrMap<L>, StrMap<R>> => {
  return {
    left: new StrMap(left),
    right: new StrMap(right)
  }
}

/**
 * @data
 * @constructor StrMap
 * @since 1.0.0
 */
export class StrMap<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: { [key: string]: A }) {}
  mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B> {
    return new StrMap(R.mapWithKey(this.value, f))
  }
  map<B>(f: (a: A) => B): StrMap<B> {
    return this.mapWithKey((_, a) => f(a))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    return R.reduce(this.value, b, f)
  }
  /**
   * @since 1.12.0
   */
  foldr<B>(b: B, f: (a: A, b: B) => B): B {
    return R.foldr(this.value, b, f)
  }
  /**
   * @since 1.12.0
   */
  reduceWithKey<B>(b: B, f: (k: string, b: B, a: A) => B): B {
    return R.reduceWithKey(this.value, b, f)
  }
  /**
   * @since 1.12.0
   */
  foldrWithKey<B>(b: B, f: (k: string, a: A, b: B) => B): B {
    return R.foldrWithKey(this.value, b, f)
  }
  /**
   * @since 1.4.0
   */
  filter<B extends A>(p: Refinement<A, B>): StrMap<B>
  filter(p: Predicate<A>): StrMap<A>
  filter(p: Predicate<A>): StrMap<A> {
    return this.filterWithIndex((_, a) => p(a))
  }
  /**
   * @since 1.12.0
   */
  filterMap<B>(f: (a: A) => Option<B>): StrMap<B> {
    return this.filterMapWithIndex((_, a) => f(a))
  }
  /**
   * @since 1.12.0
   */
  partition(p: Predicate<A>): Separated<StrMap<A>, StrMap<A>> {
    return this.partitionWithIndex((_, a) => p(a))
  }
  /**
   * @since 1.12.0
   */
  partitionMap<RL, RR>(f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> {
    return this.partitionMapWithIndex((_, a) => f(a))
  }
  /**
   * @since 1.12.0
   */
  separate<RL, RR>(this: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>> {
    return liftSeparated(R.separate(this.value))
  }
  /**
   * @since 1.12.0
   */
  partitionMapWithIndex<RL, RR>(f: (i: string, a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> {
    return liftSeparated(R.partitionMapWithIndex(this.value, f))
  }
  /**
   * @since 1.12.0
   */
  partitionWithIndex(p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> {
    return liftSeparated(R.partitionWithIndex(this.value, p))
  }
  /**
   * @since 1.12.0
   */
  filterMapWithIndex<B>(f: (i: string, a: A) => Option<B>): StrMap<B> {
    return new StrMap(R.filterMapWithIndex(this.value, f))
  }
  /**
   * @since 1.12.0
   */
  filterWithIndex(p: (i: string, a: A) => boolean): StrMap<A> {
    return new StrMap(R.filterWithIndex(this.value, p))
  }
}

/**
 *
 * @since 1.10.0
 */
const empty: StrMap<never> = new StrMap(R.empty)

const concat = <A>(S: Semigroup<A>): ((x: StrMap<A>, y: StrMap<A>) => StrMap<A>) => {
  const concat = getDictionarySemigroup(S).concat
  return (x, y) => new StrMap(concat(x.value, y.value))
}

/**
 *
 * @since 1.0.0
 */
export const getMonoid = <A = never>(S: Semigroup<A> = getLastSemigroup()): Monoid<StrMap<A>> => {
  return {
    concat: concat(S),
    empty
  }
}

const map = <A, B>(fa: StrMap<A>, f: (a: A) => B): StrMap<B> => {
  return fa.map(f)
}

const reduce = <A, B>(fa: StrMap<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

const foldMap = <M>(M: Monoid<M>): (<A>(fa: StrMap<A>, f: (a: A) => M) => M) => {
  const foldMapM = R.foldMap(M)
  return (fa, f) => foldMapM(fa.value, f)
}

const foldr = <A, B>(fa: StrMap<A>, b: B, f: (a: A, b: B) => B): B => {
  return fa.foldr(b, f)
}

const reduceWithIndex = <A, B>(fa: StrMap<A>, b: B, f: (k: string, b: B, a: A) => B): B => {
  return fa.reduceWithKey(b, f)
}

const foldMapWithIndex = <M>(M: Monoid<M>): (<A>(fa: StrMap<A>, f: (k: string, a: A) => M) => M) => {
  const foldMapWithKey = R.foldMapWithKey(M)
  return (fa, f) => foldMapWithKey(fa.value, f)
}

const foldrWithIndex = <A, B>(fa: StrMap<A>, b: B, f: (k: string, a: A, b: B) => B): B => {
  return fa.foldrWithKey(b, f)
}

/**
 *
 * @since 1.0.0
 */
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, StrMap<B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, StrMap<B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type<F, B>) => Type<F, StrMap<B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
  const traverseWithKeyF = R.traverseWithKey(F)
  return (ta, f) => F.map(traverseWithKeyF(ta.value, f), d => new StrMap(d))
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: StrMap<A>, f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
  const traverseWithKeyF = traverseWithKey(F)
  return (ta, f) => traverseWithKeyF(ta, (_, a) => f(a))
}

function sequence<F>(F: Applicative<F>): <A>(ta: StrMap<HKT<F, A>>) => HKT<F, StrMap<A>> {
  const traverseWithKeyF = traverseWithKey(F)
  return ta => traverseWithKeyF(ta, (_, a) => a)
}

/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 *
 * @since 1.0.0
 */
export const isSubdictionary = <A>(S: Setoid<A>): ((d1: StrMap<A>, d2: StrMap<A>) => boolean) => {
  const isSubdictionaryS = R.isSubdictionary(S)
  return (d1, d2) => isSubdictionaryS(d1.value, d2.value)
}

/**
 * Calculate the number of key/value pairs in a dictionary
 *
 * @since 1.0.0
 */
export const size = <A>(d: StrMap<A>): number => {
  return R.size(d.value)
}

/**
 * Test whether a dictionary is empty
 *
 * @since 1.0.0
 */
export const isEmpty = <A>(d: StrMap<A>): boolean => {
  return R.isEmpty(d.value)
}

/**
 *
 * @since 1.0.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => {
  const isSubdictionaryS = R.isSubdictionary(S)
  return fromEquals((x, y) => isSubdictionaryS(x.value, y.value) && isSubdictionaryS(y.value, x.value))
}

/**
 * Create a dictionary with one key/value pair
 *
 * @since 1.0.0
 */
export const singleton = <A>(k: string, a: A): StrMap<A> => {
  return new StrMap(R.singleton(k, a))
}

/**
 * Lookup the value for a key in a dictionary
 *
 * @since 1.0.0
 */
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => {
  return R.lookup(k, d.value)
}

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 *
 * @since 1.0.0
 */
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A>(ta: Type3<F, U, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <L, A>(ta: Type2<F, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <A>(ta: Type<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
// tslint:disable-next-line: deprecation
export function fromFoldable<F>(F: Foldable<F>): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A> {
  const fromFoldableF = R.fromFoldable(F)
  return (ta, f) => new StrMap(fromFoldableF(ta, f))
}

/**
 *
 * @since 1.0.0
 */
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => {
  return R.collect(d.value, f)
}

/**
 *
 * @since 1.0.0
 */
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => {
  return R.toArray(d.value)
}

/**
 * Unfolds a dictionary into a list of key/value pairs
 *
 * @since 1.0.0
 */
export function toUnfoldable<F extends URIS>(U: Unfoldable1<F>): (<A>(d: StrMap<A>) => Type<F, [string, A]>)
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>)
export function toUnfoldable<F>(U: Unfoldable<F>): (<A>(d: StrMap<A>) => HKT<F, [string, A]>) {
  const toUnfoldableU = R.toUnfoldable(U)
  return d => toUnfoldableU(d.value)
}

/**
 * Insert or replace a key/value pair in a map
 *
 * @since 1.0.0
 */
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => {
  const value = R.insert(k, a, d.value)
  return value === d.value ? d : new StrMap(value)
}

/**
 * Delete a key and value from a map
 *
 * @since 1.0.0
 */
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => {
  const value = R.remove(k, d.value)
  return value === d.value ? d : new StrMap(value)
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 1.0.0
 */
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => {
  return R.pop(k, d.value).map(([a, d]) => tuple(a, new StrMap(d)))
}

const filterMap = <A, B>(fa: StrMap<A>, f: (a: A) => Option<B>): StrMap<B> => {
  return fa.filterMap(f)
}

const filter = <A>(fa: StrMap<A>, p: Predicate<A>): StrMap<A> => {
  return fa.filter(p)
}

const compact = <A>(fa: StrMap<Option<A>>): StrMap<A> => {
  return new StrMap(R.compact(fa.value))
}

const separate = <RL, RR>(fa: StrMap<Either<RL, RR>>): Separated<StrMap<RL>, StrMap<RR>> => {
  return fa.separate()
}

const partitionMap = <RL, RR, A>(fa: StrMap<A>, f: (a: A) => Either<RL, RR>): Separated<StrMap<RL>, StrMap<RR>> => {
  return fa.partitionMap(f)
}

const partition = <A>(fa: StrMap<A>, p: Predicate<A>): Separated<StrMap<A>, StrMap<A>> => {
  return fa.partition(p)
}

const wither = <F>(F: Applicative<F>): (<A, B>(wa: StrMap<A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, StrMap<B>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

const wilt = <F>(
  F: Applicative<F>
): (<RL, RR, A>(wa: StrMap<A>, f: (a: A) => HKT<F, Either<RL, RR>>) => HKT<F, Separated<StrMap<RL>, StrMap<RR>>>) => {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

const mapWithIndex = <A, B>(fa: StrMap<A>, f: (i: string, a: A) => B): StrMap<B> => {
  return fa.mapWithKey(f)
}

const traverseWithIndex = traverseWithKey

const partitionMapWithIndex = <RL, RR, A>(
  fa: StrMap<A>,
  f: (i: string, a: A) => Either<RL, RR>
): Separated<StrMap<RL>, StrMap<RR>> => {
  return fa.partitionMapWithIndex(f)
}

const partitionWithIndex = <A>(fa: StrMap<A>, p: (i: string, a: A) => boolean): Separated<StrMap<A>, StrMap<A>> => {
  return fa.partitionWithIndex(p)
}

const filterMapWithIndex = <A, B>(fa: StrMap<A>, f: (i: string, a: A) => Option<B>): StrMap<B> => {
  return fa.filterMapWithIndex(f)
}

const filterWithIndex = <A>(fa: StrMap<A>, p: (i: string, a: A) => boolean): StrMap<A> => {
  return fa.filterWithIndex(p)
}

/**
 * @since 1.0.0
 */
export const strmap: FunctorWithIndex1<URI, string> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = {
  URI,
  map,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  wither,
  wilt,
  mapWithIndex,
  reduceWithIndex,
  foldMapWithIndex,
  foldrWithIndex,
  traverseWithIndex,
  partitionMapWithIndex,
  partitionWithIndex,
  filterMapWithIndex,
  filterWithIndex
}
