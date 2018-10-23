import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Separated } from './Compactable'
import { Either } from './Either'
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable'
import { Predicate, tuple } from './function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT'
import { getDictionaryMonoid, Monoid } from './Monoid'
import { none, Option, some } from './Option'
import { Setoid } from './Setoid'
import { Unfoldable } from './Unfoldable'

/**
 * Calculate the number of key/value pairs in a dictionary
 * @function
 * @since 1.10.0
 */
export const size = <A>(d: { [key: string]: A }): number => {
  return Object.keys(d).length
}

/**
 * Test whether a dictionary is empty
 * @function
 * @since 1.10.0
 */
export const isEmpty = <A>(d: { [key: string]: A }): boolean => {
  return Object.keys(d).length === 0
}

/**
 * @function
 * @since 1.10.0
 */
export const collect = <A, B>(d: { [key: string]: A }, f: (k: string, a: A) => B): Array<B> => {
  const out: Array<B> = []
  const keys = Object.keys(d).sort()
  for (const key of keys) {
    out.push(f(key, d[key]))
  }
  return out
}

/**
 * @function
 * @since 1.10.0
 */
export const toArray = <A>(d: { [key: string]: A }): Array<[string, A]> => {
  return collect(d, (k, a: A) => tuple(k, a))
}

/**
 * Unfolds a dictionary into a list of key/value pairs
 * @function
 * @since 1.10.0
 */
export const toUnfoldable = <F>(unfoldable: Unfoldable<F>) => <A>(d: { [key: string]: A }): HKT<F, [string, A]> => {
  const arr = toArray(d)
  const len = arr.length
  return unfoldable.unfoldr(0, b => (b < len ? some(tuple(arr[b], b + 1)) : none))
}

/**
 * Insert or replace a key/value pair in a map
 * @function
 * @since 1.10.0
 */
export const insert = <A>(k: string, a: A, d: { [key: string]: A }): { [key: string]: A } => {
  const r = Object.assign({}, d)
  r[k] = a
  return r
}

/**
 * Delete a key and value from a map
 * @function
 * @since 1.10.0
 */
export const remove = <A>(k: string, d: { [key: string]: A }): { [key: string]: A } => {
  const r = Object.assign({}, d)
  delete r[k]
  return r
}

/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 * @function
 * @since 1.10.0
 */
export const pop = <A>(k: string, d: { [key: string]: A }): Option<[A, { [key: string]: A }]> => {
  const a = lookup(k, d)
  return a.isNone() ? none : some(tuple(a.value, remove(k, d)))
}

/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 * @function
 * @since 1.10.0
 */
export const isSubdictionary = <A>(S: Setoid<A>) => (d1: { [key: string]: A }, d2: { [key: string]: A }): boolean => {
  for (let k in d1) {
    if (!d2.hasOwnProperty(k) || !S.equals(d1[k], d2[k])) {
      return false
    }
  }
  return true
}

/**
 * @function
 * @since 1.10.0
 */
export const getSetoid = <A>(S: Setoid<A>): Setoid<{ [key: string]: A }> => {
  const isSubdictionaryS = isSubdictionary(S)
  return {
    equals: (x, y) => isSubdictionaryS(x, y) && isSubdictionaryS(y, x)
  }
}

/**
 * @function
 * @since 1.10.0
 */
export const getMonoid = getDictionaryMonoid

/**
 * Lookup the value for a key in a dictionary
 * @since 1.10.0
 */
export const lookup = <A>(key: string, fa: { [key: string]: A }): Option<A> => {
  return fa.hasOwnProperty(key) ? some(fa[key]) : none
}

/**
 * @since 1.10.0
 */
export const filter = <A>(fa: { [key: string]: A }, p: Predicate<A>): { [key: string]: A } => {
  const r: { [key: string]: A } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const a = fa[key]
    if (p(a)) {
      r[key] = a
    }
  }
  return r
}

/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 * @function
 * @since 1.10.0
 */
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <U, L, A>(ta: Type3<F, U, L, [string, A]>, f: (existing: A, a: A) => A) => { [key: string]: A }
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <L, A>(ta: Type2<F, L, [string, A]>, f: (existing: A, a: A) => A) => { [key: string]: A }
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <A>(ta: Type<F, [string, A]>, f: (existing: A, a: A) => A) => { [key: string]: A }
export function fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => { [key: string]: A }
export function fromFoldable<F>(
  F: Foldable<F>
): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => { [key: string]: A } {
  return <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => {
    return F.reduce<[string, A], { [key: string]: A }>(ta, {}, (b, [k, a]) => {
      b[k] = b.hasOwnProperty(k) ? f(b[k], a) : a
      return b
    })
  }
}

/**
 * @constant
 * @since 1.10.0
 */
export const empty: Record<string, never> = {}

/**
 * @function
 * @since 1.10.0
 */
export const mapWithKey = <A, B>(fa: { [key: string]: A }, f: (k: string, a: A) => B): { [key: string]: B } => {
  const r: { [key: string]: B } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    r[key] = f(key, fa[key])
  }
  return r
}

/**
 * @function
 * @since 1.10.0
 */
export const map = <A, B>(fa: { [key: string]: A }, f: (a: A) => B): { [key: string]: B } => {
  return mapWithKey(fa, (_, a) => f(a))
}

/**
 * @function
 * @since 1.10.0
 */
export const reduce = <A, B>(fa: { [key: string]: A }, b: B, f: (b: B, a: A) => B): B => {
  let out: B = b
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = 0; i < len; i++) {
    out = f(out, fa[keys[i]])
  }
  return out
}

/**
 * @function
 * @since 1.10.0
 */
export const foldMap = <M>(M: Monoid<M>) => <A>(fa: { [key: string]: A }, f: (a: A) => M): M => {
  let out: M = M.empty
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = 0; i < len; i++) {
    out = M.concat(out, f(fa[keys[i]]))
  }
  return out
}

/**
 * @function
 * @since 1.10.0
 */
export const foldr = <A, B>(fa: { [key: string]: A }, b: B, f: (a: A, b: B) => B): B => {
  let out: B = b
  const keys = Object.keys(fa).sort()
  const len = keys.length
  for (let i = len - 1; i >= 0; i--) {
    out = f(fa[keys[i]], out)
  }
  return out
}

/**
 * Create a dictionary with one key/value pair
 * @function
 * @since 1.10.0
 */
export const singleton = <A>(k: string, a: A): { [key: string]: A } => {
  return { [k]: a }
}

/**
 * @function
 * @since 1.10.0
 */
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(
  ta: { [key: string]: A },
  f: (k: string, a: A) => Type3<F, U, L, B>
) => Type3<F, U, L, { [key: string]: B }>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: { [key: string]: A }, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, { [key: string]: B }>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: { [key: string]: A }, f: (k: string, a: A) => Type<F, B>) => Type<F, { [key: string]: B }>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: { [key: string]: A }, f: (k: string, a: A) => HKT<F, B>) => HKT<F, { [key: string]: B }>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: { [key: string]: A }, f: (k: string, a: A) => HKT<F, B>) => HKT<F, { [key: string]: B }> {
  return <A, B>(ta: { [key: string]: A }, f: (k: string, a: A) => HKT<F, B>) => {
    let fr: HKT<F, { [key: string]: B }> = F.of(empty)
    const keys = Object.keys(ta)
    for (const key of keys) {
      fr = F.ap(F.map(fr, r => (b: B) => ({ ...r, [key]: b })), f(key, ta[key]))
    }
    return fr
  }
}

/**
 * @function
 * @since 1.10.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: { [key: string]: A }, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, { [key: string]: B }>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: { [key: string]: A }, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, { [key: string]: B }>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: { [key: string]: A }, f: (a: A) => Type2<F, L, B>) => Type2<F, L, { [key: string]: B }>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: { [key: string]: A }, f: (a: A) => Type2<F, L, B>) => Type2<F, L, { [key: string]: B }>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: { [key: string]: A }, f: (a: A) => Type<F, B>) => Type<F, { [key: string]: B }>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: { [key: string]: A }, f: (a: A) => HKT<F, B>) => HKT<F, { [key: string]: B }>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: { [key: string]: A }, f: (a: A) => HKT<F, B>) => HKT<F, { [key: string]: B }> {
  const traverseWithKeyF = traverseWithKey(F)
  return (ta, f) => traverseWithKeyF(ta, (_, a) => f(a))
}

/**
 * @function
 * @since 1.10.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(ta: { [key: string]: Type3<F, U, L, A> }) => Type3<F, U, L, { [key: string]: A }>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(ta: { [key: string]: Type3<F, U, L, A> }) => Type3<F, U, L, { [key: string]: A }>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(ta: { [key: string]: Type2<F, L, A> }) => Type2<F, L, { [key: string]: A }>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A>(ta: { [key: string]: Type2<F, L, A> }) => Type2<F, L, { [key: string]: A }>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <A>(ta: { [key: string]: Type<F, A> }) => Type<F, { [key: string]: A }>
export function sequence<F>(F: Applicative<F>): <A>(ta: { [key: string]: HKT<F, A> }) => HKT<F, { [key: string]: A }>
export function sequence<F>(F: Applicative<F>): <A>(ta: { [key: string]: HKT<F, A> }) => HKT<F, { [key: string]: A }> {
  const traverseWithKeyF = traverseWithKey(F)
  return ta => traverseWithKeyF(ta, (_, a) => a)
}

/**
 * @function
 * @since 1.10.0
 */
export const compact = <A>(fa: { [key: string]: Option<A> }): { [key: string]: A } => {
  const r: { [key: string]: A } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (optionA.isSome()) {
      r[key] = optionA.value
    }
  }
  return r
}

/**
 * @function
 * @since 1.10.0
 */
export const partitionMap = <RL, RR, A>(
  fa: { [key: string]: A },
  f: (a: A) => Either<RL, RR>
): Separated<{ [key: string]: RL }, { [key: string]: RR }> => {
  const left: { [key: string]: RL } = {}
  const right: { [key: string]: RR } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = f(fa[key])
    if (e.isLeft()) {
      left[key] = e.value
    } else {
      right[key] = e.value
    }
  }
  return {
    left,
    right
  }
}

/**
 * @function
 * @since 1.10.0
 */
export const partition = <A>(
  fa: { [key: string]: A },
  p: Predicate<A>
): Separated<{ [key: string]: A }, { [key: string]: A }> => {
  const left: { [key: string]: A } = {}
  const right: { [key: string]: A } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const a = fa[key]
    if (p(a)) {
      right[key] = a
    } else {
      left[key] = a
    }
  }
  return {
    left,
    right
  }
}

/**
 * @function
 * @since 1.10.0
 */
export const separate = <RL, RR>(fa: {
  [key: string]: Either<RL, RR>
}): Separated<{ [key: string]: RL }, { [key: string]: RR }> => {
  const left: { [key: string]: RL } = {}
  const right: { [key: string]: RR } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = fa[key]
    if (e.isLeft()) {
      left[key] = e.value
    } else {
      right[key] = e.value
    }
  }
  return {
    left,
    right
  }
}

/**
 * @function
 * @since 1.10.0
 */
export function wither<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, A, B>(
  wa: { [key: string]: A },
  f: (a: A) => Type3<F, U, L, Option<B>>
) => Type3<F, U, L, { [key: string]: B }>)
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<A, B>(wa: { [key: string]: A }, f: (a: A) => Type3<F, U, L, Option<B>>) => Type3<F, U, L, { [key: string]: B }>)
export function wither<F extends URIS2>(
  F: Applicative2<F>
): (<L, A, B>(wa: { [key: string]: A }, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, { [key: string]: B }>)
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<A, B>(wa: { [key: string]: A }, f: (a: A) => Type2<F, L, Option<B>>) => Type2<F, L, { [key: string]: B }>)
export function wither<F extends URIS>(
  F: Applicative1<F>
): (<A, B>(wa: { [key: string]: A }, f: (a: A) => Type<F, Option<B>>) => Type<F, { [key: string]: B }>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: { [key: string]: A }, f: (a: A) => HKT<F, Option<B>>) => HKT<F, { [key: string]: B }>)
export function wither<F>(
  F: Applicative<F>
): (<A, B>(wa: { [key: string]: A }, f: (a: A) => HKT<F, Option<B>>) => HKT<F, { [key: string]: B }>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), compact)
}

/**
 * @function
 * @since 1.10.0
 */
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): (<U, L, RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (<RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => Type3<F, U, L, Either<RL, RR>>
) => Type3<F, U, L, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): (<L, RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (<RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => Type2<F, L, Either<RL, RR>>
) => Type2<F, L, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F extends URIS>(
  F: Applicative1<F>
): (<RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => Type<F, Either<RL, RR>>
) => Type<F, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<{ [key: string]: RL }, { [key: string]: RR }>>)
export function wilt<F>(
  F: Applicative<F>
): (<RL, RR, A>(
  wa: { [key: string]: A },
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<{ [key: string]: RL }, { [key: string]: RR }>>) {
  const traverseF = traverse(F)
  return (wa, f) => F.map(traverseF(wa, f), separate)
}

/**
 * @function
 * @since 1.10.0
 */
export const filterMap = <A, B>(fa: { [key: string]: A }, f: (a: A) => Option<B>): { [key: string]: B } => {
  const r: { [key: string]: B } = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionB = f(fa[key])
    if (optionB.isSome()) {
      r[key] = optionB.value
    }
  }
  return r
}
