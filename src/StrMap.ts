import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { tuple } from './function'
import { liftA2 } from './Apply'
import { Setoid } from './Setoid'
import { Option, none, some } from './Option'
import { Unfoldable } from './Unfoldable'
import { Semigroup } from './Semigroup'

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
  readonly '-A': A
  readonly '-URI': URI
  constructor(readonly value: { [key: string]: A }) {}
  mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B> {
    const fb: { [key: string]: B } = {}
    for (let k in this.value) {
      fb[k] = f(k, this.value[k])
    }
    return new StrMap(fb)
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
  traverseWithKey<F extends HKT2S>(
    F: Applicative<F>
  ): <L, B>(f: (k: string, a: A) => HKT2As<F, L, B>) => HKT2As<F, L, StrMap<B>>
  traverseWithKey<F extends HKTS>(F: Applicative<F>): <B>(f: (k: string, a: A) => HKTAs<F, B>) => HKTAs<F, StrMap<B>>
  traverseWithKey<F>(F: Applicative<F>): <B>(f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>
  traverseWithKey<F>(F: Applicative<F>): <B>(f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
    const concatA2: <A>(a: HKT<F, StrMap<A>>) => (b: HKT<F, StrMap<A>>) => HKT<F, StrMap<A>> = liftA2(F)(concat)
    return <B>(f: (k: string, a: A) => HKT<F, B>) => {
      let out: HKT<F, StrMap<B>> = F.of(empty())
      for (let k in this.value) {
        out = concatA2(out)(F.map(f(k, this.value[k]), b => singleton(k)(b)))
      }
      return out
    }
  }
  traverse<F extends HKT2S>(F: Applicative<F>): <L, B>(f: (a: A) => HKT2As<F, L, B>) => HKT2As<F, L, StrMap<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <B>(f: (a: A) => HKTAs<F, B>) => HKTAs<F, StrMap<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>>
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
    return f => this.traverseWithKey(F)((_, a) => f(a))
  }
}

/** @function */
export const empty = <A>(): StrMap<A> => {
  return new StrMap({})
}

/** @function */
export const concat = <A>(x: StrMap<A>) => (y: StrMap<A>): StrMap<A> => {
  return new StrMap(Object.assign({}, x.value, y.value))
}

/** @function */
export const getSemigroup = <A>(): Semigroup<StrMap<A>> => {
  return { concat }
}

/** @function */
export const getMonoid = <A>(): Monoid<StrMap<A>> => {
  return { ...getSemigroup(), empty }
}

/** @function */
export const map = <A, B>(fa: StrMap<A>, f: (a: A) => B): StrMap<B> => {
  return fa.map(f)
}

/** @function */
export const reduce = <A, B>(fa: StrMap<A>, b: B, f: (b: B, a: A) => B): B => {
  return fa.reduce(b, f)
}

export function traverseWithKey<F extends HKT2S>(
  F: Applicative<F>
): <L, A, B>(f: (k: string, a: A) => HKT2As<F, L, B>, ta: StrMap<A>) => HKT2As<F, L, StrMap<B>>
export function traverseWithKey<F extends HKTS>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKTAs<F, B>, ta: StrMap<A>) => HKTAs<F, StrMap<B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
/** @function */
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
  return (f, ta) => ta.traverseWithKey(F)(f)
}

export function traverse<F extends HKT2S>(
  F: Applicative<F>
): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: StrMap<A>) => HKT2As<F, L, StrMap<B>>
export function traverse<F extends HKTS>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKTAs<F, B>, ta: StrMap<A>) => HKTAs<F, StrMap<B>>
export function traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, StrMap<B>>
/** @function */
export function traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
  return (f, ta) => ta.traverse(F)(f)
}

/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 * @function
 */
export const isSubdictionary = <A>(setoid: Setoid<A>) => (d1: StrMap<A>) => (d2: StrMap<A>): boolean => {
  for (let k in d1.value) {
    if (!d2.value.hasOwnProperty(k) || !setoid.equals(d1.value[k])(d2.value[k])) {
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
export const getSetoid = <A>(setoid: Setoid<A>): Setoid<StrMap<A>> => {
  return {
    equals: x => y => isSubdictionary(setoid)(x)(y) && isSubdictionary(setoid)(y)(x)
  }
}

/**
 * Create a dictionary with one key/value pair
 * @function
 */
export const singleton = (k: string) => <A>(a: A): StrMap<A> => {
  return new StrMap({ [k]: a })
}

/**
 * Lookup the value for a key in a dictionary
 * @function
 */
export const lookup = (k: string) => <A>(d: StrMap<A>): Option<A> => {
  return d.value.hasOwnProperty(k) ? some(d.value[k]) : none
}

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 * @function
 */
export const fromFoldable = <F>(F: Foldable<F>) => <A>(f: (existing: A) => (a: A) => A) => (
  ta: HKT<F, [string, A]>
): StrMap<A> => {
  return F.reduce(ta, new StrMap<A>({}), (b, a) => {
    const k = a[0]
    b.value[k] = b.value.hasOwnProperty(k) ? f(b.value[k])(a[1]) : a[1]
    return b
  })
}

/** @function */
export const collect = <A, B>(f: (k: string, a: A) => B) => (d: StrMap<A>): Array<B> => {
  const out: Array<B> = []
  for (let k in d.value) {
    out.push(f(k, d.value[k]))
  }
  return out
}

/** @function */
export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => {
  return collect((k, a: A) => tuple(k, a))(d)
}

/**
 * Unfolds a dictionary into a list of key/value pairs
 * @function
 */
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]> => {
  const arr = toArray(d)
  const len = arr.length
  return unfoldable.unfoldr(b => (b < len ? some(tuple(arr[b], b + 1)) : none), 0)
}

/**
 * Apply a function of two arguments to each key/value pair, producing a new dictionary
 * @function
 */
export const mapWithKey = <A, B>(fa: StrMap<A>, f: (k: string, a: A) => B): StrMap<B> => {
  return fa.mapWithKey(f)
}

/**
 * Insert or replace a key/value pair in a map
 * @function
 */
export const insert = (k: string) => <A>(a: A) => (d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  copy[k] = a
  return new StrMap(copy)
}

/**
 * Delete a key and value from a map
 * @function
 */
export const remove = (k: string) => <A>(d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  delete copy[k]
  return new StrMap(copy)
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 * @function
 */
export const pop = (k: string) => <A>(d: StrMap<A>): Option<[A, StrMap<A>]> => {
  return lookup(k)(d).fold(() => none, a => some(tuple(a, remove(k)(d))))
}

/** @instance */
export const strmap: Monoid<StrMap<any>> & Functor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  concat,
  empty,
  map,
  reduce,
  traverse
}
