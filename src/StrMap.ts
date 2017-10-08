import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Monoid } from './Monoid'
import { Functor, FantasyFunctor } from './Functor'
import { Applicative } from './Applicative'
import { Foldable, FantasyFoldable } from './Foldable'
import { Traversable, FantasyTraversable } from './Traversable'
import { tuple } from './function'
import { liftA2 } from './Apply'
import { Setoid } from './Setoid'
import { Option, none, some } from './Option'
import { Unfoldable } from './Unfoldable'
import { URI as ArrayURI } from './Array'

// https://github.com/purescript/purescript-maps

declare module './HKT' {
  interface URI2HKT<A> {
    StrMap: StrMap<A>
  }
}

export const URI = 'StrMap'

export type URI = typeof URI

export class StrMap<A> implements FantasyFunctor<URI, A>, FantasyFoldable<A>, FantasyTraversable<URI, A> {
  readonly _A: A
  readonly _URI: URI
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
  reduce<B>(f: (b: B, a: A) => B, b: B): B {
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
        out = concatA2(out)(F.map(b => singleton(k)(b), f(k, this.value[k])))
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

export const empty = <A>(): StrMap<A> => new StrMap({})

export const concat = <A>(x: StrMap<A>) => (y: StrMap<A>): StrMap<A> => {
  return new StrMap(Object.assign({}, x.value, y.value))
}

export const map = <A, B>(f: (a: A) => B, fa: StrMap<A>): StrMap<B> => fa.map(f)

export const reduce = <A, B>(f: (b: B, a: A) => B, b: B, fa: StrMap<A>): B => fa.reduce(f, b)

export class Ops {
  traverseWithKey<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (k: string, a: A) => HKT2As<F, L, B>, ta: StrMap<A>) => HKT2As<F, L, StrMap<B>>
  traverseWithKey<F extends HKTS>(
    F: Applicative<F>
  ): <A, B>(f: (k: string, a: A) => HKTAs<F, B>, ta: StrMap<A>) => HKTAs<F, StrMap<B>>
  traverseWithKey<F>(F: Applicative<F>): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>>
  traverseWithKey<F>(F: Applicative<F>): <A, B>(f: (k: string, a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
    return (f, ta) => ta.traverseWithKey(F)(f)
  }

  traverse<F extends HKT2S>(
    F: Applicative<F>
  ): <L, A, B>(f: (a: A) => HKT2As<F, L, B>, ta: StrMap<A>) => HKT2As<F, L, StrMap<B>>
  traverse<F extends HKTS>(F: Applicative<F>): <A, B>(f: (a: A) => HKTAs<F, B>, ta: StrMap<A>) => HKTAs<F, StrMap<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<URI, A>) => HKT<F, StrMap<B>>
  traverse<F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>, ta: StrMap<A>) => HKT<F, StrMap<B>> {
    return (f, ta) => ta.traverse(F)(f)
  }
}

const ops = new Ops()
export const traverseWithKey: Ops['traverseWithKey'] = ops.traverseWithKey
export const traverse: Ops['traverse'] = ops.traverse

/** Test whether one dictionary contains all of the keys and values contained in another dictionary */
export const isSubdictionary = <A>(setoid: Setoid<A>) => (d1: StrMap<A>) => (d2: StrMap<A>): boolean => {
  for (let k in d1.value) {
    if (!d2.value.hasOwnProperty(k) || !setoid.equals(d1.value[k])(d2.value[k])) {
      return false
    }
  }
  return true
}

/** Calculate the number of key/value pairs in a dictionary */
export const size = <A>(d: StrMap<A>): number => Object.keys(d.value).length

/** Test whether a dictionary is empty */
export const isEmpty = <A>(d: StrMap<A>): boolean => {
  for (const k in d.value) {
    return k === null
  }
  return true
}

export const getSetoid = <A>(setoid: Setoid<A>): Setoid<StrMap<A>> => ({
  equals: x => y => isSubdictionary(setoid)(x)(y) && isSubdictionary(setoid)(y)(x)
})

/** Create a dictionary with one key/value pair */
export const singleton = (k: string) => <A>(a: A): StrMap<A> => new StrMap({ [k]: a })

/** Lookup the value for a key in a dictionary */
export const lookup = (k: string) => <A>(d: StrMap<A>): Option<A> =>
  d.value.hasOwnProperty(k) ? some(d.value[k]) : none

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 */
export const fromFoldable = <F>(F: Foldable<F>) => <A>(f: (existing: A) => (a: A) => A) => (
  ta: HKT<F, [string, A]>
): StrMap<A> =>
  F.reduce(
    (b, a) => {
      const k = a[0]
      b.value[k] = b.value.hasOwnProperty(k) ? f(b.value[k])(a[1]) : a[1]
      return b
    },
    new StrMap<A>({}),
    ta
  )

export const collect = <A, B>(f: (k: string, a: A) => B) => (d: StrMap<A>): Array<B> => {
  const out: Array<B> = []
  for (let k in d.value) {
    out.push(f(k, d.value[k]))
  }
  return out
}

export const toArray = <A>(d: StrMap<A>): Array<[string, A]> => collect((k, a: A) => tuple(k, a))(d)

/** Unfolds a dictionary into a list of key/value pairs */
export const toUnfoldable = <F extends string>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>): HKT<F, [string, A]> => {
  const arr = toArray(d)
  if (unfoldable.URI === ArrayURI) {
    return arr as any
  }
  const len = arr.length
  return unfoldable.unfoldr(b => (b < len ? some(tuple(arr[b], b + 1)) : none), 0)
}

// cannot curry
/** Apply a function of two arguments to each key/value pair, producing a new dictionary */
export const mapWithKey = <A, B>(f: (k: string, a: A) => B, fa: StrMap<A>): StrMap<B> => fa.mapWithKey(f)

/** Insert or replace a key/value pair in a map */
export const insert = (k: string) => <A>(a: A) => (d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  copy[k] = a
  return new StrMap(copy)
}

/** Delete a key and value from a map */
export const remove = (k: string) => <A>(d: StrMap<A>): StrMap<A> => {
  const copy = Object.assign({}, d.value)
  delete copy[k]
  return new StrMap(copy)
}

/** Delete a key and value from a map, returning the value as well as the subsequent map */
export const pop = (k: string) => <A>(d: StrMap<A>): Option<[A, StrMap<A>]> =>
  lookup(k)(d).fold(() => none, a => some(tuple(a, remove(k)(d))))

export const strmap: Monoid<StrMap<any>> & Functor<URI> & Foldable<URI> & Traversable<URI> = {
  URI,
  concat,
  empty,
  map,
  reduce,
  traverse
}
