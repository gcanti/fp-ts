import { HKT, URIS, URIS2, Type, Type2, Type3, URIS3 } from './HKT'
import { Monoid } from './Monoid'
import { Functor1 } from './Functor'
import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Traversable1 } from './Traversable'
import { tuple } from './function'
import { liftA2 } from './Apply'
import { Setoid } from './Setoid'
import { Option, none, some } from './Option'
import { Unfoldable } from './Unfoldable'

// https://github.com/purescript/purescript-maps

declare module './HKT' {
  interface URI2HKT<A> {
    StrMap: StrMap<A>
  }
}

export const URI = 'StrMap'

export type URI = typeof URI

/**
 * @data
 * @constructor StrMap
 */
export class StrMap<A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: { [key: string]: A }) {}
  mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B> {
    const o = this.value
    const r: { [key: string]: B } = {}
    for (let k in o) {
      r[k] = f(k, o[k])
    }
    return new StrMap(r)
  }
  map<B>(f: (a: A) => B): StrMap<B> {
    return this.mapWithKey((_, a) => f(a))
  }
  reduce<B>(b: B, f: (b: B, a: A) => B): B {
    let out: B = b
    for (let k in this.value) {
      out = f(out, this.value[k])
    }
    return out
  }
}

const empty: StrMap<never> = new StrMap({})

const concat = <A>(x: StrMap<A>, y: StrMap<A>): StrMap<A> => {
  return new StrMap(Object.assign({}, x.value, y.value))
}

const concatCurried = <A>(x: StrMap<A>) => (y: StrMap<A>): StrMap<A> => concat(x, y)

/** @function */
export const getMonoid = <A = never>(): Monoid<StrMap<A>> => {
  return {
    concat,
    empty
  }
}

const map = <A, B>(fa: StrMap<A>, f: (a: A) => B): StrMap<B> => {
  return fa.map(f)
}

const reduce = <A, B>(fa: StrMap<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

/** @function */
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
  return <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => {
    const concatA2: <A>(a: HKT<F, StrMap<A>>) => (b: HKT<F, StrMap<A>>) => HKT<F, StrMap<A>> = liftA2(F)(concatCurried)
    let out: HKT<F, StrMap<B>> = F.of(empty)
    for (let k in ta.value) {
      out = concatA2(out)(F.map(f(k, ta.value[k]), b => singleton(k, b)))
    }
    return out
  }
}

function traverse<F>(F: Applicative<F>): <A, B>(ta: StrMap<A>, f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
  return (ta, f) => traverseWithKey(F)(ta, (_, a) => f(a))
}

/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 * @function
 */
export const isSubdictionary = <A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>): boolean => {
  for (let k in d1.value) {
    if (!d2.value.hasOwnProperty(k) || !S.equals(d1.value[k], d2.value[k])) {
      return false
    }
  }
  return true
}

/**
 * Calculate the number of key/value pairs in a dictionary
 * @function
 */
export const size = <A>(d: StrMap<A>): number => {
  return Object.keys(d.value).length
}

/**
 * Test whether a dictionary is empty
 * @function
 */
export const isEmpty = <A>(d: StrMap<A>): boolean => {
  for (const k in d.value) {
    return k === null
  }
  return true
}

/** @function */
export const getSetoid = <A>(S: Setoid<A>): Setoid<StrMap<A>> => {
  const isSubdictionaryS = isSubdictionary(S)
  return {
    equals: (x, y) => isSubdictionaryS(x, y) && isSubdictionaryS(y, x)
  }
}

/**
 * Create a dictionary with one key/value pair
 * @function
 */
export const singleton = <A>(k: string, a: A): StrMap<A> => {
  return new StrMap({ [k]: a })
}

/**
 * Lookup the value for a key in a dictionary
 * @function
 */
export const lookup = <A>(k: string, d: StrMap<A>): Option<A> => {
  return d.value.hasOwnProperty(k) ? some(d.value[k]) : none
}

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 * @function
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
export function fromFoldable<F>(F: Foldable<F>): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>
export function fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A> {
  return (ta, f) =>
    F.reduce(ta, new StrMap({}), (b, a) => {
      const k = a[0]
      b.value[k] = b.value.hasOwnProperty(k) ? f(b.value[k], a[1]) : a[1]
      return b
    })
}

/** @function */
export const collect = <A, B>(d: StrMap<A>, f: (k: string, a: A) => B): Array<B> => {
  const out: Array<B> = []
  for (let k in d.value) {
    out.push(f(k, d.value[k]))
  }
  return out
}

/** @function */
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => {
  return collect(d, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a dictionary into a list of key/value pairs
 * @function
 */
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]> => {
  const arr = toArray(d)
  const len = arr.length
  return unfoldable.unfoldr(0, b => (b < len ? some(tuple(arr[b], b + 1)) : none))
}

/**
 * Insert or replace a key/value pair in a map
 * @function
 */
export const insert = <A>(k: string, a: A, d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  copy[k] = a
  return new StrMap(copy)
}

/**
 * Delete a key and value from a map
 * @function
 */
export const remove = <A>(k: string, d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  delete copy[k]
  return new StrMap(copy)
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 * @function
 */
export const pop = <A>(k: string, d: StrMap<A>): Option<[A, StrMap<A>]> => {
  return lookup(k, d).fold(none, a => some(tuple(a, remove(k, d))))
}

/** @instance */
export const strmap: Functor1<URI> & Foldable1<URI> & Traversable1<URI> = {
  URI,
  map,
  reduce,
  traverse
}
