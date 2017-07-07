import { HKT } from './HKT'
import { Monoid } from './Monoid'
import { Functor, FantasyFunctor } from './Functor'
import { Applicative } from './Applicative'
import { Foldable, FantasyFoldable } from './Foldable'
import { Traversable, FantasyTraversable } from './Traversable'
import { constant, Lazy, curry } from './function'
import { liftA2 } from './Apply'
import { Setoid } from './Setoid'
import { Option, none, some } from './Option'
import { Unfoldable } from './Unfoldable'

// https://github.com/purescript/purescript-maps

export const URI = 'StrMap'

export type URI = typeof URI

export class StrMap<A> implements FantasyFunctor<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  readonly _A: A
  readonly _L: never
  readonly _URI: URI
  constructor(public readonly value: { [key: string]: A }) {}
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
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
    let out: B = b
    for (let k in this.value) {
      out = f(out, this.value[k])
    }
    return out
  }
  traverseWithKey<F>(F: Applicative<F>): <B>(f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
    const concatA2 = liftA2(F, curriedConcat)
    return f => {
      let out = F.of(empty())
      for (let k in this.value) {
        out = concatA2(out, F.map(b => singleton(k, b), f(k, this.value[k])))
      }
      return out
    }
  }
  traverse<F>(F: Applicative<F>): <B>(f: (a: A) => HKT<F, B>) => HKT<F, StrMap<B>> {
    return f => this.traverseWithKey(F)((_, a) => f(a))
  }
}

export const empty: Lazy<StrMap<any>> = constant(new StrMap({}))

export function concat<A>(x: StrMap<A>, y: StrMap<A>): StrMap<A> {
  return new StrMap(Object.assign({}, x.value, y.value))
}

export function map<A, B>(f: (a: A) => B, fa: StrMap<A>): StrMap<B> {
  return fa.map(f)
}

export function reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: StrMap<A>): B {
  return fa.reduce(f, b)
}

export const curriedConcat: <A>(x: StrMap<A>) => (y: StrMap<A>) => StrMap<A> = curry(concat)

export class Ops {
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }

  traverseWithKey<F>(F: Applicative<F>): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
  traverseWithKey<F>(F: Applicative<F>): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
    return (f, ta) => ta.traverseWithKey(F)(f)
  }
}

const ops = new Ops()
export const traverse: Ops['traverse'] = ops.traverse
export const traverseWithKey: Ops['traverseWithKey'] = ops.traverseWithKey

/** Test whether one dictionary contains all of the keys and values contained in another dictionary */
export function isSubdictionary<A>(setoid: Setoid<A>, d1: StrMap<A>, d2: StrMap<A>): boolean {
  for (let k in d1.value) {
    if (!d2.value.hasOwnProperty(k) || !setoid.equals(d1.value[k], d2.value[k])) {
      return false
    }
  }
  return true
}

/** Calculate the number of key/value pairs in a dictionary */
export function size<A>(d: StrMap<A>): number {
  return Object.keys(d).length
}

/** Test whether a dictionary is empty */
export function isEmpty<A>(d: StrMap<A>): boolean {
  return size(d) === 0
}

export function getSetoid<A>(setoid: Setoid<A>): Setoid<StrMap<A>> {
  return {
    equals(x, y) {
      return isSubdictionary(setoid, x, y) && isSubdictionary(setoid, y, x)
    }
  }
}

/** Create a dictionary with one key/value pair */
export function singleton<A>(k: string, a: A): StrMap<A> {
  return new StrMap({ [k]: a })
}

/** Lookup the value for a key in a dictionary */
export function lookup<A>(k: string, d: StrMap<A>): Option<A> {
  return d.value.hasOwnProperty(k) ? some(d.value[k]) : none
}

/** Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 */
export function fromFoldable<F>(
  F: Foldable<F>
): <A>(f: (existing: A, a: A) => A, ta: HKT<F, [string, A]>) => StrMap<A> {
  return <A>(f: (existing: A, a: A) => A, ta: HKT<F, [string, A]>) =>
    F.reduce(
      (b, a) => {
        const k = a[0]
        b.value[k] = b.value.hasOwnProperty(k) ? f(b.value[k], a[1]) : a[1]
        return b
      },
      new StrMap<A>({}),
      ta
    )
}

export function collect<A, B>(f: (k: string, a: A) => B, d: StrMap<A>): Array<B> {
  const out: Array<B> = []
  for (let k in d.value) {
    out.push(f(k, d.value[k]))
  }
  return out
}

export function toArray<A>(d: StrMap<A>): Array<[string, A]> {
  return collect((k, a) => [k, a] as [string, A], d)
}

/** Unfolds a dictionary into a list of key/value pairs */
export function toUnfoldable<F extends string>(unfoldable: Unfoldable<F>): <A>(d: StrMap<A>) => HKT<F, [string, A]> {
  return <A>(d: StrMap<A>) => {
    const arr = toArray(d)
    if (unfoldable.URI === 'Array') {
      return arr as any
    }
    const len = arr.length
    return unfoldable.unfoldr<[string, A], number>(b => (b < len ? some([arr[b], b + 1]) : none), 0)
  }
}

/** Apply a function of two arguments to each key/value pair, producing a new dictionary */
export function mapWithKey<A, B>(f: (k: string, a: A) => B, fa: StrMap<A>): StrMap<B> {
  return fa.mapWithKey(f)
}

export const strmap: Monoid<StrMap<any>> & Functor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  concat,
  empty,
  map,
  reduce,
  traverse
}

//
// overloadings
//

import { OptionURI } from './overloadings'

export interface Ops {
  traverse(F: Applicative<OptionURI>): <A, B>(f: (a: A) => Option<B>, ta: StrMap<A>) => Option<StrMap<B>>
  traverseWithKey(
    F: Applicative<OptionURI>
  ): <A, B>(f: (k: string, a: A) => Option<B>, ta: StrMap<A>) => Option<StrMap<B>>
}
