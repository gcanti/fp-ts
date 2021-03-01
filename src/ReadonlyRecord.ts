/**
 * @since 3.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { Compactable1 } from './Compactable'
import { Either } from './Either'
import { Eq, fromEquals } from './Eq'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex, RefinementWithIndex } from './FilterableWithIndex'
import { Foldable as Foldable_, Foldable1, Foldable2, Foldable3, Foldable4 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { Endomorphism, flow, pipe, Predicate } from './function'
import { flap as flap_, Functor1 } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Magma } from './Magma'
import { Monoid } from './Monoid'
import * as O from './Option'
import { Semigroup } from './Semigroup'
import { separated, Separated } from './Separated'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable, Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export type ReadonlyRecord<K extends string, T> = Readonly<Record<K, T>>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Create a `ReadonlyRecord` from one key/value pair.
 *
 * @category constructors
 * @since 3.0.0
 */
export const singleton = <A>(k: string, a: A): ReadonlyRecord<string, A> => ({ [k]: a } as any)

/**
 * Create a `ReadonlyRecord` from a `Foldable` collection of key/value pairs, using the
 * specified `Magma` to combine values for duplicate keys, and the specified `f` to map to key/value pairs.
 *
 * @category constructors
 * @since 3.0.0
 */
export function fromFoldable<F extends URIS4>(
  F: Foldable4<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <B>(
  M: Magma<B>
) => <A>(f: (a: A) => readonly [string, B]) => <R, E>(fa: Kind3<F, R, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => <E>(fa: Kind2<F, E, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (fa: Kind<F, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F>(
  F: Foldable_<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (fa: HKT<F, A>) => ReadonlyRecord<string, B>
export function fromFoldable<F>(
  F: Foldable_<F>
): <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) => (fa: HKT<F, A>) => ReadonlyRecord<string, B> {
  return <B>(M: Magma<B>) => <A>(f: (a: A) => readonly [string, B]) =>
    F.reduce<Record<string, B>, A>({}, (r, a) => {
      const [k, b] = f(a)
      r[k] = _hasOwnProperty.call(r, k) ? M.concat(b)(r[k]) : b
      return r
    })
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * Insert an element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key already exists.
 *
 * @category combinators
 * @since 3.0.0
 */
export const insertAt = <A>(k: string, a: A) => (r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
  if (!_hasOwnProperty.call(r, k)) {
    const out: Record<string, A> = Object.assign({}, r)
    out[k] = a
    return O.some(out)
  }
  return O.none
}

/**
 * Insert or replace a key/value pair in a `ReadonlyRecord`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const upsertAt = <A>(k: string, a: A) => (r: ReadonlyRecord<string, A>): ReadonlyRecord<string, A> => {
  if (_hasOwnProperty.call(r, k) && r[k] === a) {
    return r
  }
  const out: Record<string, A> = Object.assign({}, r)
  out[k] = a
  return out
}

/**
 * Change the element at the specified keys, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const updateAt = <A>(k: string, a: A): ((r: ReadonlyRecord<string, A>) => Option<ReadonlyRecord<string, A>>) =>
  modifyAt(k, () => a)

/**
 * Apply a function to the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const modifyAt = <A>(k: string, f: Endomorphism<A>) => (
  r: ReadonlyRecord<string, A>
): Option<ReadonlyRecord<string, A>> => {
  if (!has(k, r)) {
    return O.none
  }
  const a = f(r[k])
  if (a === r[k]) {
    return O.some(r)
  }
  const out: Record<string, A> = Object.assign({}, r)
  out[k] = a
  return O.some(out)
}

/**
 * Delete the element at the specified key, creating a new `ReadonlyRecord`, or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const deleteAt = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<ReadonlyRecord<string, A>> => {
  if (!_hasOwnProperty.call(r, k)) {
    return O.none
  }
  const out: Record<string, A> = Object.assign({}, r)
  delete out[k]
  return O.some(out)
}

/**
 * Delete the element at the specified key, returning the value as well as the subsequent `ReadonlyRecord`,
 * or returning `None` if the key doesn't exist.
 *
 * @category combinators
 * @since 3.0.0
 */
export const pop = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<readonly [A, ReadonlyRecord<string, A>]> =>
  pipe(
    r,
    deleteAt(k),
    O.map((out) => [r[k], out])
  )

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a `ReadonlyRecord` passing the values to the iterating function.
 *
 * @category Functor
 * @since 3.0.0
 */
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function map<A, B>(f: (a: A) => B): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return mapWithIndex((_, a) => f(a))
}

/**
 * Map a `ReadonlyRecord` passing both the keys and values to the iterating function.
 *
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export function mapWithIndex<K extends string, A, B>(
  f: (k: K, a: A) => B
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<K, B>
export function mapWithIndex<A, B>(
  f: (k: string, a: A) => B
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (fa) => {
    const out: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      out[key] = f(key, fa[key])
    }
    return out
  }
}

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export function reduceWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, b: B, a: A) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: ReadonlyRecord<string, A>) => B {
  return (fa) => {
    let out = b
    const ks = keys(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = f(k, out, fa[k])
    }
    return out
  }
}

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: ReadonlyRecord<K, A>) => M
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <A>(f: (k: string, a: A) => M) => (fa: ReadonlyRecord<string, A>) => M {
  return (f) => (fa) => {
    let out = M.empty
    const ks = keys(fa)
    const len = ks.length
    for (let i = 0; i < len; i++) {
      const k = ks[i]
      out = M.concat(f(k, fa[k]))(out)
    }
    return out
  }
}

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export function reduceRightWithIndex<K extends string, A, B>(
  b: B,
  f: (k: K, a: A, b: B) => B
): (fa: ReadonlyRecord<K, A>) => B
export function reduceRightWithIndex<A, B>(
  b: B,
  f: (k: string, a: A, b: B) => B
): (fa: ReadonlyRecord<string, A>) => B {
  return (fa) => {
    let out = b
    const ks = keys(fa)
    const len = ks.length
    for (let i = len - 1; i >= 0; i--) {
      const k = ks[i]
      out = f(k, fa[k], out)
    }
    return out
  }
}

/**
 * @category TraversableWithIndex
 * @since 3.0.0
 */
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A, B>(
  f: (k: K, a: A) => Kind3<F, R, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind2<F, E, B>
) => (ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(
  f: (k: K, a: A) => Kind<F, B>
) => (ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  return <A, B>(f: (k: string, a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => {
    const ks = keys(ta)
    if (ks.length === 0) {
      return F.of(empty)
    }
    let fr: HKT<F, Record<string, B>> = F.of({})
    for (const key of ks) {
      fr = pipe(
        fr,
        F.map((r) => (b: B) => {
          r[key] = b
          return r
        }),
        F.ap(f(key, ta[key]))
      )
    }
    return fr
  }
}

/**
 * @category Traversable
 * @since 3.0.0
 */
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <R, A, B>(
  f: (a: A) => Kind3<F, R, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind3<F, R, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <E, A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A, B>(
  f: (a: A) => Kind2<F, E, B>
) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind2<F, E, ReadonlyRecord<K, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => Kind<F, ReadonlyRecord<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: ReadonlyRecord<K, A>) => HKT<F, ReadonlyRecord<K, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>> {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category Traversable
 * @since 3.0.0
 */
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, R, E, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <K extends string, R, A>(ta: ReadonlyRecord<K, Kind3<F, R, E, A>>) => Kind3<F, R, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, E, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind2<F, E, A>>) => Kind2<F, E, ReadonlyRecord<K, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A>(ta: ReadonlyRecord<K, Kind<F, A>>) => Kind<F, ReadonlyRecord<K, A>>
export function sequence<F>(
  F: Applicative<F>
): <K extends string, A>(ta: ReadonlyRecord<K, HKT<F, A>>) => HKT<F, ReadonlyRecord<K, A>>
export function sequence<F>(
  F: Applicative<F>
): <A>(ta: ReadonlyRecord<string, HKT<F, A>>) => HKT<F, ReadonlyRecord<string, A>> {
  return traverseWithIndex(F)((_, a) => a)
}

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither: Witherable1<URI>['wither'] = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (fa: ReadonlyRecord<string, A>) => HKT<F, ReadonlyRecord<string, B>>) => {
  const traverseF = traverse(F)
  return (f) => flow(traverseF(f), F.map(compact))
}

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt: Witherable1<URI>['wilt'] = <F>(
  F: Applicative<F>
): (<A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (fa: ReadonlyRecord<string, A>) => HKT<F, Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>>) => {
  const traverseF = traverse(F)
  return (f) => flow(traverseF(f), F.map(separate))
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionMapWithIndex<K extends string, A, B, C>(
  f: (key: K, a: A) => Either<B, C>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>>
export function partitionMapWithIndex<A, B, C>(
  f: (key: string, a: A) => Either<B, C>
): (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, B>, ReadonlyRecord<string, C>> {
  return (fa) => {
    const left: Record<string, B> = {}
    const right: Record<string, C> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const e = f(key, fa[key])
      switch (e._tag) {
        case 'Left':
          left[key] = e.left
          break
        case 'Right':
          right[key] = e.right
          break
      }
    }
    return separated(left, right)
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>>
export function partitionWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => Separated<ReadonlyRecord<string, A>, ReadonlyRecord<string, A>> {
  return (fa) => {
    const left: Record<string, A> = {}
    const right: Record<string, A> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const a = fa[key]
      if (predicateWithIndex(key, a)) {
        right[key] = a
      } else {
        left[key] = a
      }
    }
    return separated(left, right)
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterMapWithIndex<A, B>(
  f: (key: string, a: A) => Option<B>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, B> {
  return (fa) => {
    const r: Record<string, B> = {}
    const keys = Object.keys(fa)
    for (const key of keys) {
      const optionB = f(key, fa[key])
      if (O.isSome(optionB)) {
        r[key] = optionB.value
      }
    }
    return r
  }
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: ReadonlyRecord<K, A>) => ReadonlyRecord<string, A>
export function filterWithIndex<A>(
  predicateWithIndex: PredicateWithIndex<string, A>
): (fa: ReadonlyRecord<string, A>) => ReadonlyRecord<string, A> {
  return (fa) => {
    const out: Record<string, A> = {}
    let changed = false
    for (const key in fa) {
      if (_hasOwnProperty.call(fa, key)) {
        const a = fa[key]
        if (predicateWithIndex(key, a)) {
          out[key] = a
        } else {
          changed = true
        }
      }
    }
    return changed ? out : fa
  }
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: Filterable1<URI>['filter'] = <A>(
  predicate: Predicate<A>
): ((fa: Readonly<Record<string, A>>) => Readonly<Record<string, A>>) => filterWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: Filterable1<URI>['filterMap'] = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: Filterable1<URI>['partition'] = <A>(
  predicate: Predicate<A>
): ((fa: Readonly<Record<string, A>>) => Separated<Readonly<Record<string, A>>, Readonly<Record<string, A>>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable1<URI>['partitionMap'] = (f) => partitionMapWithIndex((_, a) => f(a))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable1<URI>['reduce'] = (b, f) => reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: Foldable1<URI>['foldMap'] = (M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (f) => foldMapWithIndexM((_, a) => f(a))
}

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: Foldable1<URI>['reduceRight'] = (b, f) => reduceRightWithIndex(b, (_, a, b) => f(a, b))

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: Compactable1<URI>['compact'] = <A>(
  fa: Readonly<Record<string, Option<A>>>
): Readonly<Record<string, A>> => {
  const r: Record<string, A> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const optionA = fa[key]
    if (O.isSome(optionA)) {
      r[key] = optionA.value
    }
  }
  return r
}

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable1<URI>['separate'] = <A, B>(
  fa: Readonly<Record<string, Either<A, B>>>
): Separated<Readonly<Record<string, A>>, Readonly<Record<string, B>>> => {
  const left: Record<string, A> = {}
  const right: Record<string, B> = {}
  const keys = Object.keys(fa)
  for (const key of keys) {
    const e = fa[key]
    switch (e._tag) {
      case 'Left':
        left[key] = e.left
        break
      case 'Right':
        right[key] = e.right
        break
    }
  }
  return separated(left, right)
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReadonlyRecord'

declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyRecord: ReadonlyRecord<string, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<ReadonlyRecord<string, A>> => ({
  show: (r) => {
    const elements = collect((k, a: A) => `${JSON.stringify(k)}: ${S.show(a)}`)(r).join(', ')
    return elements === '' ? '{}' : `{ ${elements} }`
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export function getEq<K extends string, A>(E: Eq<A>): Eq<ReadonlyRecord<K, A>>
export function getEq<A>(E: Eq<A>): Eq<ReadonlyRecord<string, A>> {
  const isSubrecordE = isSubrecord(E)
  return fromEquals((second) => (first) => isSubrecordE(first)(second) && isSubrecordE(second)(first))
}

/**
 * Returns a `Monoid` instance for `ReadonlyRecord`s given a `Semigroup` instance for their values.
 *
 * @example
 * import * as N from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/ReadonlyRecord'
 * import { pipe } from 'fp-ts/function'
 *
 * const M = getMonoid(N.SemigroupSum)
 * assert.deepStrictEqual(pipe({ foo: 123 }, M.concat({ foo: 456 })), { foo: 579 })
 *
 * @category instances
 * @since 3.0.0
 */
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<ReadonlyRecord<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<ReadonlyRecord<string, A>> {
  return {
    concat: (second) => (first) => {
      if (isEmpty(first)) {
        return second
      }
      if (isEmpty(second)) {
        return first
      }
      const keys = Object.keys(second)
      const len = keys.length
      const r: Record<string, A> = Object.assign({}, first)
      for (let i = 0; i < len; i++) {
        const k = keys[i]
        r[k] = _hasOwnProperty.call(first, k) ? S.concat(second[k])(first[k]) : second[k]
      }
      return r
    },
    empty
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor1<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, string> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, string> = {
  reduceWithIndex,
  foldMapWithIndex,
  reduceRightWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable1<URI> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable1<URI> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, string> = {
  filterMapWithIndex,
  filterWithIndex,
  partitionMapWithIndex,
  partitionWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable1<URI> = {
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, string> = {
  traverseWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Witherable: Witherable1<URI> = {
  wither,
  wilt
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Calculate the number of key/value pairs in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const size = (r: ReadonlyRecord<string, unknown>): number => Object.keys(r).length

/**
 * Test whether a `ReadonlyRecord` is empty.
 *
 * @since 3.0.0
 */
export const isEmpty = (r: ReadonlyRecord<string, unknown>): boolean => Object.keys(r).length === 0

/**
 * @since 3.0.0
 */
export const keys = <K extends string>(r: ReadonlyRecord<K, unknown>): ReadonlyArray<K> =>
  (Object.keys(r) as any).sort()

/**
 * Map a `ReadonlyRecord` into an `ReadonlyArray`.
 *
 * @example
 * import {collect} from 'fp-ts/ReadonlyRecord'
 *
 * const x: { a: string, b: boolean } = { a: 'foo', b: false }
 * assert.deepStrictEqual(
 *   collect((key, val) => ({key: key, value: val}))(x),
 *   [{key: 'a', value: 'foo'}, {key: 'b', value: false}]
 * )
 *
 * @since 3.0.0
 */
export const collect = <K extends string, A, B>(f: (k: K, a: A) => B) => (
  r: ReadonlyRecord<K, A>
): ReadonlyArray<B> => {
  const out: Array<B> = []
  for (const key of keys(r)) {
    out.push(f(key, r[key]))
  }
  return out
}

/**
 * @since 3.0.0
 */
export const toReadonlyArray: <K extends string, A>(r: ReadonlyRecord<K, A>) => ReadonlyArray<readonly [K, A]> =
  /*#__PURE__*/
  collect((k, a) => [k, a])

/**
 * Unfolds a `ReadonlyRecord` into a data structure of key/value pairs.
 *
 * @since 3.0.0
 */
export function toUnfoldable<F extends URIS>(
  U: Unfoldable1<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => Kind<F, readonly [K, A]>
export function toUnfoldable<F>(
  U: Unfoldable<F>
): <K extends string, A>(r: ReadonlyRecord<K, A>) => HKT<F, readonly [K, A]>
export function toUnfoldable<F>(U: Unfoldable<F>): <A>(r: ReadonlyRecord<string, A>) => HKT<F, readonly [string, A]> {
  return (r) => {
    const arr = toReadonlyArray(r)
    const len = arr.length
    return U.unfold(0, (b) => (b < len ? O.some([arr[b], b + 1]) : O.none))
  }
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Test whether or not a key exists in a `ReadonlyRecord`.
 *
 * Note. This function is not pipeable because is a custom type guard.
 *
 * @since 3.0.0
 */
export const has = <K extends string>(k: string, r: ReadonlyRecord<K, unknown>): k is K => _hasOwnProperty.call(r, k)

/**
 * Test whether one `ReadonlyRecord` contains all of the keys and values contained in another `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const isSubrecord = <A>(E: Eq<A>) => (second: ReadonlyRecord<string, A>) => (
  first: ReadonlyRecord<string, A>
): boolean => {
  for (const k in first) {
    if (!_hasOwnProperty.call(second, k) || !E.equals(second[k])(first[k])) {
      return false
    }
  }
  return true
}

/**
 * Lookup the value for a key in a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const lookup = (k: string) => <A>(r: ReadonlyRecord<string, A>): Option<A> =>
  _hasOwnProperty.call(r, k) ? O.some(r[k]) : O.none

/**
 * An empty `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyRecord<string, never> = {}

/**
 * @since 3.0.0
 */
export const every = <A>(predicate: Predicate<A>) => (r: ReadonlyRecord<string, A>): boolean => {
  for (const k in r) {
    if (!predicate(r[k])) {
      return false
    }
  }
  return true
}

/**
 * @since 3.0.0
 */
export const some = <A>(predicate: (a: A) => boolean) => (r: ReadonlyRecord<string, A>): boolean => {
  for (const k in r) {
    if (predicate(r[k])) {
      return true
    }
  }
  return false
}

/**
 * Tests whether a value is a member of a `ReadonlyRecord`.
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A): ((fa: ReadonlyRecord<string, A>) => boolean) => {
  const predicate = E.equals(a)
  return (fa) => {
    for (const k in fa) {
      if (predicate(fa[k])) {
        return true
      }
    }
    return false
  }
}
