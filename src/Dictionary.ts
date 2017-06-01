import { HKT, HKTS } from './HKT'
import { Monoid } from './Monoid'
import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Foldable } from './Foldable'
import { Traversable } from './Traversable'
import { constant, Lazy, curry } from './function'
import { liftA2 } from './Apply'
import { Setoid } from './Setoid'
import { Option, none, some } from './Option'
import { Unfoldable } from './Unfoldable'

// https://github.com/purescript/purescript-maps

declare module './HKT' {
  interface HKT<A> {
    Dictionary: Dictionary<A>
  }
}

export const URI = 'Dictionary'

export type URI = typeof URI

export type Dictionary<A> = { [key: string]: A }

export const empty: Lazy<Dictionary<any>> = constant({})

export function concat<A>(x: Dictionary<A>, y: Dictionary<A>): Dictionary<A> {
  return Object.assign({}, x, y)
}

export function map<A, B>(f: (a: A) => B, fa: Dictionary<A>): Dictionary<B> {
  return mapWithKey((_, a) => f(a), fa)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: Dictionary<A>): B {
  let out: B = b
  for (let k in fa) {
    out = f(out, fa[k])
  }
  return out
}

export const curriedConcat = curry<Dictionary<any>, Dictionary<any>, Dictionary<any>>(concat)

export function traverse<F extends HKTS>(applicative: Applicative<F>): <A, B, U = any, V = any>(f: (a: A) => HKT<B, U, V>[F], ta: Dictionary<A>) => HKT<Dictionary<B>, U, V>[F] {
  const traverse = traverseWithKey(applicative)
  return <A, B>(f: (a: A) => HKT<B>[F], ta: Dictionary<A>) => traverse((_, a) => f(a), ta)
}

export function traverseWithKey<F extends HKTS>(applicative: Applicative<F>): <A, B, U = any, V = any>(f: (k: string, a: A) => HKT<B, U, V>[F], ta: Dictionary<A>) => HKT<Dictionary<B>, U, V>[F] {
  return <A, B>(f: (k: string, a: A) => HKT<B>[F], ta: Dictionary<A>) => {
    const concatA2 = liftA2(applicative, curriedConcat)
    let out = applicative.of(empty())
    for (let k in ta) {
      out = concatA2(out, applicative.map((b: B) => singleton(k, b), f(k, ta[k])))
    }
    return out
  }
}

/** Test whether one dictionary contains all of the keys and values contained in another dictionary */
export function isSubdictionary<A>(setoid: Setoid<A>, d1: Dictionary<A>, d2: Dictionary<A>): boolean {
  for (let k in d1) {
    if (!d2.hasOwnProperty(k) || !setoid.equals(d1[k], d2[k])) {
      return false
    }
  }
  return true
}

/** Calculate the number of key/value pairs in a dictionary */
export function size<A>(d: Dictionary<A>): number {
  return Object.keys(d).length
}

/** Test whether a dictionary is empty */
export function isEmpty<A>(d: Dictionary<A>): boolean {
  return size(d) === 0
}

export function getSetoid<A>(setoid: Setoid<A>): Setoid<Dictionary<A>> {
  return {
    equals(x, y) {
      return isSubdictionary(setoid, x, y) && isSubdictionary(setoid, y, x)
    }
  }
}

/** Create a dictionary with one key/value pair */
export function singleton<A>(k: string, a: A): Dictionary<A> {
  return { [k]: a }
}

/** Lookup the value for a key in a dictionary */
export function lookup<A>(k: string, d: Dictionary<A>): Option<A> {
  return d.hasOwnProperty(k) ? some(d[k]) : none
}

/** Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 */
export function fromFoldable<F extends HKTS>(foldable: Foldable<F>): <A>(f: (existing: A, a: A) => A, ta: HKT<[string, A]>[F]) => Dictionary<A> {
  return <A>(f: (existing: A, a: A) => A, ta: HKT<[string, A]>[F]) => foldable.reduce((b, a: [string, A]) => {
    const k = a[0]
    b[k] = b.hasOwnProperty(k) ? f(b[k], a[1]) : a[1]
    return b
  }, {} as Dictionary<A>, ta)
}

export function collect<A, B>(f: (k: string, a: A) => B, d: Dictionary<A>): Array<B> {
  const out: Array<B> = []
  for (let k in d) {
    out.push(f(k, d[k]))
  }
  return out
}

export function toArray<A>(d: Dictionary<A>): Array<[string, A]> {
  return collect((k, a) => [k, a] as [string, A], d)
}

/** Unfolds a dictionary into a list of key/value pairs */
export function toUnfoldable<F extends HKTS>(unfoldable: Unfoldable<F>): <A>(d: Dictionary<A>) => HKT<[string, A]>[F] {
  return <A>(d: Dictionary<A>) => {
    const arr = toArray(d)
    if (unfoldable.URI === 'Array') {
      return arr
    }
    const len = arr.length
    return unfoldable.unfoldr<[string, A], number>(b => b < len ? some([arr[b], b + 1]) : none, 0)
  }
}

/** Apply a function of two arguments to each key/value pair, producing a new dictionary */
export function mapWithKey<A, B>(f: (k: string, a: A) => B, fa: Dictionary<A>): Dictionary<B> {
  const fb: Dictionary<B> = {}
  for (let k in fa) {
    fb[k] = f(k, fa[k])
  }
  return fb
}

const proof:
  Monoid<Dictionary<any>> &
  Functor<URI> &
  Foldable<URI> &
  Traversable<URI>
= { empty, concat, map }
// tslint:disable-next-line no-unused-expression
{ proof }
