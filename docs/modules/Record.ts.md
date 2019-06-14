---
title: Record.ts
nav_order: 75
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [empty (constant)](#empty-constant)
- [~~getSetoid~~ (constant)](#getsetoid-constant)
- [~~isSubdictionary~~ (constant)](#issubdictionary-constant)
- [record (constant)](#record-constant)
- [collect (function)](#collect-function)
- [compact (function)](#compact-function)
- [deleteAt (function)](#deleteat-function)
- [elem (function)](#elem-function)
- [every (function)](#every-function)
- [filter (function)](#filter-function)
- [filterMap (function)](#filtermap-function)
- [filterMapWithIndex (function)](#filtermapwithindex-function)
- [~~filterMapWithKey~~ (function)](#filtermapwithkey-function)
- [filterWithIndex (function)](#filterwithindex-function)
- [~~filterWithKey~~ (function)](#filterwithkey-function)
- [foldMap (function)](#foldmap-function)
- [foldMapWithIndex (function)](#foldmapwithindex-function)
- [~~foldMapWithKey~~ (function)](#foldmapwithkey-function)
- [~~foldr~~ (function)](#foldr-function)
- [~~foldrWithKey~~ (function)](#foldrwithkey-function)
- [fromFoldable (function)](#fromfoldable-function)
- [fromFoldableMap (function)](#fromfoldablemap-function)
- [getEq (function)](#geteq-function)
- [getMonoid (function)](#getmonoid-function)
- [getShow (function)](#getshow-function)
- [hasOwnProperty (function)](#hasownproperty-function)
- [~~insert~~ (function)](#insert-function)
- [insertAt (function)](#insertat-function)
- [isEmpty (function)](#isempty-function)
- [isSubrecord (function)](#issubrecord-function)
- [lookup (function)](#lookup-function)
- [map (function)](#map-function)
- [mapWithIndex (function)](#mapwithindex-function)
- [~~mapWithKey~~ (function)](#mapwithkey-function)
- [partition (function)](#partition-function)
- [partitionMap (function)](#partitionmap-function)
- [partitionMapWithIndex (function)](#partitionmapwithindex-function)
- [~~partitionMapWithKey~~ (function)](#partitionmapwithkey-function)
- [partitionWithIndex (function)](#partitionwithindex-function)
- [~~partitionWithKey~~ (function)](#partitionwithkey-function)
- [pop (function)](#pop-function)
- [reduce (function)](#reduce-function)
- [reduceRightWithIndex (function)](#reducerightwithindex-function)
- [reduceWithIndex (function)](#reducewithindex-function)
- [~~reduceWithKey~~ (function)](#reducewithkey-function)
- [~~remove~~ (function)](#remove-function)
- [separate (function)](#separate-function)
- [sequence (function)](#sequence-function)
- [singleton (function)](#singleton-function)
- [size (function)](#size-function)
- [some (function)](#some-function)
- [toArray (function)](#toarray-function)
- [toUnfoldable (function)](#tounfoldable-function)
- [~~traverse~~ (function)](#traverse-function)
- [traverse2v (function)](#traverse2v-function)
- [traverseWithIndex (function)](#traversewithindex-function)
- [~~traverseWithKey~~ (function)](#traversewithkey-function)
- [~~wilt~~ (function)](#wilt-function)
- [~~wither~~ (function)](#wither-function)
- [reduceRight (export)](#reduceright-export)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v1.19.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v1.19.0

# empty (constant)

**Signature**

```ts
export const empty: Record<string, never> = ...
```

Added in v1.10.0

# ~~getSetoid~~ (constant)

Use `getEq`

**Signature**

```ts
export const getSetoid: typeof getEq = ...
```

Added in v1.10.0

# ~~isSubdictionary~~ (constant)

Use `isSubrecord` instead

**Signature**

```ts
export const isSubdictionary: <A>(E: Eq<A>) => (d1: Record<string, A>, d2: Record<string, A>) => boolean = ...
```

Added in v1.10.0

# record (constant)

**Signature**

```ts
export const record: FunctorWithIndex1<URI, string> &
  Foldable2v1<URI> &
  TraversableWithIndex1<URI, string> &
  Compactable1<URI> &
  FilterableWithIndex1<URI, string> &
  Witherable1<URI> &
  FoldableWithIndex1<URI, string> = ...
```

Added in v1.19.0

# collect (function)

Map a record into an array

**Signature**

```ts
export function collect<K extends string, A, B>(f: (k: K, a: A) => B): (d: Record<K, A>) => Array<B>
export function collect<A, B>(f: (k: string, a: A) => B): (d: Record<string, A>) => Array<B>
export function collect<K extends string, A, B>(d: Record<K, A>, f: (k: K, a: A) => B): Array<B>
export function collect<A, B>(d: Record<string, A>, f: (k: string, a: A) => B): Array<B> { ... }
```

**Example**

```ts
import { collect } from 'fp-ts/lib/Record'

const ob: { a: string; b: boolean } = { a: 'foo', b: false }
assert.deepStrictEqual(collect(ob, (key, val) => ({ key: key, value: val })), [
  { key: 'a', value: 'foo' },
  { key: 'b', value: false }
])
```

Added in v1.10.0

# compact (function)

**Signature**

```ts
export const compact = <A>(fa: Record<string, Option<A>>): Record<string, A> => ...
```

Added in v1.10.0

# deleteAt (function)

Delete a key and value from a map

**Signature**

```ts
export function deleteAt<K extends string>(
  k: K
): <KS extends string, A>(d: Record<KS, A>) => Record<string extends K ? string : Exclude<KS, K>, A> { ... }
```

Added in v1.19.0

# elem (function)

**Signature**

```ts
export function elem<A>(E: Eq<A>): (a: A, fa: { [key: string]: A }) => boolean { ... }
```

Added in v1.14.0

# every (function)

**Signature**

```ts
export function every<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

# filter (function)

**Signature**

```ts
export function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: Record<string, A>) => Record<string, B>
export function filter<A>(predicate: Predicate<A>): (fa: Record<string, A>) => Record<string, A>
export function filter<A, B extends A>(fa: Record<string, A>, refinement: Refinement<A, B>): Record<string, B>
export function filter<A>(fa: Record<string, A>, predicate: Predicate<A>): Record<string, A> { ... }
```

Added in v1.10.0

# filterMap (function)

**Signature**

```ts
export function filterMap<A, B>(f: (a: A) => Option<B>): (fa: Record<string, A>) => Record<string, B>
export function filterMap<A, B>(fa: Record<string, A>, f: (a: A) => Option<B>): Record<string, B> { ... }
```

Added in v1.10.0

# filterMapWithIndex (function)

**Signature**

```ts
export function filterMapWithIndex<K extends string, A, B>(
  f: (key: K, a: A) => Option<B>
): (fa: Record<K, A>) => Record<string, B>
export function filterMapWithIndex<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithIndex<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> { ... }
```

Added in v1.12.0

# ~~filterMapWithKey~~ (function)

Use `filterMapWithIndex`

**Signature**

```ts
export function filterMapWithKey<K extends string, A, B>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Option<B>
): Record<string, B>
export function filterMapWithKey<A, B>(fa: Record<string, A>, f: (key: string, a: A) => Option<B>): Record<string, B> { ... }
```

Added in v1.14.0

# filterWithIndex (function)

**Signature**

```ts
export function filterWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Record<string, B>
export function filterWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Record<string, A>
export function filterWithIndex<K extends string, A>(fa: Record<K, A>, p: (key: K, a: A) => boolean): Record<string, A>
export function filterWithIndex<A>(fa: Record<string, A>, p: (key: string, a: A) => boolean): Record<string, A> { ... }
```

Added in v1.12.0

# ~~filterWithKey~~ (function)

Use `filterWithIndex`

**Signature**

```ts
export function filterWithKey<K extends string, A>(
  fa: Record<K, A>,
  predicate: (key: K, a: A) => boolean
): Record<string, A>
export function filterWithKey<A>(fa: Record<string, A>, predicate: (key: string, a: A) => boolean): Record<string, A> { ... }
```

Added in v1.14.0

# foldMap (function)

**Signature**

```ts
export function foldMap<M>(
  M: Monoid<M>
): {
  <A>(f: (a: A) => M): (fa: Record<string, A>) => M
  /** @deprecated */
  <A>(fa: Record<string, A>, f: (a: A) => M): M
} { ... }
```

Added in v1.10.0

# foldMapWithIndex (function)

**Signature**

```ts
export function foldMapWithIndex<M>(
  M: Monoid<M>
): <K extends string, A>(f: (k: K, a: A) => M) => (fa: Record<K, A>) => M { ... }
```

Added in v1.19.0

# ~~foldMapWithKey~~ (function)

Use `foldMapWithIndex`

**Signature**

```ts
export const foldMapWithKey = <M>(M: Monoid<M>) => <A>(fa: Record<string, A>, f: (k: string, a: A) => M): M => ...
```

Added in v1.12.0

# ~~foldr~~ (function)

Use `reduceRight`

**Signature**

```ts
export function foldr<A, B>(fa: Record<string, A>, b: B, f: (a: A, b: B) => B): B { ... }
```

Added in v1.10.0

# ~~foldrWithKey~~ (function)

Use `reduceRightWithIndex`

**Signature**

```ts
export function foldrWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, a: A, b: B) => B): B
export function foldrWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, a: A, b: B) => B): B { ... }
```

Added in v1.12.0

# fromFoldable (function)

Create a record from a foldable collection of key/value pairs, using the
specified function to combine values for duplicate keys.

**Signature**

```ts
export function fromFoldable<F extends URIS3>(
  F: Foldable3<F>
): <K extends string, U, L, A>(ta: Kind3<F, U, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS2>(
  F: Foldable2<F>
): <K extends string, L, A>(ta: Kind2<F, L, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F extends URIS>(
  F: Foldable1<F>
): <K extends string, A>(ta: Kind<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A>
export function fromFoldable<F>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <K extends string, A>(ta: HKT<F, [K, A]>, onConflict: (existing: A, a: A) => A) => Record<K, A> { ... }
```

Added in v1.10.0

# fromFoldableMap (function)

Create a record from a foldable collection using the specified functions to

- map to key/value pairs
- combine values for duplicate keys.

**Signature**

```ts
export function fromFoldableMap<F extends URIS3, B>(
  M: Magma<B>,
  F: Foldable3<F>
): <U, L, A, K extends string>(ta: Kind3<F, U, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS2, B>(
  M: Magma<B>,
  F: Foldable2<F>
): <L, A, K extends string>(ta: Kind2<F, L, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F extends URIS, B>(
  M: Magma<B>,
  F: Foldable1<F>
): <A, K extends string>(ta: Kind<F, A>, f: (a: A) => [K, B]) => Record<K, B>
export function fromFoldableMap<F, B>(
  M: Magma<B>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, K extends string>(ta: HKT<F, A>, f: (a: A) => [K, B]) => Record<K, B> { ... }
```

**Example**

```ts
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import { array, zip } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { fromFoldableMap } from 'fp-ts/lib/Record'

// like lodash `zipObject` or ramda `zipObj`
export const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
  fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)

assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

// build a record from a field
interface User {
  id: string
  name: string
}

const users: Array<User> = [{ id: 'id1', name: 'name1' }, { id: 'id2', name: 'name2' }, { id: 'id1', name: 'name3' }]

assert.deepStrictEqual(fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
  id1: { id: 'id1', name: 'name3' },
  id2: { id: 'id2', name: 'name2' }
})
```

Added in v1.16.0

# getEq (function)

**Signature**

```ts
export function getEq<K extends string, A>(E: Eq<A>): Eq<Record<K, A>>
export function getEq<A>(E: Eq<A>): Eq<Record<string, A>> { ... }
```

Added in v1.19.0

# getMonoid (function)

Returns a `Semigroup` instance for records given a `Semigroup` instance for their values

**Signature**

```ts
export function getMonoid<K extends string, A>(S: Semigroup<A>): Monoid<Record<K, A>>
export function getMonoid<A>(S: Semigroup<A>): Monoid<Record<string, A>> { ... }
```

**Example**

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/Record'

const M = getMonoid(semigroupSum)
assert.deepStrictEqual(M.concat({ foo: 123 }, { foo: 456 }), { foo: 579 })
```

Added in v1.10.0

# getShow (function)

**Signature**

```ts
export const getShow = <A>(S: Show<A>): Show<Record<string, A>> => ...
```

Added in v1.17.0

# hasOwnProperty (function)

**Signature**

```ts
export function hasOwnProperty<K extends string, A>(k: K, d: Record<K, A>): boolean { ... }
```

Added in v1.19.0

# ~~insert~~ (function)

Use `insertAt`

**Signature**

```ts
export function insert<KS extends string, K extends string, A>(k: K, a: A, d: Record<KS, A>): Record<KS | K, A>
export function insert<A>(k: string, a: A, d: Record<string, A>): Record<string, A> { ... }
```

Added in v1.10.0

# insertAt (function)

Insert or replace a key/value pair in a map

**Signature**

```ts
export function insertAt<K extends string, A>(k: K, a: A): <KS extends string>(r: Record<KS, A>) => Record<KS | K, A> { ... }
```

Added in v1.19.0

# isEmpty (function)

Test whether a record is empty

**Signature**

```ts
export const isEmpty = <A>(d: Record<string, A>): boolean => ...
```

Added in v1.10.0

# isSubrecord (function)

Test whether one record contains all of the keys and values contained in another record

**Signature**

```ts
export const isSubrecord = <A>(E: Eq<A>) => (d1: Record<string, A>, d2: Record<string, A>): boolean => ...
```

Added in v1.14.0

# lookup (function)

Lookup the value for a key in a record

**Signature**

```ts
export const lookup = <A>(key: string, fa: Record<string, A>): Option<A> => ...
```

Added in v1.10.0

# map (function)

Map a record passing the values to the iterating function

**Signature**

```ts
export function map<A, B>(f: (a: A) => B): <K extends string>(fa: Record<K, A>) => Record<K, B>
export function map<K extends string, A, B>(fa: Record<K, A>, f: (a: A) => B): Record<K, B>
export function map<A, B>(fa: Record<string, A>, f: (a: A) => B): Record<string, B> { ... }
```

Added in v1.10.0

# mapWithIndex (function)

Map a record passing the keys to the iterating function

**Signature**

```ts
export function mapWithIndex<K extends string, A, B>(f: (k: K, a: A) => B): (fa: Record<K, A>) => Record<K, B> { ... }
```

Added in v1.19.0

# ~~mapWithKey~~ (function)

Use `mapWithIndex`

**Signature**

```ts
export function mapWithKey<K extends string, A, B>(fa: Record<K, A>, f: (k: K, a: A) => B): Record<K, B>
export function mapWithKey<A, B>(fa: Record<string, A>, f: (k: string, a: A) => B): Record<string, B> { ... }
```

Added in v1.10.0

# partition (function)

**Signature**

```ts
export function partition<A>(
  predicate: Predicate<A>
): (fa: Record<string, A>) => Separated<Record<string, A>, Record<string, A>>
export function partition<A>(
  fa: Record<string, A>,
  predicate: Predicate<A>
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v1.10.0

# partitionMap (function)

**Signature**

```ts
export function partitionMap<RL, RR, A>(
  f: (a: A) => Either<RL, RR>
): (fa: Record<string, A>) => Separated<Record<string, RL>, Record<string, RR>>
export function partitionMap<RL, RR, A>(
  fa: Record<string, A>,
  f: (a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.10.0

# partitionMapWithIndex (function)

**Signature**

```ts
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  f: (key: K, a: A) => Either<RL, RR>
): (fa: Record<K, A>) => Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithIndex<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.12.0

# ~~partitionMapWithKey~~ (function)

Use `partitionMapWithIndex`

**Signature**

```ts
export function partitionMapWithKey<K extends string, RL, RR, A>(
  fa: Record<K, A>,
  f: (key: K, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>>
export function partitionMapWithKey<RL, RR, A>(
  fa: Record<string, A>,
  f: (key: string, a: A) => Either<RL, RR>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.14.0

# partitionWithIndex (function)

**Signature**

```ts
export function partitionWithIndex<K extends string, A, B extends A>(
  refinementWithIndex: RefinementWithIndex<K, A, B>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, B>>
export function partitionWithIndex<K extends string, A>(
  predicateWithIndex: PredicateWithIndex<K, A>
): (fa: Record<K, A>) => Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<K extends string, A>(
  fa: Record<K, A>,
  p: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithIndex<A>(
  fa: Record<string, A>,
  p: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v1.12.0

# ~~partitionWithKey~~ (function)

Use `partitionWithIndex`

**Signature**

```ts
export function partitionWithKey<K extends string, A>(
  fa: Record<K, A>,
  predicate: (key: K, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>>
export function partitionWithKey<A>(
  fa: Record<string, A>,
  predicate: (key: string, a: A) => boolean
): Separated<Record<string, A>, Record<string, A>> { ... }
```

Added in v1.14.0

# pop (function)

Delete a key and value from a map, returning the value as well as the subsequent map

**Signature**

```ts
export function pop<A>(k: string): (d: Record<string, A>) => Option<[A, Record<string, A>]>
export function pop<A>(k: string, d: Record<string, A>): Option<[A, Record<string, A>]> { ... }
```

Added in v1.10.0

# reduce (function)

Reduce object by iterating over it's values.

**Signature**

```ts
export function reduce<A, B>(fa: Record<string, A>, b: B, f: (b: B, a: A) => B): B { ... }
```

**Example**

```ts
import { reduce } from 'fp-ts/lib/Record'

const joinAllVals = (ob: { [k: string]: string }) => reduce(ob, '', (acc, val) => acc + val)

assert.deepStrictEqual(joinAllVals({ a: 'foo', b: 'bar' }), 'foobar')
```

Added in v1.10.0

# reduceRightWithIndex (function)

**Signature**

```ts
export function reduceRightWithIndex<K extends string, A, B>(b: B, f: (k: K, a: A, b: B) => B): (fa: Record<K, A>) => B { ... }
```

Added in v1.19.0

# reduceWithIndex (function)

**Signature**

```ts
export function reduceWithIndex<K extends string, A, B>(b: B, f: (k: K, b: B, a: A) => B): (fa: Record<K, A>) => B { ... }
```

Added in v1.19.0

# ~~reduceWithKey~~ (function)

Use `reduceWithIndex`

**Signature**

```ts
export function reduceWithKey<K extends string, A, B>(fa: Record<K, A>, b: B, f: (k: K, b: B, a: A) => B): B
export function reduceWithKey<A, B>(fa: Record<string, A>, b: B, f: (k: string, b: B, a: A) => B): B { ... }
```

Added in v1.12.0

# ~~remove~~ (function)

Use `deleteAt`

**Signature**

```ts
export function remove<KS extends string, K extends string, A>(
  k: K,
  d: Record<KS, A>
): Record<string extends K ? string : Exclude<KS, K>, A>
export function remove<A>(k: string, d: Record<string, A>): Record<string, A> { ... }
```

Added in v1.10.0

# separate (function)

**Signature**

```ts
export function separate<RL, RR>(
  fa: Record<string, Either<RL, RR>>
): Separated<Record<string, RL>, Record<string, RR>> { ... }
```

Added in v1.10.0

# sequence (function)

**Signature**

```ts
export function sequence<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(ta: Record<string, Kind3<F, U, L, A>>) => Kind3<F, U, L, Record<string, A>>
export function sequence<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A>(ta: Record<string, Kind3<F, U, L, A>>) => Kind3<F, U, L, Record<string, A>>
export function sequence<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(ta: Record<string, Kind2<F, L, A>>) => Kind2<F, L, Record<string, A>>
export function sequence<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A>(ta: Record<string, Kind2<F, L, A>>) => Kind2<F, L, Record<string, A>>
export function sequence<F extends URIS>(
  F: Applicative1<F>
): <A>(ta: Record<string, Kind<F, A>>) => Kind<F, Record<string, A>>
export function sequence<F>(F: Applicative<F>): <A>(ta: Record<string, HKT<F, A>>) => HKT<F, Record<string, A>> { ... }
```

Added in v1.10.0

# singleton (function)

Create a record with one key/value pair

**Signature**

```ts
export const singleton = <K extends string, A>(k: K, a: A): Record<K, A> => ...
```

Added in v1.10.0

# size (function)

Calculate the number of key/value pairs in a record

**Signature**

```ts
export const size = <A>(d: Record<string, A>): number => ...
```

Added in v1.10.0

# some (function)

**Signature**

```ts
export function some<A>(fa: { [key: string]: A }, predicate: (a: A) => boolean): boolean { ... }
```

Added in v1.14.0

# toArray (function)

**Signature**

```ts
export function toArray<K extends string, A>(d: Record<K, A>): Array<[K, A]>
export function toArray<A>(d: Record<string, A>): Array<[string, A]> { ... }
```

Added in v1.10.0

# toUnfoldable (function)

Unfolds a record into a list of key/value pairs

**Signature**

```ts
export function toUnfoldable<F extends URIS>(
  unfoldable: Unfoldable1<F>
): <K extends string, A>(d: Record<K, A>) => Kind<F, [K, A]>
export function toUnfoldable<F>(unfoldable: Unfoldable<F>): <K extends string, A>(d: Record<K, A>) => HKT<F, [K, A]> { ... }
```

Added in v1.10.0

# ~~traverse~~ (function)

Use `traverse2v`

**Signature**

```ts
export function traverse<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
export function traverse<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
export function traverse<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
export function traverse<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
export function traverse<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => Kind<F, B>) => Kind<F, Record<string, B>>
export function traverse<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (a: A) => HKT<F, B>) => HKT<F, Record<string, B>> { ... }
```

Added in v1.10.0

# traverse2v (function)

**Signature**

```ts
export function traverse2v<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(f: (a: A) => Kind3<F, U, L, B>) => <K extends string>(ta: Record<K, A>) => Kind3<F, U, L, Record<K, B>>
export function traverse2v<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(f: (a: A) => Kind2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverse2v<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(f: (a: A) => Kind2<F, L, B>) => <K extends string>(ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverse2v<F extends URIS>(
  F: Applicative1<F>
): <A, B>(f: (a: A) => Kind<F, B>) => <K extends string>(ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverse2v<F>(
  F: Applicative<F>
): <A, B>(f: (a: A) => HKT<F, B>) => <K extends string>(ta: Record<K, A>) => HKT<F, Record<K, B>> { ... }
```

Added in v1.19.0

# traverseWithIndex (function)

**Signature**

```ts
export function traverseWithIndex<F extends URIS3>(
  F: Applicative3<F>
): <K extends string, U, L, A, B>(
  f: (k: K, a: A) => Kind3<F, U, L, B>
) => (ta: Record<K, A>) => Kind3<F, U, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2>(
  F: Applicative2<F>
): <K extends string, L, A, B>(f: (k: K, a: A) => Kind2<F, L, B>) => (ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <K extends string, A, B>(f: (k: K, a: A) => Kind2<F, L, B>) => (ta: Record<K, A>) => Kind2<F, L, Record<K, B>>
export function traverseWithIndex<F extends URIS>(
  F: Applicative1<F>
): <K extends string, A, B>(f: (k: K, a: A) => Kind<F, B>) => (ta: Record<K, A>) => Kind<F, Record<K, B>>
export function traverseWithIndex<F>(
  F: Applicative<F>
): <K extends string, A, B>(f: (k: K, a: A) => HKT<F, B>) => (ta: Record<K, A>) => HKT<F, Record<K, B>> { ... }
```

Added in v1.19.0

# ~~traverseWithKey~~ (function)

Use `traverseWithIndex`

**Signature**

```ts
export function traverseWithKey<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind3<F, U, L, B>) => Kind3<F, U, L, Record<string, B>>
export function traverseWithKey<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind2<F, L, B>) => Kind2<F, L, Record<string, B>>
export function traverseWithKey<F extends URIS>(
  F: Applicative1<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => Kind<F, B>) => Kind<F, Record<string, B>>
export function traverseWithKey<F>(
  F: Applicative<F>
): <A, B>(ta: Record<string, A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, Record<string, B>> { ... }
```

Added in v1.10.0

# ~~wilt~~ (function)

Use `record.wilt`

**Signature**

```ts
export function wilt<F extends URIS3>(
  F: Applicative3<F>
): <U, L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind3<F, U, L, Either<RL, RR>>
) => Kind3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind3<F, U, L, Either<RL, RR>>
) => Kind3<F, U, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS2>(
  F: Applicative2<F>
): <L, RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind2<F, L, Either<RL, RR>>
) => Kind2<F, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind2<F, L, Either<RL, RR>>
) => Kind2<F, L, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F extends URIS>(
  F: Applicative1<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => Kind<F, Either<RL, RR>>
) => Kind<F, Separated<Record<string, RL>, Record<string, RR>>>
export function wilt<F>(
  F: Applicative<F>
): <RL, RR, A>(
  wa: Record<string, A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
) => HKT<F, Separated<Record<string, RL>, Record<string, RR>>> { ... }
```

Added in v1.10.0

# ~~wither~~ (function)

Use `record.wither`

**Signature**

```ts
export function wither<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A, B>(wa: Record<string, A>, f: (a: A) => Kind3<F, U, L, Option<B>>) => Kind3<F, U, L, Record<string, B>>
export function wither<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind3<F, U, L, Option<B>>) => Kind3<F, U, L, Record<string, B>>
export function wither<F extends URIS2>(
  F: Applicative2<F>
): <L, A, B>(wa: Record<string, A>, f: (a: A) => Kind2<F, L, Option<B>>) => Kind2<F, L, Record<string, B>>
export function wither<F extends URIS2, L>(
  F: Applicative2C<F, L>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind2<F, L, Option<B>>) => Kind2<F, L, Record<string, B>>
export function wither<F extends URIS>(
  F: Applicative1<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => Kind<F, Option<B>>) => Kind<F, Record<string, B>>
export function wither<F>(
  F: Applicative<F>
): <A, B>(wa: Record<string, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Record<string, B>> { ... }
```

Added in v1.10.0

# reduceRight (export)

**Signature**

```ts
export { reduceRight }
```
